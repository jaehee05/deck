#!/usr/bin/env node
// Google Sheets → src/data/cards.json 생성기.
// 기본 동작: 시트에서 fetch (네트워크 필요). 실패 시 data/csv/*.csv 캐시로 폴백.
// 사용: node scripts/import-cards.mjs            # fetch + 캐시 갱신
//      node scripts/import-cards.mjs --offline   # 로컬 CSV 캐시만 사용

import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CSV_DIR = join(ROOT, "data/csv");
const OUT_JSON = join(ROOT, "src/data/cards.json");
const OUT_TS = join(ROOT, "src/data/cards.ts");

const SHEET_ID = "1rSc8JRdUtsrEpB-No0u7NX8Lw4vVJRw95P66DUPCZoY";
const TABS = [
  ["SV4K", 322551539],
  ["SV4M", 341011747],
  ["SV4a", 61606955],
  ["SV5M", 555764380],
  ["SV5K", 37796221],
  ["SV5a", 235544594],
  ["SV6", 605078508],
  ["SV6a", 530246245],
  ["SV7", 1097879857],
  ["SV7a", 18464719],
  ["SV8", 161808140],
  ["SV8a", 624246334],
  ["SV9", 193590940],
  ["SV9a", 1325270399],
  ["SV10", 178991155],
  ["SV11B", 2108396302],
  ["SV11W", 1154668654],
  ["M1S", 1257466075],
  ["M1L", 923039675],
  ["M2", 0],
  ["M3", 1358695999],
  ["M4", 1381922965],
];

const offline = process.argv.includes("--offline");

mkdirSync(CSV_DIR, { recursive: true });

async function fetchCsv(code, gid) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (deck-importer)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${code} (gid=${gid}): HTTP ${res.status}`);
  const text = await res.text();
  // 최소 sanity check (헤더가 한글이어야 함)
  if (!text.startsWith("컬렉션 넘버")) {
    throw new Error(`${code}: 헤더 mismatch, 시트 권한 확인 필요`);
  }
  writeFileSync(join(CSV_DIR, `${code}.csv`), text, "utf-8");
  return text;
}

function loadCachedCsv(code) {
  return readFileSync(join(CSV_DIR, `${code}.csv`), "utf-8");
}

// 단순 CSV 파서 (RFC 4180)
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
      } else cell += ch;
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
      } else cell += ch;
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
  return "trainer";
}

function isAceSpec(typeCol) {
  return (typeCol || "").includes("ACE SPEC");
}

const byName = new Map();

async function processAll() {
  if (offline) {
    console.log("offline mode: 로컬 CSV 캐시 사용");
    const files = readdirSync(CSV_DIR).filter((f) => f.endsWith(".csv"));
    for (const f of files) {
      const code = f.replace(/\.csv$/, "");
      ingest(code, loadCachedCsv(code));
    }
    return;
  }

  console.log(`fetching ${TABS.length} 탭 from Google Sheets…`);
  const results = await Promise.allSettled(
    TABS.map(async ([code, gid]) => {
      try {
        const text = await fetchCsv(code, gid);
        return { code, text, ok: true };
      } catch (err) {
        return { code, err, ok: false };
      }
    })
  );

  for (const r of results) {
    if (r.status !== "fulfilled") continue;
    const v = r.value;
    if (v.ok) {
      ingest(v.code, v.text);
      console.log(`  ${v.code}: ok`);
    } else {
      // 폴백: 캐시된 CSV 사용 시도
      try {
        const cached = loadCachedCsv(v.code);
        ingest(v.code, cached);
        console.warn(`  ${v.code}: fetch 실패 (${v.err.message}), 캐시 사용`);
      } catch {
        console.error(`  ${v.code}: 실패 + 캐시 없음 — 스킵`);
      }
    }
  }
}

function ingest(code, csvText) {
  const rows = parseCsv(csvText);
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (r.length < 5) continue;
    const name = (r[2] || "").trim();
    if (!name) continue;
    const cat = categoryOf(r[3], r[4]);
    const ace = isAceSpec(r[3]);
    let entry = byName.get(name);
    if (!entry) {
      entry = { name, category: cat, setIds: new Set(), aceSpec: ace };
      byName.set(name, entry);
    } else {
      if (entry.category !== cat && cat === "pokemon") entry.category = cat;
      if (ace) entry.aceSpec = true;
    }
    entry.setIds.add(code);
  }
}

await processAll();

// 기본 에너지는 시트에 없거나 일부만 있어 가상 항목으로 보강 (어디서든 사용 가능)
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
      setIds: new Set(),
      aceSpec: false,
    });
  }
}

console.log(`\n총 ${byName.size} 종 카드`);
const counts = { pokemon: 0, trainer: 0, energy: 0 };
for (const v of byName.values()) counts[v.category]++;
console.log(
  `  포켓몬 ${counts.pokemon}, 트레이너 ${counts.trainer}, 에너지 ${counts.energy}`
);

const ordered = [...byName.values()].sort((a, b) => {
  const order = { pokemon: 0, trainer: 1, energy: 2 };
  if (order[a.category] !== order[b.category])
    return order[a.category] - order[b.category];
  return a.name.localeCompare(b.name, "ko");
});

const jsonArr = ordered.map((c) => ({
  id: c.name,
  name: c.name,
  category: c.category,
  setIds: [...c.setIds].sort(),
  ...(c.aceSpec ? { aceSpec: true } : {}),
}));
writeFileSync(OUT_JSON, JSON.stringify(jsonArr, null, 2), "utf-8");
console.log(`\n→ wrote ${OUT_JSON} (${jsonArr.length} cards)`);

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
