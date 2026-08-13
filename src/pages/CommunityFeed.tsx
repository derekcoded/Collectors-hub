import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { mockPosts } from "../data/mockPosts";
import { categories } from "../data/mockProducts";
import { useAsyncData } from "../hooks/useAsyncData";
import SearchBar from "../components/SearchBar";
import FilterSelect from "../components/FilterSelect";
import PostCard from "../components/PostCard";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import { GridSkeleton } from "../components/Skeleton";

export default function CommunityFeed() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const category = params.get("category") ?? "";

  const { data: posts, loading, error, reload } = useAsyncData(() => mockPosts, []);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    if (!posts) return [];
    return posts
      .filter((p) => {
        const matchesQuery = q.trim() === "" || p.caption.toLowerCase().includes(q.trim().toLowerCase()) || p.userName.toLowerCase().includes(q.trim().toLowerCase());
        const matchesCategory = !category || p.category === category;
        return matchesQuery && matchesCategory;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [posts, q, category]);

  const hasActiveFilters = q || category;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <header className="mb-6">
        <div className="font-mono text-xs uppercase tracking-widest text-brass-600">Module 02</div>
        <h1 className="font-display text-3xl font-semibold text-ink-900">Community Feed</h1>
        <p className="mt-1 text-sm text-ink-600">See what fellow collectors are finding, restoring, and showing off.</p>
      </header>

      <div className="mb-6 flex flex-col gap-3 rounded-sm border border-ink-700/20 bg-paper-100/70 p-3 sm:flex-row sm:items-end sm:gap-4">
        <SearchBar value={q} onChange={(v) => setParam("q", v)} placeholder="Search posts or collectors…" />
        <FilterSelect label="Category" value={category} options={categories} onChange={(v) => setParam("category", v)} />
      </div>

      {loading && <GridSkeleton />}
      {!loading && error && <ErrorState message={error} onRetry={reload} />}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          title={hasActiveFilters ? "No posts match your search." : "The feed is quiet right now."}
          message={
            hasActiveFilters
              ? "Try a different keyword or clear a filter to see more posts."
              : "Once collectors start sharing, their posts will show up here."
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
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
