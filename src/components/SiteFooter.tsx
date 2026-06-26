export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-teal-700 px-6 py-8 text-center text-sm text-teal-50">
      <p>Abimbola Olumuyiwa — Evolving || Impacting</p>
      <p className="mt-1 text-teal-200">
        © {new Date().getFullYear()} · Built with Next.js &amp; Supabase
      </p>
    </footer>
  );
}
