import type { Expansion } from "../types";

// 한국판 스칼렛 & 바이올렛 시리즈 주요 확장팩.
// 정확한 발매일/명칭은 사용자가 보정 가능.
export const EXPANSIONS: Expansion[] = [
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
];

export const EXPANSIONS_BY_ID: Record<string, Expansion> = Object.fromEntries(
  EXPANSIONS.map((e) => [e.id, e])
);
