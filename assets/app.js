/* ============================================================
   Sharp Frame Studios, v2
   Scroll-scrubbed hero, decode text, scroll fades, 3D tilt,
   designed players. Vanilla, no build step.
   ============================================================ */
(function () {
'use strict';

var $  = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var clamp = function (v, lo, hi) { return Math.min(hi, Math.max(lo, v)); };
var smoothstep = function (p, e0, e1) { var t = clamp((p - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
function rng(seed) { var s = seed >>> 0; return function () { return (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; }; }

var VIDEO_URL   = 'assets/hero-scrub.mp4';
var POSTER_URL  = 'assets/hero-poster.jpg';
var ENDING_URL  = 'assets/hero-ending.jpg';
var VIDEO_BYTES = 9735062;   /* the real byte size, used when Content-Length is missing */

var video = $('#hero'), stage = $('#stage'), hero = $('.hero'), poster = $('#poster');
var loader = $('#loader'), ringFg = $('.ring-fg'), cue = $('#cue'), lensXL = $('#lensXL');
var bandEls = $$('.band');
var rmq = matchMedia('(prefers-reduced-motion: reduce)');
var coarse = matchMedia('(pointer: coarse)');

/* ============================================================
   1. THE DECODE EFFECT
   Characters cycle through mono glyphs and resolve left to right
   with jitter, like a signal locking on. Two drivers: hero bands
   feed it the scroll (--k); section headlines play it over time
   when they enter, and re-arm when they leave so it plays again.
   ============================================================ */
var GLYPHS = '░▒▓█▚▞▌▐/\\|<>_-=+*:.·01SHARPFRME';
var active = new Set();          /* spans currently mid-decode */
var glyphRaf = null, lastGlyph = 0;

function prepDecode(span, seed) {
  var text = span.getAttribute('data-text') || '';
  var rand = rng(seed);
  var sr = document.createElement('span'); sr.className = 'sr'; sr.textContent = text;
  var vis = document.createElement('span'); vis.className = 'dcv'; vis.setAttribute('aria-hidden', 'true');
  var chars = [];
  var flat = text.replace(/\|/g, ' ');
  var n = flat.replace(/ /g, '').length, seen = 0;
  sr.textContent = flat;
  /* characters live inside word boxes that never break, so a headline wraps
     between words like normal type and never splits a word in half. A pipe
     in data-text is a designed line break. */
  text.split('|').forEach(function (line, li) {
    if (li) vis.appendChild(document.createElement('br'));
    line.split(' ').forEach(function (word, wi, arr) {
      var w = document.createElement('span'); w.className = 'w';
      for (var i = 0; i < word.length; i++) {
        var el = document.createElement('span');
        el.className = 'ch u';
        el.textContent = GLYPHS[Math.floor(rand() * GLYPHS.length)];
        el._t = word[i];
        el._th = (seen / Math.max(1, n - 1)) * 0.72 + rand() * 0.26;   /* left to right, with jitter */
        el._on = false;
        chars.push(el); w.appendChild(el); seen++;
      }
      vis.appendChild(w);
      if (wi < arr.length - 1) vis.appendChild(document.createTextNode(' '));
    });
  });
  span.textContent = '';
  span.appendChild(sr); span.appendChild(vis);
  span._chars = chars; span._k = -1;
  return span;
}

function decodeSet(span, k) {
  if (Math.abs(k - span._k) < 0.004) return;
  span._k = k;
  var chars = span._chars, i, el, anyOpen = false;
  for (i = 0; i < chars.length; i++) {
    el = chars[i];
    var on = k >= el._th;
    if (on !== el._on) {
      el._on = on;
      if (on) { el.textContent = el._t; el.classList.remove('u'); }
      else { el.classList.add('u'); }
    }
    if (!on) anyOpen = true;
  }
  if (anyOpen && k > 0) { active.add(span); if (glyphRaf === null) glyphRaf = requestAnimationFrame(glyphTick); }
  else active.delete(span);
}

/* the unresolved characters keep cycling at about 15 frames a second while a
   span is mid-decode and visible, and this loop rests the moment none are */
function glyphTick(now) {
  glyphRaf = null;
  if (active.size === 0 || document.hidden) return;
  if (now - lastGlyph > 66) {
    lastGlyph = now;
    active.forEach(function (span) {
      var chars = span._chars;
      for (var i = 0; i < chars.length; i++) {
        if (!chars[i]._on) chars[i].textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
    });
  }
  glyphRaf = requestAnimationFrame(glyphTick);
}

/* prepare every decode span on the page, once */
$$('.dc').forEach(function (s, i) { prepDecode(s, 7919 + i * 104729); });

/* ============================================================
   2. THE HERO BANDS
   ============================================================ */
var bands = bandEls.map(function (el, i) {
  el.style.setProperty('--sa', [0.9, 0.9, 0.9, 0.96][i]);
  return { el: el, a: +el.getAttribute('data-a'), b: +el.getAttribute('data-b'),
           ramp: +(el.getAttribute('data-ramp') || 0), first: i === 0, last: i === bandEls.length - 1,
           op: -1, k: -1, g: -1, dcs: $$('.dc', el), txt: $('.band-txt', el) };
});

/* ============================================================
   THE GLASS: a frosted panel behind each headline that shatters into
   shards as the words leave, and reassembles as the next words arrive.
   Shards are SVG polygons on a jittered grid, each with its own scatter
   vector; one CSS variable (--g) drives the whole thing, reversibly.
   ============================================================ */
var SVGNS = 'http://www.w3.org/2000/svg';
function buildGlass(b, i) {
  var wrap = document.createElement('div'); wrap.className = 'gwrap';
  var panel = document.createElement('div'); panel.className = 'gpanel';
  var svg = document.createElementNS(SVGNS, 'svg'); svg.setAttribute('class', 'gshards off'); svg.setAttribute('preserveAspectRatio', 'none'); svg.setAttribute('aria-hidden', 'true');
  wrap.appendChild(panel); wrap.appendChild(svg);
  var inn = $('.band-in', b.el);
  inn.insertBefore(wrap, inn.firstChild);
  b.wrap = wrap; b.svg = svg; b.seed = 31337 + i * 7919; b.rows = b.last ? 4 : 3; b.W = 0; b.H = 0;
}
function layoutGlass(b) {
  var r = b.wrap.getBoundingClientRect();
  var W = Math.round(r.width), H = Math.round(r.height);
  if (W < 4 || H < 4 || (W === b.W && H === b.H)) return;
  b.W = W; b.H = H;
  b.svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
  while (b.svg.firstChild) b.svg.removeChild(b.svg.firstChild);
  var rand = rng(b.seed);
  var cols = Math.max(4, Math.round(W / 110)), rows = b.rows;
  var cw = W / cols, ch = H / rows, pts = [];
  for (var y = 0; y <= rows; y++) {
    pts.push([]);
    for (var x = 0; x <= cols; x++) {
      var jx = (x === 0 || x === cols) ? 0 : (rand() - 0.5) * cw * 0.7;
      var jy = (y === 0 || y === rows) ? 0 : (rand() - 0.5) * ch * 0.7;
      pts[y].push([x * cw + jx, y * ch + jy]);
    }
  }
  var cx = W / 2, cy = H / 2;
  function shard(a, bq, c) {
    var poly = document.createElementNS(SVGNS, 'polygon');
    poly.setAttribute('points', a.join(',') + ' ' + bq.join(',') + ' ' + c.join(','));
    var mx = (a[0] + bq[0] + c[0]) / 3, my = (a[1] + bq[1] + c[1]) / 3;
    var dx = mx - cx, dy = my - cy, len = Math.max(1, Math.hypot(dx, dy));
    var dist = 120 + rand() * 160;
    poly.style.setProperty('--sx', ((dx / len) * dist + (rand() - 0.5) * 70).toFixed(1) + 'px');
    poly.style.setProperty('--sy', ((dy / len) * dist + (rand() - 0.5) * 70 + 40).toFixed(1) + 'px');
    poly.style.setProperty('--sr', ((rand() - 0.5) * 90).toFixed(1) + 'deg');
    b.svg.appendChild(poly);
  }
  for (var yy = 0; yy < rows; yy++) for (var xx = 0; xx < cols; xx++) {
    var p00 = pts[yy][xx], p10 = pts[yy][xx + 1], p01 = pts[yy + 1][xx], p11 = pts[yy + 1][xx + 1];
    if (rand() < 0.5) { shard(p00, p10, p11); shard(p00, p11, p01); }
    else { shard(p00, p10, p01); shard(p10, p11, p01); }
  }
}
function setGlass(b, g) {
  if (!b.wrap || Math.abs(g - b.g) < 0.004) return;
  b.g = g;
  b.wrap.style.setProperty('--g', g.toFixed(3));
  var whole = g >= 0.995, gone = g <= 0.004;
  if (b.svgOff !== (whole || gone)) { b.svgOff = whole || gone; b.svg.classList.toggle('off', b.svgOff); }
  if (b.gone !== gone) { b.gone = gone; b.wrap.classList.toggle('gone', gone); }
}
bands.forEach(buildGlass);
function layoutAllGlass() { bands.forEach(layoutGlass); }
if ('ResizeObserver' in window) {
  var glassRO = new ResizeObserver(function () { layoutAllGlass(); });
  bands.forEach(function (b) { glassRO.observe(b.wrap); });
}

function heroProgress() {
  var range = hero.offsetHeight - window.innerHeight;
  if (range <= 0) return 0;
  return clamp(-hero.getBoundingClientRect().top / range, 0, 1);
}

var loadK = 0, loadStart = 0, lastRot = -1;

function updateCaptions(p) {
  for (var i = 0; i < bands.length; i++) {
    var b = bands[i];
    var f = Math.min(0.035, (b.b - b.a) / 3);
    var op = (b.first ? 1 : smoothstep(p, b.a, b.a + f)) * (1 - (b.last ? 0 : smoothstep(p, b.b - f, b.b)));
    if (Math.abs(op - b.op) > 0.004) { b.op = op; b.txt.style.opacity = op.toFixed(3); }
    /* the glass assembles a little before the words and shatters a little after them */
    var fg = 0.05;
    var g = (b.first ? 1 : smoothstep(p, b.a - 0.01, b.a - 0.01 + fg)) * (1 - (b.last ? 0 : smoothstep(p, b.b - fg + 0.01, b.b + 0.01)));
    setGlass(b, g);
    var ramp = b.ramp || Math.min(0.03, (b.b - b.a) * 0.35);
    var k = clamp((p - b.a) / ramp, 0, 1);
    if (b.first) k = Math.max(k, loadK);
    if (Math.abs(k - b.k) > 0.008) {
      b.k = k;
      b.el.style.setProperty('--k', k.toFixed(3));
      for (var j = 0; j < b.dcs.length; j++) decodeSet(b.dcs[j], op > 0.02 ? k : 0);
      if (b.last) arcDecode(op > 0.02 ? k : 0);
    }
  }
  setClockFade(p);
  /* the CSS lens turns with the scroll; the footage replaces it once it lands */
  var rot = Math.round(p * 240);
  if (rot !== lastRot && lensXL) { lastRot = rot; lensXL.style.setProperty('--rot', rot + 'deg'); }
  updateReadout(p);
}

var lastFocus = '', lastFocusAt = 0, vfFocus = $('#vfFocus');
function updateReadout(p) {
  var now = performance.now();
  if (now - lastFocusAt < 100) return;
  lastFocusAt = now;
  var txt;
  if (p === null) {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    txt = 'PAGE ' + String(Math.round((max > 0 ? clamp(window.scrollY / max, 0, 1) : 0) * 100)).padStart(2, '0');
  } else txt = 'FOCUS ' + String(Math.round(p * 100)).padStart(2, '0');
  if (txt === lastFocus) return;
  lastFocus = txt; vfFocus.textContent = txt;
}

/* ============================================================
   3. GATED SEEKS
   ============================================================ */
var seekBusy = false, pendingTime = null;
function requestSeek(t) {
  if (!video.duration || isNaN(video.duration)) return;
  if (seekBusy) { pendingTime = t; return; }
  seekBusy = true;
  try { video.currentTime = t; } catch (e) { seekBusy = false; }
}
video.addEventListener('seeked', function () {
  seekBusy = false;
  if (pendingTime !== null) { var t = pendingTime; pendingTime = null; requestSeek(t); }
});
video.addEventListener('error', function () { seekBusy = false; pendingTime = null; failVideo(); });

/* ============================================================
   4. THE DRIVE LOOP
   ============================================================ */
var target = 0, shown = 0, rafId = null, lastTick = 0, heroOnScreen = true;
function tick(now) {
  var dt = Math.min(100, now - (lastTick || now));
  lastTick = now;
  shown += (target - shown) * (1 - Math.pow(1 - 0.16, dt / 16.667));
  if (loadK < 1 && loadStart) loadK = clamp((now - loadStart) / 1100, 0, 1);
  var settled = Math.abs(target - shown) < 0.0005 && loadK >= 1;
  if (settled) { shown = target; rafId = null; lastTick = 0; }
  else rafId = requestAnimationFrame(tick);
  requestSeek(shown * (video.duration || 0));
  updateCaptions(shown);
}
function onScroll() {
  target = heroProgress();
  if (rafId === null && heroOnScreen) { lastTick = 0; rafId = requestAnimationFrame(tick); }
}
var heroIO = null;
if ('IntersectionObserver' in window) {
  heroIO = new IntersectionObserver(function (es) {
    var was = heroOnScreen;
    heroOnScreen = es[es.length - 1].isIntersecting;
    if (!heroOnScreen) { if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; } }
    else if (!was && scrubOn) { lastTick = 0; clockStart(); onScroll(); }
  }, { rootMargin: '10px' });
  heroIO.observe(hero);
}

/* ============================================================
   5. THE STREAMED BLOB LOADER
   ============================================================ */
var heroInit = false, blobState = 'idle', heroCtrl = null;
function startBlobFetch() {
  if (blobState !== 'idle' || !scrubOn) return;
  if (MQLS.some(function (m) { return m.matches; })) { applyHeroMode(); return; }
  blobState = 'loading';
  loader.classList.add('is-on');
  loadHeroBlob().then(function () { blobState = 'done'; }).catch(function (e) {
    if (!scrubOn && e && e.name === 'AbortError') { blobState = 'idle'; loader.classList.remove('is-on'); return; }
    blobState = 'failed'; failVideo();
  });
}
function initHeroOnce() {
  if (heroInit) { startBlobFetch(); return; }
  heroInit = true;
  cue.classList.add('is-on');
  loadStart = performance.now();
  if (rafId === null) rafId = requestAnimationFrame(tick);
  /* the poster is optional here: the CSS lens is the designed first frame,
     so a missing poster (footage not yet delivered) costs nothing */
  var pi = new Image();
  pi.onload = function () { poster.style.backgroundImage = "url('" + POSTER_URL + "')"; poster.classList.add('is-on'); startBlobFetch(); };
  pi.onerror = function () { startBlobFetch(); };
  pi.src = POSTER_URL;
  setTimeout(startBlobFetch, 4000);
}
function loadHeroBlob() {
  return new Promise(function (resolve, reject) {
    var ctrl = new AbortController(); heroCtrl = ctrl;
    var watchdog = setTimeout(function () { ctrl.abort(); }, 20000);
    var opts = { signal: ctrl.signal }; try { opts.priority = 'low'; } catch (e) {}
    fetch(VIDEO_URL, opts).then(function (res) {
      if (!res.ok || !res.body) throw new Error('bad response');
      var total = Number(res.headers.get('Content-Length')) || VIDEO_BYTES || 1;
      var reader = res.body.getReader(), chunks = [], got = 0, lastRing = 0;
      (function pump() {
        reader.read().then(function (r) {
          if (r.done) {
            clearTimeout(watchdog);
            ringFg.style.setProperty('--ld', 0);
            /* preload flips to auto before the blob goes in: Safari takes "none"
               literally and would never ready the file, even from memory */
            video.preload = 'auto';
            video.src = URL.createObjectURL(new Blob(chunks, { type: 'video/mp4' }));
            video.load();
            var heroArmed = false;
            function heroArm() {
              if (heroArmed || !video.duration) return; heroArmed = true;
              requestSeek(heroProgress() * video.duration);
              stage.classList.add('video-ready');
              loader.classList.remove('is-on');
              onScroll();
              startBgFetch();
            }
            video.addEventListener('canplay', heroArm);
            video.addEventListener('loadeddata', heroArm);
            if (coarse.matches) { var pp = video.play(); if (pp && pp.then) pp.then(function () { video.pause(); onScroll(); }).catch(function () {}); }
            resolve(); return;
          }
          clearTimeout(watchdog); watchdog = setTimeout(function () { ctrl.abort(); }, 20000);
          chunks.push(r.value); got += r.value.length;
          var frac = Math.min(1, got / total), now = performance.now();
          if (now - lastRing > 100 || frac === 1) { lastRing = now; ringFg.style.setProperty('--ld', Math.round(126 * (1 - frac))); }
          pump();
        }).catch(function (e) { clearTimeout(watchdog); reject(e); });
      })();
    }).catch(function (e) { clearTimeout(watchdog); reject(e); });
  });
}
var failed = false;
function failVideo() {
  if (failed) return; failed = true;
  loader.classList.remove('is-on');
  stage.classList.add('video-failed');      /* the CSS lens carries the journey */
}

/* ============================================================
   6. THE STATIC-HERO GATE (identical to style.css). Phones and tablets get
   the scrub and the film like the desktop, on Adrian's decision; only a
   visitor's own reduced-motion setting gets the still hero.
   ============================================================ */
var GATES = [
  '(prefers-reduced-motion: reduce)'
];
var MQLS = GATES.map(function (q) { return matchMedia(q); });
var scrubOn = false;

var shBg = $('#shBg'), staticPainted = false;
function initStaticHero() {
  if (staticPainted || !shBg) return;
  staticPainted = true;
  var im = new Image();
  im.onload = function () {
    shBg.style.backgroundImage = "url('" + ENDING_URL + "')"; shBg.classList.add('is-on');
    /* the real lens is in the frame now; the CSS lens was only ever its stand-in */
    $('#staticHero').classList.add('has-frame');
  };
  im.src = ENDING_URL;
}
function enableScrub() {
  if (scrubOn) return; scrubOn = true;
  initHeroOnce();
  window.addEventListener('scroll', onScroll, { passive: true });
  bands.forEach(function (b) { b.op = -1; b.k = -1; });
  unpinFinalStates();
  updateCaptions(heroProgress());
  onScroll();
}
function disableScrub() {
  initStaticHero();
  if (!scrubOn) return; scrubOn = false;
  window.removeEventListener('scroll', onScroll);
  if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
  if (blobState === 'loading' && heroCtrl) { try { heroCtrl.abort(); } catch (e) {} }
}
function applyHeroMode() {
  if (MQLS.some(function (m) { return m.matches; })) disableScrub(); else enableScrub();
}
MQLS.forEach(function (m) { (m.addEventListener ? m.addEventListener('change', applyHeroMode) : m.addListener(applyHeroMode)); });

/* ============================================================
   7. REDUCED MOTION, LIVE, BOTH WAYS
   ============================================================ */
function pinToFinalStates() {
  $$('.sf').forEach(function (el) { el.style.setProperty('--sf', 1); el._sf = 1; });
  $$('.dc').forEach(function (s) { decodeSet(s, 1); });
  $$('.tilt').forEach(function (el) { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
  bands.forEach(function (b) { setGlass(b, 1); });
  $$('.slam').forEach(function (el) { el.classList.add('in'); });
  if (portraitV) { portraitV.pause(); }
  setFocus(1, true);
  $$('.fp-mark').forEach(function (m) { m.classList.add('lit'); });
  if (fadeRaf) { cancelAnimationFrame(fadeRaf); fadeRaf = null; }
  pinned = true;
}
function unpinFinalStates() {
  pinned = false;
  $$('.sf').forEach(function (el) { el._sf = -1; });
  $$('.dc').forEach(function (s) { if (!s.closest('.band')) { s._k = -1; s._played = false; } });
  onFade();
}
var pinned = false;
if (rmq.addEventListener) rmq.addEventListener('change', function (e) { if (e.matches) pinToFinalStates(); else applyHeroMode(); });

/* ============================================================
   8. THE SCROLL FADE (every text block, in and out)
   ============================================================ */
var sfEls = $$('.sf');
var fadeRaf = null;
function onFade() {
  if (fadeRaf !== null || pinned) return;
  fadeRaf = requestAnimationFrame(function () {
    fadeRaf = null;
    var vh = window.innerHeight;
    for (var i = 0; i < sfEls.length; i++) {
      var el = sfEls[i], r = el.getBoundingClientRect();
      if (r.bottom < -80 || r.top > vh + 80) { if (el._sf !== 0) { el._sf = 0; el.style.setProperty('--sf', 0); resetDecodes(el); } continue; }
      var inF  = smoothstep((vh - r.top) / (vh * 0.20), 0, 1);       /* rising through the bottom fifth */
      var outF = smoothstep(r.bottom / (vh * 0.14), 0, 1);           /* leaving through the top */
      var sf = Math.min(inF, outF);
      if (Math.abs(sf - (el._sf === undefined ? -1 : el._sf)) > 0.01) {
        el._sf = sf; el.style.setProperty('--sf', sf.toFixed(3));
        if (sf > 0.5) playDecodes(el);
      }
    }
    updateVfLabel();
  });
}
/* section headlines decode over time when they arrive, and re-arm when they
   leave the screen so the effect plays every time, in both directions */
function playDecodes(host) {
  var dcs = host.matches('.dc') ? [host] : $$('.dc', host);
  dcs.forEach(function (s) {
    if (s._played || s.closest('.band')) return;
    s._played = true;
    var t0 = null;
    (function step(now) {
      if (!t0) t0 = now;
      var k = clamp((now - t0) / 820, 0, 1);
      decodeSet(s, k);
      if (k < 1 && s._played) requestAnimationFrame(step);
    })(performance.now());
  });
}
function resetDecodes(host) {
  var dcs = host.matches('.dc') ? [host] : $$('.dc', host);
  dcs.forEach(function (s) { if (s.closest('.band')) return; s._played = false; decodeSet(s, 0); });
}

/* ============================================================
   9. TILT: the 3D interaction on cards, devices, players, the logo
   ============================================================ */
if (!coarse.matches && !rmq.matches) {
  $$('.tilt').forEach(function (el) {
    var max = +(el.getAttribute('data-tilt') || 8), raf = null, px = 0, py = 0;
    el.addEventListener('pointerenter', function () { el.classList.add('live'); });
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width - 0.5;
      py = (e.clientY - r.top) / r.height - 0.5;
      if (raf === null) raf = requestAnimationFrame(function () {
        raf = null;
        el.style.setProperty('--ry', (px * max * 2).toFixed(2) + 'deg');
        el.style.setProperty('--rx', (-py * max * 2).toFixed(2) + 'deg');
      });
    });
    el.addEventListener('pointerleave', function () {
      el.classList.remove('live');
      el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg');
    });
  });
}

/* ============================================================
   10. THE FILM PLAYERS: poster at rest, plays with sound on request,
       never autoplays, pauses when scrolled away, one at a time
   ============================================================ */
var players = $$('.player');
players.forEach(function (p) {
  var v = $('.player-v', p), btn = $('.play', p);
  btn.addEventListener('click', function () {
    players.forEach(function (o) { if (o !== p) { var ov = $('.player-v', o); ov.pause(); o.classList.remove('is-playing'); } });
    v.muted = false; v.controls = true;
    v.play().then(function () { p.classList.add('is-playing'); }).catch(function () {});
  });
  v.addEventListener('pause', function () { if (v.ended || v.currentTime === 0) p.classList.remove('is-playing'); });
  v.addEventListener('ended', function () { p.classList.remove('is-playing'); v.controls = false; v.load(); });
  if ('IntersectionObserver' in window) {
    p._io = new IntersectionObserver(function (es) { if (!es[es.length - 1].isIntersecting && !v.paused) v.pause(); }, { threshold: 0.2 });
    p._io.observe(p);
  }
});

/* ============================================================
   11. THE VIEWFINDER'S SECTION READOUT + NAV
   ============================================================ */
var vfIndex = $('#vfIndex'), vfLabel = $('#vfLabel'), vfEl = $('#vf'), vfZones = $$('[data-vf]'), lastVf = '';
function updateVfLabel() {
  var mid = window.innerHeight * 0.45, cur = null;
  for (var i = 0; i < vfZones.length; i++) { var r = vfZones[i].getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) { cur = vfZones[i]; break; } }
  var txt = cur ? cur.getAttribute('data-vf') : '00 / HERO';
  if (txt === lastVf) return;
  lastVf = txt;
  var parts = txt.split(' / ');
  vfIndex.textContent = parts[0]; vfLabel.textContent = parts[1] || '';
  vfEl.classList.add('is-lock');
  clearTimeout(updateVfLabel._t); updateVfLabel._t = setTimeout(function () { vfEl.classList.remove('is-lock'); }, 620);
}
var navEl = $('#nav'), lastStuck = null;
function onPageScroll() {
  var stuck = window.scrollY > 40;
  if (stuck !== lastStuck) { lastStuck = stuck; navEl.classList.toggle('is-stuck', stuck); }
  if (!scrubOn || !heroOnScreen) updateReadout(null);
  onFade();
  bgDrive();
}
window.addEventListener('scroll', onPageScroll, { passive: true });
window.addEventListener('resize', function () { lastVf = ''; sfEls.forEach(function (el) { el._sf = -1; }); placeArc(); onFade(); onScroll(); }, { passive: true });

/* one living element per section, paused off screen; everything paused on hidden tabs */
if ('IntersectionObserver' in window) {
  var aliveIO = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle('alive', e.isIntersecting); }); }, { rootMargin: '60px' });
  $$('.sec, .foot, .hero, .vf').forEach(function (el) { aliveIO.observe(el); });
}
document.addEventListener('visibilitychange', function () { document.body.classList.toggle('paused', document.hidden); });

/* ============================================================
   12. HOLD TO FOCUS
   ============================================================ */
var panel = $('#focusPanel'), hit = $('#fpHit'), fpLabel = $('#fpLabel'), marks = $$('.fp-mark');
var f = 0, holding = false, fRaf = null, fLast = 0, lockedIn = false;
function setFocus(v, force) {
  f = clamp(v, 0, 1);
  panel.style.setProperty('--f', f.toFixed(3));
  marks.forEach(function (m) { m.classList.toggle('lit', f >= +m.getAttribute('data-at')); });
  var want = (f >= 0.985 || lockedIn) ? 'In focus' : (holding ? 'Hold' : 'Press and hold');
  if (fpLabel.textContent !== want) fpLabel.textContent = want;
  if (f >= 0.985) lockedIn = true;
  if (force && fRaf) { cancelAnimationFrame(fRaf); fRaf = null; }
}
function fTick(now) {
  var dt = Math.min(100, now - (fLast || now)); fLast = now;
  var goal = (holding || lockedIn) ? 1 : 0, rate = holding ? 0.00085 : 0.0014;
  if (goal > f) f = Math.min(goal, f + dt * rate); else if (goal < f) f = Math.max(goal, f - dt * rate * 0.7);
  setFocus(f);
  if (Math.abs(goal - f) > 0.001) fRaf = requestAnimationFrame(fTick); else { fRaf = null; fLast = 0; }
}
function startHold(e) {
  if (rmq.matches) { setFocus(1, true); lockedIn = true; return; }
  if (e && e.cancelable) e.preventDefault();
  holding = true; fLast = 0; if (fRaf === null) fRaf = requestAnimationFrame(fTick);
}
function endHold() { holding = false; fLast = 0; if (fRaf === null) fRaf = requestAnimationFrame(fTick); }
if (hit) {
  hit.addEventListener('pointerdown', startHold);
  window.addEventListener('pointerup', endHold); window.addEventListener('pointercancel', endHold);
  hit.addEventListener('keydown', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); startHold(); } });
  hit.addEventListener('keyup', function (e) { if (e.key === ' ' || e.key === 'Enter') endHold(); });
  hit.addEventListener('blur', endHold);
}

