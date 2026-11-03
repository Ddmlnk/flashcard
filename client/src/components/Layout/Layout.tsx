import type { ReactNode } from "react";
import Header from "../Header/Header";
import styles from "./Layout.module.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <Header />
      {children}
    </div>
  );
}
