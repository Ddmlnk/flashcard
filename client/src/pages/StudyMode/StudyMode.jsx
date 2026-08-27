// client/src/pages/StudyMode/StudyMode.jsx
import { useState } from "react";
import Flashcard from "../../components/Flashcard/Flashcard";
import Button from "../../components/Button/Button";
import { mockCards } from "../../moc/cards";

function StudyMode() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const card = mockCards[currentIndex];

  function goPrevious() {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }

  function goNext() {
    setCurrentIndex((prev) => Math.min(prev + 1, mockCards.length - 1));
  }

  return (
    <div>
      <Flashcard
        question={card.question}
        answer={card.answer}
        category={card.category}
        progress={card.progress}
      />
      <div>
        <Button onClick={goPrevious}>Previous</Button>
        <span>
          Card {currentIndex + 1} of {mockCards.length}
        </span>
        <Button onClick={goNext}>Next</Button>
      </div>
    </div>
  );
}

export default StudyMode;
