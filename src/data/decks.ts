import type { Deck } from "../types";

// 샘플 메타덱 — 실제 대회 우승 리스트는 아니며, 사용자가 차후 보정·교체 권장.
// 카드 ID 는 한글 카드명 (src/data/cards.ts 와 일치).
export const DECKS: Deck[] = [
  {
    id: "mega-charizard-x",
    name: "메가리자몽X",
    archetype: "불꽃 비트 (MEGA)",
    tier: "S",
    description: "M2 인페르노X의 메가리자몽X 를 메인으로 한 2진화 ex 비트.",
    cards: [
      { cardId: "파이리", count: 4 },
      { cardId: "리자드", count: 1 },
      { cardId: "메가리자몽X", count: 3 },
      { cardId: "이상한사탕", count: 4 },
      { cardId: "네스트볼", count: 4 },
      { cardId: "박사의 연구", count: 3 },
      { cardId: "보스의 지령", count: 2 },
      { cardId: "포켓몬 교체", count: 2 },
      { cardId: "히트버너", count: 2 },
      { cardId: "성스러운 부적", count: 2 },
      { cardId: "불놀이꾼", count: 2 },
      { cardId: "이그니션 에너지", count: 3 },
      { cardId: "기본 불꽃 에너지", count: 10 },
    ],
  },
  {
    id: "mega-gardevoir",
    name: "메가가디안",
    archetype: "사이코 컨트롤 (MEGA)",
    tier: "S",
    description: "M1S 메가심포니아의 메가가디안. 이상한사탕으로 2진화 가속.",
    cards: [
      { cardId: "랄토스", count: 4 },
      { cardId: "킬리아", count: 1 },
      { cardId: "메가가디안", count: 3 },
      { cardId: "이상한사탕", count: 4 },
      { cardId: "네스트볼", count: 4 },
      { cardId: "박사의 연구", count: 3 },
      { cardId: "보스의 지령", count: 2 },
      { cardId: "포켓몬 교체", count: 2 },
      { cardId: "성스러운 부적", count: 2 },
      { cardId: "빛나", count: 2 },
      { cardId: "기본 초 에너지", count: 12 },
    ],
  },
  {
    id: "mega-lucario",
    name: "메가루카리오",
    archetype: "격투 비트 (MEGA)",
    tier: "A",
    description: "M1L 메가브레이브의 메가루카리오. 1진화로 빠른 전개.",
    cards: [
      { cardId: "리오르", count: 4 },
      { cardId: "메가루카리오", count: 3 },
      { cardId: "네스트볼", count: 4 },
      { cardId: "박사의 연구", count: 3 },
      { cardId: "보스의 지령", count: 2 },
      { cardId: "포켓몬 교체", count: 2 },
      { cardId: "성스러운 부적", count: 2 },
      { cardId: "기본 격투 에너지", count: 12 },
    ],
  },
  {
    id: "mega-zygarde",
    name: "메가지가르데",
    archetype: "기본 ex 비트 (MEGA)",
    tier: "A",
    description: "M3 니힐제로의 메가지가르데. 기본 ex 라 진화 부담 없음.",
    cards: [
      { cardId: "메가지가르데", count: 4 },
      { cardId: "네스트볼", count: 4 },
      { cardId: "박사의 연구", count: 3 },
      { cardId: "보스의 지령", count: 2 },
      { cardId: "포켓몬 교체", count: 2 },
      { cardId: "성스러운 부적", count: 2 },
      { cardId: "기본 격투 에너지", count: 10 },
    ],
  },
  {
    id: "mega-greninja",
    name: "메가개굴닌자",
    archetype: "악 닌자 (MEGA)",
    tier: "A",
    description: "M4 닌자스피너의 메가개굴닌자. 1진화 → 2진화 라인.",
    cards: [
      { cardId: "개굴반장", count: 4 },
      { cardId: "메가개굴닌자", count: 3 },
      { cardId: "이상한사탕", count: 4 },
      { cardId: "네스트볼", count: 4 },
      { cardId: "박사의 연구", count: 3 },
      { cardId: "보스의 지령", count: 2 },
      { cardId: "포켓몬 교체", count: 2 },
      { cardId: "기본 악 에너지", count: 10 },
    ],
  },
];

// 중복 cardId 가 있다면 합산해서 비교에 사용
export function deckQuantities(deck: Deck): Record<string, number> {
  const out: Record<string, number> = {};
  for (const entry of deck.cards) {
    out[entry.cardId] = (out[entry.cardId] ?? 0) + entry.count;
  }
  return out;
}

export function deckTotal(deck: Deck): number {
  return deck.cards.reduce((sum, e) => sum + e.count, 0);
}
