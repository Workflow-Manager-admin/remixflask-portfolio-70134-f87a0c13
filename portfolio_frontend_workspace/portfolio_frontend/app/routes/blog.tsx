import type { MetaFunction } from "@remix-run/node";

// PUBLIC_INTERFACE
export const meta: MetaFunction = () => [
  { title: "Blog – devfolio" },
  { name: "description", content: "Developer Blog Articles" },
];

// PUBLIC_INTERFACE
export default function Blog() {
  return (
    <section className="flex flex-col gap-10 max-w-2xl mx-auto pt-4 pb-16">
      <header>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Blog</h1>
        <p className="text-gray-700 dark:text-gray-400 mb-8">
          Read my latest posts about development, technology, and more.
        </p>
      </header>
      <div className="flex flex-col gap-7">
        {[1,2].map((idx) => (
          <div key={idx} className="border-b border-gray-100 dark:border-gray-800 pb-7">
            <div className="text-lg font-semibold text-primary-700 dark:text-primary-300 mb-2">Post Title {idx}</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              Published on 2024-0{idx}-01
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              Short excerpt from blog post {idx}... (Coming soon)
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-xs text-gray-400">Blog backend integration coming soon.</div>
    </section>
  );
}
