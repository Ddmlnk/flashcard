// client/src/components/Dropdown/Dropdown.jsx
import { ChevronDown } from "lucide-react";
import styles from "./Dropdown.module.css";

function Dropdown({ options, value, onChange }) {
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

export default Dropdown;
