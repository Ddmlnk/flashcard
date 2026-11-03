import { NavLink } from "react-router-dom";
import styles from "./Tab.module.css";

export default function Tab() {
  const getClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.item} ${isActive ? styles.active : ""}`;

  return (
    <nav className={styles.tab}>
      <NavLink to="/" end className={getClass}>
        Study Mode
      </NavLink>
      <NavLink to="/cards" className={getClass}>
        All Cards
      </NavLink>
    </nav>
  );
}
