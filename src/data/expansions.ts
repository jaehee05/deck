import type { Expansion } from "../types";

// 한국판 스칼렛 & 바이올렛 시리즈 + MEGA 시리즈 (2026-05 「닌자스피너」까지).
// 발매일·명칭에 오류 있으면 보정 부탁드립니다.
export const EXPANSIONS: Expansion[] = [
  // === SV 시리즈 ===
  { id: "sv1S", code: "sv1S", name: "스칼렛 ex", series: "SV", releaseDate: "2023-03-24" },
  { id: "sv1V", code: "sv1V", name: "바이올렛 ex", series: "SV", releaseDate: "2023-03-24" },
  { id: "sv2P", code: "sv2P", name: "클레이버스트", series: "SV", releaseDate: "2023-04-14" },
  { id: "sv2D", code: "sv2D", name: "스노우해저드", series: "SV", releaseDate: "2023-04-14" },
  { id: "sv2a", code: "sv2a", name: "포켓몬카드 151", series: "SV", releaseDate: "2023-06-16" },
  { id: "sv3", code: "sv3", name: "흑염의 사파이어", series: "SV", releaseDate: "2023-07-28" },
  { id: "sv4", code: "sv4", name: "고대의 포효 / 미래의 일섬", series: "SV", releaseDate: "2023-10-27" },
  { id: "sv4a", code: "sv4a", name: "샤이니 트레저 ex", series: "SV", releaseDate: "2023-12-01" },
  { id: "sv5", code: "sv5", name: "와일드포스 / 사이버저지", series: "SV", releaseDate: "2024-01-26" },
  { id: "sv5a", code: "sv5a", name: "크림슨 헤이즈", series: "SV", releaseDate: "2024-03-22" },
  { id: "sv6", code: "sv6", name: "변환의 가면 / 스텔라미라클", series: "SV", releaseDate: "2024-04-26" },
  { id: "sv6a", code: "sv6a", name: "나이트 원더러", series: "SV", releaseDate: "2024-06-07" },
  { id: "sv7", code: "sv7", name: "스텔라 크라운", series: "SV", releaseDate: "2024-09-13" },
  { id: "sv7a", code: "sv7a", name: "낙원 드래고나", series: "SV", releaseDate: "2024-10-18" },
  { id: "sv8", code: "sv8", name: "슈퍼일렉트릭 브레이커", series: "SV", releaseDate: "2024-11-08" },
  { id: "sv8a", code: "sv8a", name: "테라스탈 페스타 ex", series: "SV", releaseDate: "2024-12-06" },
  { id: "sv9", code: "sv9", name: "배틀파트너즈", series: "SV", releaseDate: "2025-03-21" },
  { id: "sv9a", code: "sv9a", name: "열풍의 아레나", series: "SV", releaseDate: "2025-05-16" },
  { id: "sv10", code: "sv10", name: "로켓단의 영광", series: "SV", releaseDate: "2025-06-20" },
  { id: "sv11B", code: "sv11B", name: "블랙볼트", series: "SV", releaseDate: "2025-08-04" },
  { id: "sv11W", code: "sv11W", name: "화이트플레어", series: "SV", releaseDate: "2025-08-04" },

  // === MEGA 시리즈 ===
  { id: "m1L", code: "M1L", name: "메가브레이브", series: "MEGA", releaseDate: "2025-09-26" },
  { id: "m1S", code: "M1S", name: "메가심포니아", series: "MEGA", releaseDate: "2025-09-26" },
  { id: "m2a", code: "M2a", name: "MEGA 드림 ex (하이클래스)", series: "MEGA", releaseDate: "2026-01-23" },
  { id: "m3", code: "M3", name: "니힐제로", series: "MEGA", releaseDate: "2026-03-13" },
  { id: "m4", code: "M4", name: "닌자스피너", series: "MEGA", releaseDate: "2026-05-01" },
];

export const EXPANSIONS_BY_ID: Record<string, Expansion> = Object.fromEntries(
  EXPANSIONS.map((e) => [e.id, e])
);
