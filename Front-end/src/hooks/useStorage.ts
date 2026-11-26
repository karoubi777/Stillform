import { useState, useEffect, useCallback, useRef } from "react";

const SYNC_EVENT = "web-storage-sync";

type StorageSyncDetail = {
  storageType: "local" | "session";
  key: string;
  value: unknown;
};

function getStorageArea(storageType: "local" | "session"): Storage | null {
  if (typeof window === "undefined") return null;
  return storageType === "local" ? window.localStorage : window.sessionStorage;
}

function readFromStorage<T>(
  storageType: "local" | "session",
  key: string,
  initialValue: T,
): T {
  try {
    const raw = getStorageArea(storageType)?.getItem(key);
    if (!raw || raw === "undefined" || raw === "null") return initialValue;
    return JSON.parse(raw) as T;
  } catch {
    return initialValue;
  }
}

function useWebStorage<T>(
  storageType: "local" | "session",
  key: string,
  initialValue: T,
) {
  const [storedValue, setStoredValue] = useState<T>(() =>
    readFromStorage(storageType, key, initialValue),
  );

  const latestRef = useRef<T>(storedValue);
  latestRef.current = storedValue;

  // Sync when another component updates the same storageType + key
  useEffect(() => {
    function handleSync(e: Event) {
      const custom = e as CustomEvent<StorageSyncDetail>;
      if (
        custom.detail.storageType === storageType &&
        custom.detail.key === key
      ) {
        latestRef.current = custom.detail.value as T;
        setStoredValue(custom.detail.value as T);
      }
    }

    window.addEventListener(SYNC_EVENT, handleSync);
    return () => window.removeEventListener(SYNC_EVENT, handleSync);
  }, [storageType, key]);

  const setValue = useCallback(
    (valueOrUpdater: T | ((prev: T) => T)) => {
      const current = readFromStorage(storageType, key, latestRef.current);
      const nextValue =
        typeof valueOrUpdater === "function"
          ? (valueOrUpdater as (prev: T) => T)(current)
          : valueOrUpdater;

      latestRef.current = nextValue;
      setStoredValue(nextValue);

      try {
        getStorageArea(storageType)?.setItem(key, JSON.stringify(nextValue));
      } catch {
        // Ignore quota / privacy mode errors
      }

      // Notify other hook instances cleanly after this state enqueue
      queueMicrotask(() => {
        window.dispatchEvent(
          new CustomEvent<StorageSyncDetail>(SYNC_EVENT, {
            detail: { storageType, key, value: nextValue },
          }),
        );
      });
    },
    [storageType, key],
  );

  return [storedValue, setValue] as const;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  return useWebStorage("local", key, initialValue);
}

export function useSessionStorage<T>(key: string, initialValue: T) {
  return useWebStorage("session", key, initialValue);
}
