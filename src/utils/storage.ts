import type { OwnedMap } from "../types";

const KEY = "deck.owned.v1";

export function loadOwned(): OwnedMap {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as OwnedMap;
    return {};
  } catch {
    return {};
  }
}

export function saveOwned(map: OwnedMap): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    // ignore (private mode / quota)
  }
}
