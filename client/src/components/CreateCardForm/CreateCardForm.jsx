// client/src/components/CreateCardForm/CreateCardForm.jsx
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Field from "../Field/Field";
import Button from "../Button/Button";
import { useCards } from "../../hooks/useCards";
import { ALL_CATEGORIES } from "../../context/CardsContext";
import styles from "./CreateCardForm.module.css";

function CreateCardForm() {
  const { categories, addCard, setCategory: setFilter } = useCards();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [created, setCreated] = useState(false);

  // Повідомлення про успіх зникає за 3 секунди
  useEffect(() => {
    if (!created) return;
    const timer = setTimeout(() => setCreated(false), 3000);
    return () => clearTimeout(timer);
  }, [created]);

  function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = {};
    if (!question.trim()) nextErrors.question = "Please enter a question.";
    if (!answer.trim()) nextErrors.answer = "Please enter an answer.";
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setCreated(false);
      return;
    }

    addCard({ question, answer, category });
    setFilter(ALL_CATEGORIES); // щоб нова картка одразу була видна в сітці
    setQuestion("");
    setAnswer("");
    setCategory("");
    setCreated(true);
  }

  function clearError(field) {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Field
        label="Question"
        placeholder="e.g., What is the capital of France?"
        value={question}
        onChange={(e) => {
          setQuestion(e.target.value);
          clearError("question");
        }}
        error={errors.question}
      />
      <Field
        label="Answer"
        multiline
        placeholder="e.g., Paris"
        value={answer}
        onChange={(e) => {
          setAnswer(e.target.value);
          clearError("answer");
        }}
        error={errors.answer}
      />
      <Field
        label="Category"
        placeholder="e.g., Geography"
        list="create-category-options"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <datalist id="create-category-options">
        {categories
          .filter((c) => c !== ALL_CATEGORIES)
          .map((c) => (
            <option key={c} value={c} />
          ))}
      </datalist>

      <div className={styles.footer}>
        <Button type="submit" primary className={styles.submit}>
          <Plus size={16} /> Create Card
        </Button>
        {created && (
          <span className={styles.success} role="status">
            Card created!
          </span>
        )}
      </div>
    </form>
  );
}

export default CreateCardForm;