/* ============================================================
   13. PRICING TOGGLE
   ============================================================ */
var tabs = $$('.tg'), pill = $('.tg-pill'), panels = { 'tab-web': $('#p-web'), 'tab-social': $('#p-social') };
function movePill(btn) { if (!pill || !btn) return; pill.style.setProperty('--pw', btn.offsetWidth + 'px'); pill.style.setProperty('--px', btn.offsetLeft - 4 + 'px'); }
tabs.forEach(function (btn) {
  btn.addEventListener('click', function () {
    tabs.forEach(function (b) {
      var on = b === btn; b.classList.toggle('is-on', on); b.setAttribute('aria-selected', on ? 'true' : 'false');
      var p = panels[b.id]; if (p) { p.classList.toggle('is-hidden', !on); if (on) p.removeAttribute('hidden'); else p.setAttribute('hidden', ''); }
    });
    movePill(btn);
    sfEls.forEach(function (el) { el._sf = -1; }); onFade();
  });
});
window.addEventListener('resize', function () { movePill($('.tg.is-on')); }, { passive: true });

/* ============================================================
   14. THE FORM
   ============================================================ */
var FORM_ENDPOINT = 'https://formspree.io/f/xjykwgjn';
var form = $('#form'), sent = $('#sent'), errEl = $('#formErr'), submitBtn = $('#submit');
function showErr(msg) { errEl.textContent = msg; errEl.hidden = false; }
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault(); errEl.hidden = true;
    var bad = [];
    $$('[required]', form).forEach(function (el) {
      var ok = el.value.trim() !== '' && (el.type !== 'email' || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value.trim()));
      el.classList.toggle('bad', !ok); if (!ok) bad.push(el);
    });
    if (bad.length) { showErr('A couple of fields still need filling in.'); bad[0].focus(); return; }
    submitBtn.disabled = true; submitBtn.textContent = 'Sending';
    fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form) })
      .then(function (res) { if (!res.ok) throw new Error('rejected'); form.hidden = true; sent.hidden = false; sent.scrollIntoView({ block: 'nearest', behavior: rmq.matches ? 'auto' : 'smooth' }); })
      .catch(function () { submitBtn.disabled = false; submitBtn.textContent = 'Send it ↗'; showErr('That did not go through. Email me directly at info@sharpframestudios.com and I will pick it up.'); });
  });
  $$('input, textarea', form).forEach(function (el) { el.addEventListener('input', function () { el.classList.remove('bad'); }); });
}

