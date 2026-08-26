// client/src/components/Tab/Tab.jsx
import styles from "./Tab.module.css";

export default function Tab({ active }) {
  return (
    <div className={styles.tab}>
      <button
        className={`${styles.item} ${active === "study" ? styles.active : ""}`}
      >
        Study Mode
      </button>
      <button
        className={`${styles.item} ${active === "all" ? styles.active : ""}`}
      >
        All Cards
      </button>
    </div>
  );
}
