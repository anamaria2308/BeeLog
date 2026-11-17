import { Link } from "react-router-dom";
import { ETICHETE_PUTERE } from "../constants.js";
import PutereMeter from "./PutereMeter.jsx";
import styles from "./StupCard.module.css";

export default function StupCard({ stup, index = 0, onToggle, onDelete }) {
  // banda colorata din stanga cardului urmeaza puterea coloniei
  const clase = [styles.card, styles[stup.putere], stup.inspectat ? styles.done : ""].join(" ");

  return (
    <li
      className={clase}
      style={{ "--i": index }} // fiecare card intra in pagina putin dupa cel de deasupra
      data-testid="item"
      data-id={stup.id}
    >
      <div className={styles.main}>
        <input
          type="checkbox"
          checked={stup.inspectat}
          onChange={() => onToggle(stup.id)}
          aria-label={`Marchează ${stup.nume} ca inspectat`}
          data-testid="item-toggle"
        />
        <div className={styles.icon} aria-hidden="true">
          🐝
        </div>
        <div>
          <Link to={`/stupi/${stup.id}`} className={styles.title} data-testid="item-link">
            {stup.nume}
          </Link>
          <span className={styles.meta}>
            <span className={`badge badge-${stup.putere}`}>
              <PutereMeter putere={stup.putere} />
              {ETICHETE_PUTERE[stup.putere]}
            </span>
          </span>
        </div>
      </div>

      <div className={styles.right}>
        <span className={styles.status}>
          {/* punctul pulseaza cat timp stupul asteapta inspectia */}
          <span className={`${styles.dot} ${stup.inspectat ? styles.dotDone : styles.dotPending}`}></span>
          {stup.inspectat ? "Inspectat" : "De inspectat"}
        </span>

        <button
          type="button"
          className="btn-danger"
          onClick={() => onDelete(stup.id)}
          aria-label={`Șterge ${stup.nume}`}
          data-testid="item-delete"
        >
          Șterge
        </button>
      </div>
    </li>
  );
}
