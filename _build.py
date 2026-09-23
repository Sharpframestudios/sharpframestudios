#!/usr/bin/env python3
"""Builds the site's SEO layer. Safe to run any number of times.

What it does, in order:

1. Rebuilds blog/posts.json from the post files themselves, so the journal
   index can never drift out of sync with what is actually published.
2. Renders the post list into blog/index.html as real HTML links, so the
   articles are reachable without JavaScript. blog.js stays as progressive
   enhancement but no longer overwrites what is already there.
3. Adds a money-page link to every post, pointing at the hub page for that
   post's cluster.
4. Injects canonical, OpenGraph, Twitter and JSON-LD tags into every page.
5. Writes sitemap.xml and robots.txt.

Every injected region is wrapped in markers and replaced on each run, so
running this twice changes nothing the second time.

Usage:  python3 _build.py
"""

import json, os, re, html, datetime, hashlib, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
BLOG = os.path.join(ROOT, "blog")
SITE = "https://sharpframestudios.com"
BRAND = "Sharp Frame Studios"
EMAIL = "info@sharpframestudios.com"
DEFAULT_IMAGE = f"{SITE}/assets/hero-ending.jpg"
SKIP_POSTS = {"_template.html", "index.html"}

HUBS = {
    "web-design-sarasota": "Web Design in Sarasota",
    "seo-sarasota": "SEO in Sarasota",
    "framer-web-design": "Framer Web Design",
}

# Which hub a post feeds, decided by its category.
HUB_FOR_CATEGORY = {
    "Website Design": "web-design-sarasota",
    "Website Redesign": "web-design-sarasota",
    "Pricing": "web-design-sarasota",
    "Website Strategy": "web-design-sarasota",
    "Local SEO": "seo-sarasota",
    "SEO": "seo-sarasota",
    "Conversion": "seo-sarasota",
    "Social Media": "seo-sarasota",
}

# Several phrasings so 42 pages do not carry one identical sentence.
HUB_SENTENCES = {
    "web-design-sarasota": [
        'If you are weighing a new site for your own business, our <a href="../web-design-sarasota/">web design in Sarasota</a> page sets out how a project is scoped, priced and built.',
        'When you are ready to talk about your own site, the <a href="../web-design-sarasota/">Sarasota web design</a> page covers what is included at each level and what drives the cost.',
        'For how this works as an actual project, see our <a href="../web-design-sarasota/">web design in Sarasota</a> page, which walks through the process from strategy to launch.',
        'If the next step is your own website, the <a href="../web-design-sarasota/">Sarasota web design</a> page explains what a build involves and what it costs.',
    ],
    "seo-sarasota": [
        'If you want this handled rather than explained, our <a href="../seo-sarasota/">SEO in Sarasota</a> page sets out what we do, in what order, and what to expect.',
        'For how we approach this as ongoing work, see the <a href="../seo-sarasota/">Sarasota SEO</a> page, including honest timelines.',
        'If you would rather have someone run this, the <a href="../seo-sarasota/">SEO in Sarasota</a> page covers the work and what it realistically achieves.',
        'Our <a href="../seo-sarasota/">Sarasota SEO</a> page explains how local search work is structured and how long results actually take.',
    ],
    "framer-web-design": [
        'If you are curious what the site would be built in, our <a href="../framer-web-design/">Framer web design</a> page explains the platform and where it fits.',
    ],
}


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
        cut = cut[: cut.rfind(" ")]
    return cut.rstrip(" .,;:") + "…"


def marked(name, payload):
    return f"<!-- {name}:start -->{payload}<!-- {name}:end -->"


def replace_marked(doc, name, payload, before):
    """Drop any previous marked region, then insert the new one before `before`."""
    doc = re.sub(
        f"<!-- {name}:start -->.*?<!-- {name}:end -->", "", doc, flags=re.S
    )
    block = marked(name, payload)
    idx = doc.find(before)
    if idx == -1:
        return doc, False
    return doc[:idx] + block + doc[idx:], True


def esc(s):
    return html.escape(s or "", quote=True)


# ---------------------------------------------------------------- posts.json

