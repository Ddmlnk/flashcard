// client/src/components/CardItem/CardItem.jsx
import CategoryBadge from "../CategoryBadge/CategoryBadge";
import ProgressBar from "../ProgressBar/ProgressBar";
import CardMenu from "../CardMenu/CardMenu";
import styles from "./CardItem.module.css";

function CardItem({ card, onEdit, onDelete }) {
  const mastered = card.progress === 5;

  return (
    <article className={styles.card}>
      <div className={styles.body}>
        <h3 className={styles.question}>{card.question}</h3>
        <p className={styles.answerLabel}>Answer:</p>
        <p className={styles.answer}>{card.answer}</p>
      </div>

      <footer className={styles.footer}>
        <div className={styles.meta}>
          <CategoryBadge>{card.category}</CategoryBadge>
          {mastered ? (
            <span className={styles.mastered}>Mastered 5/5</span>
          ) : (
            <div className={styles.progress}>
              <ProgressBar progress={card.progress} />
              <span>{card.progress}/5</span>
            </div>
          )}
        </div>
        <CardMenu onEdit={onEdit} onDelete={onDelete} />
      </footer>
    </article>
  );
}

export default CardItem;
