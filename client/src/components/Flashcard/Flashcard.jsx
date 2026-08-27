// client/src/components/Flashcard/Flashcard.jsx
import { useState } from "react";
import CategoryBadge from "../CategoryBadge/CategoryBadge";
import ProgressBar from "../ProgressBar/ProgressBar";
import styles from "./Flashcard.module.css";

function Flashcard({ question, answer, category, progress }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <button className={styles.card} onClick={() => setShowAnswer(!showAnswer)}>
      <CategoryBadge>{category}</CategoryBadge>

      <div className={styles.content}>
        <p className={styles.text}>{showAnswer ? answer : question}</p>
        {!showAnswer && <p className={styles.hint}>Click to reveal answer</p>}
      </div>

      <div className={styles.progress}>
        <ProgressBar progress={progress} />
        <span>{progress}/5</span>
      </div>
    </button>
  );
}

export default Flashcard;
