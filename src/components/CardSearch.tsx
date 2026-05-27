import { useMemo, useState } from "react";
import type { Card, OwnedExpansions } from "../types";
import { CARDS } from "../data/cards";
import { EXPANSIONS_BY_ID } from "../data/expansions";

interface Props {
  onAdd: (cardId: string, delta: number) => void;
  owned: Record<string, number>;
  expansions: OwnedExpansions;
}

const CATEGORY_LABEL: Record<Card["category"], string> = {
  pokemon: "포켓몬",
  trainer: "트레이너",
  energy: "에너지",
};

export default function CardSearch({ onAdd, owned, expansions }: Props) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Card["category"] | "all">("all");
  const [onlyOwnedSets, setOnlyOwnedSets] = useState(false);

  const hasExpansionSelection = Object.values(expansions).some(Boolean);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CARDS.filter((c) => {
      if (filter !== "all" && c.category !== filter) return false;
      if (
        onlyOwnedSets &&
        hasExpansionSelection &&
        c.category !== "energy" &&
        c.setId &&
        !expansions[c.setId]
      ) {
        return false;
      }
      if (!q) return true;
      return c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
    });
  }, [query, filter, onlyOwnedSets, expansions, hasExpansionSelection]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="카드 이름으로 검색 (예: 리자몽, 아이오노)"
          className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Card["category"] | "all")}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
        >
          <option value="all">전체</option>
          <option value="pokemon">포켓몬</option>
          <option value="trainer">트레이너</option>
          <option value="energy">에너지</option>
        </select>
      </div>

      {hasExpansionSelection && (
        <label className="flex items-center gap-2 text-xs text-slate-600">
          <input
            type="checkbox"
            checked={onlyOwnedSets}
            onChange={(e) => setOnlyOwnedSets(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          보유 확장팩 카드만 보기
        </label>
      )}

      <div className="max-h-72 overflow-y-auto rounded-md border border-slate-200 bg-white">
        {results.length === 0 ? (
          <div className="p-4 text-sm text-slate-500">결과 없음</div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {results.map((c) => {
              const count = owned[c.id] ?? 0;
              const exp = c.setId ? EXPANSIONS_BY_ID[c.setId] : undefined;
              return (
                <li
                  key={c.id}
                  className="flex items-center justify-between gap-2 px-3 py-2"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-slate-800">
                      {c.name}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span>{CATEGORY_LABEL[c.category]}</span>
                      {exp && (
                        <span className="truncate text-[10px] text-slate-400">
                          · {exp.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      onClick={() => onAdd(c.id, -1)}
                      disabled={count === 0}
                      className="h-8 w-8 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-30"
                      aria-label="감소"
                    >
                      −
                    </button>
                    <span className="w-7 text-center text-sm tabular-nums">
                      {count}
                    </span>
                    <button
                      onClick={() => onAdd(c.id, 1)}
                      className="h-8 w-8 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                      aria-label="증가"
                    >
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
