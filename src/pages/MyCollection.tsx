import { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { categories } from "../data/mockProducts";
import SearchBar from "../components/SearchBar";
import FilterSelect from "../components/FilterSelect";
import CollectionItemCard from "../components/CollectionItemCard";
import EmptyState from "../components/EmptyState";
import type { CollectionKey } from "../types";

const tabs: { key: CollectionKey; label: string }[] = [
  { key: "owned", label: "Owned" },
  { key: "wishlist", label: "Wishlist" },
  { key: "selling", label: "Selling" },
];

type CollectionSort = "date-desc" | "date-asc" | "value-desc" | "value-asc";

const sortLabels: Record<CollectionSort, string> = {
  "date-desc": "Newest added",
  "date-asc": "Oldest added",
  "value-desc": "Value: high to low",
  "value-asc": "Value: low to high",
};

export default function MyCollection() {
  const { collections } = useApp();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const tab = (params.get("tab") as CollectionKey) || "owned";
  const q = params.get("q") ?? "";
  const category = params.get("category") ?? "";
  const sort = (params.get("csort") as CollectionSort) || "date-desc";

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const items = collections[tab];

  const filtered = useMemo(() => {
    let list = items.filter((item) => {
      const matchesQuery = q.trim() === "" || item.title.toLowerCase().includes(q.trim().toLowerCase());
      const matchesCategory = !category || item.category === category;
      return matchesQuery && matchesCategory;
    });
    list = [...list].sort((a, b) => {
      if (sort === "value-asc") return a.estimatedValue - b.estimatedValue;
      if (sort === "value-desc") return b.estimatedValue - a.estimatedValue;
      if (sort === "date-asc") return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });
    return list;
  }, [items, q, category, sort]);

  const totalValue = items.reduce((sum, i) => sum + i.estimatedValue, 0);
  const hasActiveFilters = q || category;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <header className="mb-6">
        <div className="font-mono text-xs uppercase tracking-widest text-brass-600">Module 03</div>
        <h1 className="font-display text-3xl font-semibold text-ink-900">My Collection</h1>
        <p className="mt-1 text-sm text-ink-600">Track what you own, want, and are letting go of.</p>
      </header>

      <div className="mb-6 flex gap-1 border-b border-ink-700/20">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setParam("tab", t.key)}
            className={`px-4 py-2 text-sm font-medium transition ${
              tab === t.key ? "border-b-2 border-brass-500 text-ink-900" : "text-ink-500 hover:text-ink-800"
            }`}
          >
            {t.label}
            <span className="ml-1.5 font-mono text-xs text-ink-400">({collections[t.key].length})</span>
          </button>
        ))}
      </div>

      <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-wide text-ink-600">
        <span>{items.length} item{items.length !== 1 ? "s" : ""} in {tabs.find((t) => t.key === tab)?.label}</span>
        <span>Estimated total: ${totalValue.toLocaleString()}</span>
      </div>

      <div className="mb-6 flex flex-col gap-3 rounded-sm border border-ink-700/20 bg-paper-100/70 p-3 sm:flex-row sm:items-end sm:gap-4">
        <SearchBar value={q} onChange={(v) => setParam("q", v)} placeholder="Search this collection…" />
        <FilterSelect label="Category" value={category} options={categories} onChange={(v) => setParam("category", v)} />
        <label className="flex flex-col gap-1 text-xs font-mono uppercase tracking-wide text-ink-600">
          Sort by
          <select
            value={sort}
            onChange={(e) => setParam("csort", e.target.value)}
            className="rounded-sm border border-ink-700/30 bg-paper-50 px-2 py-2 text-sm normal-case text-ink-900 focus:border-brass-500"
          >
            {(Object.keys(sortLabels) as CollectionSort[]).map((key) => (
              <option key={key} value={key}>
                {sortLabels[key]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {items.length === 0 && (
        <EmptyState
          title={`Nothing in ${tabs.find((t) => t.key === tab)?.label} yet.`}
          message="Browse the Marketplace and add items to start building this list."
          action={{ label: "Go to Marketplace", onClick: () => navigate("/marketplace") }}
        />
      )}

      {items.length > 0 && filtered.length === 0 && (
        <EmptyState
          title="No items match your search."
          message="Try a different keyword or clear a filter to see more of this collection."
          action={
            hasActiveFilters
              ? {
                  label: "Clear filters",
                  onClick: () => {
                    const next = new URLSearchParams();
                    next.set("tab", tab);
                    setParams(next, { replace: true });
                  },
                }
              : undefined
          }
        />
      )}

      {filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <CollectionItemCard key={item.id} item={item} collectionKey={tab} />
          ))}
        </div>
      )}
    </div>
  );
}
