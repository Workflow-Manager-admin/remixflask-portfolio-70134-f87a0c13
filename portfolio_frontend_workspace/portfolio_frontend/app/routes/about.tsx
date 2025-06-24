import type { MetaFunction } from "@remix-run/node";

// PUBLIC_INTERFACE
export const meta: MetaFunction = () => [
  { title: "About – devfolio" },
  { name: "description", content: "About the developer" },
];

// PUBLIC_INTERFACE
export default function About() {
  return (
    <section className="max-w-2xl mx-auto flex flex-col gap-8 pt-4 pb-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h1>
      <p className="text-gray-700 dark:text-gray-300">
        Hi, I&apos;m <span className="font-semibold">[Your Name]</span>. I&apos;m a software developer passionate about building clean and useful things for the web.
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        This site is my portfolio built with <span className="text-primary-600 dark:text-primary-400 font-semibold">Remix</span>. It showcases my projects, blog, and how to contact me for collaboration or freelance work.
      </p>
      <div>
        <span className="block mt-6 text-xs text-gray-400">[Add more about your skills, values, journey, etc.]</span>
      </div>
    </section>
  );
}
