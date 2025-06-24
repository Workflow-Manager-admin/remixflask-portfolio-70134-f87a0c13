import os
import glob
import markdown
from flask_smorest import Blueprint
from flask.views import MethodView
from flask import jsonify
from datetime import datetime


# PUBLIC_INTERFACE
class BlogPost:
    """Represents a blog post loaded from a Markdown file, with metadata."""

    def __init__(self, slug, title, date, summary, content_markdown, content_html):
        self.slug = slug
        self.title = title
        self.date = date
        self.summary = summary
        self.content_markdown = content_markdown
        self.content_html = content_html

    def to_dict(self, include_content=False):
        data = {
            "slug": self.slug,
            "title": self.title,
            "date": self.date.isoformat(),
            "summary": self.summary,
        }
        if include_content:
            data["content_markdown"] = self.content_markdown
            data["content_html"] = self.content_html
        return data


# In-memory storage of posts
BLOG_POSTS = {}


def load_markdown_posts(data_dir):
    """Loads and parses all markdown blog posts from the data directory.

    Expects markdown files to have optional YAML frontmatter:
    ---
    title: Post Title
    date: 2023-01-01
    summary: Brief summary...
    ---

    If no frontmatter, tries to infer from filename.
    """
    posts = {}
    for path in glob.glob(os.path.join(data_dir, "*.md")):
        slug = os.path.splitext(os.path.basename(path))[0]
        with open(path, "r", encoding="utf-8") as f:
            text = f.read()

        meta, body = {}, text
        if text.startswith("---"):
            try:
                fm_end = text.find("---", 3)
                if fm_end != -1:
                    # crude YAML frontmatter parser, expects each line: key: value
                    frontmatter = text[3:fm_end].strip().splitlines()
                    for line in frontmatter:
                        if ":" in line:
                            k, v = line.split(":", 1)
                            meta[k.strip().lower()] = v.strip()
                    body = text[fm_end + 3 :].lstrip()
            except Exception:
                pass

        title = meta.get("title") or slug.replace("-", " ").title()
        date_str = meta.get("date")
        try:
            date = (
                datetime.strptime(date_str, "%Y-%m-%d")
                if date_str
                else datetime.fromtimestamp(os.path.getmtime(path))
            )
        except Exception:
            date = datetime.fromtimestamp(os.path.getmtime(path))
        lines = [line for line in body.strip().splitlines() if line.strip()]
        summary = meta.get("summary") or (lines[0][:140] if lines else "")

        content_markdown = body
        content_html = markdown.markdown(
            body, extensions=["fenced_code", "tables"]
        )
        post = BlogPost(slug, title, date, summary, content_markdown, content_html)
        posts[slug] = post
    return posts


# Load posts at startup
DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "data")
if not os.path.isdir(DATA_DIR):
    os.makedirs(DATA_DIR, exist_ok=True)
BLOG_POSTS.update(load_markdown_posts(DATA_DIR))


blp = Blueprint(
    "Blog",
    "blog",
    url_prefix="/blog",
    description="Blog post APIs"
)


@blp.route("/")
class BlogPostList(MethodView):
    """
    PUBLIC_INTERFACE
    Returns all blog post metadata as a list, ordered by date (latest first).
    ---
    GET /blog/
    Returns: [{"slug": str, "title": str, "date": str, "summary": str}]
    """

    def get(self):
        posts = sorted(BLOG_POSTS.values(), key=lambda p: p.date, reverse=True)
        return jsonify([p.to_dict() for p in posts])


@blp.route("/<string:slug>")
class BlogPostDetails(MethodView):
    """
    PUBLIC_INTERFACE
    Returns the details for a single blog post, including markdown content and HTML.
    ---
    GET /blog/<slug>
    Returns: {slug, title, date, summary, content_markdown, content_html}
    """

    def get(self, slug):
        post = BLOG_POSTS.get(slug)
        if post is None:
            return jsonify({"error": "Not found"}), 404
        return jsonify(post.to_dict(include_content=True))


# For programmatic reload when new files are added or changed
def reload_blog_posts():
    """Reloads blog post files and updates the in-memory cache."""
    BLOG_POSTS.clear()
    BLOG_POSTS.update(load_markdown_posts(DATA_DIR))