def collect_posts():
    old = {}
    p = os.path.join(BLOG, "posts.json")
    if os.path.exists(p):
        for e in json.load(open(p, encoding="utf-8")):
            old[e["slug"]] = e

    posts, problems = [], []
    for fn in sorted(os.listdir(BLOG)):
        if not fn.endswith(".html") or fn in SKIP_POSTS:
            continue
        slug = fn[:-5]
        body = open(os.path.join(BLOG, fn), encoding="utf-8").read()
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
    return posts, problems


def write_posts_json(posts):
    out = [{k: v for k, v in e.items() if k != "_dt"} for e in posts]
    with open(os.path.join(BLOG, "posts.json"), "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write("\n")


# --------------------------------------------------------- static blog index

def render_index(posts):
    """Put real <a> links in blog/index.html so the archive is crawlable."""
    cards = []
    for i, e in enumerate(posts, 1):
        cards.append(
            f'<a class="post-card glass" href="{esc(e["slug"])}.html">'
            f'<p class="mono post-card-k">( {i:02d} ) {esc(e["category"])} &middot; {esc(e["date"])}</p>'
            f'<h2 class="h3">{esc(e["title"])}</h2>'
            f'<p class="p">{esc(e["excerpt"])}</p>'
            f'<span class="mono post-card-go">Read ↗</span></a>'
        )
    payload = "\n" + "\n".join(cards) + "\n"

    path = os.path.join(BLOG, "index.html")
    doc = open(path, encoding="utf-8").read()
    doc = re.sub(r"<!-- posts:start -->.*?<!-- posts:end -->", "", doc, flags=re.S)
    m = re.search(r'(<div class="posts" id="posts"[^>]*>)(.*?)(</div>)', doc, re.S)
    if not m:
        return False
    doc = doc[: m.end(1)] + marked("posts", payload) + doc[m.start(3):]
    # the noscript notice is no longer true once the list is in the HTML
    doc = re.sub(r"<noscript>.*?</noscript>\s*", "", doc, flags=re.S)
    open(path, "w", encoding="utf-8").write(doc)
    return True


def guard_blog_js():
    """Stop blog.js re-rendering a list the HTML already contains."""
    path = os.path.join(BLOG, "blog.js")
    js = open(path, encoding="utf-8").read()
    if "already rendered" in js:
        return False
    js = js.replace(
        "  var host = document.getElementById('posts');\n  if (!host) return;",
        "  var host = document.getElementById('posts');\n  if (!host) return;\n"
        "  /* The list is rendered into the HTML at build time so it works without\n"
        "     JavaScript and can be crawled. If it is already rendered, leave it. */\n"
        "  if (host.querySelector('.post-card')) return;",
    )
    open(path, "w", encoding="utf-8").write(js)
    return True


# ------------------------------------------------------------- money linking

def add_hub_links(posts):
    changed = 0
    for e in posts:
        hub = HUB_FOR_CATEGORY.get(e["category"])
        if not hub:
            continue
        options = HUB_SENTENCES[hub]
        pick = int(hashlib.md5(e["slug"].encode()).hexdigest(), 16) % len(options)
        payload = f'\n      <p class="post-p">{options[pick]}</p>\n    '

        path = os.path.join(BLOG, e["slug"] + ".html")
        doc = open(path, encoding="utf-8").read()
        # The sentence belongs inside the closing section, not loose in the
        # wrapper, so it inherits the same column and spacing as the prose.
        stripped = re.sub(r"<!-- hub:start -->.*?<!-- hub:end -->", "", doc, flags=re.S)
        last = stripped.rfind("</section>")
        if last == -1:
            continue
        new = stripped[:last] + marked("hub", payload) + stripped[last:]
        if new != doc:
            open(path, "w", encoding="utf-8").write(new)
            changed += 1
    return changed


# --------------------------------------------------------------- head tags

def head_block(url, title, description, kind, extra_schema=None, published=None, category=None):
    og_type = "article" if kind == "post" else "website"
    tags = [
        f'\n<link rel="canonical" href="{esc(url)}">',
        f'\n<meta property="og:type" content="{og_type}">',
        f'\n<meta property="og:url" content="{esc(url)}">',
        f'\n<meta property="og:title" content="{esc(title)}">',
        f'\n<meta property="og:description" content="{esc(description)}">',
        f'\n<meta property="og:image" content="{DEFAULT_IMAGE}">',
        f'\n<meta property="og:site_name" content="{BRAND}">',
        '\n<meta name="twitter:card" content="summary_large_image">',
        f'\n<meta name="twitter:title" content="{esc(title)}">',
        f'\n<meta name="twitter:description" content="{esc(description)}">',
        f'\n<meta name="twitter:image" content="{DEFAULT_IMAGE}">',
    ]

    publisher = {
        "@type": "Organization",
        "name": BRAND,
        "url": SITE + "/",
        "logo": {"@type": "ImageObject", "url": f"{SITE}/assets/mark.webp"},
    }

    if kind == "post":
        schema = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": title,
            "description": description,
            "url": url,
            "mainEntityOfPage": {"@type": "WebPage", "@id": url},
            "image": DEFAULT_IMAGE,
            "author": {"@type": "Organization", "name": BRAND, "url": SITE + "/"},
            "publisher": publisher,
            "inLanguage": "en-US",
        }
        if published:
            schema["datePublished"] = published
            schema["dateModified"] = published
        if category:
            schema["articleSection"] = category
    elif extra_schema:
        schema = extra_schema
    else:
        schema = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "description": description,
            "url": url,
            "inLanguage": "en-US",
            "publisher": publisher,
        }

    tags.append(
        '\n<script type="application/ld+json">'
        + json.dumps(schema, ensure_ascii=False, separators=(",", ":"))
        + "</script>\n"
    )
    return "".join(tags)


