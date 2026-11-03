import { type FormEvent, useState } from "react";
import Modal from "../Modal/Modal";
import Field from "../Field/Field";
import Button from "../Button/Button";
import { useCards } from "../../hooks/useCards";
import { ALL_CATEGORIES } from "../../context/CardsContext";
import type { Card } from "../../types";
import styles from "./EditCardDialog.module.css";

type FormErrors = Partial<Record<"question" | "answer", string>>;

interface EditCardDialogProps {
  card: Card;
  onClose: () => void;
}

export default function EditCardDialog({ card, onClose }: EditCardDialogProps) {
  const { categories, updateCard } = useCards();
  const [question, setQuestion] = useState(card.question);
  const [answer, setAnswer] = useState(card.answer);
  const [category, setCategory] = useState(card.category);
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextErrors: FormErrors = {};
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
