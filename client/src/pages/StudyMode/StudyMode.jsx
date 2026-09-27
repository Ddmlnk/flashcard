// client/src/pages/StudyMode/StudyMode.jsx
import { useState } from "react";
import Flashcard from "../../components/Flashcard/Flashcard";
import Button from "../../components/Button/Button";
import Controls from "../../components/Controls/Controls";
import { mockCards } from "../../moc/cards";
import styles from "./StudyMode.module.css";

function StudyMode() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [category, setCategory] = useState("All Categories");
  const [hideMastered, setHideMastered] = useState(false);
  const card = mockCards[currentIndex];

  function goPrevious() {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }

  function goNext() {
    setCurrentIndex((prev) => Math.min(prev + 1, mockCards.length - 1));
  }

  return (
    <div className={styles.section}>
      <div className={styles.cardArea}>
        <Controls
          categories={[
            "All Categories",
            "Web Development",
            "JavaScript",
            "CSS",
          ]}
          category={category}
          onCategoryChange={(e) => setCategory(e.target.value)}
          hideMastered={hideMastered}
          onHideMasteredChange={(e) => setHideMastered(e.target.checked)}
          onShuffle={() => {}}
        />

        <div className={styles.divider} />

        <Flashcard
          question={card.question}
          answer={card.answer}
          category={card.category}
          progress={card.progress}
        />
        <div className={styles.actions}>
          <Button primary>I Know This</Button>
          <Button>Reset Progress</Button>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.navigation}>
        <Button onClick={goPrevious}>Previous</Button>
        <span className={styles.counter}>
          Card {currentIndex + 1} of {mockCards.length}
        </span>
        <Button onClick={goNext}>Next</Button>
      </div>
    </div>
  );
}

export default StudyMode;
