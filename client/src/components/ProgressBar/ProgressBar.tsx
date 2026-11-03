import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  progress: number;
  max?: number;
}

export default function ProgressBar({ progress, max = 5 }: ProgressBarProps) {
  const percent = (progress / max) * 100;

  return (
    <div className={styles.track}>
      <div className={styles.fill} style={{ width: `${percent}%` }} />
    </div>
  );
}
