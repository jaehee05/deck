import { useCallback, useEffect, useMemo, useState } from "react";
import type { OwnedMap } from "./types";
import { DECKS } from "./data/decks";
import { rankDecks } from "./utils/matcher";
import { loadOwned, saveOwned } from "./utils/storage";
import CardSearch from "./components/CardSearch";
import OwnedList from "./components/OwnedList";
import DeckList from "./components/DeckList";
import DeckDetail from "./components/DeckDetail";

export default function App() {
  const [owned, setOwned] = useState<OwnedMap>(() => loadOwned());
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);

  useEffect(() => {
    saveOwned(owned);
  }, [owned]);

  const adjust = useCallback((cardId: string, delta: number) => {
    setOwned((prev) => {
      const next = { ...prev };
      const v = (next[cardId] ?? 0) + delta;
      if (v <= 0) delete next[cardId];
      else next[cardId] = Math.min(v, 4);
      return next;
    });
  }, []);

  const clearOwned = useCallback(() => {
    if (confirm("보유 카드를 모두 비울까요?")) setOwned({});
  }, []);

  const matches = useMemo(() => rankDecks(DECKS, owned), [owned]);
  const selected =
    matches.find((m) => m.deck.id === selectedDeck) ?? matches[0] ?? null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
      <header className="mb-6 sm:mb-10">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          포켓몬 카드 덱 추천
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          보유 중인 카드를 입력하면 가장 가까운 덱을 추천해 드립니다.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 좌측: 카드 입력 */}
        <section className="space-y-4 lg:col-span-1">
          <div>
            <h2 className="mb-2 text-sm font-semibold text-slate-700">
              카드 검색 & 추가
            </h2>
            <CardSearch onAdd={adjust} owned={owned} />
          </div>
          <div>
            <h2 className="mb-2 text-sm font-semibold text-slate-700">
              내 보유 카드
            </h2>
            <OwnedList
              owned={owned}
              onChange={adjust}
              onClear={clearOwned}
            />
          </div>
        </section>

        {/* 중앙: 덱 추천 리스트 */}
        <section className="lg:col-span-1">
          <h2 className="mb-2 text-sm font-semibold text-slate-700">
            추천 덱 ({matches.length}개)
          </h2>
          <DeckList
            matches={matches}
            selectedId={selected?.deck.id ?? null}
            onSelect={setSelectedDeck}
          />
        </section>

        {/* 우측: 선택한 덱 상세 */}
        <section className="lg:col-span-1">
          <h2 className="mb-2 text-sm font-semibold text-slate-700">
            덱 상세
          </h2>
          {selected ? (
            <DeckDetail match={selected} owned={owned} />
          ) : (
            <div className="rounded-md border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
              덱을 선택하면 부족 카드와 함께 표시됩니다
            </div>
          )}
        </section>
      </div>

      <footer className="mt-12 text-center text-xs text-slate-400">
        보유 카드는 이 기기의 localStorage 에 저장됩니다 · 샘플 덱 5개
      </footer>
    </div>
  );
}
