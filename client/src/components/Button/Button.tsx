import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  shadow?: boolean;
}

export default function Button({
  children,
  primary,
  shadow,
  className = "",
  ...props
}: ButtonProps) {
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
