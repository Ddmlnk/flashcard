import { useEffect, useRef, useState } from "react";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import styles from "./CardMenu.module.css";

interface CardMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function CardMenu({ onEdit, onDelete }: CardMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Закриваємо меню по кліку поза ним
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  function choose(action: () => void) {
    setOpen(false);
    action();
  }

  return (
    <div className={styles.menu} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        aria-label="Card actions"
        aria-expanded={open}
      >
        <EllipsisVertical size={18} />
      </button>

      {open && (
        <ul className={styles.list}>
          <li>
            <button type="button" onClick={() => choose(onEdit)}>
              <Pencil size={14} /> Edit
            </button>
          </li>
          <li>
            <button type="button" onClick={() => choose(onDelete)}>
              <Trash2 size={14} /> Delete
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
