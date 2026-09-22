# The journal: how to add a post

Two steps, no build, nothing else to touch.

1. Copy `_template.html` to `<slug>.html` (lowercase words joined by hyphens, for example
   `web-design-trends-2026.html`). Replace every `{{PLACEHOLDER}}`. Add as many
   `<section class="post-sec">` blocks as you need; number them 01, 02, 03 in the
   `<span class="mono post-n">`. Paragraphs are `<p class="post-p">`, bullet lists are
   `<ul class="post-list">`. Do not add other markup or styles.

2. Add an entry at the TOP of `posts.json` (newest first):

```json
{
  "slug": "web-design-trends-2026",
  "title": "Web Design Trends in 2026",
  "date": "Sep 21, 2026",
  "category": "Website Design",
  "excerpt": "One or two sentences that make someone want to read it."
}
```

The date format is `Mon D, YYYY`. The slug must match the file name without `.html`.
The index page reads `posts.json` and draws the list by itself.
