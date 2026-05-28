// AUTO-GENERATED helper. JSON 카드 데이터는 cards.json 에 있음.
import type { Card } from "../types";
import cardsJson from "./cards.json";

export const CARDS: Card[] = cardsJson as Card[];

export const CARDS_BY_ID: Record<string, Card> = Object.fromEntries(
  CARDS.map((c) => [c.id, c])
);
