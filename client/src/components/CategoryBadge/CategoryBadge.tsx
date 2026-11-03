import type { ReactNode } from "react";
import styles from "./CategoryBadge.module.css";

export default function CategoryBadge({ children }: { children: ReactNode }) {
  return <span className={styles.badge}>{children}</span>;
}
