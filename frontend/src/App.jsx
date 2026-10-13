// Datele de test deasupra funcției (nu se recreează la fiecare randare)
const stupi = [
  { id: 1, nume: "Stupul 01 - Salcâm", inspectat: false, putere: "puternica" },
  { id: 2, nume: "Stupul 02 - Tei", inspectat: true, putere: "medie" },
  { id: 3, nume: "Stupul 03 - Polifloră", inspectat: false, putere: "slaba" }
];

export default function App() {
  // Calculăm numărul de stupi neinspectați (activi)
  const active = stupi.filter((s) => !s.inspectat).length;

  return (
    <>
      <header className="app-header">
        <h1>BeeLog</h1>
        <p>Organizează-ți stupina și monitorizează starea fiecărui stup.</p>
        <p className="app-count">
          {stupi.length} stupi, dintre care {active} activi
        </p>
      </header>

      <main className="container">
        <section className="panel">
          <h2>Stupii mei</h2>
          {/* Temporar: date brute afișate ca JSON conform cerințelor etapei */}
          <pre>{JSON.stringify(stupi, null, 2)}</pre>
        </section>
      </main>
    </>
  );
}