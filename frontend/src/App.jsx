import { useEffect, useState } from "react";
import StupList from "./components/StupList.jsx";
import { fetchStupi } from "./api.js";

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [stupi, setStupi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tema, setTema] = useState(temaInitiala);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await fetchStupi();
        if (!ignore) {
          setStupi(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  function handleToggle(id) {
    setStupi((prev) =>
      prev.map((s) => (s.id === id ? { ...s, inspectat: !s.inspectat } : s))
    );
  }

  function handleDelete(id) {
    setStupi((prev) => prev.filter((s) => s.id !== id));
  }

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

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
              <div
                className="progress-fill"
                style={{ width: `${procent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="panel">
          <div className="panel-header">
            <h2>📋 Stupii mei</h2>
            <span className="badge-counter">{stupi.length} total</span>
          </div>

          {loading && <p className="info">Se încarcă stupii din stupină...</p>}

          {error && (
            <p className="error">
              Nu am putut încărca datele: {error}. Rulează <code>npm run api</code>?
            </p>
          )}

          {!loading && !error && (
            <StupList
              stupi={stupi}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </>
  );
}