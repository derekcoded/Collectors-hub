import { useEffect, useState } from "react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search…",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [local, setLocal] = useState(value);

  useEffect(() => setLocal(value), [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (local !== value) onChange(local);
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local]);

  return (
    <div className="relative flex-1">
      <input
        type="text"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-sm border border-ink-700/30 bg-paper-50 px-3 py-2 pl-9 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brass-500"
      />
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-ink-400">⌕</span>
    </div>
  );
}
