import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchStup } from "../api.js";
import { ETICHETE_PUTERE, RAME_MAX } from "../constants.js";
import PutereMeter from "../components/PutereMeter.jsx";
import styles from "./StupDetaliuPage.module.css";

export default function StupDetaliuPage() {
  const { id } = useParams(); // text din URL, de exemplu "3"
  const [stup, setStup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Se reincarca daca se schimba id-ul din adresa
  useEffect(() => {
    let ignore = false;

    fetchStup(id)
      .then((data) => {
        if (!ignore) {
          setStup(data);
          setError(null); // o eroare de la un id anterior nu mai este valabila
        }
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
  }, [id]);

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Se încarcă...
      </p>
    );
  }

  if (error) {
    return (
      <section className="panel">
        <p className="error" data-testid="error">
          Stupul nu a putut fi încărcat: {error}
        </p>
        <Link to="/">Înapoi la listă</Link>
      </section>
    );
  }

  // Ramele desenate: cate sunt in stup, din maximul posibil
  const rame = stup.rame ?? 0;

  return (
    <section className={`panel ${styles.detail}`} data-testid="detail">
      <Link to="/" className={styles.back}>
        ← Înapoi la listă
      </Link>

      <div className={styles.head}>
        <div className={styles.hex} aria-hidden="true">
          🐝
        </div>
        <div>
          <h2 className={stup.inspectat ? styles.done : undefined} data-testid="detail-title">
            {stup.nume}
          </h2>
          <span className={stup.inspectat ? styles.statusDone : styles.statusPending}>
            {stup.inspectat ? "✓ Inspectat" : "De inspectat"}
          </span>
        </div>
      </div>

      <dl className={styles.fields}>
        <dt>Putere colonie</dt>
        <dd className={styles.putere}>
          <PutereMeter putere={stup.putere} mare />
          <span className={`badge badge-${stup.putere}`}>{ETICHETE_PUTERE[stup.putere]}</span>
        </dd>

        <dt>Număr de rame</dt>
        <dd>
          <div className={styles.rame} aria-label={`${rame} rame din ${RAME_MAX}`}>
            {Array.from({ length: RAME_MAX }, (_, i) => (
              <span key={i} className={i < rame ? `${styles.rama} ${styles.plina}` : styles.rama} />
            ))}
          </div>
          <span className={styles.rameText}>
            {stup.rame ? `${rame} din ${RAME_MAX} rame` : "necompletat"}
          </span>
        </dd>

        <dt>ID</dt>
        <dd>#{stup.id}</dd>
      </dl>
    </section>
  );
}
