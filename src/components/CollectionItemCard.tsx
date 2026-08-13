import type { CollectionItem, CollectionKey } from "../types";
import Badge from "./Badge";
import { useApp } from "../context/AppContext";

const otherKeys: Record<CollectionKey, CollectionKey[]> = {
  owned: ["wishlist", "selling"],
  wishlist: ["owned", "selling"],
  selling: ["owned", "wishlist"],
};

const labels: Record<CollectionKey, string> = {
  owned: "Owned",
  wishlist: "Wishlist",
  selling: "Selling",
};

export default function CollectionItemCard({ item, collectionKey }: { item: CollectionItem; collectionKey: CollectionKey }) {
  const { removeFromCollection, moveItem } = useApp();

  return (
    <div className="specimen-tag flex flex-col bg-paper-100">
      <div className="p-3 pb-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-800/10">
          {item.image ? (
            <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-widest text-ink-400">
              No image on file
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="font-display text-base font-medium leading-snug text-ink-900">{item.title}</h3>
        <Badge tone="ink">{item.category}</Badge>
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-base font-semibold text-ink-900">${item.estimatedValue.toLocaleString()}</span>
          <span className="text-xs text-ink-500">Added {item.dateAdded}</span>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {otherKeys[collectionKey].map((toKey) => (
            <button
              key={toKey}
              onClick={() => moveItem(collectionKey, item.id, toKey)}
              className="rounded-sm border border-ink-700/40 px-2 py-1 text-[11px] font-medium text-ink-700 transition hover:bg-ink-900 hover:text-paper-50"
            >
              Move to {labels[toKey]}
            </button>
          ))}
          <button
            onClick={() => removeFromCollection(collectionKey, item.id)}
            className="rounded-sm border border-rust-500/50 px-2 py-1 text-[11px] font-medium text-rust-600 transition hover:bg-rust-600 hover:text-paper-50"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
