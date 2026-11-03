import { Layers } from "lucide-react";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <div className={styles.icon}>
        <Layers size={20} />
      </div>
      <span className={styles.text}>Flashcard</span>
    </div>
  );
}
