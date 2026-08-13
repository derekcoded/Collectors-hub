import { useApp } from "../context/AppContext";

const toneClasses = {
  success: "border-moss-500 text-moss-600",
  info: "border-brass-500 text-brass-600",
  error: "border-rust-500 text-rust-600",
};

export default function ToastStack() {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex w-[min(360px,90vw)] -translate-x-1/2 flex-col gap-2 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={`flex items-center justify-between gap-3 rounded-sm border-l-4 bg-ink-900 px-4 py-3 text-sm text-paper-50 shadow-lg ${toneClasses[toast.tone]}`}
        >
          <span>{toast.text}</span>
          <button
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
            className="text-paper-200 hover:text-paper-50"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
