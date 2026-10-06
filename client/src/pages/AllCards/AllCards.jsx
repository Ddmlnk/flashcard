// client/src/pages/AllCards/AllCards.jsx
import { useState } from "react";
import Controls from "../../components/Controls/Controls";
import CreateCardForm from "../../components/CreateCardForm/CreateCardForm";
import CardItem from "../../components/CardItem/CardItem";
import EditCardDialog from "../../components/EditCardDialog/EditCardDialog";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import { useCards } from "../../hooks/useCards";
import styles from "./AllCards.module.css";

function AllCards() {
  const {
    visibleCards,
    categories,
    category,
    setCategory,
    hideMastered,
    setHideMastered,
    shuffleCards,
    deleteCard,
  } = useCards();

  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  function confirmDelete() {
    deleteCard(deleting.id);
    setDeleting(null);
  }

  return (
    <div className={styles.page}>
      <CreateCardForm />

      <Controls
        categories={categories}
        category={category}
        onCategoryChange={(e) => setCategory(e.target.value)}
        hideMastered={hideMastered}
        onHideMasteredChange={(e) => setHideMastered(e.target.checked)}
        onShuffle={shuffleCards}
      />

      {visibleCards.length > 0 ? (
        <div className={styles.grid}>
          {visibleCards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              onEdit={() => setEditing(card)}
              onDelete={() => setDeleting(card)}
            />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>
          No cards found. Try another category or turn off “Hide Mastered”.
        </p>
      )}

      {editing && (
        <EditCardDialog card={editing} onClose={() => setEditing(null)} />
      )}

      {deleting && (
        <Modal title="Delete card?" onClose={() => setDeleting(null)}>
          <p className={styles.confirmText}>
            “{deleting.question}” will be permanently removed.
          </p>
          <div className={styles.confirmActions}>
            <Button onClick={() => setDeleting(null)}>Cancel</Button>
            <Button primary onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AllCards;
