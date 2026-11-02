import styles from "./CategoryBadge.module.css";

export default function CategoryBadge({ children }) {
  return <span className={styles.badge}>{children}</span>;
}
