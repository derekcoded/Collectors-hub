import { Link, useNavigate, useParams } from "react-router-dom";
import { mockProducts } from "../data/mockProducts";
import { useAsyncData } from "../hooks/useAsyncData";
import Badge, { conditionTone } from "../components/Badge";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { useApp } from "../context/AppContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCollection, isInCollection } = useApp();

  const { data: product, loading, error, reload } = useAsyncData(
    () => mockProducts.find((p) => p.id === id) ?? null,
    [id]
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl animate-pulse px-4 py-10 sm:px-6">
        <div className="mb-4 aspect-video w-full bg-ink-800/10" />
        <div className="mb-2 h-6 w-2/3 bg-ink-800/15" />
        <div className="h-4 w-1/3 bg-ink-800/10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <ErrorState message={error} onRetry={reload} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <EmptyState
          title="Listing not found."
          message="This item may have been removed or the link is out of date."
          action={{ label: "Back to Marketplace", onClick: () => navigate("/marketplace") }}
        />
      </div>
    );
  }

  const inWishlist = isInCollection(product.id, "wishlist");
  const inOwned = isInCollection(product.id, "owned");

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link to="/marketplace" className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-ink-600 hover:text-brass-600">
        ← Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="specimen-tag aspect-[4/3] w-full overflow-hidden bg-ink-800/10 p-3">
          {product.image ? (
            <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-widest text-ink-400">
              No image on file
            </div>
          )}
        </div>

        <div>
          <div className="catalog-number font-mono text-xs text-ink-400">{product.id.replace(/\D/g, "").padStart(4, "0")}</div>
          <h1 className="font-display text-3xl font-semibold text-ink-900">{product.title}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge tone="ink">{product.category}</Badge>
            <Badge tone={conditionTone(product.condition)}>{product.condition}</Badge>
          </div>
          <div className="mt-4 font-mono text-3xl font-semibold text-ink-900">${product.price.toLocaleString()}</div>
          <p className="mt-4 text-sm leading-relaxed text-ink-700">{product.description}</p>

          <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-ink-700/20 pt-4 text-sm">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-500">Seller</dt>
              <dd className="text-ink-800">{product.sellerName}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-500">Location</dt>
              <dd className="text-ink-800">{product.location}</dd>
            </div>
          </dl>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => addToCollection(product, "owned")}
              disabled={inOwned}
              className="flex-1 rounded-sm bg-ink-900 px-4 py-2.5 text-sm font-medium text-paper-50 transition hover:bg-ink-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {inOwned ? "Already in Collection" : "Add to Collection"}
            </button>
            <button
              onClick={() => addToCollection(product, "wishlist")}
              disabled={inWishlist}
              className="rounded-sm border border-brass-500 px-4 py-2.5 text-sm font-medium text-brass-600 transition hover:bg-brass-500 hover:text-paper-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {inWishlist ? "♥ Wishlisted" : "♡ Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
