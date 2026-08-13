import { Link } from "react-router-dom";
import type { Product } from "../types";
import Badge, { conditionTone } from "./Badge";
import { useApp } from "../context/AppContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCollection, isInCollection } = useApp();
  const inWishlist = isInCollection(product.id, "wishlist");
  const inOwned = isInCollection(product.id, "owned");
  const catalogNo = product.id.replace(/\D/g, "").padStart(4, "0");

  return (
    <div className="specimen-tag flex flex-col bg-paper-100 transition hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/marketplace/${product.id}`} className="block p-3 pb-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-800/10">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-widest text-ink-400">
              No image on file
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="catalog-number font-mono text-[11px] text-ink-400">{catalogNo}</div>
        <Link to={`/marketplace/${product.id}`}>
          <h3 className="font-display text-base font-medium leading-snug text-ink-900 hover:text-brass-600">
            {product.title}
          </h3>
        </Link>
        <div className="flex flex-wrap gap-1.5">
          <Badge tone="ink">{product.category}</Badge>
          <Badge tone={conditionTone(product.condition)}>{product.condition}</Badge>
        </div>
        <div className="mt-1 flex items-baseline justify-between">
          <span className="font-mono text-lg font-semibold text-ink-900">${product.price.toLocaleString()}</span>
          <span className="text-xs text-ink-600">{product.location}</span>
        </div>
        <div className="text-xs text-ink-500">Seller: {product.sellerName}</div>

        <div className="mt-2 flex gap-2">
          <button
            onClick={() => addToCollection(product, "owned")}
            disabled={inOwned}
            className="flex-1 rounded-sm border border-ink-800 px-2 py-1.5 text-xs font-medium text-ink-800 transition hover:bg-ink-900 hover:text-paper-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {inOwned ? "In Collection" : "Add to Collection"}
          </button>
          <button
            onClick={() => addToCollection(product, "wishlist")}
            disabled={inWishlist}
            aria-label="Add to wishlist"
            className="rounded-sm border border-brass-500 px-2 py-1.5 text-xs font-medium text-brass-600 transition hover:bg-brass-500 hover:text-paper-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {inWishlist ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
}
