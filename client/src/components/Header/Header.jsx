// client/src/components/Header/Header.jsx
import Logo from "../Logo/Logo";
import Tab from "../Tab/Tab";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Tab />
    </header>
  );
}

export default Header;
