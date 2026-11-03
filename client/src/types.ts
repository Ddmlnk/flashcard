export interface Card {
  id: number;
  question: string;
  answer: string;
  category: string;
  progress: number;
}

export type NewCard = Pick<Card, "question" | "answer" | "category">;

export interface Stats {
  total: number;
  mastered: number;
  inProgress: number;
  notStarted: number;
}
