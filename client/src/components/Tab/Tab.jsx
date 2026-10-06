// client/src/components/Tab/Tab.jsx
import { NavLink } from "react-router-dom";
import styles from "./Tab.module.css";

function Tab() {
  const getClass = ({ isActive }) =>
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

export default Tab;
