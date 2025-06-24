import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

/**
 * Loader to fetch all blog summaries from Flask backend.
 */
export async function loader() {
  try {
    const apiUrl = "http://localhost:5000/api/blog";
    const resp = await fetch(apiUrl, { headers: { "Accept": "application/json" } });
    if (!resp.ok) {
      throw new Response("Could not fetch blog list.", { status: resp.status });
    }
    // Assume backend returns [{ slug, title, summary, date, ... }]
    const posts = await resp.json();
    return json({ posts });
  } catch (err) {
    throw new Response("Could not fetch blog list.", { status: 500 });
  }
}

// PUBLIC_INTERFACE
export const meta: MetaFunction = () => [
  { title: "Blog – devfolio" },
  { name: "description", content: "Developer Blog Articles" },
];

// PUBLIC_INTERFACE
type BlogPostSummary = { slug: string; title: string; summary: string; date?: string };

export default function Blog() {
  const data = useLoaderData<typeof loader>();

  // Gracefully handle missing or failed data load
  if (!data || !Array.isArray(data.posts)) {
    return (
      <section className="flex flex-col gap-10 max-w-2xl mx-auto pt-4 pb-16">
        <header>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Blog</h1>
          <p className="text-gray-700 dark:text-gray-400 mb-8">
            Read my latest posts about development, technology, and more.
          </p>
        </header>
        <div className="text-red-500 font-semibold">Could not load posts. Please try again later.</div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-10 max-w-2xl mx-auto pt-4 pb-16">
      <header>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Blog</h1>
        <p className="text-gray-700 dark:text-gray-400 mb-8">
          Read my latest posts about development, technology, and more.
        </p>
      </header>
      {
        data.posts.length === 0 ? (
          <div className="mt-5 text-gray-400">No blog posts yet. Check back soon!</div>
        ) : (
          <div className="flex flex-col gap-7">
            {(data.posts as BlogPostSummary[]).map((post) => (
              <div key={post.slug} className="border-b border-gray-100 dark:border-gray-800 pb-7">
                <Link to={`/blog/${post.slug}`} className="text-lg font-semibold text-primary-700 dark:text-primary-300 mb-2 hover:underline">
                  {post.title}
                </Link>
                {post.date && (
                  <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                    Published on {new Date(post.date).toLocaleDateString()}
                  </div>
                )}
                <div className="text-gray-700 dark:text-gray-300">
                  {post.summary}
                </div>
              </div>
            ))}
          </div>
        )
      }
    </section>
  );
}
