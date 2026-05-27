import type { Deck, OwnedExpansions, OwnedMap } from "../types";
import { CARDS_BY_ID } from "../data/cards";
import { deckQuantities, deckTotal } from "../data/decks";

export interface DeckMatch {
  deck: Deck;
  total: number;
  ownedCount: number;
  missing: { cardId: string; need: number }[];
  matchRate: number;
  // 덱 안에서 「보유 확장팩」에 속한 카드 장수 / 총장수
  // 에너지(setId 없음) 는 항상 포함된 것으로 간주 (기본 에너지는 어디서나 구할 수 있음).
  setCoveredCount: number;
  setCoverageRate: number;
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

    const card = CARDS_BY_ID[cardId];
    const isCoveredBySet =
      !card?.setId || // setId 없으면 기본 에너지·재판 가정 → 항상 커버
      expansions[card.setId];
    if (isCoveredBySet) setCoveredCount += requested;
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
