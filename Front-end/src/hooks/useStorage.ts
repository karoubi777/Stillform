import { useState, useEffect } from "react";

function useWebStorage<T>(
  storageType: "local" | "session",
  key: string,
  initialValue: T,
) {
  const getStorage = () =>
    typeof window === "undefined"
      ? null
      : storageType === "local"
        ? window.localStorage
        : window.sessionStorage;

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = getStorage()?.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      getStorage()?.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Ignore quota / privacy mode errors
    }
  }, [storageType, key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  return useWebStorage("local", key, initialValue);
}

export function useSessionStorage<T>(key: string, initialValue: T) {
  return useWebStorage("session", key, initialValue);
}
