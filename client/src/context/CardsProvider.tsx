import { useEffect, useState, type ReactNode } from "react";
import {
  CardsContext,
  ALL_CATEGORIES,
  type CardsContextValue,
} from "./CardsContext";
import { mockCards } from "../moc/cards";
import type { Card, NewCard, Stats } from "../types";

const STORAGE_KEY = "flashcard-app:cards";

function isValidCard(c: unknown): c is Card {
  if (typeof c !== "object" || c === null) return false;
  const card = c as Record<string, unknown>;
  return (
    typeof card.id === "number" &&
    typeof card.question === "string" &&
    typeof card.answer === "string" &&
    typeof card.category === "string" &&
    typeof card.progress === "number" &&
    Number.isInteger(card.progress) &&
    card.progress >= 0 &&
    card.progress <= 5
  );
}

function loadCards(): Card[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.every(isValidCard)) return parsed;
    }
  } catch {
    // пошкоджені дані або localStorage недоступний — беремо мок-дані
  }
  return mockCards;
}

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Порожня назва → "General". Якщо така категорія вже є (без урахування
// регістру) — беремо її написання. "All Categories" зарезервовано під фільтр.
function resolveCategory(name: string, cards: Card[]): string {
  const trimmed = name.trim();
  if (!trimmed || trimmed.toLowerCase() === ALL_CATEGORIES.toLowerCase()) {
    return "General";
  }
  const existing = cards.find(
    (c) => c.category.toLowerCase() === trimmed.toLowerCase(),
  );
  return existing ? existing.category : trimmed;
}

export function CardsProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState(loadCards);
  const [selectedCategory, setCategory] = useState(ALL_CATEGORIES);
  const [hideMastered, setHideMastered] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    } catch {
      // сховище переповнене або вимкнене — просто не зберігаємо
    }
  }, [cards]);

  const categories = [ALL_CATEGORIES, ...new Set(cards.map((c) => c.category))];

  // Якщо вибрана категорія зникла (видалили останню картку) — повертаємось на "All"
  const category = categories.includes(selectedCategory)
    ? selectedCategory
    : ALL_CATEGORIES;

  const visibleCards = cards.filter(
    (c) =>
      (category === ALL_CATEGORIES || c.category === category) &&
      (!hideMastered || c.progress < 5),
  );

  // Статистика рахується з усіх карток, не з відфільтрованих
  const stats: Stats = {
    total: cards.length,
    mastered: cards.filter((c) => c.progress === 5).length,
    inProgress: cards.filter((c) => c.progress > 0 && c.progress < 5).length,
    notStarted: cards.filter((c) => c.progress === 0).length,
  };

  function updateCard(id: number, changes: Partial<Omit<Card, "id">>) {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const next = { ...c, ...changes };
        if (changes.category !== undefined) {
          next.category = resolveCategory(changes.category, prev);
        }
        return next;
      }),
    );
  }

  function updateProgress(id: number) {
    setCards((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, progress: Math.min(c.progress + 1, 5) } : c,
      ),
    );
  }

  function resetProgress(id: number) {
    updateCard(id, { progress: 0 });
  }

  function deleteCard(id: number) {
    setCards((prev) => prev.filter((c) => c.id !== id));
  }

  function addCard({ question, answer, category }: NewCard) {
    const id = Date.now();
    setCards((prev) => [
      {
        id,
        question: question.trim(),
        answer: answer.trim(),
        category: resolveCategory(category, prev),
        progress: 0,
      },
      ...prev,
    ]);
  }

  function shuffleCards() {
    setCards((prev) => shuffle(prev));
  }

  const value: CardsContextValue = {
    cards,
    categories,
    category,
    setCategory,
    hideMastered,
    setHideMastered,
    visibleCards,
    stats,
    updateCard,
    updateProgress,
    resetProgress,
    deleteCard,
    addCard,
    shuffleCards,
  };

  return (
    <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
  );
}
