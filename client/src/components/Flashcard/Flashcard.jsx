// client/src/components/Flashcard/Flashcard.jsx
import { useState } from "react";
import CategoryBadge from "../CategoryBadge/CategoryBadge";
import ProgressBar from "../ProgressBar/ProgressBar";
import Star from "../Star/Star";
import styles from "./Flashcard.module.css";

function Face({ variant, hidden, category, progress, text, hint, textClass }) {
  return (
    <div className={`${styles.face} ${styles[variant]}`} aria-hidden={hidden}>
      <Star
        color="rgb(146, 173, 235)"
        className={`${styles.star} ${styles.starTop}`}
      />
      <Star
        color="rgb(248, 203, 70)"
        className={`${styles.star} ${styles.starBottom}`}
      />

      <CategoryBadge>{category}</CategoryBadge>

      <div className={styles.content}>
        <p className={textClass}>{text}</p>
        <p className={styles.hint}>{hint}</p>
      </div>

      <div className={styles.progress}>
        <ProgressBar progress={progress} />
        <span>{progress}/5</span>
      </div>
    </div>
  );
}

function Flashcard({ question, answer, category, progress }) {
  const [flipped, setFlipped] = useState(false);

  function toggle() {
    setFlipped((prev) => !prev);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  }

  return (
    <div
      className={`${styles.card} ${flipped ? styles.flipped : ""}`}
      role="button"
      tabIndex={0}
      onClick={toggle}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.inner}>
        <Face
          variant="front"
          hidden={flipped}
          category={category}
          progress={progress}
          text={question}
          textClass={styles.question}
          hint="Click to reveal answer"
        />
        <Face
          variant="back"
          hidden={!flipped}
          category={category}
          progress={progress}
          text={answer}
          textClass={styles.answer}
          hint="Click to see question"
        />
      </div>
    </div>
  );
}

export default Flashcard;
