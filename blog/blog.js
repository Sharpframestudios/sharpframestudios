/* The journal index. It reads posts.json and draws one card per post, newest first.
   Adding a post never touches this file. */
(function () {
  var host = document.getElementById('posts');
  if (!host) return;
  /* The list is rendered into the HTML at build time so it works without
     JavaScript and can be crawled. If it is already rendered, leave it. */
  if (host.querySelector('.post-card')) return;
  fetch('posts.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (posts) {
    host.innerHTML = posts.map(function (p, i) {
      return '<a class="post-card glass" href="' + encodeURIComponent(p.slug) + '.html">' +
        '<p class="mono post-card-k">( ' + String(i + 1).padStart(2, '0') + ' ) ' + esc(p.category || 'Journal') + ' &middot; ' + esc(p.date || '') + '</p>' +
        '<h2 class="h3">' + esc(p.title) + '</h2>' +
        '<p class="p">' + esc(p.excerpt || '') + '</p>' +
        '<span class="mono post-card-go">Read \u2197</span></a>';
    }).join('');
  }).catch(function () { host.innerHTML = '<p class="p">The list could not be loaded. Open <a href="posts.json">posts.json</a>.</p>'; });
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
})();