/* images that never arrived leave a designed surface, not a broken icon */
$$('img').forEach(function (img) {
  img.addEventListener('error', function () { img.classList.add('gone'); });
  if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) img.classList.add('gone');
});

/* ============================================================
   THE SETTLE: laid out around the resting ring. The ring sits at 49.6% /
   48.5% of the footage with a radius of 16.5% of the frame height, measured
   on the ending frame. Under object-fit cover the frame's centre is the
   viewport's centre, so the two text blocks are placed from those numbers.
   ============================================================ */
var settleBox = $('#settleBox'), settleBot = $('#settleBot');
function placeSettle() {
  if (!settleBox) return;
  var vw = window.innerWidth, vh = window.innerHeight;
  var rH = Math.max(vw * 1080 / 1920, vh);
  var cy = vh / 2 + (0.485 - 0.5) * rH, r = 0.165 * rH;
  var top = cy - r, bot = cy + r;
  /* the lower block must never run off the bottom of the screen */
  var need = settleBot ? settleBot.offsetHeight + 24 : 0;
  if (bot + need > vh) bot = Math.max(cy + r * 0.55, vh - need);
  settleBox.style.setProperty('--ringTop', top.toFixed(1) + 'px');
  settleBox.style.setProperty('--ringBot', bot.toFixed(1) + 'px');
}
function placeArc() { placeSettle(); }
function arcDecode() {}

