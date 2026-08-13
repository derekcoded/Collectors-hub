import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { mockProducts, categories, conditions } from "../data/mockProducts";
import { useAsyncData } from "../hooks/useAsyncData";
import SearchBar from "../components/SearchBar";
import FilterSelect from "../components/FilterSelect";
import SortSelect from "../components/SortSelect";
import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import { GridSkeleton } from "../components/Skeleton";
import type { SortOption } from "../types";

export default function Marketplace() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const category = params.get("category") ?? "";
  const condition = params.get("condition") ?? "";
  const sort = (params.get("sort") as SortOption) || "newest";

  const { data: products, loading, error, reload } = useAsyncData(() => mockProducts, []);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    if (!products) return [];
    let list = products.filter((p) => {
      const matchesQuery = q.trim() === "" || p.title.toLowerCase().includes(q.trim().toLowerCase());
      const matchesCategory = !category || p.category === category;
      const matchesCondition = !condition || p.condition === condition;
      return matchesQuery && matchesCategory && matchesCondition;
    });
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return list;
  }, [products, q, category, condition, sort]);

  const hasActiveFilters = q || category || condition;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <header className="mb-6">
        <div className="font-mono text-xs uppercase tracking-widest text-brass-600">Module 01</div>
        <h1 className="font-display text-3xl font-semibold text-ink-900">Marketplace</h1>
        <p className="mt-1 text-sm text-ink-600">Browse collectible listings from sellers across the community.</p>
      </header>

      <div className="mb-6 flex flex-col gap-3 rounded-sm border border-ink-700/20 bg-paper-100/70 p-3 sm:flex-row sm:items-end sm:gap-4">
        <SearchBar value={q} onChange={(v) => setParam("q", v)} placeholder="Search listings by title…" />
        <FilterSelect label="Category" value={category} options={categories} onChange={(v) => setParam("category", v)} />
        <FilterSelect label="Condition" value={condition} options={conditions} onChange={(v) => setParam("condition", v)} />
        <SortSelect value={sort} onChange={(v) => setParam("sort", v)} />
      </div>

      {loading && <GridSkeleton />}
      {!loading && error && <ErrorState message={error} onRetry={reload} />}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          title={hasActiveFilters ? "No listings match your search." : "No listings available yet."}
          message={
            hasActiveFilters
              ? "Try a different keyword or clear a filter to see more results."
              : "Check back soon — sellers add new items regularly."
          }
          action={
            hasActiveFilters
              ? { label: "Clear filters", onClick: () => setParams(new URLSearchParams(), { replace: true }) }
              : undefined
          }
        />
      )}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
