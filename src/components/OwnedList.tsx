import { useMemo } from "react";
import type { OwnedMap } from "../types";
import { CARDS_BY_ID } from "../data/cards";

interface Props {
  owned: OwnedMap;
  onChange: (cardId: string, delta: number) => void;
  onClear: () => void;
}

export default function OwnedList({ owned, onChange, onClear }: Props) {
  const rows = useMemo(
    () =>
      Object.entries(owned)
        .filter(([, n]) => n > 0)
        .map(([cardId, count]) => ({
          cardId,
          count,
          card: CARDS_BY_ID[cardId],
        }))
        .sort((a, b) => (a.card?.name ?? "").localeCompare(b.card?.name ?? "")),
    [owned]
  );

  const totalCards = rows.reduce((s, r) => s + r.count, 0);
  const uniqueCount = rows.length;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <div className="text-sm text-slate-500">
          보유 카드 {uniqueCount}종 · 총 {totalCards}장
        </div>
        {uniqueCount > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-slate-500 underline hover:text-slate-700"
          >
            전체 비우기
          </button>
        )}
      </div>
      {rows.length === 0 ? (
        <div className="rounded-md border border-dashed border-slate-300 bg-white p-4 text-center text-sm text-slate-500">
          보유 카드를 추가하면 여기 표시됩니다
        </div>
      ) : (
        <ul className="divide-y divide-slate-100 rounded-md border border-slate-200 bg-white">
          {rows.map((r) => (
            <li
              key={r.cardId}
              className="flex items-center justify-between gap-2 px-3 py-2"
            >
              <div className="truncate text-sm font-medium text-slate-800">
                {r.card?.name ?? r.cardId}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={() => onChange(r.cardId, -1)}
                  className="h-7 w-7 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  aria-label="감소"
                >
                  −
                </button>
                <span className="w-7 text-center text-sm tabular-nums">
                  {r.count}
                </span>
                <button
                  onClick={() => onChange(r.cardId, 1)}
                  className="h-7 w-7 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  aria-label="증가"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
