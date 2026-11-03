import type { ChangeEvent } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Dropdown({ options, value, onChange }: DropdownProps) {
  return (
    <div className={styles.wrapper}>
      <select className={styles.select} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className={styles.icon} />
    </div>
  );
}
