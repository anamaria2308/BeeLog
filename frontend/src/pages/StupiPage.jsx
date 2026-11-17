import { useEffect, useState } from "react";
import StupList from "../components/StupList.jsx";
import StupForm from "../components/StupForm.jsx";
import FiltruBar from "../components/FiltruBar.jsx";
import Toast from "../components/Toast.jsx";
import { createStup, deleteStup, fetchStupi, updateStup } from "../api.js";
import styles from "./StupiPage.module.css";

// Data de azi in romana, de exemplu "Marți, 17 noiembrie 2026"
function dataDeAzi() {
  const text = new Date().toLocaleDateString("ro-RO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function StupiPage() {
  const [stupi, setStupi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Filtrarea listei: textul cautat si ce stupi se afiseaza
  const [cautare, setCautare] = useState("");
  const [filtru, setFiltru] = useState("toti"); // "toti" | "de-inspectat" | "inspectati"
  // Mesajul scurt din coltul ecranului, dupa o salvare reusita
  const [notificare, setNotificare] = useState(null);

  // Ruleaza o singura data, dupa prima randare
  useEffect(() => {
    let ignore = false; // nu se seteaza state daca pagina s-a inchis intre timp

    async function load() {
      try {
        const data = await fetchStupi();
        if (!ignore) setStupi(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  // Afiseaza notificarea si o ascunde dupa 3 secunde (doar daca nu a venit alta intre timp)
  function notifica(text) {
    const id = Date.now();
    setNotificare({ id, text });
    setTimeout(() => {
      setNotificare((curenta) => (curenta && curenta.id === id ? null : curenta));
    }, 3000);
  }

  // Intai serverul, apoi state-ul: pe ecran ajunge doar ce s-a salvat.
  // Fara try: eroarea ajunge inapoi in formular, care o afiseaza.
  async function handleAdd(stup) {
    const creat = await createStup(stup); // serverul intoarce elementul cu id
    setStupi((prev) => [...prev, creat]);
    notifica(`🐝 ${creat.nume} a fost adăugat în stupină`);
  }

  async function handleToggle(id) {
    const stup = stupi.find((s) => s.id === id);
    try {
      const actualizat = await updateStup(id, { inspectat: !stup.inspectat });
      setStupi((prev) => prev.map((s) => (s.id === id ? actualizat : s)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    const stup = stupi.find((s) => s.id === id);
    try {
      await deleteStup(id);
      setStupi((prev) => prev.filter((s) => s.id !== id));
      notifica(`🗑️ ${stup.nume} a fost șters`);
    } catch (err) {
      setError(err.message);
    }
  }

  // Valori derivate din date, nu pastrate in state
  const inspectati = stupi.filter((s) => s.inspectat).length;
  const active = stupi.length - inspectati;
  const procent = stupi.length > 0 ? Math.round((inspectati / stupi.length) * 100) : 0;

  // Lista afisata: intai filtrul de stare, apoi cautarea dupa nume
  const text = cautare.trim().toLowerCase();
  const vizibili = stupi
    .filter((s) => {
      if (filtru === "de-inspectat") return !s.inspectat;
      if (filtru === "inspectati") return s.inspectat;
      return true;
    })
    .filter((s) => s.nume.toLowerCase().includes(text));

  const filtrat = text !== "" || filtru !== "toti";

  let mesajZi = "";
  if (!loading && !error) {
    if (stupi.length === 0) mesajZi = "Stupina e goală. Adaugă primul stup din formular.";
    else if (active === 0) mesajZi = "Toți stupii sunt inspectați. Albinele sunt mulțumite! 🍯";
    else mesajZi = `Ai ${active} ${active === 1 ? "stup" : "stupi"} de inspectat.`;
  }

  return (
    <>
      <section className={styles.banner}>
        <div>
          <p className={styles.data}>{dataDeAzi()}</p>
          <h1 className={styles.salut}>Bună ziua, apicultorule!</h1>
          {mesajZi && <p className={styles.mesajZi}>{mesajZi}</p>}
        </div>
        <div className={styles.bannerHex} aria-hidden="true">
          <span>🍯</span>
          <span>🐝</span>
          <span>🌼</span>
        </div>
      </section>

      <div className={styles.grid}>
        <section className="panel">
          <h2>➕ Stup nou</h2>
          <p className={styles.hint}>Adaugă un stup în stupină. Îl poți marca drept inspectat din listă.</p>
          <StupForm onAdd={handleAdd} />
        </section>

        <section className="panel">
          <h2>📋 Stupii mei</h2>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{stupi.length}</span>
              <span className={styles.statLabel}>stupi</span>
            </div>
            <div className={`${styles.stat} ${styles.statPending}`}>
              <span className={styles.statValue}>{active}</span>
              <span className={styles.statLabel}>de inspectat</span>
            </div>
            <div className={`${styles.stat} ${styles.statDone}`}>
              <span className={styles.statValue}>{inspectati}</span>
              <span className={styles.statLabel}>inspectați</span>
            </div>
          </div>

          <div className={styles.progress}>
            <div className={styles.progressLabels}>
              <span>
                {stupi.length} stupi, dintre care {active} de inspectat
              </span>
              <span>{procent}%</span>
            </div>
            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-label="Progres inspecție"
              aria-valuenow={procent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className={styles.progressFill} style={{ width: `${procent}%` }}></div>
            </div>
          </div>

          <FiltruBar
            cautare={cautare}
            onCautare={setCautare}
            filtru={filtru}
            onFiltru={setFiltru}
            numere={{ toti: stupi.length, "de-inspectat": active, inspectati }}
          />

          {loading && (
            <p className="info" data-testid="loading">
              Se încarcă stupii din stupină...
            </p>
          )}

          {error && (
            <p className="error" data-testid="error">
              Nu am putut comunica cu serverul: {error}. Rulează <code>npm run api</code>?
            </p>
          )}

          {!loading && (
            <StupList
              stupi={vizibili}
              onToggle={handleToggle}
              onDelete={handleDelete}
              mesajGol={filtrat ? "Niciun stup nu se potrivește cu filtrul ales." : undefined}
            />
          )}
        </section>
      </div>

      <Toast notificare={notificare} />
    </>
  );
}
