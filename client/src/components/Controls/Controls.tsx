import type { ChangeEvent } from "react";
import { Shuffle } from "lucide-react";
import Dropdown from "../Dropdown/Dropdown";
import Checkbox from "../Checkbox/Checkbox";
import Button from "../Button/Button";
import styles from "./Controls.module.css";

interface ControlsProps {
  categories: string[];
  category: string;
  onCategoryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  hideMastered: boolean;
  onHideMasteredChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onShuffle: () => void;
}

export default function Controls({
  categories,
  category,
  onCategoryChange,
  hideMastered,
  onHideMasteredChange,
  onShuffle,
}: ControlsProps) {
  return (
    <div className={styles.controls}>
      <div className={styles.category}>
        <Dropdown
          options={categories}
          value={category}
          onChange={onCategoryChange}
        />
      </div>
      <div className={styles.hide}>
        <Checkbox
          label="Hide Mastered"
          checked={hideMastered}
          onChange={onHideMasteredChange}
        />
      </div>
      <div className={styles.shuffle}>
        <Button onClick={onShuffle}>
          <Shuffle size={16} /> Shuffle
        </Button>
      </div>
    </div>
  );
}
