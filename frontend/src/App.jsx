import StupList from "./components/StupList.jsx";

const stupi = [
  { id: 1, nume: "Stupul 01 - Salcâm", inspectat: false, putere: "puternica" },
  { id: 2, nume: "Stupul 02 - Tei", inspectat: true, putere: "medie" },
  { id: 3, nume: "Stupul 03 - Polifloră", inspectat: false, putere: "slaba" }
];

export default function App() {
  const inspectati = stupi.filter((s) => s.inspectat).length;
  const active = stupi.length - inspectati;
  const procent = stupi.length > 0 ? Math.round((inspectati / stupi.length) * 100) : 0;

  return (
    <>
      <header className="app-header">
        <h1>🐝 BeeLog</h1>
        <p>Organizează-ți stupina și monitorizează starea fiecărui stup.</p>
        
        <div className="header-stats">
          <span className="app-count">
            {stupi.length} stupi, dintre care {active} de inspectat
          </span>

          {/* Bara de progres pentru inspecții */}
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
          <StupList stupi={stupi} />
        </section>
      </main>
    </>
  );
}