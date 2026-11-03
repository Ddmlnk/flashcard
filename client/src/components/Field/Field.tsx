import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./Field.module.css";

interface BaseProps {
  label: string;
  error?: string;
}

type InputFieldProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & { multiline?: false };

type TextareaFieldProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true };

type FieldProps = InputFieldProps | TextareaFieldProps;

export default function Field(props: FieldProps) {
  const className = `${styles.control} ${props.error ? styles.invalid : ""}`;

  return (
    <label className={styles.field}>
      <span className={styles.label}>{props.label}</span>
      {props.multiline ? (
        <textarea className={className} {...omitOwn(props)} />
      ) : (
        <input className={className} {...omitOwn(props)} />
      )}
      {props.error && <span className={styles.error}>{props.error}</span>}
    </label>
  );
}

// Прибирає пропси самого Field, щоб решта пішла прямо в input/textarea
function omitOwn<T extends BaseProps & { multiline?: boolean }>(props: T) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, error, multiline, ...rest } = props;
  return rest;
}
