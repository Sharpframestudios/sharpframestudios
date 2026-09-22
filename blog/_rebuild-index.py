#!/usr/bin/env python3
"""Rebuilds posts.json from the post files in this folder.

Every .html file here except _template.html and index.html is treated as a post.
Title, category and date are read from the post itself, so the post file is the
single source of truth and a post can never go missing from the index again.
Excerpts already in posts.json are kept verbatim; new posts get one derived
from their opening paragraph.
"""
import json, os, re, html, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
SKIP = {"_template.html", "index.html"}

def text_of(fragment):
    return html.unescape(re.sub(r"<[^>]+>", "", fragment)).strip()

def excerpt_from(body):
    m = re.search(r'<p class="post-p">(.*?)</p>', body, re.S)
    if not m:
        return ""
    t = re.sub(r"\s+", " ", text_of(m.group(1)))
    if len(t) <= 185:
        return t
    cut = t[:185]
    if " " in cut:
        cut = cut[:cut.rfind(" ")]
    return cut.rstrip(" .,;:") + "…"

old = {}
p = os.path.join(HERE, "posts.json")
if os.path.exists(p):
    for e in json.load(open(p, encoding="utf-8")):
        old[e["slug"]] = e

posts, problems = [], []
for fn in sorted(os.listdir(HERE)):
    if not fn.endswith(".html") or fn in SKIP:
        continue
    slug = fn[:-5]
    body = open(os.path.join(HERE, fn), encoding="utf-8").read()
    k = re.search(r'<p class="kicker mono">\(\s*([^)]*?)\s*\)\s*([^<]*)</p>', body)
    t = re.search(r'<h1 class="post-h">(.*?)</h1>', body, re.S)
    if not k or not t:
        problems.append(f"{fn}: missing kicker or h1")
        continue
    date = k.group(2).strip()
    try:
        dt = datetime.datetime.strptime(date, "%b %d, %Y")
    except ValueError:
        problems.append(f"{fn}: unreadable date {date!r}")
        continue
    prev = old.get(slug)
    posts.append({
        "_dt": dt,
        "slug": slug,
        "title": text_of(t.group(1)),
        "date": date,
        "category": k.group(1).strip().title().replace("Seo", "SEO"),
        "excerpt": prev["excerpt"] if prev and prev.get("excerpt") else excerpt_from(body),
    })

posts.sort(key=lambda e: (e["_dt"], e["slug"]), reverse=True)
for e in posts:
    del e["_dt"]

with open(p, "w", encoding="utf-8") as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)
    f.write("\n")

print(f"posts.json rebuilt: {len(posts)} posts, newest {posts[0]['date']}, oldest {posts[-1]['date']}")
for x in problems:
    print("PROBLEM:", x)
