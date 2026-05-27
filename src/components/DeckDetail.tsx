import type { DeckMatch } from "../utils/matcher";
import { CARDS_BY_ID } from "../data/cards";
import { EXPANSIONS_BY_ID } from "../data/expansions";
import { deckQuantities } from "../data/decks";
import type { OwnedExpansions, OwnedMap } from "../types";

interface Props {
  match: DeckMatch;
  owned: OwnedMap;
  expansions: OwnedExpansions;
}

const CATEGORY_ORDER: Record<string, number> = {
  pokemon: 0,
  trainer: 1,
  energy: 2,
};

const CATEGORY_LABEL: Record<string, string> = {
  pokemon: "포켓몬",
  trainer: "트레이너",
  energy: "에너지",
};

export default function DeckDetail({ match, owned, expansions }: Props) {
  const need = deckQuantities(match.deck);
  const rows = Object.entries(need)
    .map(([cardId, requested]) => {
      const have = owned[cardId] ?? 0;
      const matched = Math.min(have, requested);
      const card = CARDS_BY_ID[cardId];
      const expansion = card?.setId ? EXPANSIONS_BY_ID[card.setId] : undefined;
      const fromOwnedSet = !card?.setId || !!expansions[card.setId];
      return { cardId, card, requested, have, matched, expansion, fromOwnedSet };
    })
    .sort((a, b) => {
      const oa = CATEGORY_ORDER[a.card?.category ?? "trainer"] ?? 9;
      const ob = CATEGORY_ORDER[b.card?.category ?? "trainer"] ?? 9;
      if (oa !== ob) return oa - ob;
      return (a.card?.name ?? "").localeCompare(b.card?.name ?? "");
    });

  const hasExpansionSelection = Object.values(expansions).some(Boolean);

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
        {hasExpansionSelection && (
          <div className="mt-2 flex items-baseline justify-between border-t border-slate-100 pt-2 text-xs">
            <span className="text-slate-500">보유 확장팩 커버리지</span>
            <span className="font-medium tabular-nums text-slate-700">
              {Math.round(match.setCoverageRate * 100)}% (
              {match.setCoveredCount}/{match.total}장)
            </span>
          </div>
        )}
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
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                    <span>
                      {CATEGORY_LABEL[r.card?.category ?? ""] ?? "—"}
                    </span>
                    {r.expansion && (
                      <span
                        className={`rounded px-1 py-0.5 text-[10px] ring-1 ring-inset ${
                          hasExpansionSelection && r.fromOwnedSet
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                            : hasExpansionSelection
                              ? "bg-slate-50 text-slate-500 ring-slate-200"
                              : "bg-slate-50 text-slate-500 ring-slate-200"
                        }`}
                        title={
                          hasExpansionSelection
                            ? r.fromOwnedSet
                              ? "보유 확장팩에 등장"
                              : "보유하지 않은 확장팩"
                            : r.expansion.name
                        }
                      >
                        {r.expansion.name}
                      </span>
                    )}
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
