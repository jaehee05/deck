import { useMemo, useState } from "react";
import type { OwnedExpansions } from "../types";
import { EXPANSIONS } from "../data/expansions";

interface Props {
  owned: OwnedExpansions;
  onToggle: (expansionId: string) => void;
  onClear: () => void;
  onSelectAll: () => void;
}

export default function ExpansionPicker({
  owned,
  onToggle,
  onClear,
  onSelectAll,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const sorted = useMemo(
    () =>
      [...EXPANSIONS].sort((a, b) =>
        (b.releaseDate ?? "").localeCompare(a.releaseDate ?? "")
      ),
    []
  );

  const ownedCount = Object.values(owned).filter(Boolean).length;
  const visible = expanded ? sorted : sorted.slice(0, 6);

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

      <ul className="grid grid-cols-2 gap-1.5">
        {visible.map((exp) => {
          const isOwned = !!owned[exp.id];
          return (
            <li key={exp.id}>
              <button
                onClick={() => onToggle(exp.id)}
                className={`flex w-full items-center gap-2 rounded-md border px-2.5 py-1.5 text-left text-xs transition ${
                  isOwned
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                }`}
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
                <span className="min-w-0">
                  <span className="block truncate font-medium">{exp.name}</span>
                  <span className="block text-[10px] text-slate-500">
                    {exp.code}
                    {exp.releaseDate ? ` · ${exp.releaseDate.slice(0, 7)}` : ""}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {sorted.length > 6 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full rounded-md border border-slate-200 bg-white py-1.5 text-xs text-slate-600 hover:border-slate-400"
        >
          {expanded ? "접기" : `+ ${sorted.length - 6}개 더 보기`}
        </button>
      )}
    </div>
  );
}
