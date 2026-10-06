// client/src/components/EditCardDialog/EditCardDialog.jsx
import { useState } from "react";
import Modal from "../Modal/Modal";
import Field from "../Field/Field";
import Button from "../Button/Button";
import { useCards } from "../../hooks/useCards";
import { ALL_CATEGORIES } from "../../context/CardsContext";
import styles from "./EditCardDialog.module.css";

function EditCardDialog({ card, onClose }) {
  const { categories, updateCard } = useCards();
  const [question, setQuestion] = useState(card.question);
  const [answer, setAnswer] = useState(card.answer);
  const [category, setCategory] = useState(card.category);
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = {};
    if (!question.trim()) nextErrors.question = "Please enter a question.";
    if (!answer.trim()) nextErrors.answer = "Please enter an answer.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    updateCard(card.id, {
      question: question.trim(),
      answer: answer.trim(),
      category: category.trim() || "General",
    });
    onClose();
  }

  return (
    <Modal title="Edit card" onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Field
          label="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          error={errors.question}
        />
        <Field
          label="Answer"
          multiline
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          error={errors.answer}
        />
        <Field
          label="Category"
          list="category-options"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <datalist id="category-options">
          {categories
            .filter((c) => c !== ALL_CATEGORIES)
            .map((c) => (
              <option key={c} value={c} />
            ))}
        </datalist>

        <div className={styles.actions}>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" primary>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default EditCardDialog;
