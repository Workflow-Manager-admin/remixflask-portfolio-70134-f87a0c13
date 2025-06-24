import type { MetaFunction } from "@remix-run/node";

// PUBLIC_INTERFACE
export const meta: MetaFunction = () => [
  { title: "Contact – devfolio" },
  { name: "description", content: "Contact information and form" },
];

// PUBLIC_INTERFACE
export default function Contact() {
  return (
    <section className="flex flex-col items-center pt-6 pb-16 gap-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">Contact</h1>
      <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-100 dark:border-gray-800 shadow-md p-8 flex flex-col items-center w-full max-w-md">
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          Want to get in touch? Send me an email at:
        </p>
        <a
          className="text-primary-600 dark:text-primary-400 underline font-medium text-lg"
          href="mailto:your@email.com"
        >
          your@email.com
        </a>
        <span className="text-xs text-gray-400 mt-5">
          (Contact form coming soon)
        </span>
      </div>
    </section>
  );
}
