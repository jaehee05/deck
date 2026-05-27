import type { Deck, OwnedMap } from "../types";
import { deckQuantities, deckTotal } from "../data/decks";

export interface DeckMatch {
  deck: Deck;
  total: number;
  ownedCount: number;
  missing: { cardId: string; need: number }[];
  matchRate: number;
}

export function evaluateDeck(deck: Deck, owned: OwnedMap): DeckMatch {
  const need = deckQuantities(deck);
  const total = deckTotal(deck);
  let ownedCount = 0;
  const missing: { cardId: string; need: number }[] = [];
  for (const [cardId, requested] of Object.entries(need)) {
    const have = owned[cardId] ?? 0;
    const matched = Math.min(requested, have);
    ownedCount += matched;
    if (matched < requested) {
      missing.push({ cardId, need: requested - matched });
    }
  }
  return {
    deck,
    total,
    ownedCount,
    missing,
    matchRate: total === 0 ? 0 : ownedCount / total,
  };
}

export function rankDecks(decks: Deck[], owned: OwnedMap): DeckMatch[] {
  return decks
    .map((d) => evaluateDeck(d, owned))
    .sort((a, b) => b.matchRate - a.matchRate);
}
