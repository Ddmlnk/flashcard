// client/src/components/Button/Button.jsx
import styles from "./Button.module.css";

function Button({ children, primary, className = "", ...props }) {
  const classNames = [
    styles.button,
    primary ? styles.primary : styles.secondary,
    className,
  ].join(" ");

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}

export default Button;