/* ============================================================
   THE BACKGROUND FILM
   One long take fixed under the page, starting from the hero's resting ring.
   Forward it PLAYS, at a rate that grows with the distance to the current
   section's stop (one section step at 1x, a jump across the page at up to 4x),
   then pauses exactly on the stop. Backward it rewinds with real-time seeks
   at 24 a second, also 1x to 4x by distance. Every decision is made from the
   video's own current time, never from a counter, so a missed event can never
   leave it stranded, and a seek that never reports back is released by a
   watchdog. Continuous 60 Hz seeking on a long film is what froze it before.
   ============================================================ */
var bgV = $('#bgFilm'), bgZones = [], bgReady = false, bgRaf = null;
/* the picture: every new frame of the film is drawn onto a canvas (cover-fitted),
   so what the visitor sees never depends on the video element's own layer */
var bgC = $('#bgCanvas'), bgCtx = null, bgDrawT = -1, bgDirty = false, bgDrawRaf = null;
function bgSize() {
  if (!bgC) return;
  var d = Math.min(window.devicePixelRatio || 1, 1.5), w = Math.round(window.innerWidth * d), h = Math.round(window.innerHeight * d);
  if (bgC.width !== w || bgC.height !== h) { bgC.width = w; bgC.height = h; bgDirty = true; }
}
function bgDraw() {
  if (!bgV || !bgCtx || bgV.readyState < 2 || !bgV.videoWidth) return;
  var t = bgV.currentTime;
  if (!bgDirty && t === bgDrawT) return;
  var cw = bgC.width, ch = bgC.height, vw = bgV.videoWidth, vh = bgV.videoHeight;
  var s = Math.max(cw / vw, ch / vh), sw = cw / s, sh = ch / s;
  try { bgCtx.drawImage(bgV, (vw - sw) / 2, (vh - sh) / 2, sw, sh, 0, 0, cw, ch); bgDrawT = t; bgDirty = false; } catch (e) {}
}
function bgLoop() { bgDrawRaf = null; bgDraw(); if (bgDirty) bgDrawRaf = requestAnimationFrame(bgLoop); }
function bgKick() { if (bgDrawRaf === null) bgDrawRaf = requestAnimationFrame(bgLoop); }
var bgSeekBusy = false, bgPending = null, bgSeekWatch = null;
function bgSeek(t) {
  if (!bgV) return;
  if (bgSeekBusy) { bgPending = t; return; }
  if (Math.abs(bgV.currentTime - t) < 0.001) return;
  bgSeekBusy = true;
  clearTimeout(bgSeekWatch);
  bgSeekWatch = setTimeout(function () { bgSeekBusy = false; if (bgPending !== null) { var q = bgPending; bgPending = null; bgSeek(q); } }, 250);
  try { bgV.currentTime = t; } catch (e) { bgSeekBusy = false; }
}
function initBgFilm() {
  if (!bgV) return;
  bgZones = $$('[data-bgstop]').map(function (el) { return { el: el, t: +el.getAttribute('data-bgstop') }; });
  if (!bgZones.length || rmq.matches || MQLS.some(function (m) { return m.matches; })) { bgV.remove(); bgV = null; if (bgC) { bgC.remove(); bgC = null; } return; }
  bgCtx = bgC ? bgC.getContext('2d', { alpha: false }) : null;
  bgSize();
  window.addEventListener('resize', function () { bgSize(); bgKick(); }, { passive: true });
  bgV.addEventListener('seeked', function () { clearTimeout(bgSeekWatch); bgSeekBusy = false; bgDirty = true; bgKick(); if (bgPending !== null) { var t = bgPending; bgPending = null; bgSeek(t); } });
  bgV.addEventListener('error', function () { bgSeekBusy = false; bgPending = null; if (bgV) { bgV.remove(); bgV = null; } if (bgC) { bgC.remove(); bgC = null; } document.body.classList.remove('bg-on'); });
  function bgArm() {
    if (bgReady || !bgV) return; bgReady = true; bgOn = null; bgFull = null; bgV.pause(); bgDirty = true; bgKick(); bgDrive();
    if (coarse.matches) { var pp = bgV.play(); if (pp && pp.then) pp.then(function () { bgV.pause(); bgDirty = true; bgKick(); bgDrive(); }).catch(function () {}); }
  }
  bgV.addEventListener('loadeddata', bgArm);
  bgV.addEventListener('canplay', bgArm);
}
var bgFetched = false;
function startBgFetch() {
  if (bgFetched || !bgV) return; bgFetched = true;
  var ctrl = new AbortController(), watchdog = setTimeout(function () { ctrl.abort(); }, 30000);
  fetch('assets/bg-film.mp4', { signal: ctrl.signal }).then(function (res) {
    if (!res.ok || !res.body) throw new Error('no film');
    var reader = res.body.getReader(), chunks = [];
    return (function pump() { return reader.read().then(function (r) {
      if (r.done) return chunks;
      clearTimeout(watchdog); watchdog = setTimeout(function () { ctrl.abort(); }, 30000);
      chunks.push(r.value); return pump(); }); })();
  }).then(function (chunks) {
    clearTimeout(watchdog);
    if (!bgV) return;
    bgV.preload = 'auto';
    bgV.src = URL.createObjectURL(new Blob(chunks, { type: 'video/mp4' })); bgV.load();
  }).catch(function () { clearTimeout(watchdog); if (bgV) { bgV.remove(); bgV = null; } if (bgC) { bgC.remove(); bgC = null; } });
}
/* THE SCRUB. Like the hero: the scroll position IS the film's position. Each
   section's top reaching mid-viewport is an anchor at that section's stop time,
   the film runs from 0 under the portrait, and between anchors it interpolates,
   so scrolling back plays it back. The picture follows with a dt-normalised
   lerp and gated seeks, exactly the hero's loop. */
