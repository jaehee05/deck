import type { DeckMatch } from "../utils/matcher";
import { CARDS_BY_ID } from "../data/cards";
import { deckQuantities } from "../data/decks";
import type { OwnedMap } from "../types";

interface Props {
  match: DeckMatch;
  owned: OwnedMap;
}

const CATEGORY_ORDER: Record<string, number> = {
  pokemon: 0,
  trainer: 1,
  energy: 2,
};

export default function DeckDetail({ match, owned }: Props) {
  const need = deckQuantities(match.deck);
  const rows = Object.entries(need)
    .map(([cardId, requested]) => {
      const have = owned[cardId] ?? 0;
      const matched = Math.min(have, requested);
      const card = CARDS_BY_ID[cardId];
      return { cardId, card, requested, have, matched };
    })
    .sort((a, b) => {
      const oa = CATEGORY_ORDER[a.card?.category ?? "trainer"] ?? 9;
      const ob = CATEGORY_ORDER[b.card?.category ?? "trainer"] ?? 9;
      if (oa !== ob) return oa - ob;
      return (a.card?.name ?? "").localeCompare(b.card?.name ?? "");
    });

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          {match.deck.name}
        </h2>
        <p className="mt-1 text-sm text-slate-600">{match.deck.description}</p>
      </div>

      <div className="rounded-md border border-slate-200 bg-white p-3 text-sm">
        <div className="flex items-baseline justify-between">
          <div className="text-slate-500">매칭률</div>
          <div className="text-lg font-bold tabular-nums">
            {Math.round(match.matchRate * 100)}%
          </div>
        </div>
        <div className="mt-1 flex items-baseline justify-between text-xs text-slate-500">
          <span>보유 {match.ownedCount}장</span>
          <span>덱 총 {match.total}장</span>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-slate-700">덱 구성</h3>
        <ul className="divide-y divide-slate-100 rounded-md border border-slate-200 bg-white">
          {rows.map((r) => {
            const isMissing = r.have < r.requested;
            const isPartial = r.have > 0 && r.have < r.requested;
            return (
              <li
                key={r.cardId}
                className={`flex items-center justify-between gap-2 px-3 py-2 text-sm ${
                  isMissing ? "bg-rose-50/40" : ""
                }`}
              >
                <div className="min-w-0">
                  <div className="truncate font-medium text-slate-800">
                    {r.card?.name ?? r.cardId}
                  </div>
                  <div className="text-xs text-slate-500">
                    {r.card?.category === "pokemon"
                      ? "포켓몬"
                      : r.card?.category === "trainer"
                        ? "트레이너"
                        : r.card?.category === "energy"
                          ? "에너지"
                          : "—"}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-sm tabular-nums">
                    <span
                      className={
                        isMissing
                          ? "text-rose-600 font-semibold"
                          : "text-emerald-700 font-semibold"
                      }
                    >
                      {r.matched}
                    </span>
                    <span className="text-slate-400"> / {r.requested}</span>
                  </div>
                  {isMissing && (
                    <div className="text-xs text-rose-600">
                      {isPartial ? `+${r.requested - r.have}장 필요` : `${r.requested}장 필요`}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