def business_schema():
    return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": BRAND,
        "url": SITE + "/",
        "image": DEFAULT_IMAGE,
        "logo": f"{SITE}/assets/mark.webp",
        "email": EMAIL,
        "description": (
            "Independent studio in Sarasota, Florida. Custom website design and "
            "development, original photography and film, and SEO foundations, "
            "handled start to finish by one person."
        ),
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Sarasota",
            "addressRegion": "FL",
            "addressCountry": "US",
        },
        "areaServed": [
            {"@type": "City", "name": n} for n in
            ["Sarasota", "Lakewood Ranch", "Bradenton", "Venice", "Siesta Key",
             "Longboat Key", "North Port", "Palmetto", "Anna Maria Island",
             "St. Petersburg", "Tampa"]
        ],
        "knowsAbout": ["Web design", "Website development", "Local SEO",
                       "Framer", "Commercial photography", "Video production"],
        "priceRange": "$$",
        "makesOffer": [
            {"@type": "Offer", "name": "Website Launch",
             "price": "1500", "priceCurrency": "USD",
             "description": "A custom landing page with up to seven sections."},
            {"@type": "Offer", "name": "Business Website",
             "price": "3000", "priceCurrency": "USD",
             "description": "Up to five custom pages with forms and basic CMS."},
            {"@type": "Offer", "name": "Signature Website",
             "price": "5000", "priceCurrency": "USD",
             "description": "Up to ten pages with premium motion and CMS collections."},
        ],
    }


def service_schema(name, description, url, service_type):
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": name,
        "serviceType": service_type,
        "description": description,
        "url": url,
        "provider": {
            "@type": "ProfessionalService",
            "name": BRAND,
            "url": SITE + "/",
            "email": EMAIL,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Sarasota",
                "addressRegion": "FL",
                "addressCountry": "US",
            },
        },
        "areaServed": {"@type": "AdministrativeArea", "name": "Sarasota and Manatee County, Florida"},
    }


def add_footer_hub_links(path, prefix):
    """Put the three service pages in the footer of every page.

    Without this the hubs are reachable only from the articles that happen to
    link them, which leaves the Framer page orphaned and gives the other two
    far less internal support than they should have.
    """
    doc = open(path, encoding="utf-8").read()
    chips = "".join(
        f'<a class="chip" href="{prefix}{slug}/">{label.lower()} ↗</a>'
        for slug, label in [
            ("web-design-sarasota", "web design"),
            ("seo-sarasota", "seo"),
            ("framer-web-design", "framer"),
        ]
    )
    doc = re.sub(r"<!-- hubnav:start -->.*?<!-- hubnav:end -->", "", doc, flags=re.S)
    m = re.search(r'<nav class="foot-nav mono" aria-label="Footer">', doc)
    if not m:
        return False
    new = doc[: m.end()] + marked("hubnav", chips) + doc[m.end():]
    if new != doc:
        open(path, "w", encoding="utf-8").write(new)
    return True


