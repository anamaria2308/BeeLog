import { useEffect, useState } from "react";
import { fetchStupi } from "../api.js";
import { ETICHETE_PUTERE } from "../constants.js";
import { CRITERII, formatData, stareInspectie, verificariStup } from "../inspectie.js";
import styles from "./RaportPage.module.css";

const ETICHETE_STARE = {
  inspectat: "Inspectat",
  "in-curs": "În curs",
  "de-inspectat": "De inspectat",
};

// Raportul stupinei, gata de printat. "Exportă PDF" deschide dialogul de printare
// al browserului, unde se alege "Salvează ca PDF" (fara biblioteci in plus).
export default function RaportPage() {
  const [stupi, setStupi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetchStupi()
      .then((data) => {
        if (!ignore) setStupi(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  // Titlul paginii devine numele fisierului PDF propus de browser
  useEffect(() => {
    const vechi = document.title;
    document.title = `BeeLog - raport inspectie ${new Date().toISOString().slice(0, 10)}`;
    return () => {
      document.title = vechi;
    };
  }, []);

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Se pregătește raportul...
      </p>
    );
  }

  if (error) {
    return (
      <section className="panel">
        <p className="error" data-testid="error">
          Raportul nu a putut fi generat: {error}
        </p>
      </section>
    );
  }

  // Totaluri derivate din lista de stupi
  const stari = stupi.map(stareInspectie);
  const inspectati = stari.filter((s) => s.stare === "inspectat").length;
  const inCurs = stari.filter((s) => s.stare === "in-curs").length;
  const deInspectat = stupi.length - inspectati - inCurs;
  const procent = stupi.length > 0 ? Math.round((inspectati / stupi.length) * 100) : 0;
  const generat = new Date().toLocaleString("ro-RO", { dateStyle: "long", timeStyle: "short" });

  return (
    <section className={`panel ${styles.raport}`} data-testid="raport">
      <div className={styles.actiuni}>
        <p>
          Apasă <strong>Exportă PDF</strong>, apoi alege <strong>Salvează ca PDF</strong> la
          destinație.
        </p>
        <button type="button" className="btn" onClick={() => window.print()}>
          📄 Exportă PDF
        </button>
      </div>

      <header className={styles.antet}>
        <div>
          <h2>🐝 BeeLog · Raport de inspecție</h2>
          <p className={styles.generat}>Generat pe {generat}</p>
        </div>
        <div className={styles.procent}>
          <span>{procent}%</span>
          <small>inspectați</small>
        </div>
      </header>

      <div className={styles.sumar}>
        <div>
          <strong>{stupi.length}</strong> stupi
        </div>
        <div>
          <strong>{inspectati}</strong> inspectați
        </div>
        <div>
          <strong>{inCurs}</strong> în curs
        </div>
        <div>
          <strong>{deInspectat}</strong> de inspectat
        </div>
      </div>

      {stupi.length === 0 ? (
        <p className="empty">Nu există niciun stup în stupină.</p>
      ) : (
        <table className={styles.tabel}>
          <thead>
            <tr>
              <th>Stup</th>
              <th>Putere</th>
              <th>Rame</th>
              <th>Stare</th>
              <th>Ultima inspecție</th>
              <th>Criterii neverificate</th>
            </tr>
          </thead>
          <tbody>
            {stupi.map((stup, i) => {
              const { bifate, total, stare } = stari[i];
              const lipsa = CRITERII.filter((c) => !verificariStup(stup).includes(c.cheie));
              return (
                <tr key={stup.id}>
                  <td className={styles.nume}>{stup.nume}</td>
                  <td>
                    <span className={`badge badge-${stup.putere}`}>{ETICHETE_PUTERE[stup.putere]}</span>
                  </td>
                  <td>{stup.rame ?? "–"}</td>
                  <td>
                    <span className={`${styles.stare} ${styles[stare]}`}>
                      {ETICHETE_STARE[stare]} ({bifate}/{total})
                    </span>
                  </td>
                  <td className={styles.data}>{formatData(stup.dataInspectie, true)}</td>
                  <td className={styles.lipsa}>
                    {lipsa.length === 0 && "—"}
                    {lipsa.length === total && "Toate (inspecție neîncepută)"}
                    {lipsa.length > 0 && lipsa.length < total && lipsa.map((c) => c.label).join("; ")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <footer className={styles.subsol}>
        Criterii verificate la inspecție: {CRITERII.map((c) => c.label).join(" · ")}.
      </footer>
    </section>
  );
}
