import type { OwnedMap, OwnedExpansions } from "../types";

const OWNED_KEY = "deck.owned.v1";
const EXP_KEY = "deck.expansions.v1";

export function loadOwned(): OwnedMap {
  try {
    const raw = localStorage.getItem(OWNED_KEY);
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
    localStorage.setItem(OWNED_KEY, JSON.stringify(map));
  } catch {
    // ignore (private mode / quota)
  }
}

export function loadExpansions(): OwnedExpansions {
  try {
    const raw = localStorage.getItem(EXP_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as OwnedExpansions;
    return {};
  } catch {
    return {};
  }
}

export function saveExpansions(map: OwnedExpansions): void {
  try {
    localStorage.setItem(EXP_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}
