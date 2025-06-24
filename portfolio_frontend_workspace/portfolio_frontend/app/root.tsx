import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

// PUBLIC_INTERFACE
export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// PUBLIC_INTERFACE
function Header() {
  const nav = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];
  const location = useLocation();

  return (
    <header className="w-full px-5 py-4 flex items-center justify-between border-b border-gray-100 bg-white/80 dark:bg-gray-950/90 backdrop-blur z-30 fixed top-0 left-0 h-16">
      <a
        href="/"
        className="text-xl font-semibold tracking-tight text-primary-700 dark:text-primary-300"
      >
        {/* Logo or Name */}
        <span className="font-bold">dev<span className="text-primary-500">folio</span></span>
      </a>
      <nav>
        <ul className="flex gap-6 md:gap-8 text-gray-800 dark:text-gray-100 font-medium text-base">
          {nav.map(({ to, label }) => (
            <li key={to}>
              <a
                href={to}
                className={`transition-colors hover:text-primary-500 ${
                  location.pathname === to ? "text-primary-600 dark:text-primary-400" : ""
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

// PUBLIC_INTERFACE
function Footer() {
  return (
    <footer className="w-full py-6 flex justify-center text-sm text-gray-400 border-t border-gray-100 mt-20 dark:border-gray-800">
      <span>
        &copy; {new Date().getFullYear()} devfolio &middot; Crafted with Remix &amp; Tailwind CSS
      </span>
    </footer>
  );
}

// PUBLIC_INTERFACE
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-sans">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col relative">
        <Header />
        <main className="flex-1 container mx-auto pt-20 px-4 sm:px-8 max-w-5xl w-full">
          {children}
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// PUBLIC_INTERFACE
export default function App() {
  return <Outlet />;
}
