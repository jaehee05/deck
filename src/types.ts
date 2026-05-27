export type CardCategory = "pokemon" | "trainer" | "energy";

export interface Card {
  id: string;
  name: string;
  category: CardCategory;
  set?: string;
  number?: string;
}

export interface DeckEntry {
  cardId: string;
  count: number;
}

export interface Deck {
  id: string;
  name: string;
  archetype: string;
  tier: "S" | "A" | "B";
  description: string;
  cards: DeckEntry[];
}

export type OwnedMap = Record<string, number>;