var bgOn = null, bgFull = null, bgTarget = 0, bgShown = 0, bgLast = 0;
function bgStopFor() {
  var vh = window.innerHeight, mid = vh * 0.5, inside = false, n = bgZones.length, i;
  var studio = $('#studio'), y0 = studio ? studio.getBoundingClientRect().top : -Infinity;
  var ys = new Array(n);
  for (i = 0; i < n; i++) { ys[i] = bgZones[i].el.getBoundingClientRect().top; if (ys[i] <= mid + 1) inside = true; }
  var on = y0 <= vh * 0.9;   /* the Studio section is coming up: the resting ring shows faintly */
  if (on !== bgOn) { bgOn = on; document.body.classList.toggle('bg-on', on && bgReady); }
  if (inside !== bgFull) { bgFull = inside; document.body.classList.toggle('bg-full', inside && bgReady); }
  /* anchors: (y0, 0), (ys[i], t[i]); find the span mid sits in */
  if (!n || mid <= y0) return 0;
  if (mid >= ys[n - 1]) return bgZones[n - 1].t;
  var pa = y0, ta = 0;
  for (i = 0; i < n; i++) {
    if (mid < ys[i]) { var span = ys[i] - pa; return span > 1 ? ta + (bgZones[i].t - ta) * ((mid - pa) / span) : bgZones[i].t; }
    pa = ys[i]; ta = bgZones[i].t;
  }
  return ta;
}
function bgDrive() {
  if (!bgV || !bgReady || !bgV.duration) return;
  bgTarget = Math.min(bgStopFor(), bgV.duration - 0.05);
  if (bgRaf === null) { bgLast = 0; bgRaf = requestAnimationFrame(bgTick); }
}
function bgTick(now) {
  var dt = Math.min(100, now - (bgLast || now)); bgLast = now;
  bgShown += (bgTarget - bgShown) * (1 - Math.pow(1 - 0.16, dt / 16.667));
  var settled = Math.abs(bgTarget - bgShown) < 0.004;
  if (settled) { bgShown = bgTarget; bgRaf = null; bgLast = 0; }
  else bgRaf = requestAnimationFrame(bgTick);
  bgSeek(bgShown);
}
document.addEventListener('visibilitychange', function () { if (bgV && bgReady && !document.hidden) bgDrive(); });

