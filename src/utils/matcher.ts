import type { Deck, OwnedExpansions, OwnedMap } from "../types";
import { CARDS_BY_ID } from "../data/cards";
import { deckQuantities, deckTotal } from "../data/decks";

export interface DeckMatch {
  deck: Deck;
  total: number;
  ownedCount: number;
  missing: { cardId: string; need: number }[];
  matchRate: number;
  // 덱 안에서 「보유 확장팩」에 등장하는 카드 장수 / 총장수.
  // setIds 가 빈 카드(기본 에너지) 는 항상 커버된 것으로 간주.
  setCoveredCount: number;
  setCoverageRate: number;
}

function isCoveredByOwnedSet(
  card: { setIds: string[] } | undefined,
  expansions: OwnedExpansions
): boolean {
  if (!card) return false;
  if (card.setIds.length === 0) return true; // 기본 에너지 등
  return card.setIds.some((s) => expansions[s]);
}

export function evaluateDeck(
  deck: Deck,
  owned: OwnedMap,
  expansions: OwnedExpansions
): DeckMatch {
  const need = deckQuantities(deck);
  const total = deckTotal(deck);
  let ownedCount = 0;
  let setCoveredCount = 0;
  const missing: { cardId: string; need: number }[] = [];

  for (const [cardId, requested] of Object.entries(need)) {
    const have = owned[cardId] ?? 0;
    const matched = Math.min(requested, have);
    ownedCount += matched;
    if (matched < requested) {
      missing.push({ cardId, need: requested - matched });
    }

    if (isCoveredByOwnedSet(CARDS_BY_ID[cardId], expansions)) {
      setCoveredCount += requested;
    }
  }

  return {
    deck,
    total,
    ownedCount,
    missing,
    matchRate: total === 0 ? 0 : ownedCount / total,
    setCoveredCount,
    setCoverageRate: total === 0 ? 0 : setCoveredCount / total,
  };
}

export function rankDecks(
  decks: Deck[],
  owned: OwnedMap,
  expansions: OwnedExpansions
): DeckMatch[] {
  return decks
    .map((d) => evaluateDeck(d, owned, expansions))
    .sort((a, b) => {
      if (b.matchRate !== a.matchRate) return b.matchRate - a.matchRate;
      return b.setCoverageRate - a.setCoverageRate;
    });
}
