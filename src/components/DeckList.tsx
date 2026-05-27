import type { DeckMatch } from "../utils/matcher";

interface Props {
  matches: DeckMatch[];
  selectedId: string | null;
  onSelect: (deckId: string) => void;
  expansionsSelected: boolean;
}

const TIER_COLOR: Record<"S" | "A" | "B", string> = {
  S: "bg-rose-100 text-rose-800 ring-rose-200",
  A: "bg-amber-100 text-amber-800 ring-amber-200",
  B: "bg-sky-100 text-sky-800 ring-sky-200",
};

export default function DeckList({
  matches,
  selectedId,
  onSelect,
  expansionsSelected,
}: Props) {
  return (
    <ul className="space-y-2">
      {matches.map((m) => {
        const pct = Math.round(m.matchRate * 100);
        const setPct = Math.round(m.setCoverageRate * 100);
        const isSelected = m.deck.id === selectedId;
        const missingTotal = m.missing.reduce((s, x) => s + x.need, 0);
        return (
          <li key={m.deck.id}>
            <button
              onClick={() => onSelect(m.deck.id)}
              className={`w-full rounded-lg border bg-white p-4 text-left transition ${
                isSelected
                  ? "border-slate-800 ring-2 ring-slate-800"
                  : "border-slate-200 hover:border-slate-400"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-1.5 py-0.5 text-xs ring-1 ring-inset ${
                        TIER_COLOR[m.deck.tier]
                      }`}
                    >
                      {m.deck.tier} 티어
                    </span>
                    <h3 className="truncate text-base font-semibold text-slate-900">
                      {m.deck.name}
                    </h3>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {m.deck.archetype}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-2xl font-bold tabular-nums text-slate-900">
                    {pct}
                    <span className="text-base text-slate-500">%</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {m.ownedCount}/{m.total}장
                  </div>
                </div>
              </div>

              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full bg-slate-800"
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                {missingTotal > 0 ? (
                  <span>
                    부족 {missingTotal}장 · 종류 {m.missing.length}개
                  </span>
                ) : (
                  <span className="text-emerald-700">완성 가능</span>
                )}
                {expansionsSelected && (
                  <span
                    className={
                      setPct >= 80
                        ? "text-emerald-700"
                        : setPct >= 50
                          ? "text-amber-600"
                          : "text-slate-500"
                    }
                    title="보유 확장팩에서 등장하는 카드 비율"
                  >
                    확장팩 커버 {setPct}%
                  </span>
                )}
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
