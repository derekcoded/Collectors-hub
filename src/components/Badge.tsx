import type { ReactNode } from "react";

const toneClasses = {
  brass: "bg-brass-500/15 text-brass-600 border-brass-500/40",
  moss: "bg-moss-500/15 text-moss-600 border-moss-500/40",
  rust: "bg-rust-500/15 text-rust-600 border-rust-500/40",
  ink: "bg-ink-900/8 text-ink-700 border-ink-700/30",
} as const;

export default function Badge({
  children,
  tone = "ink",
}: {
  children: ReactNode;
  tone?: keyof typeof toneClasses;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

export function conditionTone(condition: string): keyof typeof toneClasses {
  if (condition === "Mint" || condition === "Near Mint") return "moss";
  if (condition === "Good") return "brass";
  return "rust";
}
