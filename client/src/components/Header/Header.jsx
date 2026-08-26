// client/src/components/Header/Header.jsx
import Logo from "../Logo/Logo";
import Tab from "../Tab/Tab";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Tab active="study" />
    </header>
  );
}
