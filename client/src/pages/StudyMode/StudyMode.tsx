import { type ChangeEvent, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  RotateCcw,
} from "lucide-react";
import Flashcard from "../../components/Flashcard/Flashcard";
import Button from "../../components/Button/Button";
import Controls from "../../components/Controls/Controls";
import StatisticsSection from "../../components/StatisticsSection/StatisticsSection";
import { useCards } from "../../hooks/useCards";
import type { Card } from "../../types";
import styles from "./StudyMode.module.css";

export default function StudyMode() {
  const {
    visibleCards,
    categories,
    category,
    setCategory,
    hideMastered,
    setHideMastered,
    stats,
    updateProgress,
    resetProgress,
    shuffleCards,
  } = useCards();

  // Поточну картку тримаємо за id, а не за індексом: після Shuffle чи коли
  // картка стає Mastered і ховається, індекси зсуваються
  const [currentId, setCurrentId] = useState<number | null>(null);
  // Поки true — кнопка зелена, а за мить прогрес +1 і перехід на наступну картку
  const [confirming, setConfirming] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const foundIndex = visibleCards.findIndex((c) => c.id === currentId);
  const safeIndex = foundIndex === -1 ? 0 : foundIndex;
  const card: Card | undefined = visibleCards[safeIndex];
  const isMastered = card?.progress === 5;

  function goTo(index: number) {
    setCurrentId(visibleCards[index]?.id ?? null);
  }

  function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
    setCategory(e.target.value);
    setCurrentId(null);
  }

  function handleHideMasteredChange(e: ChangeEvent<HTMLInputElement>) {
    setHideMastered(e.target.checked);
    setCurrentId(null);
  }

  function handleShuffle() {
    shuffleCards();
    setCurrentId(null);
  }

  function handleKnow() {
    if (!card) return;
    const id = card.id;
    // Наступна картка по колу; запам'ятовуємо зараз, бо список може змінитись
    const nextId = visibleCards[(safeIndex + 1) % visibleCards.length].id;
    setConfirming(true);
    timerRef.current = setTimeout(() => {
      updateProgress(id);
      setCurrentId(nextId);
      setConfirming(false);
    }, 500);
  }

  function goPrevious() {
    goTo(Math.max(safeIndex - 1, 0));
  }

  function goNext() {
    goTo(Math.min(safeIndex + 1, visibleCards.length - 1));
  }

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <div className={styles.header}>
          <Controls
            categories={categories}
            category={category}
            onCategoryChange={handleCategoryChange}
            hideMastered={hideMastered}
            onHideMasteredChange={handleHideMasteredChange}
            onShuffle={handleShuffle}
          />
        </div>

        <div className={styles.divider} />

        <div className={styles.cardArea}>
          {card ? (
            <>
              <Flashcard
                key={card.id}
                question={card.question}
                answer={card.answer}
                category={card.category}
                progress={card.progress}
              />
              <div className={styles.actions}>
                <Button
                  primary
                  className={confirming || isMastered ? styles.known : ""}
                  onClick={handleKnow}
                  disabled={confirming || isMastered}
                >
                  <CircleCheck size={16} />{" "}
                  {isMastered
                    ? "Mastered"
                    : confirming
                      ? "Got it!"
                      : "I Know This"}
                </Button>
                <Button
                  onClick={() => resetProgress(card.id)}
                  disabled={confirming || card.progress === 0}
                >
                  <RotateCcw size={16} /> Reset Progress
                </Button>
              </div>
            </>
          ) : (
            <p className={styles.empty}>
              No cards found. Try another category or turn off “Hide Mastered”.
            </p>
          )}
        </div>

        <div className={styles.divider} />

        <div className={styles.navigation}>
          <Button
            className={styles.navButton}
            onClick={goPrevious}
            disabled={!card || confirming || safeIndex === 0}
          >
            <ChevronLeft size={16} />
            <span className={styles.label}>Previous</span>
          </Button>
          <span className={styles.counter}>
            Card {card ? safeIndex + 1 : 0} of {visibleCards.length}
          </span>
          <Button
            className={styles.navButton}
            onClick={goNext}
            disabled={
              !card || confirming || safeIndex === visibleCards.length - 1
            }
          >
            <span className={styles.label}>Next</span>
            <ChevronRight size={16} />
          </Button>
        </div>
      </section>

      <StatisticsSection stats={stats} />
    </div>
  );
}
