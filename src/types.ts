export type CardCategory = "pokemon" | "trainer" | "energy";

export interface Card {
  id: string;
  name: string;
  category: CardCategory;
  setId?: string;
  number?: string;
}

export interface Expansion {
  id: string;
  code: string;
  name: string;
  series: string;
  releaseDate?: string;
}

export type OwnedExpansions = Record<string, true>;

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
