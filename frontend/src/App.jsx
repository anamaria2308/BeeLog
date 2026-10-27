import { useState } from "react";
import StupList from "./components/StupList.jsx";

// Datele temei: valoarea inițială
const STUPI_INITIALI = [
  { id: 1, nume: "Stupul 01 - Salcâm", inspectat: false, putere: "puternica" },
  { id: 2, nume: "Stupul 02 - Tei", inspectat: true, putere: "medie" },
  { id: 3, nume: "Stupul 03 - Polifloră", inspectat: false, putere: "slaba" }
];

// Citește tema sistemului de operare la prima randare
function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [stupi, setStupi] = useState(STUPI_INITIALI);
  const [tema, setTema] = useState(temaInitiala);

  // Actualizare imutabilă pentru comutarea stării de inspecție
  function handleToggle(id) {
    setStupi((prev) =>
      prev.map((s) => (s.id === id ? { ...s, inspectat: !s.inspectat } : s))
    );
  }

  // Actualizare imutabilă pentru ștergerea unui stup
  function handleDelete(id) {
    setStupi((prev) => prev.filter((s) => s.id !== id));
  }

  // Comutarea temei Light / Dark
  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  // Valori derivate (recalculate la fiecare randare)
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
          <StupList
            stupi={stupi}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </>
  );
}