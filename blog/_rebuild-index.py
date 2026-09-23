#!/usr/bin/env python3
"""Kept for compatibility: the build now lives at the repository root.

Older instructions call this script. It simply runs _build.py, which does
everything this used to do plus the sitemap, canonical tags, structured data
and the crawlable index.
"""
import os, runpy, sys

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.argv = [os.path.join(root, "_build.py")]
runpy.run_path(sys.argv[0], run_name="__main__")
