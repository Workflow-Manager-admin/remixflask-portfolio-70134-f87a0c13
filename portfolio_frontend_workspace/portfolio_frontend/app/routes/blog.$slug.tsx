import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Loader to fetch blog post markdown content by slug from Flask backend.
 */
export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  try {
    const apiUrl = `http://localhost:5000/api/blog/${encodeURIComponent(slug)}`;
    const resp = await fetch(apiUrl, { headers: { "Accept": "application/json" } });
    if (!resp.ok) {
      throw new Response("Blog post not found", { status: resp.status });
    }
    // Assume backend returns { title, content (markdown string), summary, date, ... }
    const post = await resp.json();
    return json({ post });
  } catch (err) {
    // Handle network or parsing errors
    throw new Response("Could not fetch blog post.", { status: 500 });
  }
}

// PUBLIC_INTERFACE
export const meta: MetaFunction = ({ data }) => {
  if (!data || !data.post) {
    return [{ title: "Post Not Found – devfolio" }];
  }
  return [
    { title: `${data.post.title} – devfolio` },
    { name: "description", content: data.post.summary || data.post.title || "Developer Blog Post" }
  ];
};

// PUBLIC_INTERFACE
export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto pt-16 pb-16">
        <div className="text-center text-2xl font-semibold text-red-500">Blog post not found.</div>
      </div>
    );
  }

  return (
    <section className="max-w-2xl mx-auto pt-6 pb-16 flex flex-col gap-6">
      <button
        type="button"
        onClick={() => history.back()}
        className="self-start text-primary-600 dark:text-primary-400 hover:underline text-sm mb-1"
        aria-label="Back to Blog"
      >
        ← Back to Blog
      </button>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">{post.title}</h1>
      {post.date && (
        <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">
          Published on {new Date(post.date).toLocaleDateString()}
        </div>
      )}
      <ReactMarkdown
        className="prose dark:prose-invert max-w-none"
        remarkPlugins={[remarkGfm]}
      >
        {post.content}
      </ReactMarkdown>
    </section>
  );
}
