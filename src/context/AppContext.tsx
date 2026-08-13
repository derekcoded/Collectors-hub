import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CollectionItem, CollectionKey, Product, ToastMessage } from "../types";

const STORAGE_KEY = "collectors-hub:state:v1";

interface PersistedState {
  collections: Record<CollectionKey, CollectionItem[]>;
  likedPostIds: string[];
  savedPostIds: string[];
}

function loadInitialState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as PersistedState;
  } catch {
    // corrupted storage, fall through to defaults
  }
  return {
    collections: { owned: [], wishlist: [], selling: [] },
    likedPostIds: [],
    savedPostIds: [],
  };
}

interface AppContextValue {
  collections: Record<CollectionKey, CollectionItem[]>;
  likedPostIds: Set<string>;
  savedPostIds: Set<string>;
  toasts: ToastMessage[];
  addToCollection: (product: Product, key: CollectionKey) => void;
  removeFromCollection: (key: CollectionKey, itemId: string) => void;
  moveItem: (fromKey: CollectionKey, itemId: string, toKey: CollectionKey) => void;
  isInCollection: (productId: string, key: CollectionKey) => boolean;
  toggleLike: (postId: string) => void;
  toggleSave: (postId: string) => void;
  pushToast: (tone: ToastMessage["tone"], text: string) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const collectionLabels: Record<CollectionKey, string> = {
  owned: "Owned",
  wishlist: "Wishlist",
  selling: "Selling",
};

export function AppProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(loadInitialState, []);
  const [collections, setCollections] = useState(initial.collections);
  const [likedPostIds, setLikedPostIds] = useState(new Set(initial.likedPostIds));
  const [savedPostIds, setSavedPostIds] = useState(new Set(initial.savedPostIds));
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const payload: PersistedState = {
      collections,
      likedPostIds: Array.from(likedPostIds),
      savedPostIds: Array.from(savedPostIds),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // storage unavailable (private browsing, quota) — fail silently
    }
  }, [collections, likedPostIds, savedPostIds]);

  const pushToast = useCallback((tone: ToastMessage["tone"], text: string) => {
    const id = `t${Date.now()}${Math.random().toString(16).slice(2)}`;
    setToasts((prev) => [...prev, { id, tone, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const isInCollection = useCallback(
    (productId: string, key: CollectionKey) => collections[key].some((item) => item.productId === productId),
    [collections]
  );

  const addToCollection = useCallback(
    (product: Product, key: CollectionKey) => {
      setCollections((prev) => {
        const alreadyThere = prev[key].some((item) => item.productId === product.id);
        if (alreadyThere) {
          pushToast("info", `${product.title} is already in ${collectionLabels[key]}.`);
          return prev;
        }
        const newItem: CollectionItem = {
          id: `${key}-${product.id}-${Date.now()}`,
          productId: product.id,
          title: product.title,
          image: product.image,
          category: product.category,
          estimatedValue: product.price,
          dateAdded: new Date().toISOString().slice(0, 10),
        };
        pushToast("success", `Added to ${collectionLabels[key]}.`);
        return { ...prev, [key]: [newItem, ...prev[key]] };
      });
    },
    [pushToast]
  );

  const removeFromCollection = useCallback(
    (key: CollectionKey, itemId: string) => {
      setCollections((prev) => ({ ...prev, [key]: prev[key].filter((item) => item.id !== itemId) }));
      pushToast("info", `Removed from ${collectionLabels[key]}.`);
    },
    [pushToast]
  );

  const moveItem = useCallback(
    (fromKey: CollectionKey, itemId: string, toKey: CollectionKey) => {
      if (fromKey === toKey) return;
      setCollections((prev) => {
        const item = prev[fromKey].find((i) => i.id === itemId);
        if (!item) return prev;
        const destinationHasIt = prev[toKey].some((i) => i.productId === item.productId);
        if (destinationHasIt) {
          pushToast("info", `${item.title} is already in ${collectionLabels[toKey]}.`);
          return prev;
        }
        const movedItem: CollectionItem = { ...item, id: `${toKey}-${item.productId}-${Date.now()}` };
        pushToast("success", `Moved to ${collectionLabels[toKey]}.`);
        return {
          ...prev,
          [fromKey]: prev[fromKey].filter((i) => i.id !== itemId),
          [toKey]: [movedItem, ...prev[toKey]],
        };
      });
    },
    [pushToast]
  );

  const toggleLike = useCallback((postId: string) => {
    setLikedPostIds((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  }, []);

  const toggleSave = useCallback(
    (postId: string) => {
      setSavedPostIds((prev) => {
        const next = new Set(prev);
        const wasSaved = next.has(postId);
        if (wasSaved) next.delete(postId);
        else next.add(postId);
        pushToast("success", wasSaved ? "Post removed from saved." : "Post saved.");
        return next;
      });
    },
    [pushToast]
  );

  const value: AppContextValue = {
    collections,
    likedPostIds,
    savedPostIds,
    toasts,
    addToCollection,
    removeFromCollection,
    moveItem,
    isInCollection,
    toggleLike,
    toggleSave,
    pushToast,
    dismissToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
