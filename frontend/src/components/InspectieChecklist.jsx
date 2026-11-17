import { useState } from "react";
import { CRITERII, formatData, stareInspectie, verificariStup } from "../inspectie.js";
import styles from "./InspectieChecklist.module.css";

// Lista de verificare a inspectiei. Parintele salveaza pe server (onComuta)
// si trimite inapoi stupul actualizat; componenta doar afiseaza si raporteaza clicul.
export default function InspectieChecklist({ stup, onComuta }) {
  const [salveaza, setSalveaza] = useState(""); // cheia criteriului care se salveaza acum
  const [eroare, setEroare] = useState("");

  const bifate = verificariStup(stup);
  const { total, stare } = stareInspectie(stup);
  const procent = Math.round((bifate.length / total) * 100);

  async function handleChange(cheie) {
    setEroare("");
    setSalveaza(cheie);
    try {
      await onComuta(cheie);
    } catch (err) {
      setEroare(`Bifa nu s-a salvat: ${err.message}`);
    } finally {
      setSalveaza("");
    }
  }

  return (
    <section id="inspectie" className={styles.box} data-testid="inspectie">
      <div className={styles.head}>
        <h3>🔎 Inspecție</h3>
        <span className={styles.scor}>
          {bifate.length}/{total} criterii
        </span>
      </div>

      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${procent}%` }}></div>
      </div>

      <ul className={styles.lista}>
        {CRITERII.map((c) => {
          const bifat = bifate.includes(c.cheie);
          return (
            <li key={c.cheie} className={bifat ? `${styles.item} ${styles.bifat}` : styles.item}>
              <label>
                <input
                  type="checkbox"
                  checked={bifat}
                  disabled={salveaza !== ""}
                  onChange={() => handleChange(c.cheie)}
                  data-testid={`criteriu-${c.cheie}`}
                />
                <span>
                  <span className={styles.label}>{c.label}</span>
                  <span className={styles.detaliu}>{c.detaliu}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      {eroare && <p className="error">{eroare}</p>}

      <p className={`${styles.rezultat} ${styles[stare]}`} role="status">
        {stare === "inspectat" && `✓ Stup inspectat pe ${formatData(stup.dataInspectie)}`}
        {stare === "in-curs" && `Inspecție în curs: mai sunt ${total - bifate.length} criterii de verificat`}
        {stare === "de-inspectat" && "Bifează criteriile pe măsură ce verifici stupul"}
      </p>
    </section>
  );
}
