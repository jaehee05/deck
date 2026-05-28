import type { Expansion } from "../types";

// 한국판 스칼렛 & 바이올렛 + MEGA 시리즈.
// 코드는 사용자의 Google Sheet 마크와 일치 (대문자 SV/M 접두).
// 발매일·명칭에 오류 있으면 보정 부탁드립니다.
export const EXPANSIONS: Expansion[] = [
  // === SV 시리즈 ===
  { id: "SV1S", code: "SV1S", name: "스칼렛 ex", series: "SV", releaseDate: "2023-03-24" },
  { id: "SV1V", code: "SV1V", name: "바이올렛 ex", series: "SV", releaseDate: "2023-03-24" },
  { id: "SV2P", code: "SV2P", name: "클레이버스트", series: "SV", releaseDate: "2023-04-14" },
  { id: "SV2D", code: "SV2D", name: "스노우해저드", series: "SV", releaseDate: "2023-04-14" },
  { id: "SV2a", code: "SV2a", name: "포켓몬카드 151", series: "SV", releaseDate: "2023-06-16" },
  { id: "SV3", code: "SV3", name: "흑염의 사파이어", series: "SV", releaseDate: "2023-07-28" },
  { id: "SV4K", code: "SV4K", name: "고대의 포효", series: "SV", releaseDate: "2023-10-27" },
  { id: "SV4M", code: "SV4M", name: "미래의 일섬", series: "SV", releaseDate: "2023-10-27" },
  { id: "SV4a", code: "SV4a", name: "샤이니트레저 ex", series: "SV", releaseDate: "2023-12-01" },
  { id: "SV5K", code: "SV5K", name: "와일드포스", series: "SV", releaseDate: "2024-01-26" },
  { id: "SV5M", code: "SV5M", name: "사이버저지", series: "SV", releaseDate: "2024-01-26" },
  { id: "SV5a", code: "SV5a", name: "크림슨 헤이즈", series: "SV", releaseDate: "2024-03-22" },
  { id: "SV6", code: "SV6", name: "변환의 가면", series: "SV", releaseDate: "2024-04-26" },
  { id: "SV6a", code: "SV6a", name: "나이트 원더러", series: "SV", releaseDate: "2024-06-07" },
  { id: "SV7", code: "SV7", name: "스텔라미라클", series: "SV", releaseDate: "2024-09-13" },
  { id: "SV7a", code: "SV7a", name: "낙원드래고나", series: "SV", releaseDate: "2024-10-18" },
  { id: "SV8", code: "SV8", name: "초전브레이커", series: "SV", releaseDate: "2024-11-08" },
  { id: "SV8a", code: "SV8a", name: "테라스탈 페스타 ex", series: "SV", releaseDate: "2024-12-06" },
  { id: "SV9", code: "SV9", name: "배틀파트너즈", series: "SV", releaseDate: "2025-03-21" },
  { id: "SV9a", code: "SV9a", name: "열풍의 아레나", series: "SV", releaseDate: "2025-05-16" },
  { id: "SV10", code: "SV10", name: "로켓단의 영광", series: "SV", releaseDate: "2025-06-20" },
  { id: "SV11B", code: "SV11B", name: "블랙볼트", series: "SV", releaseDate: "2025-08-04" },
  { id: "SV11W", code: "SV11W", name: "화이트플레어", series: "SV", releaseDate: "2025-08-04" },

  // === MEGA 시리즈 ===
  { id: "M1L", code: "M1L", name: "메가브레이브", series: "MEGA", releaseDate: "2025-09-26" },
  { id: "M1S", code: "M1S", name: "메가심포니아", series: "MEGA", releaseDate: "2025-09-26" },
  { id: "M2", code: "M2", name: "인페르노X", series: "MEGA", releaseDate: "2025-11-28" },
  { id: "M2a", code: "M2a", name: "MEGA 드림 ex (하이클래스)", series: "MEGA", releaseDate: "2026-01-23" },
  { id: "M3", code: "M3", name: "니힐제로", series: "MEGA", releaseDate: "2026-03-13" },
  { id: "M4", code: "M4", name: "닌자스피너", series: "MEGA", releaseDate: "2026-05-01" },
];

export const EXPANSIONS_BY_ID: Record<string, Expansion> = Object.fromEntries(
  EXPANSIONS.map((e) => [e.id, e])
);
