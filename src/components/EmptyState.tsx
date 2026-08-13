export default function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded border border-dashed border-ink-700/30 bg-paper-100/60 px-6 py-16 text-center">
      <div className="font-mono text-xs uppercase tracking-widest text-ink-600">Empty ledger entry</div>
      <h3 className="font-display text-xl font-medium text-ink-900">{title}</h3>
      <p className="max-w-sm text-sm text-ink-600">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-2 rounded-sm border border-ink-800 px-4 py-2 text-sm font-medium text-ink-800 transition hover:bg-ink-900 hover:text-paper-50"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