/* ============================================================
   THE CLOCK: live Sarasota time. Hours, minutes and seconds come from
   Intl.DateTimeFormat in America/New_York, so daylight saving is automatic;
   the milliseconds come from the clock itself. It runs on requestAnimationFrame
   only while the hero is on screen and the tab is visible, writes HH:MM:SS only
   when it changes, and the scrub loop fades it out over the first scroll.
   ============================================================ */
var clockEl = $('#clock'), clockHms = $('#clockHms'), clockMs = $('#clockMs'), clockBar = $('#clockBar');
var clockRaf = null, clockLastHms = '', clockFmt = null, clockOpacity = -1;
function initClock() {
  if (!clockEl) return;
  try { clockFmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'America/New_York', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }); }
  catch (e) { clockFmt = null; }
  clockStart();
}
function clockTick() {
  clockRaf = null;
  var now = new Date();
  var hms = clockFmt ? clockFmt.format(now).replace(/^24/, '00') : now.toTimeString().slice(0, 8);
  if (hms !== clockLastHms) { clockLastHms = hms; clockHms.textContent = hms; }
  var ms = now.getMilliseconds();
  clockMs.textContent = String(ms).padStart(3, '0');
  clockBar.style.setProperty('--ms', (ms / 999).toFixed(3));
  if (!document.hidden && heroOnScreen && clockOpacity !== 0) clockRaf = requestAnimationFrame(clockTick);
}
function clockStart() { if (clockEl && clockRaf === null) clockRaf = requestAnimationFrame(clockTick); }
function setClockFade(p) {
  if (!clockEl) return;
  var co = 1 - smoothstep(p, 0.005, 0.07);
  if (Math.abs(co - clockOpacity) < 0.01) return;
  var wasOff = clockOpacity === 0;
  clockOpacity = co;
  clockEl.style.setProperty('--co', co.toFixed(3));
  if (co > 0 && wasOff) clockStart();
}
document.addEventListener('visibilitychange', function () { if (!document.hidden) clockStart(); });

