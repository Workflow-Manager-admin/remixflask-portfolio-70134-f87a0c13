import type { MetaFunction } from "@remix-run/node";

// PUBLIC_INTERFACE
export const meta: MetaFunction = () => [
  { title: "Projects – devfolio" },
  { name: "description", content: "A showcase of developer projects" },
];

// PUBLIC_INTERFACE
export default function Projects() {
  return (
    <section className="flex flex-col gap-10">
      <header className="flex flex-col items-start gap-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-xl">
          A selection of my personal and professional projects:
        </p>
      </header>
      <div className="grid gap-7 grid-cols-1 sm:grid-cols-2">
        {[1,2,3].map((idx) => (
          <div key={idx} className="rounded-lg border p-6 bg-white dark:bg-gray-950 border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
              Project {idx} Title
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              Short description of this project. Replace with your own!
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center text-gray-400 text-xs">More coming soon.</div>
    </section>
  );
}
