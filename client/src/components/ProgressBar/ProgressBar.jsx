// client/src/components/ProgressBar/ProgressBar.jsx
import styles from "./ProgressBar.module.css";

function ProgressBar({ progress, max = 5 }) {
  const percent = (progress / max) * 100;

  return (
    <div className={styles.track}>
      <div className={styles.fill} style={{ width: `${percent}%` }} />
    </div>
  );
}

export default ProgressBar;
