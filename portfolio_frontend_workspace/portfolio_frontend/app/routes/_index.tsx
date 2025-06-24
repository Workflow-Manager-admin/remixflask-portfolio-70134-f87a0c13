import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

// PUBLIC_INTERFACE
export const meta: MetaFunction = () => [
  { title: "devfolio – Developer Portfolio" },
  { name: "description", content: "A minimal developer portfolio built with Remix" },
];

// PUBLIC_INTERFACE
export default function Index() {
  return (
    <div className="flex flex-col gap-16 mb-16">
      {/* HERO */}
      <section className="mt-4 md:mt-12 flex flex-col justify-center items-center text-center gap-6 pt-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Hi, I&apos;m <span className="text-primary-600 dark:text-primary-400">Your Name</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          I build clean, scalable web projects.<br />
          <span className="opacity-50">Developer &middot; Engineer &middot; Tinkerer</span>
        </p>
        <div className="flex gap-4 justify-center mt-2">
          <Link
            to="/projects"
            className="px-5 py-2 font-medium rounded border border-primary-500 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950 transition"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="px-5 py-2 font-medium rounded border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
          >
            Contact
          </Link>
        </div>
      </section>
      {/* PROJECTS PREVIEW */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <span>Projects</span>
          <span className="text-sm font-normal text-primary-500">
            <Link to="/projects" className="underline underline-offset-2 ml-1 hover:text-primary-700 dark:hover:text-primary-300">All Projects →</Link>
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2].map((idx) => (
            <div
              key={idx}
              className="rounded-lg border p-5 bg-white dark:bg-gray-950 border-gray-100 dark:border-gray-800 shadow-sm transition hover:shadow-md"
            >
              <div className="font-semibold text-lg text-gray-800 dark:text-white mb-1">
                Project Name {idx}
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                Short description of project {idx}. Replace these with your projects!
              </div>
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="text-primary-500 hover:underline font-medium cursor-not-allowed"
                tabIndex={-1}
              >
                View more
              </button>
            </div>
          ))}
        </div>
      </section>
      {/* BLOG PREVIEW */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span>Latest Blog Posts</span>
          <span className="text-sm font-normal text-primary-500">
            <Link to="/blog" className="underline underline-offset-2 ml-1 hover:text-primary-700 dark:hover:text-primary-300">All Posts →</Link>
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2].map((idx) => (
            <div
              key={idx}
              className="rounded-lg border p-5 bg-white dark:bg-gray-950 border-gray-100 dark:border-gray-800 shadow-sm transition hover:shadow-md"
            >
              <div className="font-semibold text-lg text-gray-800 dark:text-white mb-1">
                Blog Post Title {idx}
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                Excerpt or brief of blog post {idx}. Coming soon!
              </div>
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="text-primary-500 hover:underline font-medium cursor-not-allowed"
                tabIndex={-1}
              >
                Read more
              </button>
            </div>
          ))}
        </div>
      </section>
      {/* ABOUT PREVIEW */}
      <section className="flex flex-col items-center text-center gap-3 mt-16">
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl">
          Want to know more? Head to the <Link to="/about" className="text-primary-500 underline hover:text-primary-700 dark:hover:text-primary-300">About</Link> page for my story &amp; skills, or <Link to="/contact" className="text-primary-500 underline hover:text-primary-700 dark:hover:text-primary-300">contact me</Link> for collaboration.
        </p>
      </section>
    </div>
  );
}
