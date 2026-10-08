(function(){"use strict";var ue=0,K=1,Pe=2,q=3,h={tiers:[{strands:2200,segments:80,points:450,dprCap:2,pixelCap:9e6,mirror:.5},{strands:1e3,segments:52,points:230,dprCap:2,pixelCap:3e6,mirror:0},{strands:520,segments:40,points:130,dprCap:1.5,pixelCap:2e6,mirror:0}],maxStrands:2600,shareCap:.25,width:.0076,minPx:1.35,widthLod:[.85,1.3],vortex:{twist:3.3,radius:.52,tube:.33,squash:1,wrap:3.4,wrapVar:1.7,treadTwist:.55,flare:.19,loose:.42,tufts:.45,tuftCount:29,spin:.035,uncurl:2},bundle:{amp:.4,k:1.15,radY:.4,radZ:.16,len:8.6,roll:.9,braid:.3,phase:-.3,sway:.3,speed:.25,locks:14,lockSpread:.8,lockRadius:.26},ring:{R:.7,r:.205,coil:2,squash:.95,loose:.06,weave:.2,sway:.5,spin:.11},rise:{height:1,depth:.5,curl:-.25,curlNarrow:.1,narrowPx:700,edge:14,clusters:[-.36,-.1,.14,.39],heights:[.9,.97,1,.93],clusterWidth:.2,steps:[.45,12],narrow:{clusters:[-.22,.24],heights:[.94,1],clusterWidth:.34,steps:[.22,9]},cardHeights:[.9,.97,1,.93],endInset:.17,foot:.5,footInset:18,tuckPad:34,still:{aspect:2.06,foot:.68,row:[-.488,-.165,.165,.488],gap:.014},stillNarrow:{aspect:.69,foot:.14}},stagger:.4,fan:.3,lift:.1,handover:{lead:.06,leave:["centre",.18,-.1],enter:["top",.95,.55]},bend:!1,exposure:.76,light:{key:.28,strips:4.8,fill:.45,room:.08,glint:.8,arms:[.25,.75,.45,.15],armSide:.3},shade:{depthFloor:.16,depthStart:.88,formFloor:.16,back:.6,strandVar:.25,darkShare:.05,open:.6},blue:[.02,.22,1],blueAmt:{tint:1,light:.6,sheen:.2,hot:2.4,reach:1.3,lean:.75,glare:.12,kick:.06,ring:1,bead:1.4,nodes:1,points:1,filament:.9},pulse:{rate:1.7,wave:.16},signal:{line:.5,step:.15,view:[.14,.82],loopRate:.045,filaments:.03,linePx:6.4,wander:[.035,.018,.14],wanderLoop:[.012,.006,.05]},floor:{shadow:.3,pool:.3,mirror:.3,squash:.36,reach:.42},smooth:.16,minBlend:.35,slowMs:40,warmup:20,window:40,cooldown:60,fastMs:22,calm:480,retries:2,stillRetryMs:2e4,idleEvery:2,lostWaitMs:4e3,states:{hero:{shape:ue,rot:[24,-8,0],fit:{mode:"contain",w:1.75,h:1.75},hold:.08,core:1,signal:0,grow:0,points:1,floor:[-.88,.7,1],frame:[-1.12,-1.36,1.12,1.1],stillPx:350,extent:[1.12,1.12,1.36,1.12]},flow:{shape:K,rot:[8,4,-4],fit:{mode:"band",h:1.75,cover:.38},hold:.3,core:0,signal:1,grow:0,points:.55,pointSize:1.5,thick:2,gain:1.25,arms:[.65,1,.5,.22],sigWidth:.12,leave:["centre",.19,-.05],frame:[-3.2,-1.1,3.2,1],stillPx:250,extent:[9,9,1.3,1.2]},loop:{shape:Pe,rot:[24,12,0],fit:{mode:"contain",w:1.7,h:1.7},hold:.22,core:0,signal:.9,grow:0,points:.13,pointSize:1.8,thick:1.5,gain:1.1,sigWidth:.16,line:.5,floor:[-.9,.74,1,0],enter:["top",.72,.42],frame:[-1.14,-1.14,1.14,1.14],stillPx:330,extent:[1.2,1.2,1.2,1.2]},rise:{shape:q,rot:[0,4,0],fit:{mode:"fill"},core:0,signal:0,grow:1,points:1,pointSize:2,strandPx:8.5,gain:1,share:.09,leave:["box",-.05,-1.15],frame:null,stillPx:260,extent:[9,9,2,1.1]},close:{shape:ue,rot:[27,-13,0],fit:{mode:"contain",w:1.5,h:1.5},core:1,signal:0,grow:0,points:1,gain:.78,thick:1.3,floor:[-.88,.7,1,0],enter:["centre",1.25,.72],frame:[-1.12,-1.13,1.12,1.1],stillPx:300,extent:[1.12,1.12,1.15,1.12]}}},ct=28,re=1/Math.tan(ct*Math.PI/360),_e=`
uniform float uTime, uMix, uStag, uFan, uGrow, uLift, uMode, uUncurl, uCurlIn;
uniform int uShA, uShB;
uniform vec4 uVx, uVx2, uVx3, uBd, uBd2, uBd3, uRg, uRg2, uRs, uCl, uClH;
uniform vec4 uFoot;                  /* rising strands: how far below their box the feet stand, 1 = feet tucked behind the cards, how far aside (clusters in a gap | at the row's ends) */
uniform vec4 uHand;                  /* a hand-over: how much of the first shape is left, how much of the second has grown, where the strands both states draw are (0 | 1), how much of those shows */
uniform vec2 uClN, uShareS, uStep;
const float TAU = 6.28318530718;
const float PI = 3.14159265359;
const float CAM_D = `+re.toFixed(6)+`;
/* what curve() found out about the strand on the way: how far it is from the pure shape being worked out
   (gTail: the same, but never less than the whole change has got),
   how much of a rising strand stands, whether it belongs to the second state (its weight, and its place on
   the page when the two states are drawn each in their own place), how much of it is drawn, how much its
   two ends are thinned, how much of its turn a strand of the loop still covers, how much of the strand shows at
   all, how much its cut ends glow, where it is along the band while the band bends, and how much of its width a
   strand of a band that thins out still has */
float gAway, gTail, gGrow, gSel, gSecond, gKeep, gEnds, gTurn, gShare, gCut, gBand, gThin;

/* Each shape gives a point p of the strand s at t (0..1 along it) and nb: where the strand lies in the body
   it belongs to (xyz, about -1..1 from the body's own centre line; w = 1 where it flies free of the body).
   A seed with s.y < 0 asks for the centre line itself: the light markers ride it. */

/* the core: strands leave the mouth, swirl over the front of a thick ring and on round its rim;
   nearly half of them leave the body at the rim and end as a brush of fine tips */
void shVortex(vec4 s, float t, out vec3 p, out vec4 nb) {
  float cen = step(0.0, s.y);
  /* fewer strands end in the open near the foot of the body: it stands on the floor combed, not fringed */
  float foot = 0.5 - 0.5 * sin(TAU * s.x + uVx.x * 0.86 + uTime * uVx2.w - 0.35);
  float lim = 1.0 - uVx2.y * (1.0 - 0.85 * foot * foot);
  float loose = smoothstep(lim - 0.02, lim + 0.02, s.w) * cen;
  float lay = (0.40 + 0.60 * max(s.y, 0.0)) * cen;
  float psiEnd = mix(uVx2.z + uVx3.y * s.z, 2.35 + 0.55 * s.z, loose);
  psiEnd = mix(psiEnd, min(psiEnd, uUncurl), smoothstep(0.0, 0.35, gTail));     /* strands let go of the body's back before they leave for another shape: no hooks uncurl later */
  float pe = (psiEnd + 0.55) * pow(t, 0.9);              /* way round the tube, from the start inside the mouth */
  float psi = pe - 0.55;
  float a0 = TAU * s.x;
  a0 += uVx3.z * sin(a0 * uVx3.w + 1.7) / uVx3.w;         /* strands gather in tufts */
  float th = a0 + uVx.x * pow(min(pe, 3.69) / 3.69, 0.72) * (0.92 + 0.16 * s.w) + uVx3.x * max(0.0, pe - 3.69)
           + 0.012 * sin(t * 23.0 + TAU * s.z * 5.0) + uTime * uVx2.w;
  float fl = smoothstep(0.56, 1.0, t); fl *= fl * loose;
  lay = mix(lay, 1.0, fl * cen);                          /* a strand that ends at the rim comes up through the others to end in the open */
  float a = uVx.z * lay * (1.0 + 0.035 * sin(t * 17.0 + TAU * s.w * 3.0));
  float fly = 0.5 + 0.6 * s.z;                            /* tips of different lengths, none far from the body */
  float reach = uVx2.x * fl * fly * (0.62 + 0.38 * sin(th - 0.35));       /* the brush is longest at the top and shortest where the body stands on the floor */
  float r = uVx.y - a * cos(psi) + reach;
  float z = a * uVx.w * sin(psi) + reach * (s.y - 0.30) * 0.5;
  r *= 1.0 + 0.010 * sin(uTime * 0.9 + TAU * s.z);
  float c = cos(th), sn = sin(th);
  p = vec3(r * c, r * sn, z);
  nb = vec4(lay * vec3(-cos(psi) * c, -cos(psi) * sn, sin(psi)), fl);
}

/* the bundle: locks of strands round a waving centre line, the whole band rolling like a ribbon.
   bdWave: height, slope and depth of the centre line at x; bdSection: a strand's place in the cross-section */
vec3 bdWave(float x) {
  float ph = uBd2.w, k = uBd.y;
  return vec3(uBd.x * (sin(k * x + ph) + 0.35 * sin(2.1 * k * x - 1.3 + 0.7 * ph)),
              uBd.x * k * (cos(k * x + ph) + 0.735 * cos(2.1 * k * x - 1.3 + 0.7 * ph)),
              0.5 * uBd.x * cos(0.8 * k * x + 0.4 + 0.6 * ph));
}
void bdSection(vec4 s, float x, out vec2 os, out vec2 on, out float free) {
  float cen = step(0.0, s.y), ph = uBd2.w;
  float lf = s.x * uBd3.x, li = floor(lf);
  float h1 = fract(li * 0.6180339 + 0.37), h2 = fract(li * 0.7548777 + 0.11);
  float la = TAU * h1 + uBd2.z * x * (0.5 + h2) + 0.45 * sin(0.6 * x + TAU * h2 + 0.3 * ph);
  float lr = uBd3.y * sqrt(h2) * (1.0 + 0.20 * sin(0.9 * x + TAU * h1 + 0.2 * ph));
  float phi = TAU * (fract(lf) * 3.0 + s.w) + 0.40 * x * (s.w - 0.5) + 0.30 * sin(1.1 * x + TAU * s.w);
  float loose = step(0.94, s.w);
  float rho = uBd3.z * sqrt(max(s.y, 0.0)) * (1.0 + 0.22 * sin(1.3 * x + 2.0 + TAU * h1))
            + loose * 0.30 * (0.5 + 0.5 * sin(0.8 * x + TAU * s.z));
  vec2 lcv = lr * vec2(cos(la), sin(la)), rv = rho * vec2(cos(phi), sin(phi));
  vec2 o = (lcv + rv) * cen;
  float psi = uBd2.y * sin(0.9 * x + 0.25 * ph + 1.0);
  float cp = cos(psi), sp = sin(psi);
  os = vec2(o.x * uBd.z, o.y * uBd.w);
  os = vec2(os.x * cp - os.y * sp, os.x * sp + os.y * cp);
  on = vec2(o.x / uBd.z, o.y / uBd.w);                                     /* the band's own surface there: flat, so most of it faces one way and turns as the band rolls */
  on = vec2(on.x * cp - on.y * sp, on.x * sp + on.y * cp);
  /* a flat band shows most of its strands: whole locks lie a little deeper or nearer (stripes along the band),
     and the middle of a lock lies deeper than its outside */
  float skin = (0.66 + 0.185 * fract(h1 * 5.3 + 0.21) + 0.175 * min(0.34 * length(lcv) / uBd3.y + 0.72 * length(rv) / uBd3.z, 1.1)) * cen;
  on = on / max(length(on), 0.001) * skin;
  free = loose * 0.5;
}
void shBundle(vec4 s, float t, out vec3 p, out vec4 nb) {
  float x = (t - 0.5) * uBd2.x + (s.z - 0.5) * 0.7 * step(0.0, s.y);
  vec3 wv = bdWave(x); vec2 os, on; float free;
  bdSection(s, x, os, on, free);
  vec2 nr = normalize(vec2(-wv.y, 1.0));
  p = vec3(x + nr.x * os.x, wv.x + nr.y * os.x, wv.z + os.y);
  nb = vec4(nr.x * on.x, nr.y * on.x, on.y, free);
}

/* the loop: every strand is one closed turn of a rope laid in a ring.
   rgSection: a strand's place in the rope's cross-section (x away from the ring's centre, y towards the viewer) */
void rgSection(vec4 s, float Th, out vec2 o, out vec2 on, out float free) {
  float loose = step(0.90, s.w);
  float phi = TAU * s.x + uRg.z * Th + uRg2.z * sin(3.0 * Th + TAU * s.w);
  float rho = sqrt(max(s.y, 0.0)) * (1.0 + 0.04 * sin(2.0 * Th + uTime * 0.5))
            * (1.0 + loose * uRg2.x * (0.5 + 0.5 * sin(Th + TAU * s.z)))
            * mix(0.2, 1.0, smoothstep(0.0, 0.5, gTurn));                    /* the last of a loop that draws back is a thin rope, not a lump */
  o = uRg.y * rho * vec2(cos(phi), sin(phi) * uRg.w);
  float lie = 0.80 + 0.20 * fract(s.w * 7.13 + s.z * 3.7);                  /* cables lie at different depths in the rope: dark gaps between the bright ones */
  on = min(rho, 1.0) * lie * vec2(cos(phi), sin(phi));
  free = loose * 0.3;
}
/* gTurn < 1: the loop is drawing back. It opens at the top and both ends run down to the point it stands on;
   on the way every strand slides along itself until all of them start at the opening. */
float ease(float x) { x = clamp(x, 0.0, 1.0); return x * x * (3.0 - 2.0 * x); }
void shRing(vec4 s, float t, out vec3 p, out vec4 nb) {
  float o0 = TAU * s.z + uRg2.y, o1 = 0.5 * PI + TAU * floor((o0 - 0.5 * PI) / TAU + 0.5);
  float Th = mix(o0, o1, ease((1.0 - gTurn) / 0.4)) + PI + TAU * (t - 0.5) * gTurn;
  vec2 o, on; float free;
  rgSection(s, Th, o, on, free);
  float c = cos(Th), sn = sin(Th), R = uRg.x + o.x;
  p = vec3(R * c, R * sn, o.y);
  nb = vec4(on.x * c, on.x * sn, on.y, free);
}

/* bundle to loop and back, e = 0..1: the band's centre line is an arc of e turns that shortens to the loop's
   length, so the band bends round until its ends meet; the wave dies away and the cross-section turns from the
   band's into the rope's. Every strand stays on a designed curve all the way. */
void shBend(vec4 s, float t, float e, out vec3 p, out vec4 nb) {
  float cen = step(0.0, s.y), Lr = TAU * uRg.x;
  float L = mix(uBd2.x, Lr, smoothstep(0.0, 0.55, e));          /* the band is short before it is round: the half-closed hoop fits the window */
  float own = (s.z - 0.5) * mix(0.7 * cen, Lr, e);
  float u = (t - 0.5) * L + own + e * uRg.x * (0.25 * TAU + uRg2.y);
  gBand = t + own / L;
  float kap = TAU * e / L, a = kap * u;
  float sx = abs(a) < 0.002 ? u : sin(a) / kap;
  float cy = abs(a) < 0.002 ? 0.5 * a * u : (1.0 - cos(a)) / kap;
  vec2 tg = vec2(cos(a), sin(a)), nm = vec2(-tg.y, tg.x);
  vec3 wv = bdWave(u) * ((1.0 - e) * (1.0 - e));
  vec2 os, on, o2, on2; float fr, fr2;
  bdSection(s, u, os, on, fr);
  rgSection(s, TAU * (t + s.z) + uRg2.y, o2, on2, fr2);
  vec2 cs = mix(os, vec2(-o2.x, o2.y), e), cn = mix(on, vec2(-on2.x, on2.y), e);
  vec2 nr = normalize(vec2(-wv.y, 1.0));
  vec2 nw = tg * nr.x + nm * nr.y;
  p = vec3(vec2(sx, cy - uRg.x * e) + nm * wv.x + nw * cs.x, wv.z + cs.y);
  nb = vec4(nw * cn.x, cn.y, mix(fr, fr2, e));
}

/* rising strands: clusters standing behind the cards, tops stepping down to the right. The feet stand below the
   box (uFoot.x) and sweep aside over their lowest part: behind a card when the page names the cards (away from the
   gap a cluster stands in, inwards from the two ends of the row), so that no lower end shows anywhere */
void shRise(vec4 s, float t, out vec3 p, out vec4 nb) {
  float kf = s.x * uClN.x, kc = min(floor(kf), uClN.x - 1.0), u = kf - kc;
  float c = kc < 0.5 ? uCl.x : (kc < 1.5 ? uCl.y : (kc < 2.5 ? uCl.z : uCl.w));
  float ht = kc < 0.5 ? uClH.x : (kc < 1.5 ? uClH.y : (kc < 2.5 ? uClH.z : uClH.w));
  float off = (u - 0.5) * uClN.y * uRs.x, x = c * uRs.x + off;
  float stepped = floor((1.0 - u) * uStep.y + s.w * 0.9) / uStep.y;         /* tops in steps, tallest on the left */
  float top = -1.0 + 2.0 * uRs.y * ht * (1.0 - uStep.x * (1.0 - stepped)) * (0.975 + 0.05 * s.z);
  float y0 = -1.0 - uFoot.x;
  float y = mix(y0, mix(y0 + 0.12, top, gGrow), t);
  float low = 1.0 - t;
  float z = (s.y - 0.5) * uRs.z + 0.2 * low * low * (s.w - 0.5);
  float v = 1.0 - clamp((y - y0) / max(uFoot.x + 0.25, 0.12), 0.0, 1.0);    /* a post that sinks keeps its foot where it is */
  float sweep = v * v * v * (1.0 - smoothstep(0.0, 0.30, gAway));           /* the feet straighten before the strands leave */
  bool first = kc < 0.5, last = kc > uClN.x - 1.5;
  if (uFoot.y > 0.5) {
    float dir = first ? 1.0 : (last ? -1.0 : (off < 0.0 ? -1.0 : 1.0));
    float xf = c * uRs.x + dir * ((first || last ? uFoot.w : uFoot.z) + abs(off) * 0.75 + 0.10 * s.z);
    x = mix(x, xf, sweep);
  } else {
    float side = first ? -1.0 : (last ? 1.0 : sign(u - 0.5 + (s.z - 0.5) * 0.6));
    x += (first || last ? uRs.w : uCurlIn) * sweep * side * (0.4 + s.z);
  }
  x += 0.006 * t * sin(4.0 * t + uTime * 0.8 + TAU * s.z);
  p = vec3(vec2(x, y) * (1.0 - z / CAM_D), z);                               /* a strand stands where the page needs it, however near it is: tops and feet stay put */
  nb = vec4(normalize(vec3((u - 0.5) * 0.9, 0.0, 1.0)) * (0.925 + 0.075 * max(s.y, 0.0)), 0.0);     /* a thin wall of strands: all of it is skin */
}

void shape(int id, vec4 s, float t, out vec3 p, out vec4 nb) {
  if (id == 0) shVortex(s, t, p, nb);
  else if (id == 1) shBundle(s, t, p, nb);
  else if (id == 2) shRing(s, t, p, nb);
  else shRise(s, t, p, nb);
}
/* draw only a part of a strand: a post stands lower, the loop opens and both its ends run down, the band keeps
   its length and its place and every strand of it runs out thin, any other strand keeps its first part */
void part(int id, vec4 s, float t, float keep, out vec3 p, out vec4 nb) {
  gKeep = keep;
  if (id == 3) { gGrow = keep; shape(id, s, t, p, nb); return; }
  if (id == 1) { gThin = keep * keep * (3.0 - 2.0 * keep); shape(id, s, t, p, nb); return; }
  gEnds = 1.0 - smoothstep(0.85, 1.0, keep);
  if (id == 2) { gTurn = keep; gCut = gEnds; shape(id, s, t, p, nb); }
  else shape(id, s, t * keep, p, nb);
}
/* how much of one strand is there when k of its shape is: posts rise and sink from the left; the loop's skin draws
   back a little ahead of its heart, so its two ends are rounded; the band thins out strand after strand (each has
   its own turn, so the band gets sparse before it is gone); a core winds out of its mouth with a ragged rim */
float partOf(int id, float k, vec4 s) {
  if (id == 3) return ease(k * 1.6 - 0.6 * s.x);
  if (id == 2) return clamp(k * 1.10 - 0.10 * max(s.y, 0.0), 0.0, 1.0);
  if (id == 1) return clamp(k * 2.6 - 1.6 * fract(s.w * 7.13 + s.z * 3.7), 0.0, 1.0);
  return ease(k * 1.25 - 0.25 * s.z);
}
/* each strand has its own slice of a change of shape, ordered by its angle: the form opens like a fan.
   The last to leave lie under the band, not on its crest. */
float wmix(vec4 s) { return ease(uMix * (1.0 + uStag) - uStag * fract(s.x + uFan)); }
/* a state may draw only a share of the strands (thick strands need fewer) */
float pick(vec4 s) { return fract(s.z * 7.31 + s.w * 3.77); }
/* how much the strand belongs to the second state */
float wsel(vec4 s) {
  if (uMix <= 0.0) return 0.0;
  if (uMix >= 1.0) return 1.0;
  if (uMode > 1.5) { float h = pick(s); return h < uShareS.x ? (h < uShareS.y ? uHand.z : 0.0) : 1.0; }
  if (uMode > 0.5) return uMix;
  return wmix(s);
}
void curve(vec4 s, float ta, float tb, out vec3 p, out vec4 nb) {
  gAway = 0.0; gTail = 0.0; gGrow = uGrow; gSel = 0.0; gSecond = 0.0; gKeep = 1.0; gEnds = 0.0; gTurn = 1.0; gShare = 1.0; gCut = 0.0; gBand = 0.0; gThin = 1.0;
  if (uMix <= 0.0) { shape(uShA, s, ta, p, nb); return; }
  if (uMix >= 1.0) { gSel = 1.0; shape(uShB, s, tb, p, nb); return; }
  if (uMode > 1.5) {
    /* a hand-over: the first shape draws back along itself where it stands while the second grows where it
       stands. A strand that both states draw leaves the one before it joins the other. */
    float h = pick(s);
    bool inA = h < uShareS.x, inB = h < uShareS.y;
    gShare = inA && inB ? uHand.w : (inA || inB ? 1.0 : 0.0);
    if (inA && !(inB && uHand.z > 0.5)) part(uShA, s, ta, partOf(uShA, uHand.x, s), p, nb);
    else { gSel = 1.0; gSecond = 1.0; part(uShB, s, tb, partOf(uShB, uHand.y, s), p, nb); }
    return;
  }
  if (uMode > 0.5) {                                     /* the band bends into the loop */
    gSel = uMix; gEnds = sin(PI * uMix);
    shBend(s, mix(ta, tb, uMix), uShA == 1 ? uMix : 1.0 - uMix, p, nb);
    return;
  }
  vec3 pa, pb; vec4 na, nc;
  float w = wmix(s);
  gAway = w; gTail = max(w, uMix); shape(uShA, s, ta, pa, na);
  gAway = 1.0 - w; gTail = max(gAway, 1.0 - uMix); shape(uShB, s, tb, pb, nc);
  p = mix(pa, pb, w); nb = mix(na, nc, w);
  float swing = sin(PI * w);
  p += vec3(nb.xy, nb.z + 0.6) * (uLift * swing * step(0.0, s.y));
  nb.w = max(nb.w, max(swing * 0.7, 0.5 * sin(PI * uMix)));              /* a form that has opened has no dark inside: all of it is lit as in the open */
  gSel = w; gEnds = swing;
}
/* how much of the strand's width is drawn: a strand outside a state's share thins away to nothing */
float strandOn(vec4 s) {
  if (uMode > 1.5) return gShare;
  float h = pick(s);
  return mix(step(h, uShareS.x), step(h, uShareS.y), smoothstep(0.08, 0.60, gSel));
}
/* where the signal is measured along a strand: along the bundle's length, round the loop's circle */
float sco(int id, vec4 s, float t) {
  if (id == 1) return t + (s.z - 0.5) * 0.7 * step(0.0, s.y) / uBd2.x;
  if (id == 2) return fract(t + s.z);
  return t;
}
`,dt=`#version 300 es
precision highp float;
layout(location=0) in vec2 aIV;      /* index along the strand, side -1 | 1 */
layout(location=1) in vec4 aSeed;    /* a (angle order), b (layer), c, d */
uniform mat4 uView, uViewB, uProj;
uniform vec4 uStage, uStageB;        /* NDC scale x, y, NDC shift x, y: the first state's place, the second's */
uniform float uSeg, uWidth, uMinPx, uCamD;
uniform vec2 uPxUnit;                /* per state A | B: device pixels per unit */
uniform vec2 uWMul, uTip, uCap;      /* per state A | B: width factor, tip taper, rounded end */
uniform vec2 uExposure;              /* per state A | B: brightness of the metal */
uniform float uCore, uPulse, uWave;
uniform vec3 uReach;                 /* how far the ring's light reaches, how much further downwards, the glare under the ring */
uniform float uSignal, uSigHead, uSigPos, uSigWidth, uSigWrap, uFil;
uniform vec2 uLitSide;               /* when two objects are on the page: which one the ring's light belongs to, which one the signal (-1 = both) */
uniform vec4 uStT, uStOn;
uniform vec2 uVar;                   /* strand to strand brightness spread, share of dark strands */
uniform vec4 uMirror;                /* the reflection pass: strength (0 = the object itself), floor line, how flat, how far it reaches */
uniform float uMirSide;              /* which state's strands the reflection shows when both are on the page (-1 = all) */
`+_e+`
out float vV; out float vBlue; out float vHot; out float vPx; out float vShade; out float vEnd; out float vFree; out float vKick; out float vMir; out float vExp;
out vec3 vTv; out vec3 vPv; out vec3 vNb; out vec3 vTP;
flat out float vSecond;              /* 1 = a strand of the second object of a hand-over */
void main() {
  float t = aIV.x / uSeg;
  vec4 s = aSeed;
  vec3 p, q; vec4 nb, nq;
  curve(s, t + 0.006, t + 0.006, q, nq);
  curve(s, t, t, p, nb);
  float w = gSel;
  bool second = gSecond > 0.5;
  mat4 V = second ? uViewB : uView;
  vec3 pv = (V * vec4(p, 1.0)).xyz;
  vec3 along = mat3(V) * (q - p);
  vec3 tv = normalize(along + vec3(1e-7, 0.0, 0.0));
  vec3 vd = normalize(-pv);
  vec3 side = normalize(cross(tv, vd));
  float wm = mix(uWMul.x, uWMul.y, w);
  /* during a change both ends of a strand run out thin: a longer piece while the band bends (its two ends meet in a seam),
     and in a blend all of them for as long as the form is open, not only while a strand is on its own way */
  bool bend = uMode > 0.5 && uMode < 1.5;
  float taper = bend ? 0.22 : 0.10;
  /* in a blend the inner end is the hook a strand has in the core's mouth: there it runs out over a long piece */
  float ends = (uMode < 0.5 ? smoothstep(0.04, 0.30, t) : smoothstep(0.0, taper, t)) * smoothstep(1.0, 1.0 - taper, t);
  float thin = gEnds;
  if (uMode < 0.5 && uMix > 0.0 && uMix < 1.0) thin = max(thin, smoothstep(0.08, 0.25, uMix) * (1.0 - smoothstep(0.75, 0.95, uMix)));
  float wd = uWidth * wm * (0.78 + 0.44 * s.w) * mix(1.0, mix(uTip.x, uTip.y, w), smoothstep(0.80, 1.0, t));
  float ppu = (second ? uPxUnit.y : uPxUnit.x) * uCamD / max(0.01, -pv.z);
  /* an end that runs out thin runs out to nothing (the least width does not hold it); the last of a strand that draws back is thin (a thick post earlier) */
  float hw = 0.5 * max(wd, uMinPx / ppu) * mix(1.0, ends, thin) * smoothstep(0.0, wm > 2.5 ? 0.30 : 0.12, gKeep) * gThin * strandOn(s);
  if (uMirror.x > 0.0 && uMirSide >= 0.0 && abs(gSecond - uMirSide) > 0.5) hw = 0.0;
  vEnd = mix(9.0, (1.0 - t) * (length(q - p) / 0.006) / max(hw, 1e-6), mix(uCap.x, uCap.y, w));
  pv += side * aIV.y * hw;
  vec4 c = uProj * vec4(pv, 1.0);
  c.z -= (s.y * 0.7 + s.w * 0.3 - 0.5) * 0.004 * c.w * max(1.0, wm);        /* flat ribbons would cut through each other in chips: each strand has its own depth slot, wider for thick strands */
  vMir = 0.0;
  if (uMirror.x > 0.0) {                                                    /* mirrored about the floor line and pressed flat */
    vMir = (c.y / c.w - uMirror.y) * uMirror.z;
    c.y = (uMirror.y - vMir) * c.w;
  }
  vec4 stg = second ? uStageB : uStage;
  c.xy = c.xy * stg.xy + stg.zw * c.w;
  gl_Position = c;
  vV = aIV.y; vTv = tv; vPv = pv; vPx = 2.0 * hw * ppu; vExp = mix(uExposure.x, uExposure.y, w); vSecond = gSecond;
  vNb = mat3(V) * nb.xyz; vFree = nb.w;
  float hs = fract(sin(s.z * 91.345 + s.w * 47.853) * 43758.5453);
  vShade = (1.0 - uVar.x * 0.5 + uVar.x * hs) * mix(1.0, 0.46, step(1.0 - uVar.y, fract(hs * 7.31)));

  /* blue. The core: the ring's light runs out along the strands that leave the mouth, each carrying it
     its own distance, and a pulse travels outwards. */
  float hb = fract(s.z * 5.17 + s.w * 3.31);
  float lean = pow(clamp(0.5 + 0.5 * dot(p.xy / max(length(p.xy), 1e-4), vec2(0.26, -0.97)), 0.0, 1.0), 1.5);        /* the light falls further downwards */
  float out_ = max(0.0, length(p.xy) - (uVx.y - uVx.z)) / (uReach.x * mix(1.0 - 0.4 * uReach.y, 1.0 + 0.6 * uReach.y, lean));       /* distance from the mouth */
  float near = smoothstep(0.10, 0.80, exp(-out_ * out_ / 0.055));
  float carry = max(near, 0.9 * step(0.93, hb) * exp(-out_ * 2.2));     /* full blue near the ring, then gone; a few strands carry it far */
  float wave = 0.42 * exp(-pow((t - fract(uTime * uWave)) / 0.045, 2.0)) * (1.0 - t) * (1.0 - t);
  float coreAmt = uCore * (uLitSide.x < 0.0 ? 1.0 : 1.0 - abs(gSecond - uLitSide.x));
  float core = coreAmt * (carry * (0.88 + 0.12 * uPulse) + wave);
  /* the signal: a wash round its place, a trail behind it on the strands that carry it, the stations.
     uSigHead: how much of what belongs to the signal's own place shows (the line of light and its carriers stay) */
  float sig = bend ? mix(gBand, fract(gBand + 0.5), uSigWrap) : mix(sco(uShA, s, t), sco(uShB, s, t), w);
  float d = sig - uSigPos;
  d = mix(d, fract(d + 0.5) - 0.5, uSigWrap);
  float hc = fract(s.z * 13.7 + s.w * 7.3);
  float carrier = step(0.90, hc), fil = step(1.0 - uFil, hc);
  float sg = uSigHead * exp(-d * d / (uSigWidth * uSigWidth)) * (0.50 + 0.50 * carrier) + 0.04 * carrier;
  float trail = uSigHead * carrier * 0.12 * smoothstep(0.02, -0.40, d) * step(d, 0.02) * (1.0 - uSigWrap);
  vec4 ds = (vec4(sig) - uStT) / 0.028;
  float stn = dot(uStOn, exp(-ds * ds)) * 0.2;
  float signal = uSignal * (uLitSide.y < 0.0 ? 1.0 : 1.0 - abs(gSecond - uLitSide.y));
  /* a loop that draws back carries the signal's light on its two ends */
  float cut = 0.85 * gCut * (exp(-t * t / 0.003) + exp(-(1.0 - t) * (1.0 - t) / 0.003));
  vHot = signal * fil * (0.55 + 0.45 * uSigHead * exp(-d * d / 0.0256)) + 0.10 * cut
       + coreAmt * (exp(-t * 26.0) * 0.9 + uReach.z * lean * near * near);     /* white-blue in the mouth and in the glare below the ring */
  vBlue = clamp(core + signal * (sg + trail + fil * 0.6 + stn) + cut, 0.0, 1.0);
  vKick = coreAmt; vTP = vec3(t, hs, clamp((wm - 1.5) / 1.5, 0.0, 1.0));       /* place along the strand, its own random number, how much of a thick tube it is */
}`,jt=`#version 300 es
precision highp float;
in float vV; in float vBlue; in float vHot; in float vPx; in float vShade; in float vEnd; in float vFree; in float vKick; in float vMir; in float vExp;
in vec3 vTv; in vec3 vPv; in vec3 vNb; in vec3 vTP;
flat in float vSecond;
uniform float uGlint, uKick, uArmSide;
uniform vec4 uLight;                 /* key, strips, fill, room */
uniform vec4 uArms;                  /* the four strip lights */
uniform vec4 uShade;                 /* depth floor, depth start, form floor, back of the body */
uniform vec2 uShadeB;                /* depth floor and back of the body for the second object of a hand-over: each has its own */
uniform vec3 uBlue;
uniform vec4 uBlueAmt;               /* tint, light, hot, sheen */
uniform vec4 uMirror;
out vec4 o;
/* A thin mirror cylinder shows a light where its tangent is square to the half vector, so neighbours that run
   the same way light up together: that is what gives a body of strands its bright and dark sectors. The body's
   own surface (nm) decides which lights reach that part of it at all. */
float lamp(vec3 T, vec3 V, vec3 nm, vec3 L, float k, float wob) {
  float d = dot(T, normalize(L + V)) + wob;
  return exp(-d * d * k) * smoothstep(-0.30, 0.55, dot(nm, L));
}
void main() {
  float v = clamp(vV, -1.0, 1.0);
  if (vEnd < 1.0) { float e = 1.0 - vEnd; if (e * e + v * v > 1.0) discard; }       /* rounded end */
  vec3 vd = normalize(-vPv), tv = normalize(vTv);
  float round_ = clamp((vPx - 1.5) / 3.0, 0.0, 1.0);     /* below about 4 px a strand cannot show its own roundness without sparkling */
  /* where the strand lies in its body: how deep under the skin, and on the near or the far side */
  float layer = min(length(vNb), 1.0);
  vec3 nrm = vNb / max(length(vNb), 0.001);
  float free = clamp(vFree, 0.0, 1.0);                   /* a strand in the open is lit like one that faces us */
  vec2 sh = vSecond > 0.5 ? uShadeB : uShade.xw;
  float occ = mix(sh.x, 1.0, pow(smoothstep(uShade.y, 1.0, layer), 1.2)) * mix(sh.y, 1.0, max(free, smoothstep(-0.70, 0.15, dot(nrm, vd))));
  occ = max(occ, free * 0.8);
  vec3 nm = normalize(nrm + vd * (0.25 + 2.0 * free));
  /* strands are never quite straight: the narrow lights break into glints along them */
  float wob = uGlint * (1.0 - 0.75 * vTP.z) * (0.085 * sin(vTP.x * 31.0 + vTP.y * 40.0) + 0.050 * sin(vTP.x * 73.0 + vTP.y * 17.0));     /* a thick tube is smooth */
  float key = lamp(tv, vd, nm, normalize(vec3(-0.62, 0.72, 0.30)), 9.0, wob * 0.4);
  float strips = uArms.x * lamp(tv, vd, nm, normalize(vec3(0.84, 0.30, 0.34)), 42.0, wob)
               + uArms.y * lamp(tv, vd, nm, normalize(vec3(0.05, 0.98, 0.12)), 18.0, wob)
               + uArms.z * lamp(tv, vd, nm, normalize(vec3(-0.82, -0.30, 0.42)), 34.0, wob)
               + uArms.w * lamp(tv, vd, nm, normalize(vec3(0.25, 0.50, 0.82)), 28.0, wob)
               + uArmSide * vTP.z * lamp(tv, vd, nm, normalize(vec3(-0.80, 0.05, 0.60)), 30.0, wob);     /* an upright tube shows next to nothing of the other four */
  float fill = lamp(tv, vd, nm, normalize(vec3(0.25, -0.86, 0.42)), 5.0, 0.0);
  float form = mix(uShade.z, 1.0, smoothstep(-0.25, 0.75, dot(nm, normalize(vec3(-0.70, 0.60, 0.40)))));
  vec3 col = vec3(0.88, 0.92, 1.0) * uLight.w * (0.55 + 0.45 * nm.y + 1.2 * free)
           + vec3(1.0) * (uLight.x * key + uLight.y * strips) * form
           + vec3(0.80, 0.87, 1.0) * uLight.z * (fill + 0.60 * smoothstep(0.1, -0.7, nm.y));     /* the floor's light reaches what the lamps do not: no black underside */
  /* one strand: a bright line with dark flanks, once it is wide enough to show it */
  float prof = mix(0.24 + 1.02 * exp(-(v - 0.16) * (v - 0.16) * 4.5),
                   0.16 + 1.25 * exp(-(v - 0.22) * (v - 0.22) * 28.0) + 0.40 * exp(-(v + 0.55) * (v + 0.55) * 60.0), vTP.z);      /* a thick tube: a narrow streak, a second fainter one, dark between */
  prof = mix(1.0, prof, round_);
  col *= prof * occ * vShade;
  /* blue: tint the metal first, add light second, so a lit strand is still a strand */
  float kick = vKick * uKick * lamp(tv, vd, nm, normalize(vec3(0.62, -0.66, 0.42)), 12.0, 0.0) * occ;      /* a little of the blue comes back from the floor */
  float b = clamp(vBlue + kick * 0.5, 0.0, 1.0);
  float lum = dot(col, vec3(0.3333));
  col = mix(col, col * vec3(0.10, 0.40, 1.50) + uBlue * (0.03 + 0.70 * lum), b * uBlueAmt.x);
  col += uBlue * uBlueAmt.y * (b * b + kick * 0.6) * prof * (0.30 + 0.70 * occ)
       + vec3(0.55, 0.84, 1.0) * b * b * lum * uBlueAmt.w                       /* where lit metal already shines it goes to white-blue */
       + vec3(0.72, 0.87, 1.0) * vHot * uBlueAmt.z * prof;
  col = pow(1.0 - exp(-col * vExp * 1.15), vec3(1.0 / 2.2));
  /* the reflection: the same strands, fainter the further below the floor line; nothing is reflected from under the floor */
  float a = uMirror.x > 0.0 ? (vMir < 0.0 ? 0.0 : uMirror.x * pow(1.0 - min(vMir / uMirror.w, 1.0), 1.5)) : 1.0;
  o = vec4(col * a, a);
}`,Xt=`#version 300 es
precision highp float;
layout(location=0) in vec2 aCorner;
layout(location=1) in vec4 aSeed;
layout(location=2) in vec4 aPt;      /* place along the strand, size in px, phase, kind (0 tip, 1 along) */
uniform mat4 uView, uViewB, uProj;
uniform vec4 uStage, uStageB;
uniform vec2 uRes, uShare, uPtScale;
uniform float uPointAmt;
`+_e+`
out vec2 vUv; out float vA;
float ptT(int id, vec4 pt) {
  if (id == 0) return pt.w < 0.5 ? 1.0 : pt.x;
  if (id == 1) return fract(pt.x + uTime * 0.010 * (0.4 + pt.z));     /* they travel along the bundle */
  if (id == 2) return fract(pt.x + uTime * 0.006);
  return 1.0;
}
float ptLift(int id) { return id == 1 ? 0.34 : (id == 2 ? 0.30 : 0.07); }
float ptEdge(int id, float t) { return id == 1 ? smoothstep(0.0, 0.05, t) * (1.0 - smoothstep(0.95, 1.0, t)) : 1.0; }
void main() {
  float ta = ptT(uShA, aPt), tb = ptT(uShB, aPt), w = wsel(aSeed);
  float tm = mix(ta, tb, w);                     /* one place on the strand, so a point never leaves it */
  vec3 p; vec4 nb;
  curve(aSeed, tm, tm, p, nb);
  bool second = gSecond > 0.5;
  vec3 pv = ((second ? uViewB : uView) * vec4(p, 1.0)).xyz;
  vec4 c = uProj * vec4(pv, 1.0);
  c.z -= mix(ptLift(uShA), ptLift(uShB), w) * 1.017 / c.w;     /* seen through the strands of its own body, not through the body's far side */
  vec4 stg = second ? uStageB : uStage;
  c.xy = c.xy * stg.xy + stg.zw * c.w;
  float tw = 0.76 + 0.24 * sin(uTime * (0.6 + aPt.z) + aPt.z * 40.0);
  float share = mix(uShare.x, uShare.y, w);
  float on = smoothstep(share, share - 0.04, aPt.z) * mix(ptEdge(uShA, ta), ptEdge(uShB, tb), w) * (1.0 - 0.75 * gEnds)
           * smoothstep(0.55, 1.0, gKeep) * strandOn(aSeed);
  /* on the core most points sit where its light falls: to the right and below */
  float isCore = (uShA == 0 ? 1.0 - w : 0.0) + (uShB == 0 ? w : 0.0);
  float lit = smoothstep(-0.60, 0.30, dot(p.xy / max(length(p.xy), 1e-4), vec2(0.96, -0.28)));
  on *= mix(1.0, step(fract(aPt.z * 7.31 + aPt.x * 3.1), 0.18 + 0.82 * lit), isCore);
  c.xy += aCorner * aPt.y * mix(uPtScale.x, uPtScale.y, w) * 2.0 / uRes * c.w;
  gl_Position = c;
  vUv = aCorner; vA = tw * uPointAmt * on;
}`,Qt=`#version 300 es
precision highp float;
in vec2 vUv; in float vA; out vec4 o;
uniform vec3 uBlue;
void main() {
  float d = length(vUv);
  float core = smoothstep(0.26, 0.14, d);
  float halo = (0.55 * exp(-d * d * 3.2) + 0.45 * exp(-d * d * 14.0)) * smoothstep(1.0, 0.55, d);
  vec3 c = (uBlue + vec3(0.05, 0.09, 0.0)) * halo * 0.62 + vec3(0.90, 0.96, 1.0) * core;
  o = vec4(c, halo * 0.50 + core) * vA;
}`,$t=`#version 300 es
precision highp float;
layout(location=0) in vec2 aCorner;
uniform mat4 uView, uViewB, uProj; uniform vec4 uStage, uStageB; uniform vec3 uPos; uniform vec2 uSize;
uniform float uKind, uAt, uSide;
`+_e+`
out vec2 vUv;
void main() {
  vec3 pv; bool second = uSide > 0.5;
  if (uKind < 0.5) pv = ((second ? uViewB : uView) * vec4(uPos + vec3(aCorner * uSize, 0.0), 1.0)).xyz;
  else if (uKind < 1.5) {
    vec3 p; vec4 nb;
    curve(vec4(0.0, -1.0, 0.5, 0.5), uAt, uAt, p, nb);
    second = gSecond > 0.5;
    pv = ((second ? uViewB : uView) * vec4(p, 1.0)).xyz + vec3(aCorner * uSize, 0.12);
  } else pv = vec3(uPos.xy + aCorner * uSize, uPos.z);                     /* already in view space */
  vec4 c = uProj * vec4(pv, 1.0);
  vec4 stg = second ? uStageB : uStage;
  c.xy = c.xy * stg.xy + stg.zw * c.w;
  gl_Position = c; vUv = aCorner;
}`,Zt=`#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform float uAmt, uKind, uRingR, uHalo;
uniform vec3 uBlue;
void main() {
  float d = length(vUv);
  vec4 bl = vec4(uBlue + vec3(0.05, 0.08, 0.0), 1.0), wh = vec4(0.93, 0.97, 1.0, 1.0);
  vec4 c;
  if (uKind < 0.5) {
    float x = d - uRingR;
    float line = exp(-x * x / 0.00040);
    float soft = exp(-x * x / 0.0050);
    float halo = exp(-abs(x) * 5.0) * smoothstep(1.0, 0.5, d);
    float inside = step(d, uRingR) * (0.10 + 0.26 * smoothstep(uRingR * 0.25, uRingR, d));      /* haze in the mouth, thicker at the ring */
    c = wh * line + mix(bl, wh, 0.45) * soft * 0.85 + bl * halo * 0.50 + vec4(0.78, 0.88, 1.0, 1.0) * inside;
  } else if (uKind < 2.5) {
    float core = smoothstep(0.17, 0.08, d);
    float halo = exp(-d * d * 5.5) * smoothstep(1.0, 0.55, d);
    c = wh * core + mix(bl, wh, 0.14) * halo * uHalo;
  } else if (uKind < 3.5) {                                                 /* contact shadow: darkest along the line the object stands on */
    float a = (0.55 * exp(-d * d * 3.0) + 0.45 * exp(-(vUv.x * vUv.x * 1.6 + vUv.y * vUv.y * 12.0))) * smoothstep(1.0, 0.6, d);
    c = vec4(vec3(0.05, 0.06, 0.09) * a, a);
  } else c = bl * exp(-d * d * 3.0) * smoothstep(1.0, 0.6, d);              /* pool of blue light on the floor */
  o = min(c, vec4(1.0)) * uAmt;
}`,Jt=`#version 300 es
precision highp float;
layout(location=0) in vec2 aIV;
uniform mat4 uView, uViewB, uProj; uniform vec4 uStage, uStageB; uniform vec2 uRes;
uniform float uSeg, uHalfPx;
uniform vec3 uWander;                /* how far it wanders (slowly, quickly), how far it is lifted towards the viewer */
`+_e+`
out vec2 vUv;
vec4 at(float u) {
  vec3 p; vec4 nb;
  curve(vec4(0.0, -1.0, 0.5, 0.5), u, u, p, nb);
  bool second = gSecond > 0.5;
  vec3 pv = ((second ? uViewB : uView) * vec4(p, 1.0)).xyz;
  pv += vec3(0.0, uWander.x * sin(u * 19.0 + 0.7) + uWander.y * sin(u * 47.0), uWander.z);      /* it wanders a little over the strands */
  vec4 c = uProj * vec4(pv, 1.0);
  vec4 stg = second ? uStageB : uStage;
  c.xy = c.xy * stg.xy + stg.zw * c.w;
  return c;
}
void main() {
  float u = aIV.x / uSeg;
  vec4 c = at(u), c2 = at(u + 0.004);
  vec2 dir = normalize((c2.xy / c2.w - c.xy / c.w) * uRes + vec2(1e-6, 0.0));
  c.xy += vec2(-dir.y, dir.x) * aIV.y * uHalfPx * 2.0 / uRes * c.w;
  gl_Position = c; vUv = vec2(u, aIV.y);
}`,eo=`#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform float uAmt, uHead;
uniform vec3 uBlue;
uniform vec4 uEnds;                  /* where it has faded in, where it starts to fade out, how much brighter it is near the signal, how far it has closed into a loop (0..1) */
void main() {
  float v = vUv.y, u = vUv.x;
  float along = smoothstep(0.0, uEnds.x, u) * smoothstep(1.0, uEnds.y, u);
  float du = u - uHead; du = mix(du, fract(du + 0.5) - 0.5, uEnds.w);
  float head = 0.55 * uEnds.z * exp(-pow(du / 0.20, 2.0));
  float glow = exp(-v * v * 5.0), line = exp(-v * v * 46.0);
  vec4 c = vec4(uBlue + vec3(0.05, 0.08, 0.0), 1.0) * glow * (0.50 + 0.34 * head) + vec4(0.88, 0.95, 1.0, 1.0) * line * (0.80 + 0.20 * head);
  o = min(c, vec4(1.0)) * along * uAmt;
}`;function to(e,t,o){var r=1/Math.tan(e*Math.PI/360),a=1/(t-o);return new Float32Array([r,0,0,0,0,r,0,0,0,0,(o+t)*a,-1,0,0,2*o*t*a,0])}function vt(e,t,o,r){var a=Math.cos(e),n=Math.sin(e),l=Math.cos(t),c=Math.sin(t),u=Math.cos(o),d=Math.sin(o);return new Float32Array([a*u,c*n*u+l*d,-l*n*u+c*d,0,-a*d,-c*n*d+l*u,l*n*d+c*u,0,n,-c*a,l*a,0,0,0,-r,1])}function mt(e){return function(){e|=0,e=e+1831565813|0;var t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function E(e,t,o){return e+(t-e)*o}function le(e){return e<0?0:e>1?1:e}function Y(e){return e=le(e),e*e*e*(e*(e*6-15)+10)}function Ee(e){return e=le(e),e*e*(3-2*e)}function pt(e){if(e<=0)return 0;if(e>=1)return 1;for(var t=0,o=1,r=0;r<44;r++){var a=(t+o)/2;Y(a)<e?t=a:o=a}return(t+o)/2}function gt(e){var t=e.slice().sort(function(o,r){return o-r});return t.length?t[t.length>>1]:0}var oo=to(ct,.5,30),me=Math.PI/180,ro=/SwiftShader|llvmpipe|Software|Basic Render/i,ne=document.documentElement,et=document.currentScript,no=et&&et.src?et.src.replace(/ai-core(\.min)?\.js(\?.*)?$/,""):"assets/",Be=new URLSearchParams(location.search),ee=new Float32Array(h.maxStrands*4);(function(){for(var e=mt(20261007),t=0;t<h.maxStrands;t++)ee[t*4]=(.5+t*.7548776662466927)%1,ee[t*4+1]=(.5+t*.5698402909980532)%1,ee[t*4+2]=e(),ee[t*4+3]=e()})();var Ne=128,We=h.tiers[0].points,M=null,s=null,V=null,j=null,he=null,B="off",pe="",tt="",U=0,X={},z=0,C=0,I=1,_=0,ae=0,Q=0,T=[],ge=[],He=[],we=[],W=null,wt=-1,te=!0,H=null,$=0,ot=0,ie=0,se=0,xt=0,xe=0,ke=!1,Re=!0,G=null,Oe=0,rt=0,De=!0,nt=-9,O=null,P=Ft(),qe=0,be={fails:0,retried:!1},ze=0,at=0,it=0,Le=null,D=null,Se=[],fe=window.matchMedia?window.matchMedia("(prefers-reduced-motion: reduce)"):null;function ao(e){var t=e.state.fit,o;return t.mode==="band"?o=Math.max(2*e.h/t.h,_*t.cover):t.mode==="fill"?o=e.h:o=2*Math.min(e.w/t.w,e.h/t.h),o}function ce(){te=!1;var e=window.scrollX,t=window.scrollY;_=M&&M.clientWidth?M.clientWidth:ne.clientWidth,ae=M&&M.clientHeight?M.clientHeight:window.innerHeight,Q=ae;var o=Math.max(0,ne.scrollHeight-Q);T=[],document.querySelectorAll("[data-core]").forEach(function(y){var x=h.states[y.getAttribute("data-core")],R=y.getBoundingClientRect();if(!(!x||R.width<2||R.height<2)){var L={el:y,name:y.getAttribute("data-core"),state:x,x:R.left+e,y:R.top+t,w:R.width,h:R.height};L.cx=L.x+L.w/2,L.cy=L.y+L.h/2,L.S=ao(L),L.rot=x.rot;var N=(y.getAttribute("data-core-rot")||"").split(",").map(Number);N.length===3&&N.every(isFinite)&&(L.rot=N);var Ue=parseFloat(y.getAttribute("data-core-hold"));L.hold=(isFinite(Ue)?Ue:x.hold||0)*Q+Math.max(0,(L.h-Q)/2),x.shape===q&&bt(L,y,e),T.push(L)}}),T.sort(function(y,x){return y.cy-x.cy}),T.forEach(function(y,x){y.home=Math.min(o,Math.max(0,y.cy-Q/2)),x&&y.home<=T[x-1].home&&(y.home=T[x-1].home+1)}),ge=[];for(var r=0;r<T.length-1;r++){var a=T[r],n=T[r+1],l=n.home-a.home,c=a.hold,u=n.hold;if(c+u>l*(1-h.minBlend)){var d=l*(1-h.minBlend)/(c+u);c*=d,u*=d}Pt(a.state.shape,n.state.shape)===2&&(c=u=0),ge.push([a.home+c,n.home-u])}He=[],we=[];for(var f=1;f<=4;f++){var i=document.querySelector('[data-core-station="'+f+'"]');if(i){var b=i.getBoundingClientRect();b.width<1&&b.height<1||(He.push(i),we.push({x:b.left+e+b.width/2,y:b.top+t+b.height/2}))}}var g=T.filter(function(y){return y.state.shape===K})[0];if(W=null,wt=T.indexOf(g),g){var w,m,p=h.signal.step*Q,A=we.length>=2?we:null;A?(w=we.map(function(y){return y.x}),m=we.map(function(y){return y.y-h.signal.line*Q})):(w=[0,1,2,3].map(function(y){return _*(.14+.24*y)}),m=w.map(function(){return g.home})),Math.max.apply(null,w)-Math.min.apply(null,w)<_*.3&&(w=w.map(function(y,x){return _*(.14+.72*x/(w.length-1))}));var k=m.length-1;if(m[k]-m[0]<k*p){var v=m.reduce(function(y,x){return y+x},0)/m.length;m=m.map(function(y,x){return v+(x-k/2)*p})}m=io(m,w,g,A);for(var S=1;S<m.length;S++)m[S]<=m[S-1]&&(m[S]=m[S-1]+1);W={xs:w,ys:m}}B==="stills"&&yo()}function io(e,t,o,r){var a=h.signal.view,n=e.length-1,l=[],c=[],u=0,d,f={S:o.S,cx:o.cx,cy:o.cy,view:vt(o.rot[0]*me,o.rot[1]*me,o.rot[2]*me,re),bph:h.bundle.phase,len:yt(o.S)};for(d=0;d<=n;d++){var i=Mt(At(t[d],f),f,1),b=r?r[d].y:i;c[d]=Math.min(i,b)-a[0]*Q,l[d]=Math.min(c[d],Math.max(i,b)-a[1]*Q)}for(d=0;d<=n;d++)u=Math.min(u,c[d]-e[d]);if(!u)for(d=0;d<=n;d++)u=Math.max(u,l[d]-e[d]);var g=Math.min(c[0],Math.max(l[0],e[0]+u)),w=Math.min(c[n],Math.max(l[n],e[n]+u)),m=e[n]-e[0],p=e.map(function(A,k){return Math.min(c[k],Math.max(l[k],m>0?g+(w-g)*(A-e[0])/m:g))});for(d=n-1;d>=0;d--)p[d]=Math.min(p[d],p[d+1]-.5*(e[d+1]-e[d]));return p}function so(){var e=function(){return T.map(function(r){return r.name}).join()},t=e(),o=H!==null&&T.length>1?Ve(H)+$:null;ce(),$=o!==null&&e()===t?o-Ve(H):0,Math.abs($)<2e-4&&($=0)}function uo(e){for(var t=0,o=0,r=e;r;r=r.offsetParent)t+=r.offsetLeft+(r===e?0:r.clientLeft),o+=r.offsetTop+(r===e?0:r.clientTop);return{left:t,top:o,right:t+e.offsetWidth,bottom:o+e.offsetHeight,width:e.offsetWidth,height:e.offsetHeight}}function lo(e,t){if(!e)return null;var o=[];try{document.querySelectorAll(e).forEach(function(i){var b=uo(i);b.width>2&&b.height>2&&o.push(b)})}catch{return null}if(!o.length)return null;o.sort(function(i,b){return i.left-b.left});for(var r=o[0].top+o[0].height/2,a=[o[0].left],n=0,l=0,c=o.length>1,u=0;u<o.length;u++)(o[u].top>r||o[u].bottom<r)&&(c=!1),u&&(o[u].left<o[u-1].left+o[u-1].width*.5&&(c=!1),a.push((o[u-1].right+o[u].left)/2),n=Math.max(n,o[u].left-o[u-1].right)),l=Math.max(l,o[u].bottom);if(c){for(a.push(o[o.length-1].right);a.length>4;)a.splice(a.length>>1,1);return{xs:a.map(function(i){return(i-t.cx)/t.w}),gap:Math.max(0,n),bottom:l}}var d=t.y+t.h,f=o.filter(function(i){return i.top<d&&i.bottom>d})[0];return f?{xs:null,bottom:f.bottom}:null}function bt(e,t,o){var r=h.rise,a=e.w<r.narrowPx?r.narrow:r,n=t&&t.hasAttribute("data-core-clusters")?(t.getAttribute("data-core-clusters")||"").split(",").map(Number):null;n&&!(n.length>=1&&n.length<=4&&n.every(isFinite))&&(n=null),e.wu=2*e.w/e.h,e.clusters=n||a.clusters,e.heights=a.heights,e.clusterWidth=a.clusterWidth,e.steps=a.steps,e.foot=r.foot,e.tuck=null,e.curl=e.w<r.narrowPx?r.curlNarrow:r.curl;var l=t?lo(t.getAttribute("data-core-cards"),e):null,c=null;if(l&&(e.foot=Math.max(-.5,(l.bottom-r.footInset-(e.y+e.h))/(e.h/2)),l.xs&&!n)){var u=l.xs.slice(),d=u.length-1,f=r.endInset*r.clusterWidth;c=[u[0],u[d]],u[0]+=f,u[d]-=f,e.clusters=u,e.heights=r.cardHeights,e.clusterWidth=r.clusterWidth,e.steps=r.steps}if(t){var i=(e.clusterWidth/2+.012)*e.w+(e.state.strandPx||0)/2+r.edge,b=e.cx-o,g=(i-b)/e.w,w=(_-i-b)/e.w;g<w&&(e.clusters=e.clusters.map(function(A){return Math.min(w,Math.max(g,A))}))}if(c){var m=e.clusters.length-1,p=Math.min(e.clusters[0]-c[0],c[1]-e.clusters[m])*e.w;e.tuck=[(l.gap/2+r.tuckPad)/(e.h/2),Math.max(0,r.tuckPad-p)/(e.h/2)]}}function Ve(e){var t=T.length;if(t<2||e<=T[0].home)return 0;for(var o=0;o<t-1;o++)if(e<T[o+1].home||o===t-2){var r=ge[o];return o+Y((e-r[0])/Math.max(1,r[1]-r[0]))}return t-1}function ho(e){var t=T.length;if(!t)return 0;var o=Math.max(0,Math.min(t-2,Math.floor(e))),r=le(e-o);return t<2||r<=0?T[Math.min(t-1,o)].home:r>=1?T[o+1].home:E(ge[o][0],ge[o][1],pt(r))}function St(e){var t=W.ys,o=t.length-1,r=1/(t[1]-t[0]),a=1/(t[o]-t[o-1]);if(e<=t[0])return Math.max(-.6,(e-t[0])*r);if(e>=t[o])return Math.min(o+.6,o+(e-t[o])*a);for(var n=0;n<o;n++)if(e<t[n+1])return n+(e-t[n])/(t[n+1]-t[n]);return o}function yt(e){return Math.min(h.bundle.len,2*_/e+1.5)}function fo(e){var t=h.bundle;return t.phase+t.sway*Math.sin(e*t.speed)}function co(e){var t=h.ring;return t.sway*Math.sin(e*t.spin)}function Mt(e,t,o){var r=h.bundle,a=t.bph,n=r.k,l=t.view,c=r.amp*(Math.sin(n*e+a)+.35*Math.sin(2.1*n*e-1.3+.7*a)),u=.5*r.amp*Math.cos(.8*n*e+.4+.6*a),d=l[0]*e+l[4]*c+l[8]*u+l[12],f=l[2]*e+l[6]*c+l[10]*u+l[14];return o?t.cy-re*(l[1]*e+l[5]*c+l[9]*u+l[13])/-f*t.S/2:t.cx+re*d/-f*t.S/2}function At(e,t){for(var o=t.len/2,r=-o,a=o,n=0;n<22;n++){var l=(r+a)/2;Mt(l,t)<e?r=l:a=l}return(r+a)/2}function Tt(e,t){return .5+At(e,t)/t.len}function Pt(e,t){return e===K&&t===Pe||e===Pe&&t===K?h.bend?1:2:e===q||t===q?2:0}function vo(e,t,o,r,a){var n=h.handover,l=(e.state.share||1)>=(t.state.share||1),c=Math.min(n.lead*Q,(a-r)*.2),u,d,f,i,b=e.state.shape===K&&W?Math.max(r,Math.min(a-4,W.ys[W.ys.length-1])):r;function g(w,m,p,A){var k=m[0]==="centre"?w.cy:w.y,v=m[0]==="box"?w.h:Q,S=k-m[1]*v,y=k-m[2]*v;return S=Math.min(Math.max(S,p),A-2),[S,Math.min(Math.max(y,S+2),A)]}return l?(u=g(e,e.state.leave||n.leave,b,a),d=g(t,t.state.enter||n.enter,r+c,a),f=o<d[0]?0:1,i=f?1:1-Ee((o-(d[0]-c))/c)):(u=g(e,e.state.leave||n.leave,b,a-c),d=g(t,t.state.enter||n.enter,r,a),f=o<u[1]?0:1,i=f?Ee((o-u[1])/c):1),{keep:1-Ee((o-u[0])/(u[1]-u[0])),grow:Ee((o-d[0])/(d[1]-d[0])),side:f,fade:i,big:l}}function Ge(e,t,o,r,a){var n=T.length;if(!n)return null;var l=Math.max(0,Math.min(n-2,Math.floor(e))),c=n>1?le(e-l):0,u=Et(T[l],T[Math.min(n-1,l+1)],c,e,t,window.scrollX,o,r,a,ge[l]);return u.lit=-9,W&&(e>wt?u.lit=a!=null?a*(W.ys.length-1):St(r):u.station!==null&&u.signal>.25&&(u.lit=u.station)),u}function Et(e,t,o,r,a,n,l,c,u,d){var f=e.state,i=t.state,b=f.shape===i.shape||o<1e-6?0:o>1-1e-6?1:o,g=b>0&&b<1?Pt(f.shape,i.shape):0;function w(F,oe,Je,J){return{S:F,cx:oe-n,cy:Je-l,view:vt(J[0]*me,J[1]*me,J[2]*me,re)}}var m=w(E(e.S,t.S,o),E(e.cx,t.cx,o),E(e.cy,t.cy,o),[E(e.rot[0],t.rot[0],o),E(e.rot[1],t.rot[1],o),E(e.rot[2],t.rot[2],o)]),p=g===2?vo(e,t,E(d[0],d[1],pt(o)),d[0],d[1]):null,A=p?1-p.keep:o,k=p?p.grow:o,v={p:r,m:o,time:a,shA:f.shape,shB:i.shape,mix:b,mode:g,a:g===2?w(e.S,e.cx,e.cy,e.rot):m,b:g===2?w(t.S,t.cx,t.cy,t.rot):m,S:m.S,cx:m.cx,cy:m.cy,view:m.view,hand:p?[p.keep,p.grow,p.side,p.fade]:[1,1,0,1],grow:E(f.grow,i.grow,o),stagger:f.stagger!==void 0?f.stagger:h.stagger,lift:f.lift!==void 0?f.lift:h.lift,core:f.core*(1-Y(A/.35))+i.core*Y(p?(k-.04)/.36:(o-.75)/.25),coreSide:p?i.core>f.core?1:0:-1,openA:g===2?f.shape===q?0:le(3*A):Math.sin(Math.PI*b)*(g===1?.4:1),openB:g===2?i.shape===q?0:le(3*(1-k)):Math.sin(Math.PI*b)*(g===1?.4:1),shareA:f.points*Math.max(.45,Math.min(1,e.S/520)),shareB:i.points*Math.max(.45,Math.min(1,t.S/520)),ptA:Math.max(.7,Math.min(1.15,e.S/640))*(f.pointSize||1),ptB:Math.max(.7,Math.min(1.15,t.S/640))*(i.pointSize||1),strA:Rt(f),strB:Rt(i),bph:fo(a),rph:co(a),gainA:p?f.gain||1:E(f.gain||1,i.gain||1,o),gainB:p?i.gain||1:E(f.gain||1,i.gain||1,o),arms:p?((p.side?i.arms:f.arms)||h.light.arms).slice():(f.arms||h.light.arms).map(function(F,oe){return E(F,(i.arms||h.light.arms)[oe],o)})},S=f.shape===q?e:i.shape===q?t:null,y=f.shape===K?e:i.shape===K?t:null,x=h.rise;function R(F,oe,Je){var J=F.extent;if(F.shape===q)return[J[0],J[1],Math.min(J[2],1.05+Math.max(0,oe.foot)),J[3]];if(F.shape===ue&&Je<.35){var Po=.6+.6*Ee((Je-.1)/.25);return J.map(function(Eo){return Math.min(Eo,Po)})}return J}v.places=g===2?[[v.a,R(f,e,p.keep),p.keep>0&&(!p.side||v.strA>v.strB)],[v.b,R(i,t,p.grow),p.grow>0]].filter(function(F){return F[2]}):[[m,o>0&&o<1?f.extent.map(function(F,oe){return Math.max(F,i.extent[oe])}):R(o>=1?i:f,o>=1?t:e,1)]],v.wu=S?S.wu:2*x.still.aspect,v.clusters=S?S.clusters:x.clusters,v.heights=S?S.heights:x.heights,v.clusterWidth=S?S.clusterWidth:x.clusterWidth,v.steps=S?S.steps:x.steps,v.curl=S?S.curl:x.curl,v.foot=S?[S.foot,S.tuck?1:0,S.tuck?S.tuck[0]:0,S.tuck?S.tuck[1]:0]:[x.foot,0,0,0],v.len=yt(y?y.S:v.S),v.wA=kt(f,e.S),v.wB=kt(i,t.S);var L=p&&f.signal>0&&i.signal>0,N=p?L?p.side?i:f:f.signal>=i.signal?f:i:o>=.5?i:f,Ue=o>=.5?Y((o-.7)/.3):1-Y(o/.3);v.signal=p?N===f?f.signal*(1-Y(A/.5))*(L?p.fade:1):i.signal*Y((k-.5)/.5):g===1?E(f.signal,i.signal,o):N.signal*Ue,v.sigHead=g===1?Ue:1,v.line=g===1?E(f.line===void 0?1:f.line,i.line===void 0?1:i.line,o):N.line===void 0?1:N.line,v.sigSide=p?N===f?0:1:-1,v.sigS=p?N===f?e.S:t.S:v.S;var je=N.shape===Pe,Ao=g===1?f.shape===K?o:1-o:je?1:0;if(v.sigWrap=je?1:0,v.sigWidth=N.sigWidth||.1,v.wander=h.signal.wander.map(function(F,oe){return E(F,h.signal.wanderLoop[oe],Ao)}),v.sigPos=.5,v.stT=[9,9,9,9],v.stOn=[0,0,0,0],v.station=null,je)v.sigPos=a*h.signal.loopRate%1;else if(N.shape===K&&W){var qt=W.xs,ft=qt.length-1,Xe=u!=null?u*ft:St(c),Qe=p?N===f?v.a:v.b:v,To={S:Qe.S,cx:Qe.cx,cy:Qe.cy,view:Qe.view,bph:v.bph,len:v.len},$e=qt.map(function(F){return Tt(F,To)}),Ze=Math.max(0,Math.min(ft-1,Math.floor(Xe)));v.sigPos=$e[Ze]+($e[Ze+1]-$e[Ze])*(Xe-Ze);for(var Te=0;Te<=ft;Te++)v.stT[Te]=$e[Te],v.stOn[Te]=(.3+.7*le((Xe-Te+.35)/.35))*v.sigHead;v.station=Xe}v.sigAt=je?(v.sigPos+.5)%1:v.sigPos;var Gt=f.floor?f.floor[2]*(1-Y(A/.3)):0,Kt=i.floor?i.floor[2]*Y((k-.7)/.3):0;function Yt(F){return Math.max(v.coreSide<0||v.coreSide===F?v.core:0,v.sigSide<0||v.sigSide===F?.7*v.signal:0)}return v.floors=[],Gt>.003&&v.floors.push({at:v.a,side:0,y:f.floor[0],w:f.floor[1],amt:Gt,pool:Yt(0),mirror:f.floor[3]!==0}),Kt>.003&&v.floors.push({at:v.b,side:1,y:i.floor[0],w:i.floor[1],amt:Kt,pool:Yt(1),mirror:i.floor[3]!==0}),v}function Bt(){var e=Math.min(h.tiers[U].strands,h.maxStrands);return Math.min(h.widthLod[1],Math.max(h.widthLod[0],Math.sqrt(h.tiers[0].strands/e)))}function kt(e,t){return e.strandPx?e.strandPx/(h.width*Bt()*t/2):e.thick||1}function Rt(e){if(!e.share)return 1;var t=Math.min(h.tiers[U].strands,h.maxStrands);return Math.min(1,Math.max(e.share,Math.min(h.shareCap,e.share*h.tiers[0].strands/t)))}function st(e){if(!e)return!1;var t=24;return e.places.some(function(o){var r=o[0],a=o[1],n=r.S/2;return r.cx+a[1]*n>-t&&r.cx-a[0]*n<_+t&&r.cy+a[2]*n>-t&&r.cy-a[3]*n<ae+t})}function Ke(e,t){function o(u,d){var f=s.createShader(u);if(s.shaderSource(f,d),s.compileShader(f),!s.getShaderParameter(f,s.COMPILE_STATUS))throw new Error(s.getShaderInfoLog(f)||"shader did not compile");return f}var r=s.createProgram();if(s.attachShader(r,o(s.VERTEX_SHADER,e)),s.attachShader(r,o(s.FRAGMENT_SHADER,t)),s.linkProgram(r),!s.getProgramParameter(r,s.LINK_STATUS))throw new Error(s.getProgramInfoLog(r)||"program did not link");for(var a={},n=s.getProgramParameter(r,s.ACTIVE_UNIFORMS),l=0;l<n;l++){var c=s.getActiveUniform(r,l);a[c.name]=s.getUniformLocation(r,c.name)}return{p:r,u:a}}function Ce(e){var t=s.createBuffer();return s.bindBuffer(s.ARRAY_BUFFER,t),s.bufferData(s.ARRAY_BUFFER,e,s.STATIC_DRAW),t}function ye(e,t,o){s.enableVertexAttribArray(e),s.vertexAttribPointer(e,t,s.FLOAT,!1,0,0),o&&s.vertexAttribDivisor(e,o)}function mo(e){var t=ee[e*4+2]*7.31+ee[e*4+3]*3.77;return t-Math.floor(t)}function zt(){V={strand:Ke(X.shader?dt.replace("void main","void broken("):dt,jt),point:Ke(Xt,Qt),glow:Ke($t,Zt),line:Ke(Jt,eo)};for(var e=new Float32Array((Ne+1)*4),t=0;t<=Ne;t++)e[t*4]=t,e[t*4+1]=-1,e[t*4+2]=t,e[t*4+3]=1;for(var o=mt(77),r=new Float32Array(We*4),a=new Float32Array(We*4),n=0,l=.15,c=h.tiers.length-1;c>=0;c--){var u=[],d=[],f=Math.min(h.tiers[c].strands,h.maxStrands),i=Math.min(h.tiers[c].points,We),b=0;for(t=0;t<f;t++)ee[t*4+3]>=1-h.vortex.loose&&(u.push(t),mo(t)<l&&d.push(t));for(t=n;t<i;t++){var g=o()<.66&&u.length>0,w=o()<.34&&d.length>0?d:u,m=g?w[(t*7+b++)%w.length]:Math.floor(o()*f);r.set(ee.subarray(m*4,m*4+4),t*4),a[t*4]=g?1:.22+.72*o(),a[t*4+1]=g?9+6*o():8+7*o(),a[t*4+2]=o(),a[t*4+3]=g?0:1}n=Math.max(n,i)}j={strand:s.createVertexArray(),point:s.createVertexArray(),quad:s.createVertexArray()},s.bindVertexArray(j.strand),Ce(e),ye(0,2,0),Ce(ee),ye(1,4,1),s.bindVertexArray(j.point);var p=Ce(new Float32Array([-1,-1,1,-1,-1,1,1,1]));ye(0,2,0),Ce(r),ye(1,4,1),Ce(a),ye(2,4,1),s.bindVertexArray(j.quad),s.bindBuffer(s.ARRAY_BUFFER,p),ye(0,2,0),s.bindVertexArray(null)}function ut(){var e=h.tiers[U];I=Math.min(window.devicePixelRatio||1,e.dprCap,Math.sqrt(e.pixelCap/Math.max(1,_*ae)));var t=Math.max(1,Math.round(_*I)),o=Math.max(1,Math.round(ae*I));(t!==z||o!==C)&&(z=M.width=t,C=M.height=o)}function Lt(e){return[e.S*I/z,e.S*I/C,2*e.cx*I/z-1,1-2*e.cy*I/C]}function Ye(e,t){var o=e.u,r=h.vortex,a=h.bundle,n=h.ring,l=h.rise,c=t.clusters;s.useProgram(e.p),s.uniform1f(o.uTime,t.time),s.uniform1i(o.uShA,t.shA),s.uniform1i(o.uShB,t.shB),s.uniform1f(o.uMix,t.mix),s.uniform1f(o.uMode,t.mode),s.uniform4fv(o.uHand,t.hand),s.uniform1f(o.uStag,t.mode===1?0:t.stagger),s.uniform1f(o.uFan,h.fan),s.uniform1f(o.uGrow,t.grow),s.uniform1f(o.uLift,t.lift),s.uniform4f(o.uVx,r.twist,r.radius,r.tube,r.squash),s.uniform4f(o.uVx2,r.flare,r.loose,r.wrap,r.spin),s.uniform4f(o.uVx3,r.treadTwist,r.wrapVar,r.tufts,r.tuftCount),s.uniform1f(o.uUncurl,r.uncurl),s.uniform4f(o.uBd,a.amp,a.k,a.radY,a.radZ),s.uniform4f(o.uBd2,t.len,a.roll,a.braid,t.bph),s.uniform4f(o.uBd3,a.locks,a.lockSpread,a.lockRadius,0),s.uniform4f(o.uRg,n.R,n.r,n.coil,n.squash),s.uniform4f(o.uRg2,n.loose,t.rph,n.weave,0),s.uniform4f(o.uRs,t.wu,l.height,l.depth,t.curl),s.uniform1f(o.uCurlIn,l.curlNarrow),s.uniform4fv(o.uFoot,t.foot),s.uniform4f(o.uCl,c[0]||0,c[1]||0,c[2]||0,c[3]||0),s.uniform2f(o.uClN,c.length,t.clusterWidth),s.uniform2fv(o.uStep,t.steps),s.uniform4f(o.uClH,t.heights[0]||0,t.heights[1]||0,t.heights[2]||0,t.heights[3]||0),s.uniform2f(o.uShareS,t.strA,t.strB),s.uniformMatrix4fv(o.uView,!1,t.a.view),s.uniformMatrix4fv(o.uViewB,!1,t.b.view),s.uniformMatrix4fv(o.uProj,!1,oo),s.uniform4fv(o.uStage,Lt(t.a)),s.uniform4fv(o.uStageB,Lt(t.b))}function Fe(e,t,o,r,a,n,l,c){var u=V.glow.u;s.uniform1f(u.uKind,e),s.uniform1f(u.uAmt,t),s.uniform2f(u.uSize,o,r),s.uniform1f(u.uAt,a||0),s.uniform1f(u.uSide,l||0),s.uniform1f(u.uHalo,c||.66),n&&s.uniform3f(u.uPos,n[0],n[1],n[2]),s.drawArrays(s.TRIANGLE_STRIP,0,4)}function de(e){var t=s,o=h.tiers[U],r=h.light,a=h.shade,n=h.blueAmt,l=h.blue,c=h.floor;if(t.viewport(0,0,z,C),t.disable(t.BLEND),t.depthMask(!0),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),!!e){var u=Math.sin(e.time*h.pulse.rate);t.enable(t.DEPTH_TEST),t.depthFunc(t.LESS),Ye(V.strand,e);var d=Math.min(o.strands,h.maxStrands),f=Math.min(o.segments,Ne),i=V.strand.u,b=h.width*Bt();t.uniform2f(i.uWMul,e.wA,e.wB),t.uniform2f(i.uTip,e.shA===ue?.3:1,e.shB===ue?.3:1),t.uniform2f(i.uCap,e.shA===q||e.shA===ue?1:0,e.shB===q||e.shB===ue?1:0),t.uniform1f(i.uMinPx,h.minPx),t.uniform2f(i.uPxUnit,e.a.S*I/2,e.b.S*I/2),t.uniform1f(i.uCamD,re),t.uniform1f(i.uCore,e.core),t.uniform1f(i.uPulse,u),t.uniform3f(i.uReach,n.reach,n.lean,n.glare),t.uniform1f(i.uWave,h.pulse.wave),t.uniform1f(i.uSignal,e.signal),t.uniform1f(i.uSigHead,e.sigHead),t.uniform1f(i.uSigPos,e.sigPos),t.uniform1f(i.uSigWidth,e.sigWidth),t.uniform1f(i.uSigWrap,e.sigWrap),t.uniform2f(i.uLitSide,e.coreSide,e.sigSide),t.uniform1f(i.uFil,h.signal.filaments),t.uniform4fv(i.uStT,e.stT),t.uniform4fv(i.uStOn,e.stOn),t.uniform2f(i.uVar,a.strandVar,a.darkShare),t.uniform2f(i.uExposure,h.exposure*e.gainA,h.exposure*e.gainB),t.uniform1f(i.uGlint,r.glint),t.uniform1f(i.uKick,n.kick),t.uniform1f(i.uArmSide,r.armSide),t.uniform4f(i.uLight,r.key,r.strips,r.fill,r.room),t.uniform4fv(i.uArms,e.arms),t.uniform4f(i.uShade,E(a.depthFloor,Math.max(a.depthFloor,a.open),e.openA),a.depthStart,a.formFloor,E(a.back,Math.max(a.back,.85),e.openA)),t.uniform2f(i.uShadeB,E(a.depthFloor,Math.max(a.depthFloor,a.open),e.openB),E(a.back,Math.max(a.back,.85),e.openB)),t.uniform3f(i.uBlue,l[0],l[1],l[2]),t.uniform4f(i.uBlueAmt,n.tint,n.light,n.hot,n.sheen),t.bindVertexArray(j.strand);var g=!1;o.mirror>0&&c.mirror>0&&e.floors.forEach(function(x){if(x.mirror){var R=Math.max(8,f>>1);t.uniform1f(i.uSeg,R),t.uniform1f(i.uWidth,b*1.25),t.uniform4f(i.uMirror,c.mirror*x.amt,x.y,c.squash,c.reach),t.uniform1f(i.uMirSide,e.mode===2?x.side:-1),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,(R+1)*2,Math.max(1,Math.round(d*o.mirror))),g=!0}}),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.depthMask(!1),t.disable(t.DEPTH_TEST),Ye(V.glow,e),t.uniform3f(V.glow.u.uBlue,l[0],l[1],l[2]),t.bindVertexArray(j.quad),e.floors.forEach(function(x){c.shadow>0&&Fe(3,c.shadow*x.amt,x.w*1.5,.15,0,[.03,x.y-.02,-re],x.side),c.pool>0&&x.pool>.002&&Fe(4,c.pool*x.amt*x.pool,x.w*1.15,.17,0,[x.w*.32,x.y-.05,-re],x.side)}),t.disable(t.BLEND),t.depthMask(!0),t.enable(t.DEPTH_TEST),g&&t.clear(t.DEPTH_BUFFER_BIT),t.useProgram(V.strand.p),t.uniform1f(i.uSeg,f),t.uniform1f(i.uWidth,b),t.uniform4f(i.uMirror,0,0,1,1),t.uniform1f(i.uMirSide,-1),t.bindVertexArray(j.strand),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,(f+1)*2,d),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.depthMask(!1),t.depthFunc(t.LEQUAL);var w=e.core*(.94+.06*u);if(t.disable(t.DEPTH_TEST),e.signal>.002&&n.filament>0){var m=V.line.u,p=Math.min(Ne,112);Ye(V.line,e),t.uniform2f(m.uRes,z,C),t.uniform1f(m.uSeg,p),t.uniform3fv(m.uWander,e.wander),t.uniform1f(m.uHalfPx,h.signal.linePx*I*Math.max(.6,Math.min(1.2,e.sigS/600))),t.uniform1f(m.uHead,e.sigAt),t.uniform1f(m.uAmt,Math.min(1,e.signal*e.line*n.filament));var A=e.mode===1?e.shA===K?e.mix:1-e.mix:e.sigWrap;t.uniform4f(m.uEnds,E(.05,1e-4,A),E(.95,.9999,A),e.sigHead,A),t.uniform3f(m.uBlue,l[0],l[1],l[2]),t.bindVertexArray(j.strand),t.drawArrays(t.TRIANGLE_STRIP,0,(p+1)*2)}if(t.useProgram(V.glow.p),t.bindVertexArray(j.quad),e.core>.002){var k=h.vortex,v=k.radius-k.tube;t.uniform1f(V.glow.u.uRingR,1/3),Fe(0,w*n.ring,v*3,v*3,0,[0,0,k.tube*k.squash*.22],e.coreSide>0?1:0)}if(e.signal>.002){for(var S=0;S<4;S++)e.stOn[S]>0&&Fe(1,e.signal*e.stOn[S]*n.nodes,.13,.13,e.stT[S]);var y=e.sigWrap?.24:.3;e.sigHead>.002&&Fe(1,Math.min(1.6,e.signal*e.sigHead*n.bead),y,y,e.sigAt,null,0,1)}t.enable(t.DEPTH_TEST),Ye(V.point,e),t.uniform2f(V.point.u.uRes,z,C),t.uniform2f(V.point.u.uShare,e.shareA,e.shareB),t.uniform2f(V.point.u.uPtScale,I*e.ptA,I*e.ptB),t.uniform1f(V.point.u.uPointAmt,n.points),t.uniform3f(V.point.u.uBlue,l[0],l[1],l[2]),t.bindVertexArray(j.point),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,Math.min(o.points,We)),t.bindVertexArray(null)}}function Z(){B==="live"&&!se&&!document.hidden&&Re&&(ie=0,se=requestAnimationFrame(Vt))}function Me(){se&&cancelAnimationFrame(se),se=0,ie=0}function Vt(e){if(se=0,!(B!=="live"||document.hidden||!Re)){var t=ie?Math.min(100,e-ie):16.667,o=ie?e-ie:0;ie=e,xt++,te&&so(),ut();var r=window.scrollY,a=Math.pow(1-h.smooth,t/16.667);H===null&&(H=r),H+=(r-H)*(1-a),Math.abs(r-H)<.5&&(H=r),$&&($*=a,Math.abs($)<2e-4&&($=0)),De=H===r&&!$;var n;G?n=Ge(G.p,G.t,r,r,G.sig):(ot+=t/1e3,rt=Ve(r),Oe=Math.max(0,Math.min(T.length-1,Ve(H)+$)),n=Ge(Oe,ot,r,H));var l=st(n);if(l){var c=!G&&De&&U>0&&h.idleEvery>1&&xt%h.idleEvery!==0&&xe>2;if(c||(de(n),ke=!1,xe++,xe===2&&(ne.classList.add("core-on"),M.style.opacity="1")),po(ze||o),B!=="live")return;Ct(n)}else ke||(de(null),ke=!0);O=n,l||!De?se=requestAnimationFrame(Vt):ie=0}}function Ct(e){var t=e?e.lit:-9,o=Math.floor(t+.2);o!==nt&&(nt=o,He.forEach(function(r,a){t>=a-.2?r.setAttribute("data-core-lit","1"):r.removeAttribute("data-core-lit")}))}function Ft(){return{warm:0,list:[],cool:0,recent:[],calm:0,upped:!1}}function po(e){if(e&&(P.recent.push(e),P.recent.length>60&&P.recent.shift(),!(G&&!ze))){if(P.cool>0){P.cool--;return}if(P.warm<h.warmup){P.warm++;return}if(P.list.push(e),!(P.list.length<h.window)){var t=gt(P.list);if(P.list=[],t>h.slowMs){if(P.cool=h.cooldown,P.calm=0,P.upped&&(be.fails++,P.upped=!1),U<h.tiers.length-1){U++,z=C=0;return}Ie(),ve("too-slow"),be.retried||(it=setTimeout(function(){B!=="stills"||pe!=="too-slow"||(be.retried=!0,lt(h.tiers.length-1))},h.stillRetryMs));return}if(t>h.fastMs){P.calm=0;return}P.calm+=h.window,!(P.calm<h.calm*Math.pow(2,be.fails))&&(P.calm=0,P.upped=!1,U>qe&&be.fails<h.retries&&(U--,z=C=0,P.upped=!0))}}}var go=".ai-core-canvas{position:fixed;left:0;top:0;width:100%;height:100vh;height:100lvh;z-index:0;display:block;pointer-events:none;opacity:0;transition:opacity .5s ease}.ai-core-stills{position:absolute;left:0;top:0;width:100%;overflow:hidden;z-index:0;pointer-events:none}.ai-core-stills img{position:absolute;display:block;max-width:none;user-select:none;-webkit-user-select:none}";function wo(){if(!document.getElementById("ai-core-style")){var e=document.createElement("style");e.id="ai-core-style",e.textContent=go,document.head.appendChild(e)}}function xo(){var e=parseInt(Be.get("core-tier"),10);if(X.tier!==void 0)return X.tier;if(e>=0&&e<h.tiers.length)return e;var t=window.matchMedia&&(window.matchMedia("(max-width: 820px)").matches||window.matchMedia("(pointer: coarse)").matches);return t?1:0}function lt(e){if(wo(),clearTimeout(it),X.reduced||fe&&fe.matches)return ve("reduced-motion");if(M=document.createElement("canvas"),M.className="ai-core-canvas",M.setAttribute("aria-hidden","true"),document.body.insertBefore(M,document.body.firstChild),s=X.nogl?null:M.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!0,depth:!0,stencil:!1,powerPreference:"high-performance",failIfMajorPerformanceCaveat:!0,preserveDrawingBuffer:!1}),!s)return ht(),ve("no-webgl2");he=s.getExtension("WEBGL_lose_context");var t=s.getExtension("WEBGL_debug_renderer_info");if(tt=String(t?s.getParameter(t.UNMASKED_RENDERER_WEBGL):s.getParameter(s.RENDERER)),X.software||ro.test(tt))return Ie(),ve("software-renderer");try{zt()}catch(o){return window.console&&console.warn("ai-core: "+o.message),Ie(),ve("shader-failed")}M.addEventListener("webglcontextlost",It),M.addEventListener("webglcontextrestored",Ut),Re=!0,window.IntersectionObserver&&(Le=new IntersectionObserver(function(o){Re=o[o.length-1].isIntersecting,Re&&Z()}),Le.observe(M)),qe=xo(),U=e===void 0?qe:Math.max(qe,e),Wt(),B="live",pe="",xe=0,z=C=0,H=null,$=0,te=!0,P=Ft(),Z()}function ht(){Le&&(Le.disconnect(),Le=null),M&&M.parentNode&&M.parentNode.removeChild(M),M=null,s=null,V=null,j=null,he=null}function Ie(){Me(),clearTimeout(at),clearTimeout(it),M&&(M.removeEventListener("webglcontextlost",It),M.removeEventListener("webglcontextrestored",Ut)),s&&he&&!s.isContextLost()&&he.loseContext(),ht(),ne.classList.remove("core-on"),B="off"}function It(e){e.preventDefault(),e.target===M&&(Me(),B="lost",pe="context-lost",ne.classList.remove("core-on"),M.style.opacity="0",at=setTimeout(function(){B==="lost"&&ve("context-lost",!0)},h.lostWaitMs))}function Ut(e){if(e.target===M){clearTimeout(at);try{zt()}catch{return Ie(),ve("shader-failed")}Wt(),B="live",pe="",xe=0,z=C=0,ke=!1,Z()}}function bo(e){var t=e.state,o=e.S/2,r=t.frame;if(t.fit.mode==="fill"){var a=_t(e.w),n=Nt(a),l=e.w/(2*a.aspect),c=Math.min(1.35*l,Math.max(.75*l,(e.h+e.foot*e.h/2)/(2+a.foot))),u=2*(Math.min(e.cx,_-e.cx)-h.rise.edge)/(n[2]-n[0]);return u>0&&(l=Math.min(l,u)),{x:e.cx+n[0]*l,y:e.y-(n[3]-1)*c,w:(n[2]-n[0])*l,h:(n[3]-n[1])*c}}return{x:e.cx+r[0]*o,y:e.cy-r[3]*o,w:(r[2]-r[0])*o,h:(r[3]-r[1])*o}}function _t(e){return e<h.rise.narrowPx?h.rise.stillNarrow:h.rise.still}function Nt(e){return[-e.aspect*1.17,-1.04-e.foot,e.aspect*1.17,1.08]}function So(e){return"ai-core-"+e.name+(e.state.fit.mode==="fill"&&_t(e.w)===h.rise.stillNarrow?"-narrow":"")+".webp"}function yo(){for(D||(D=document.createElement("div"),D.className="ai-core-stills",D.setAttribute("aria-hidden","true"),document.body.insertBefore(D,document.body.firstChild)),D.style.height=Math.floor(document.body.getBoundingClientRect().height)+"px",T.forEach(function(e,t){var o=Se[t];o||(o=Se[t]=document.createElement("img"),o.alt="",o.decoding="async",t&&(o.loading="lazy"),D.appendChild(o));var r=no+So(e),a=bo(e);o.getAttribute("src")!==r&&o.setAttribute("src",r),o.style.left=a.x.toFixed(1)+"px",o.style.top=a.y.toFixed(1)+"px",o.style.width=a.w.toFixed(1)+"px",o.style.height=a.h.toFixed(1)+"px"});Se.length>T.length;)D.removeChild(Se.pop())}function ve(e,t){t||Me(),B="stills",pe=e,ne.classList.remove("core-on"),ne.classList.add("core-still"),ce(),He.forEach(function(o){o.setAttribute("data-core-lit","1")}),nt=-9}function Wt(){ne.classList.remove("core-still"),D&&D.parentNode&&D.parentNode.removeChild(D),D=null,Se=[]}function Ht(){B==="live"||B==="lost"?Ie():(Me(),ht()),lt()}function Ae(){te=!0,B==="stills"?ce():Z()}if(window.addEventListener("scroll",Z,{passive:!0}),window.addEventListener("resize",Ae),window.addEventListener("load",Ae),window.addEventListener("pageshow",Ae),document.fonts&&document.fonts.ready&&document.fonts.ready.then(Ae),document.addEventListener("visibilitychange",function(){document.hidden?Me():Z()}),fe){var Ot=function(){Ht()};fe.addEventListener?fe.addEventListener("change",Ot):fe.addListener&&fe.addListener(Ot)}function Dt(){var e=new Uint8Array(z*C*4);return s.readPixels(0,0,z,C,s.RGBA,s.UNSIGNED_BYTE,e),e}function Mo(){for(var e=Dt(),t=2166136261,o=0;o<C;o+=3)for(var r=o*z*4,a=r+z*4;r<a;r+=12)t^=e[r],t=Math.imul(t,16777619),t^=e[r+1],t=Math.imul(t,16777619),t^=e[r+2],t=Math.imul(t,16777619),t^=e[r+3],t=Math.imul(t,16777619);return(t>>>0).toString(16)}window.__core={conf:h,still:function(e,t,o){if(B!=="live")return null;G={p:+e,t:+t||0,sig:o},(te||!T.length)&&ce(),ut();var r=Ge(G.p,G.t,window.scrollY,window.scrollY,o);return de(st(r)?r:null),ke=!1,O=r,Oe=rt=G.p,Ct(r),Z(),Mo()},release:function(){G=null,Z()},grid:function(e,t){if(B!=="live")return null;de(O&&st(O)?O:null);for(var o=Dt(),r=[],a=z/e,n=C/t,l=0;l<t;l++)for(var c=0;c<e;c++){for(var u=[0,0,0,0],d=0,f=Math.floor(l*n);f<(l+1)*n;f+=2)for(var i=Math.floor(c*a);i<(c+1)*a;i+=2){var b=(f*z+i)*4;u[0]+=o[b],u[1]+=o[b+1],u[2]+=o[b+2],u[3]+=o[b+3],d++}r.push(u[0]/d,u[1]/d,u[2]/d,u[3]/d)}return r},state:function(){var e=h.tiers[U]||{};return{mode:B,reason:pe,progress:+Oe.toFixed(4),target:+rt.toFixed(4),settled:De,pinned:!!G,tier:B==="stills"?3:U,renderer:tt,frameMs:+gt(P.recent).toFixed(2),ratio:+I.toFixed(3),size:[z,C],strands:e.strands,segments:e.segments,points:e.points,triangles:e.strands*e.segments*2,samples:s&&!s.isContextLost()?s.getParameter(s.SAMPLES):0,drawing:!!se,drawn:xe,time:+ot.toFixed(3),station:O&&O.station!==null&&O.station!==void 0?+O.station.toFixed(3):null,hand:O&&O.mode===2?[+O.hand[0].toFixed(4),+O.hand[1].toFixed(4)]:null,anchors:T.map(function(t){return t.name}),stills:Se.map(function(t){return t.getAttribute("src")})}},force:function(e){if(e==="lost"||e==="restore"){he&&(e==="lost"?he.loseContext():he.restoreContext());return}if(e==="slow"){ze=55,P.warm=h.warmup,P.cool=0,Z();return}if(e==="steady"){ze=0;return}ze=0,X={},be={fails:0,retried:!1};var t=/^tier(\d)$/.exec(e||"");t?X.tier=+t[1]:e&&e!=="auto"&&(X[e]=!0),Ht()},scrollFor:function(e){return(te||!T.length)&&ce(),ho(e)},progressAt:function(e){return(te||!T.length)&&ce(),Ve(e)},refresh:Ae,bench:function(e,t){if(B!=="live")return null;te&&ce(),ut(),t=t||40;var o=new Uint8Array(4),r=Ge(e,1,window.scrollY,window.scrollY,.5);de(r),s.readPixels(0,0,1,1,s.RGBA,s.UNSIGNED_BYTE,o);for(var a=performance.now(),n=0;n<t;n++)r.time=1+n*.016,de(r);return s.finish(),s.readPixels(0,0,1,1,s.RGBA,s.UNSIGNED_BYTE,o),(performance.now()-a)/t},poster:function(e,t,o,r){var a=e==="rise-narrow",n=h.states[a?"rise":e];if(B!=="live"||!n)return null;Me();var l=h.rise,c=a?l.stillNarrow:l.still,u=n.frame||Nt(c),d=t||n.stillPx,f=2,i=Math.round((u[2]-u[0])*d),b=Math.round((u[3]-u[1])*d),g=[I,_,ae,U,W];U=0,I=f,_=i,ae=b,z=M.width=i*f,C=M.height=b*f,W=null;var w={state:n,S:2*d,cx:-u[0]*d,cy:u[3]*d,rot:n.rot,w:2*c.aspect*d,h:2*d};if(w.x=w.cx-w.w/2,w.y=w.cy-w.h/2,n.shape===q&&(bt(w,null),w.foot=c.foot,c.row)){var m=l.endInset*l.clusterWidth,p=c.row.length-1;w.clusters=c.row.map(function(R,L){return L===0?R+m:L===p?R-m:R}),w.heights=l.cardHeights,w.tuck=[(c.gap*w.w/2+l.tuckPad*d/290)/d,Math.max(0,l.tuckPad*d/290-m*w.w)/d]}var A=Et(w,w,0,0,o||0,0,0,0,.5);if(A.len=Math.min(h.bundle.len,u[2]-u[0]+1.5),n.shape===Pe&&(A.sigPos=.62,A.sigAt=.12),n.shape===K){var k=[0,1,2,3].map(function(R){return i*(.14+.24*R)});A.stT=k.map(function(R){return Tt(R,A)}),A.stOn=[1,1,1,.3],A.sigPos=A.sigAt=E(A.stT[2],A.stT[3],.25)}de(A);var v=document.createElement("canvas");v.width=i,v.height=b;var S=v.getContext("2d");S.imageSmoothingQuality="high",S.drawImage(M,0,0,i,b);var y=v.toDataURL("image/webp",r||.8),x=S.getImageData(1,1,1,1).data;return I=g[0],_=g[1],ae=g[2],U=g[3],W=g[4],z=C=0,te=!0,Z(),{name:e,url:y,w:i,h:b,corner:Array.prototype.slice.call(x)}}},(function(){var e=Be.get("core-force");if(e){var t=/^tier(\d)$/.exec(e);t?X.tier=+t[1]:X[e]=!0}var o=function(){lt(),window.ResizeObserver&&new ResizeObserver(Ae).observe(document.body),Be.has("core-p")&&B==="live"&&window.__core.still(+Be.get("core-p"),+Be.get("core-t")||0)};document.body?o():document.addEventListener("DOMContentLoaded",o)})()})();
