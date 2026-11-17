import { useEffect, useState } from "react";
import StupList from "./components/StupList.jsx";
import StupForm from "./components/StupForm.jsx";
import { createStup, deleteStup, fetchStupi, updateStup } from "./api.js";

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [stupi, setStupi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tema, setTema] = useState(temaInitiala);

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

  // Intai serverul, apoi state-ul: pe ecran ajunge doar ce s-a salvat.
  // Fara try: eroarea ajunge inapoi in formular, care o afiseaza.
  async function handleAdd(stup) {
    const creat = await createStup(stup); // serverul intoarce elementul cu id
    setStupi((prev) => [...prev, creat]);
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
    try {
      await deleteStup(id);
      setStupi((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  // Valori derivate din date, nu pastrate in state
  const inspectati = stupi.filter((s) => s.inspectat).length;
  const active = stupi.length - inspectati;
  const procent = stupi.length > 0 ? Math.round((inspectati / stupi.length) * 100) : 0;

  return (
    <>
      <header className="app-header">
        <button
          type="button"
          className="theme-toggle"
          onClick={handleTema}
          aria-pressed={tema === "dark"}
        >
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>

        <h1>🐝 BeeLog</h1>
        <p>Organizează-ți stupina și monitorizează starea fiecărui stup.</p>

        <div className="header-stats">
          <span className="app-count">
            {stupi.length} stupi, dintre care {active} de inspectat
          </span>

          <div className="progress-wrapper">
            <div className="progress-labels">
              <span>Progres inspecție</span>
              <span>{procent}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${procent}%` }}></div>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="panel">
          <div className="panel-header">
            <h2>➕ Adaugă stup</h2>
          </div>
          <StupForm onAdd={handleAdd} />
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>📋 Stupii mei</h2>
            <span className="badge-counter">{stupi.length} total</span>
          </div>

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
            <StupList stupi={stupi} onToggle={handleToggle} onDelete={handleDelete} />
          )}
        </section>
      </main>
    </>
  );
}
