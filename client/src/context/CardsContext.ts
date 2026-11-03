import { createContext } from "react";
import type { Card, NewCard, Stats } from "../types";

export const ALL_CATEGORIES = "All Categories";

export interface CardsContextValue {
  cards: Card[];
  categories: string[];
  category: string;
  setCategory: (category: string) => void;
  hideMastered: boolean;
  setHideMastered: (hide: boolean) => void;
  visibleCards: Card[];
  stats: Stats;
  updateCard: (id: number, changes: Partial<Omit<Card, "id">>) => void;
  updateProgress: (id: number) => void;
  resetProgress: (id: number) => void;
  deleteCard: (id: number) => void;
  addCard: (card: NewCard) => void;
  shuffleCards: () => void;
}

export const CardsContext = createContext<CardsContextValue | null>(null);
