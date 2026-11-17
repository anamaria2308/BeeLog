import { NIVEL_PUTERE } from "../constants.js";
import styles from "./PutereMeter.module.css";

// Trei hexagoane; cate sunt pline arata puterea coloniei
export default function PutereMeter({ putere, mare = false }) {
  const nivel = NIVEL_PUTERE[putere] ?? 0;
  return (
    <span
      className={`${styles.meter} ${styles[putere] ?? ""} ${mare ? styles.mare : ""}`}
      aria-hidden="true"
    >
      {[1, 2, 3].map((n) => (
        <span key={n} className={n <= nivel ? `${styles.hex} ${styles.plin}` : styles.hex} />
      ))}
    </span>
  );
}
