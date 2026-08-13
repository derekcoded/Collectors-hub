export default function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded border border-rust-500/40 bg-rust-500/5 px-6 py-16 text-center">
      <div className="font-mono text-xs uppercase tracking-widest text-rust-600">Load failed</div>
      <h3 className="font-display text-xl font-medium text-ink-900">This didn't come through.</h3>
      <p className="max-w-sm text-sm text-ink-600">{message}</p>
      <button
        onClick={onRetry}
        className="mt-2 rounded-sm bg-rust-600 px-4 py-2 text-sm font-medium text-paper-50 transition hover:bg-rust-500"
      >
        Try again
      </button>
    </div>
  );
}
