// client/src/components/Layout/Layout.jsx
import Header from "../Header/Header";
import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <div className={styles.page}>
      <Header />
      {children}
    </div>
  );
}

export default Layout;
