import {
  html,
  render,
  useState,
  useEffect,
} from "https://unpkg.com/htm/preact/standalone.module.js";

export function useStorageState(key, def) {
  const [current, set] = useState(() => {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : def;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(current));
  }, [current]);

  return [current, set];
}
