import styles from "./Field.module.css";

export default function Field({ label, error, multiline, ...props }) {
  const Tag = multiline ? "textarea" : "input";

  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <Tag
        className={`${styles.control} ${error ? styles.invalid : ""}`}
        {...props}
      />
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
}
