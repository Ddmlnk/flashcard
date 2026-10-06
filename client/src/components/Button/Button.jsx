// client/src/components/Button/Button.jsx
import styles from "./Button.module.css";

function Button({ children, primary, shadow, className = "", ...props }) {
  const classNames = [
    styles.button,
    primary ? styles.primary : styles.secondary,
    shadow ? styles.shadow : "",
    className,
  ].join(" ");

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}

export default Button;