def page_meta(doc):
    t = re.search(r"<title>(.*?)</title>", doc, re.S)
    d = re.search(r'<meta name="description" content="([^"]*)"', doc)
    return (html.unescape(t.group(1)).strip() if t else BRAND,
            html.unescape(d.group(1)).strip() if d else "")


def inject(path, url, kind, **kw):
    doc = open(path, encoding="utf-8").read()
    title, description = page_meta(doc)
    payload = head_block(url, title, description, kind, **kw)
    new, ok = replace_marked(doc, "seo", payload, "</head>")
    if not ok:
        return False
    if new != doc:
        open(path, "w", encoding="utf-8").write(new)
    return True


# ------------------------------------------------------------------ sitemap

def write_sitemap(posts):
    today = datetime.date.today().isoformat()
    urls = [(SITE + "/", today, "1.0")]
    for slug in HUBS:
        urls.append((f"{SITE}/{slug}/", today, "0.9"))
    urls.append((f"{SITE}/blog/", today, "0.7"))
    for e in posts:
        urls.append((f"{SITE}/blog/{e['slug']}.html",
                     e["_dt"].date().isoformat(), "0.6"))

    body = "\n".join(
        f"  <url><loc>{u}</loc><lastmod>{m}</lastmod><priority>{p}</priority></url>"
        for u, m, p in urls
    )
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
           f"{body}\n</urlset>\n")
    open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8").write(xml)

    open(os.path.join(ROOT, "robots.txt"), "w", encoding="utf-8").write(
        f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n"
    )
    return len(urls)


# --------------------------------------------------------------------- main

def main():
    posts, problems = collect_posts()
    if not posts:
        print("No posts found — refusing to write anything.")
        return 1

    write_posts_json(posts)
    print(f"posts.json       : {len(posts)} posts, newest {posts[0]['date']}")

    print(f"blog/index.html  : {'static list rendered' if render_index(posts) else 'FAILED — posts container not found'}")
    print(f"blog.js          : {'guard added' if guard_blog_js() else 'guard already present'}")
    print(f"money links      : {add_hub_links(posts)} posts updated")

    # head tags on every page
    done = 0
    for e in posts:
        if inject(os.path.join(BLOG, e["slug"] + ".html"),
                  f"{SITE}/blog/{e['slug']}.html", "post",
                  published=e["_dt"].date().isoformat(), category=e["category"]):
            done += 1
    print(f"post head tags   : {done}/{len(posts)}")

    inject(os.path.join(ROOT, "index.html"), SITE + "/", "home",
           extra_schema=business_schema())
    inject(os.path.join(BLOG, "index.html"), f"{SITE}/blog/", "page")
    print("home + blog index: done")

    for slug, name in HUBS.items():
        path = os.path.join(ROOT, slug, "index.html")
        if not os.path.exists(path):
            print(f"  ! missing hub page: {slug}")
            continue
        doc = open(path, encoding="utf-8").read()
        _, desc = page_meta(doc)
        inject(path, f"{SITE}/{slug}/", "page",
               extra_schema=service_schema(name, desc, f"{SITE}/{slug}/", name))
    print(f"hub pages        : {len(HUBS)} done")

    nav = 0
    for e in posts:
        nav += add_footer_hub_links(os.path.join(BLOG, e["slug"] + ".html"), "../")
    nav += add_footer_hub_links(os.path.join(BLOG, "index.html"), "../")
    nav += add_footer_hub_links(os.path.join(BLOG, "_template.html"), "../")
    nav += add_footer_hub_links(os.path.join(ROOT, "index.html"), "")
    for slug in HUBS:
        p = os.path.join(ROOT, slug, "index.html")
        if os.path.exists(p):
            nav += add_footer_hub_links(p, "../")
    print(f"footer hub links : {nav} pages")

    print(f"sitemap.xml      : {write_sitemap(posts)} URLs")
    print("robots.txt       : written")

    for x in problems:
        print("PROBLEM:", x)
    return 0


if __name__ == "__main__":
    sys.exit(main())