/* ============================================================
   16. SLAM: the process cards arrive one after another, and re-arm
       when they leave so the entrance plays again on the way back
   ============================================================ */
var slamIO = null;
function initSlam() {
  var els = $$('.slam');
  if (!els.length) return;
  if (!('IntersectionObserver' in window) || rmq.matches) { els.forEach(function (e) { e.classList.add('in'); }); return; }
  slamIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('in');
      else if (e.boundingClientRect.top > window.innerHeight * 0.5) e.target.classList.remove('in');   /* left below: re-arm */
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (e) { slamIO.observe(e); });
}

/* ============================================================
   17. THE PORTRAIT: a black-background film keyed live in WebGL so its
       darkness becomes the page and nothing has a hard edge. Inside a
       soft ellipse over the face the key is gentle (the glasses stay);
       outside it the key is strong (the shirt and the black dissolve).
   ============================================================ */
var portraitV = $('#portraitV'), portraitC = $('#portraitC'), portraitEl = $('#portrait'), portraitIO = null;
function initPortrait() {
  if (!portraitV || !portraitC) return;
  var gl = portraitC.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
  if (!gl) { portraitFallback(); return; }
  var vs = 'attribute vec2 p;varying vec2 v;void main(){v=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0.,1.);}';
  /* The monochrome key Adrian approved on sight. Do not change it. Inside a soft
     ellipse over the face the key is gentle (the ear, the beard and the glasses
     keep their dark detail); outside it the key is strong, so the shirt and the
     black background dissolve into the page. Premultiplied alpha output. */
  var fs = 'precision mediump float;uniform sampler2D t;uniform vec2 px;varying vec2 v;' +
    'void main(){vec4 c=texture2D(t,v);float l=dot(c.rgb,vec3(.299,.587,.114));' +
    'vec2 d=(v-vec2(.5,.42))/vec2(.30,.36);float m=1.-smoothstep(.75,1.25,length(d));' +
    'float lo=mix(.03,.0,m);float hi=mix(.34,.055,m);float a=smoothstep(lo,hi,l);' +
    'gl_FragColor=vec4(c.rgb*a,a);}';
  function sh(type, src) { var o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); return o; }
  var prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { portraitFallback(); return; }
  gl.useProgram(prog);
  var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  var pxLoc = gl.getUniformLocation(prog, 'px');
  var tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  var raf = null, onScreen = false, sized = false, shown = false, lastDraw = 0, fails = 0;
  function size() {
    var w = portraitV.videoWidth || 512, h = portraitV.videoHeight || 768;
    if (portraitC.width !== w) { portraitC.width = w; portraitC.height = h; gl.viewport(0, 0, w, h); }
    gl.uniform2f(pxLoc, 1 / w, 1 / h);
    sized = true;
  }
  function draw(now) {
    raf = null;
    if (!sized) size();
    /* the film is 24 fps: uploading more often than that is wasted work, and on
       a weak GPU it can starve the decoder */
    if (portraitV.readyState >= 2 && (!now || now - lastDraw >= 40)) {
      lastDraw = now || 0;
      try {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, portraitV);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        if (!shown) { shown = true; portraitEl.classList.add('is-on'); }
        fails = 0;
      } catch (e) {
        if (++fails >= 3) { stop(); portraitFallback(); return; }
      }
    }
    if (onScreen && !portraitV.paused) raf = requestAnimationFrame(draw);
  }
  function start() {
    if (rmq.matches) { portraitV.pause(); if (raf === null) raf = requestAnimationFrame(draw); return; }
    portraitV.play().catch(function () {});
    if (raf === null) raf = requestAnimationFrame(draw);
  }
  function stop() { portraitV.pause(); if (raf !== null) { cancelAnimationFrame(raf); raf = null; } }
  portraitV.addEventListener('loadeddata', function () { size(); if (onScreen) start(); else { raf = requestAnimationFrame(draw); } });
  portraitV.addEventListener('playing', function () { if (raf === null) raf = requestAnimationFrame(draw); });
  if ('IntersectionObserver' in window) {
    portraitIO = new IntersectionObserver(function (es) { onScreen = es[es.length - 1].isIntersecting; if (onScreen) start(); else stop(); }, { rootMargin: '120px' });
    portraitIO.observe(portraitEl);
  } else { onScreen = true; start(); }
  document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else if (onScreen) start(); });
  portraitV.load();
}
function portraitFallback() {
  /* no WebGL: show the film itself, screened so its black reads as the page */
  portraitC.style.display = 'none';
  portraitV.style.opacity = '1'; portraitV.style.mixBlendMode = 'screen';
  portraitEl.classList.add('is-on');
  if (!rmq.matches) portraitV.play().catch(function () {});
}

/* ============================================================
   15. GO
   ============================================================ */
function boot() {
  document.body.classList.add('ready');
  layoutAllGlass();
  setTimeout(layoutAllGlass, 900);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutAllGlass);
  initSlam();
  initPortrait();
  placeArc();
  initClock();
  initBgFilm();
  setTimeout(startBgFetch, 9000);   /* a hero that never reports canplay must not block the film */
  applyHeroMode();
  if (rmq.matches) pinToFinalStates();
  movePill($('.tg.is-on'));
  onPageScroll();
  onFade();
  updateVfLabel();
}
if (document.readyState === 'complete' || document.readyState === 'interactive') requestAnimationFrame(boot);
else document.addEventListener('DOMContentLoaded', function () { requestAnimationFrame(boot); });

})();
