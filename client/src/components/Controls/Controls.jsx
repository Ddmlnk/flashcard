// client/src/components/Controls/Controls.jsx
import { Shuffle } from "lucide-react";
import Dropdown from "../Dropdown/Dropdown";
import Checkbox from "../Checkbox/Checkbox";
import Button from "../Button/Button";
import styles from "./Controls.module.css";

function Controls({
  categories,
  category,
  onCategoryChange,
  hideMastered,
  onHideMasteredChange,
  onShuffle,
}) {
  return (
    <div className={styles.controls}>
      <div className={styles.left}>
        <Dropdown
          options={categories}
          value={category}
          onChange={onCategoryChange}
        />
        <Checkbox
          label="Hide Mastered"
          checked={hideMastered}
          onChange={onHideMasteredChange}
        />
      </div>
      <Button onClick={onShuffle}>
        <Shuffle size={16} /> Shuffle
      </Button>
    </div>
  );
}

export default Controls;
