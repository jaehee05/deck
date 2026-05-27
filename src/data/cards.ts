import type { Card } from "../types";

// 카드 풀: 아래 deck 데이터에서 쓰이는 모든 카드의 메타데이터.
// 사용자가 보유 등록할 때 이 목록에서 검색합니다.
// setId 는 SV 시리즈 한국 발매 기준 추정값 — 사용자 보정 환영.
// 기본 에너지는 모든 세트에 존재한다고 가정하고 setId 생략.
export const CARDS: Card[] = [
  // === 포켓몬 ===
  { id: "charizard-ex", name: "리자몽 ex", category: "pokemon", setId: "sv3" },
  { id: "charcadet", name: "차르피포", category: "pokemon", setId: "sv3" },
  { id: "armarouge", name: "아르크나이트", category: "pokemon", setId: "sv2P" },
  { id: "pidgey", name: "구구", category: "pokemon", setId: "sv2a" },
  { id: "pidgeot-ex", name: "피죤투 ex", category: "pokemon", setId: "sv2a" },
  { id: "rotom-v", name: "로토무 V", category: "pokemon" }, // SwSh — SV 외

  { id: "gardevoir-ex", name: "가디안 ex", category: "pokemon", setId: "sv1V" },
  { id: "ralts", name: "랄토스", category: "pokemon", setId: "sv1V" },
  { id: "kirlia", name: "킬리아", category: "pokemon", setId: "sv1V" },
  { id: "scream-tail", name: "스크림테일", category: "pokemon", setId: "sv4" },
  { id: "munkidori", name: "몽키몽", category: "pokemon", setId: "sv6a" },

  { id: "miraidon-ex", name: "미라이돈 ex", category: "pokemon", setId: "sv1V" },
  { id: "iron-hands-ex", name: "아이언핸드 ex", category: "pokemon", setId: "sv4" },
  { id: "flaaffy", name: "보송송", category: "pokemon", setId: "sv1V" },
  { id: "raikou-v", name: "라이코 V", category: "pokemon" }, // SwSh

  { id: "sableye", name: "깜까미", category: "pokemon", setId: "sv5a" },
  { id: "comfey", name: "큐아링", category: "pokemon", setId: "sv3" },
  { id: "cramorant", name: "쥐레쳐", category: "pokemon", setId: "sv3" },
  { id: "radiant-greninja", name: "광휘의 개굴닌자", category: "pokemon" }, // SwSh
  { id: "manaphy", name: "마나피", category: "pokemon", setId: "sv4a" },

  { id: "terapagos-ex", name: "테라파고스 ex", category: "pokemon", setId: "sv7" },
  { id: "great-tusk-ex", name: "그레이트턱 ex", category: "pokemon", setId: "sv1V" },
  { id: "fezandipiti-ex", name: "키키링 ex", category: "pokemon", setId: "sv6a" },

  // === 트레이너 ===
  { id: "professors-research", name: "박사의 연구", category: "trainer", setId: "sv1V" },
  { id: "iono", name: "아이오노", category: "trainer", setId: "sv2P" },
  { id: "boss-orders", name: "보스의 지령", category: "trainer" }, // 재판 다수
  { id: "arven", name: "아르베", category: "trainer", setId: "sv2P" },
  { id: "nest-ball", name: "네스트볼", category: "trainer", setId: "sv1V" },
  { id: "ultra-ball", name: "울트라볼", category: "trainer", setId: "sv1V" },
  { id: "buddy-poffin", name: "다정한 포피", category: "trainer", setId: "sv4a" },
  { id: "super-rod", name: "슈퍼 에너지 회수", category: "trainer", setId: "sv2D" },
  { id: "rare-candy", name: "이상한 사탕", category: "trainer", setId: "sv1V" },
  { id: "counter-catcher", name: "카운터 캐쳐", category: "trainer", setId: "sv5" },
  { id: "earthen-vessel", name: "대지의 그릇", category: "trainer", setId: "sv4" },
  { id: "energy-retrieval", name: "에너지 회수", category: "trainer", setId: "sv1V" },
  { id: "lost-vacuum", name: "로스트 스위퍼", category: "trainer", setId: "sv5" },
  { id: "switch", name: "포켓몬 교체", category: "trainer", setId: "sv1V" },
  { id: "switch-cart", name: "포켓몬 카트", category: "trainer", setId: "sv2D" },
  { id: "bravery-charm", name: "용기의 부적", category: "trainer", setId: "sv5" },
  { id: "future-energy-capsule", name: "미래의 부스터·에너지 캡슐", category: "trainer", setId: "sv4" },
  { id: "professor-sada", name: "사다 박사의 결의", category: "trainer", setId: "sv4" },
  { id: "artazon", name: "아르타사", category: "trainer", setId: "sv2P" },
  { id: "area-zero-underdepths", name: "에리어 제로의 끝", category: "trainer", setId: "sv7" },
  { id: "tm-evolution", name: "테크니컬 머신: 진화", category: "trainer", setId: "sv4" },
  { id: "exp-share", name: "학습장치", category: "trainer", setId: "sv1V" },

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
