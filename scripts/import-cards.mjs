#!/usr/bin/env node
// CSV (Google Sheets export) → src/data/cards.ts 생성기
// 사용: node scripts/import-cards.mjs

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CSV_DIR = join(ROOT, "data/csv");
const OUT_JSON = join(ROOT, "src/data/cards.json");
const OUT_TS = join(ROOT, "src/data/cards.ts");

// 매우 단순한 CSV 파서 (Google Sheets export 는 RFC 4180 따름)
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === ",") {
        row.push(cell);
        cell = "";
      } else if (ch === "\n") {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
      } else if (ch === "\r") {
        // skip
      } else {
        cell += ch;
      }
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

function categoryOf(typeCol, classCol) {
  const t = (typeCol || "").trim();
  const c = (classCol || "").trim();
  if (c.includes("포켓몬")) return "pokemon";
  if (t.includes("에너지")) return "energy";
  if (
    t.startsWith("아이템") ||
    t.startsWith("서포트") ||
    t.startsWith("스타디움") ||
    t.startsWith("포켓몬의 도구")
  )
    return "trainer";
  return "trainer"; // fallback (대부분 트레이너 변종)
}

function isAceSpec(typeCol) {
  return (typeCol || "").includes("ACE SPEC");
}

const csvFiles = readdirSync(CSV_DIR).filter((f) => f.endsWith(".csv"));
console.log(`Reading ${csvFiles.length} CSV files…`);

/** @type {Map<string, { name:string, category:string, setIds:Set<string>, aceSpec:boolean }>} */
const byName = new Map();

for (const file of csvFiles) {
  const code = file.replace(/\.csv$/, "");
  const text = readFileSync(join(CSV_DIR, file), "utf-8");
  const rows = parseCsv(text);
  let count = 0;
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (r.length < 5) continue;
    const name = (r[2] || "").trim();
    if (!name) continue;
    const cat = categoryOf(r[3], r[4]);
    const ace = isAceSpec(r[3]);
    const key = name;
    let entry = byName.get(key);
    if (!entry) {
      entry = { name, category: cat, setIds: new Set(), aceSpec: ace };
      byName.set(key, entry);
    } else {
      // 카테고리 충돌 시 포켓몬 우선 (희박할 듯)
      if (entry.category !== cat && cat === "pokemon") entry.category = cat;
      if (ace) entry.aceSpec = true;
    }
    entry.setIds.add(code);
    count++;
  }
  console.log(`  ${code}: ${count} rows`);
}

// 기본 에너지는 시트에 없으므로 가상 항목으로 추가 (모든 확장팩에서 사용 가능)
const BASIC_ENERGIES = [
  "기본 불꽃 에너지",
  "기본 물 에너지",
  "기본 풀 에너지",
  "기본 번개 에너지",
  "기본 초 에너지",
  "기본 격투 에너지",
  "기본 악 에너지",
  "기본 강철 에너지",
];
for (const name of BASIC_ENERGIES) {
  if (!byName.has(name)) {
    byName.set(name, {
      name,
      category: "energy",
      setIds: new Set(), // 비어있음 = 어느 확장팩에서나 사용 가능
      aceSpec: false,
    });
  }
}

console.log(`\n총 ${byName.size} 종 카드 (이름 기준 dedup)`);

// 카테고리별 카운트
const counts = { pokemon: 0, trainer: 0, energy: 0 };
for (const v of byName.values()) counts[v.category]++;
console.log(
  `  포켓몬 ${counts.pokemon}, 트레이너 ${counts.trainer}, 에너지 ${counts.energy}`
);

// 출력 순서: 카테고리 → 이름순
const ordered = [...byName.values()].sort((a, b) => {
  const order = { pokemon: 0, trainer: 1, energy: 2 };
  if (order[a.category] !== order[b.category])
    return order[a.category] - order[b.category];
  return a.name.localeCompare(b.name, "ko");
});

// JSON 으로 카드 데이터 출력 — TS 가 1300+ element union 추론을 못 해서 폭발하기에 분리.
const jsonArr = ordered.map((c) => ({
  id: c.name,
  name: c.name,
  category: c.category,
  setIds: [...c.setIds].sort(),
  ...(c.aceSpec ? { aceSpec: true } : {}),
}));
writeFileSync(OUT_JSON, JSON.stringify(jsonArr, null, 2), "utf-8");
console.log(`\n→ wrote ${OUT_JSON} (${jsonArr.length} cards)`);

// 얇은 re-export ts 도 같이 갱신 (수동 편집해도 됨)
const tsOut =
  `// AUTO-GENERATED helper. JSON 카드 데이터는 cards.json 에 있음.\n` +
  `import type { Card } from "../types";\n` +
  `import cardsJson from "./cards.json";\n\n` +
  `export const CARDS: Card[] = cardsJson as Card[];\n\n` +
  `export const CARDS_BY_ID: Record<string, Card> = Object.fromEntries(\n` +
  `  CARDS.map((c) => [c.id, c])\n` +
  `);\n`;
writeFileSync(OUT_TS, tsOut, "utf-8");
console.log(`→ wrote ${OUT_TS}`);
