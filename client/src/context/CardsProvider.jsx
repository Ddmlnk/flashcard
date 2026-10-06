// client/src/context/CardsProvider.jsx
import { useEffect, useState } from "react";
import { CardsContext, ALL_CATEGORIES } from "./CardsContext";
import { mockCards } from "../moc/cards";

const STORAGE_KEY = "flashcard-app:cards";

function isValidCard(c) {
  return (
    c &&
    typeof c.id === "number" &&
    typeof c.question === "string" &&
    typeof c.answer === "string" &&
    typeof c.category === "string" &&
    Number.isInteger(c.progress) &&
    c.progress >= 0 &&
    c.progress <= 5
  );
}

function loadCards() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.every(isValidCard)) return parsed;
    }
  } catch {
    // пошкоджені дані або localStorage недоступний — беремо мок-дані
  }
  return mockCards;
}

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Порожня назва → "General". Якщо така категорія вже є (без урахування
// регістру) — беремо її написання. "All Categories" зарезервовано під фільтр.
function resolveCategory(name, cards) {
  const trimmed = name.trim();
  if (!trimmed || trimmed.toLowerCase() === ALL_CATEGORIES.toLowerCase()) {
    return "General";
  }
  const existing = cards.find(
    (c) => c.category.toLowerCase() === trimmed.toLowerCase(),
  );
  return existing ? existing.category : trimmed;
}

export function CardsProvider({ children }) {
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
  const stats = {
    total: cards.length,
    mastered: cards.filter((c) => c.progress === 5).length,
    inProgress: cards.filter((c) => c.progress > 0 && c.progress < 5).length,
    notStarted: cards.filter((c) => c.progress === 0).length,
  };

  function updateCard(id, changes) {
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

  function updateProgress(id) {
    setCards((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, progress: Math.min(c.progress + 1, 5) } : c,
      ),
    );
  }

  function resetProgress(id) {
    updateCard(id, { progress: 0 });
  }

  function deleteCard(id) {
    setCards((prev) => prev.filter((c) => c.id !== id));
  }

  function addCard({ question, answer, category }) {
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

  const value = {
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
