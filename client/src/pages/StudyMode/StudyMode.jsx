// client/src/pages/StudyMode/StudyMode.jsx
import { useState } from "react";
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
import styles from "./StudyMode.module.css";

function StudyMode() {
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const safeIndex = Math.min(currentIndex, visibleCards.length - 1);
  const card = visibleCards[safeIndex];

  function handleCategoryChange(e) {
    setCategory(e.target.value);
    setCurrentIndex(0);
  }

  function handleHideMasteredChange(e) {
    setHideMastered(e.target.checked);
    setCurrentIndex(0);
  }

  function handleShuffle() {
    shuffleCards();
    setCurrentIndex(0);
  }

  function goPrevious() {
    setCurrentIndex(Math.max(safeIndex - 1, 0));
  }

  function goNext() {
    setCurrentIndex(Math.min(safeIndex + 1, visibleCards.length - 1));
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
                <Button primary onClick={() => updateProgress(card.id)}>
                  <CircleCheck size={16} /> I Know This
                </Button>
                <Button onClick={() => resetProgress(card.id)}>
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
            disabled={!card || safeIndex === 0}
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
            disabled={!card || safeIndex === visibleCards.length - 1}
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

export default StudyMode;
