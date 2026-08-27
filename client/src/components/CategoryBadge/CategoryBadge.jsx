// client/src/components/CategoryBadge/CategoryBadge.jsx
import styles from "./CategoryBadge.module.css";

function CategoryBadge({ children }) {
  return <span className={styles.badge}>{children}</span>;
}

export default CategoryBadge;
