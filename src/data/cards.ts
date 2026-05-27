import type { Card } from "../types";

// 카드 풀: 아래 deck 데이터에서 쓰이는 모든 카드의 메타데이터.
// 사용자가 보유 등록할 때 이 목록에서 검색합니다.
export const CARDS: Card[] = [
  // === 포켓몬 ===
  { id: "charizard-ex", name: "리자몽 ex", category: "pokemon" },
  { id: "charcadet", name: "차르피포", category: "pokemon" },
  { id: "armarouge", name: "아르크나이트", category: "pokemon" },
  { id: "pidgey", name: "구구", category: "pokemon" },
  { id: "pidgeot-ex", name: "피죤투 ex", category: "pokemon" },
  { id: "rotom-v", name: "로토무 V", category: "pokemon" },

  { id: "gardevoir-ex", name: "가디안 ex", category: "pokemon" },
  { id: "ralts", name: "랄토스", category: "pokemon" },
  { id: "kirlia", name: "킬리아", category: "pokemon" },
  { id: "scream-tail", name: "스크림테일", category: "pokemon" },
  { id: "munkidori", name: "몽키몽", category: "pokemon" },

  { id: "miraidon-ex", name: "미라이돈 ex", category: "pokemon" },
  { id: "iron-hands-ex", name: "아이언핸드 ex", category: "pokemon" },
  { id: "flaaffy", name: "보송송", category: "pokemon" },
  { id: "raikou-v", name: "라이코 V", category: "pokemon" },

  { id: "sableye", name: "깜까미", category: "pokemon" },
  { id: "comfey", name: "큐아링", category: "pokemon" },
  { id: "cramorant", name: "쥐레쳐", category: "pokemon" },
  { id: "radiant-greninja", name: "광휘의 개굴닌자", category: "pokemon" },
  { id: "manaphy", name: "마나피", category: "pokemon" },

  { id: "terapagos-ex", name: "테라파고스 ex", category: "pokemon" },
  { id: "great-tusk-ex", name: "그레이트턱 ex", category: "pokemon" },
  { id: "fezandipiti-ex", name: "키키링 ex", category: "pokemon" },

  // === 트레이너 ===
  { id: "professors-research", name: "박사의 연구", category: "trainer" },
  { id: "iono", name: "아이오노", category: "trainer" },
  { id: "boss-orders", name: "보스의 지령", category: "trainer" },
  { id: "arven", name: "아르베", category: "trainer" },
  { id: "nest-ball", name: "네스트볼", category: "trainer" },
  { id: "ultra-ball", name: "울트라볼", category: "trainer" },
  { id: "buddy-poffin", name: "다정한 포피", category: "trainer" },
  { id: "super-rod", name: "슈퍼 에너지 회수", category: "trainer" },
  { id: "rare-candy", name: "이상한 사탕", category: "trainer" },
  { id: "counter-catcher", name: "카운터 캐쳐", category: "trainer" },
  { id: "earthen-vessel", name: "대지의 그릇", category: "trainer" },
  { id: "energy-retrieval", name: "에너지 회수", category: "trainer" },
  { id: "lost-vacuum", name: "로스트 스위퍼", category: "trainer" },
  { id: "switch", name: "포켓몬 교체", category: "trainer" },
  { id: "switch-cart", name: "포켓몬 카트", category: "trainer" },
  { id: "bravery-charm", name: "용기의 부적", category: "trainer" },
  { id: "future-energy-capsule", name: "미래의 부스터·에너지 캡슐", category: "trainer" },
  { id: "professor-sada", name: "고대의 보석", category: "trainer" },
  { id: "artazon", name: "아르타사", category: "trainer" },
  { id: "area-zero-underdepths", name: "에리어 제로의 끝", category: "trainer" },
  { id: "tm-evolution", name: "테크니컬 머신: 진화", category: "trainer" },
  { id: "exp-share", name: "학습장치", category: "trainer" },

  // === 에너지 ===
  { id: "fire-energy", name: "기본 불꽃 에너지", category: "energy" },
  { id: "psychic-energy", name: "기본 초 에너지", category: "energy" },
  { id: "lightning-energy", name: "기본 번개 에너지", category: "energy" },
  { id: "darkness-energy", name: "기본 악 에너지", category: "energy" },
  { id: "fighting-energy", name: "기본 격투 에너지", category: "energy" },
];

export const CARDS_BY_ID: Record<string, Card> = Object.fromEntries(
  CARDS.map((c) => [c.id, c])
);
