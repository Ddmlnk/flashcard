// client/src/components/Checkbox/Checkbox.jsx
import styles from "./Checkbox.module.css";

function Checkbox({ label, checked, onChange }) {
  return (
    <label className={styles.wrapper}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.input}
      />
      <span className={styles.box} />
      {label}
    </label>
  );
}

export default Checkbox;
