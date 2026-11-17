import styles from "./FiltruBar.module.css";

const FILTRE = [
  { value: "toti", label: "Toți" },
  { value: "de-inspectat", label: "De inspectat" },
  { value: "inspectati", label: "Inspectați" },
];

// Cautare dupa nume si filtru dupa stare; valorile stau in pagina parinte
export default function FiltruBar({ cautare, onCautare, filtru, onFiltru, numere }) {
  return (
    <div className={styles.bar}>
      <label className={styles.search}>
        <span aria-hidden="true">🔍</span>
        <input
          type="search"
          value={cautare}
          onChange={(e) => onCautare(e.target.value)}
          placeholder="Caută un stup..."
          aria-label="Caută un stup după nume"
        />
      </label>

      <div className={styles.segmente} role="group" aria-label="Filtrează după stare">
        {FILTRE.map((f) => (
          <button
            key={f.value}
            type="button"
            className={filtru === f.value ? `${styles.segment} ${styles.activ}` : styles.segment}
            aria-pressed={filtru === f.value}
            onClick={() => onFiltru(f.value)}
          >
            {f.label}
            <span className={styles.numar}>{numere[f.value]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
