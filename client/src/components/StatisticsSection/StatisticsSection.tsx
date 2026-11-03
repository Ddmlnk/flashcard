import { Layers, Brain, BookOpen, Inbox, type LucideIcon } from "lucide-react";
import type { Stats } from "../../types";
import styles from "./StatisticsSection.module.css";

interface StatCardProps {
  label: string;
  value: number;
  color: string;
  icon: LucideIcon;
}

function StatCard({ label, value, color, icon: Icon }: StatCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </div>
      <div className={styles.icon} style={{ background: color }}>
        <Icon size={24} />
      </div>
    </div>
  );
}

export default function StatisticsSection({ stats }: { stats: Stats }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Study Statistics</h2>
      <div className={styles.list}>
        <StatCard
          label="Total Cards"
          value={stats.total}
          color="var(--color-blue-400)"
          icon={Layers}
        />
        <StatCard
          label="Mastered"
          value={stats.mastered}
          color="var(--color-teal-400)"
          icon={Brain}
        />
        <StatCard
          label="In Progress"
          value={stats.inProgress}
          color="var(--color-pink-500)"
          icon={BookOpen}
        />
        <StatCard
          label="Not Started"
          value={stats.notStarted}
          color="var(--color-pink-400)"
          icon={Inbox}
        />
      </div>
    </section>
  );
}
