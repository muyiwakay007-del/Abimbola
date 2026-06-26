import Link from "next/link";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog Posts" },
  { href: "/book-reviews", label: "Book Reviews" },
  { href: "https://www.youtube.com/", label: "YouTube Channel", external: true },
];

export default function SiteHeader() {
  return (
    <header>
      {/* Title band */}
      <div className="bg-white px-6 py-8 text-center sm:text-left sm:px-12">
        <Link href="/" className="inline-block">
          <h1 className="font-script text-5xl text-teal-700 sm:text-6xl">
            Abimbola Olumuyiwa
          </h1>
          <p className="mt-1 text-sm tracking-wide text-gray-500">
            Evolving || Impacting
          </p>
        </Link>
      </div>

      {/* Nav bar */}
      <nav className="bg-teal-600/90 backdrop-blur">
        <ul className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-8 gap-y-2 px-4 py-4 text-sm font-semibold uppercase tracking-wider text-white">
          {NAV.map((item) => (
            <li key={item.href}>
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-teal-100">
                  {item.label}
                </a>
              ) : (
                <Link href={item.href} className="hover:text-teal-100">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
