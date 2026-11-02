import styles from "./ProgressBar.module.css";

export default function ProgressBar({ progress, max = 5 }) {
  const percent = (progress / max) * 100;

  return (
    <div className={styles.track}>
      <div className={styles.fill} style={{ width: `${percent}%` }} />
    </div>
  );
}
