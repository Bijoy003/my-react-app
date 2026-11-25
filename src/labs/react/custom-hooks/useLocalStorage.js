import { useDebugValue, useEffect, useState } from "react";

function readStored(key, fallback) {
  try {
    const stored = window.localStorage.getItem(key);
    return stored === null ? fallback : JSON.parse(stored);
  } catch {
    return fallback;
  }
}

// State + persistence behind one call. Every component that calls this hook
// gets its own state; only the storage key is shared.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStored(key, initialValue));

  // Labels the value in React DevTools' Components panel.
  useDebugValue(value);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can be full or blocked (private mode). The in-memory value
      // still works for this session, so there is nothing to recover from.
    }
  }, [key, value]);

  return [value, setValue];
}
