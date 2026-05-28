import { useMemo, useState } from "react";
import type { Expansion, OwnedExpansions } from "../types";
import { EXPANSIONS } from "../data/expansions";

interface Props {
  owned: OwnedExpansions;
  onToggle: (expansionId: string) => void;
  onClear: () => void;
  onSelectAll: () => void;
  onBulkAdjust: (expansionId: string, delta: number) => void;
}

const SERIES_ORDER: string[] = ["MEGA", "SV"];
const SERIES_LABEL: Record<string, string> = {
  MEGA: "MEGA",
  SV: "스칼렛 & 바이올렛",
};

function groupBySeries(list: Expansion[]): { series: string; items: Expansion[] }[] {
  const map = new Map<string, Expansion[]>();
  for (const exp of list) {
    const arr = map.get(exp.series) ?? [];
    arr.push(exp);
    map.set(exp.series, arr);
  }
  const order = [
    ...SERIES_ORDER.filter((s) => map.has(s)),
    ...[...map.keys()].filter((s) => !SERIES_ORDER.includes(s)),
  ];
  return order.map((series) => ({
    series,
    items: (map.get(series) ?? []).sort((a, b) =>
      (b.releaseDate ?? "").localeCompare(a.releaseDate ?? "")
    ),
  }));
}

export default function ExpansionPicker({
  owned,
  onToggle,
  onClear,
  onSelectAll,
  onBulkAdjust,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const groups = useMemo(() => groupBySeries(EXPANSIONS), []);
  const ownedCount = Object.values(owned).filter(Boolean).length;

  const visibleGroups = expanded
    ? groups
    : groups.map((g) =>
        g.series === "SV" ? { ...g, items: g.items.slice(0, 4) } : g
      );
  const hiddenCount =
    EXPANSIONS.length - visibleGroups.reduce((s, g) => s + g.items.length, 0);

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <div className="text-sm text-slate-500">
          보유 확장팩 {ownedCount}개 / 총 {EXPANSIONS.length}개
        </div>
        <div className="flex gap-3 text-xs text-slate-500">
          <button onClick={onSelectAll} className="underline hover:text-slate-700">
            전체 선택
          </button>
          {ownedCount > 0 && (
            <button onClick={onClear} className="underline hover:text-slate-700">
              비우기
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {visibleGroups.map((g) => (
          <div key={g.series}>
            <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              <span>{SERIES_LABEL[g.series] ?? g.series}</span>
              <span className="text-slate-400">· {g.items.length}</span>
            </div>
            <ul className="space-y-1">
              {g.items.map((exp) => {
                const isOwned = !!owned[exp.id];
                return (
                  <li
                    key={exp.id}
                    className={`flex items-center gap-2 rounded-md border px-2 py-1.5 text-xs ${
                      isOwned
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <button
                      onClick={() => onToggle(exp.id)}
                      className="flex min-w-0 flex-1 items-center gap-2 text-left"
                      aria-label={isOwned ? "확장팩 보유 해제" : "확장팩 보유로 표시"}
                    >
                      <span
                        className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                          isOwned
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                        aria-hidden
                      >
                        {isOwned ? "✓" : ""}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate font-medium ${isOwned ? "text-emerald-900" : "text-slate-700"}`}
                        >
                          {exp.name}
                        </span>
                        <span className="block text-[10px] text-slate-500">
                          {exp.code}
                          {exp.releaseDate
                            ? ` · ${exp.releaseDate.slice(0, 7)}`
                            : ""}
                        </span>
                      </span>
                    </button>
                    <div
                      className="flex shrink-0 items-center gap-1"
                      title="이 확장팩의 모든 카드에 일괄 +1/-1"
                    >
                      <button
                        onClick={() => onBulkAdjust(exp.id, -1)}
                        className="h-7 w-7 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                        aria-label="이 확장팩 카드 전체 -1"
                      >
                        −1
                      </button>
                      <button
                        onClick={() => onBulkAdjust(exp.id, +1)}
                        className="h-7 w-7 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                        aria-label="이 확장팩 카드 전체 +1"
                      >
                        +1
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {hiddenCount > 0 && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="w-full rounded-md border border-slate-200 bg-white py-1.5 text-xs text-slate-600 hover:border-slate-400"
        >
          + {hiddenCount}개 더 보기
        </button>
      )}
      {expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="w-full rounded-md border border-slate-200 bg-white py-1.5 text-xs text-slate-600 hover:border-slate-400"
        >
          접기
        </button>
      )}
    </div>
  );
}
