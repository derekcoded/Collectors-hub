import { useCallback, useEffect, useState } from "react";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

/**
 * Simulates fetching data from a network endpoint. Adds a short artificial
 * delay so loading states are visible, and occasionally simulates a failed
 * request so error states + retry flows can be exercised.
 */
export function useAsyncData<T>(
  loader: () => T,
  deps: unknown[] = [],
  options?: { delayMs?: number; failRate?: number }
): AsyncState<T> {
  const delayMs = options?.delayMs ?? 500;
  const failRate = options?.failRate ?? 0.05;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      if (cancelled) return;
      if (Math.random() < failRate) {
        setError("We couldn't load this right now. Check your connection and try again.");
        setLoading(false);
        return;
      }
      try {
        const result = loader();
        setData(result);
        setLoading(false);
      } catch {
        setError("Something went wrong while loading this data.");
        setLoading(false);
      }
    }, delayMs);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt, ...deps]);

  return { data, loading, error, reload };
}
