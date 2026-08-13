import type { SortOption } from "../types";

const labels: Record<SortOption, string> = {
  newest: "Newest first",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
};

export default function SortSelect({ value, onChange }: { value: SortOption; onChange: (v: SortOption) => void }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-mono uppercase tracking-wide text-ink-600">
      Sort by
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="rounded-sm border border-ink-700/30 bg-paper-50 px-2 py-2 text-sm normal-case text-ink-900 focus:border-brass-500"
      >
        {(Object.keys(labels) as SortOption[]).map((key) => (
          <option key={key} value={key}>
            {labels[key]}
          </option>
        ))}
      </select>
    </label>
  );
}
