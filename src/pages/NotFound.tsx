import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <div className="font-mono text-xs uppercase tracking-widest text-brass-600">Error 404</div>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">This entry isn't in the ledger.</h1>
      <p className="mt-2 text-sm text-ink-600">The page you're looking for doesn't exist or has moved.</p>
      <Link
        to="/marketplace"
        className="mt-6 inline-block rounded-sm border border-ink-800 px-4 py-2 text-sm font-medium text-ink-800 hover:bg-ink-900 hover:text-paper-50"
      >
        Back to Marketplace
      </Link>
    </div>
  );
}
