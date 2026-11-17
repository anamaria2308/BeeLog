import { useState } from "react";
// Valorile fixe si limitele folosite la validare
const PUTERI = [
  { value: "puternica", label: "Puternică" },
  { value: "medie", label: "Medie" },
  { value: "slaba", label: "Slabă" },
];
const NUME_MAX = 100;
const RAME_MIN = 1;
const RAME_MAX = 20;

// Formular controlat: state-ul React este sursa de adevar pentru campuri
export default function StupForm({ onAdd }) {
  const [nume, setNume] = useState("");
  const [putere, setPutere] = useState("medie");
  const [rame, setRame] = useState("10");
  const [eroare, setEroare] = useState("");
  const [campGresit, setCampGresit] = useState("");
  const [trimite, setTrimite] = useState(false);

  // Intoarce { camp, mesaj } pentru prima problema gasita sau null
  function valideaza() {
    const n = nume.trim();
    if (n === "") return { camp: "nume", mesaj: "Numele stupului este obligatoriu." };
    if (n.length > NUME_MAX) {
      return { camp: "nume", mesaj: `Numele are maximum ${NUME_MAX} de caractere.` };
    }
    const r = Number(rame);
    if (rame.trim() === "" || !Number.isInteger(r) || r < RAME_MIN || r > RAME_MAX) {
      return {
        camp: "rame",
        mesaj: `Numărul de rame trebuie să fie un întreg între ${RAME_MIN} și ${RAME_MAX}.`,
      };
    }
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault(); // opreste reincarcarea paginii
    const problema = valideaza();
    if (problema) {
      setEroare(problema.mesaj);
      setCampGresit(problema.camp);
      return;
    }
    setEroare("");
    setCampGresit("");
    setTrimite(true);
    try {
      await onAdd({ nume: nume.trim(), putere, rame: Number(rame), inspectat: false });
      // golirea se face doar dupa ce serverul a confirmat salvarea
      setNume("");
      setPutere("medie");
      setRame("10");
    } catch (err) {
      setEroare(err.message);
    } finally {
      setTrimite(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate data-testid="form">
      <label>
        Nume stup
        <input
          type="text"
          value={nume}
          onChange={(e) => setNume(e.target.value)}
          placeholder="Ex: Stupul 06 - Salcâm"
          maxLength={NUME_MAX}
          aria-invalid={campGresit === "nume"}
          data-testid="form-title"
        />
      </label>

      <label>
        Putere colonie
        <select
          value={putere}
          onChange={(e) => setPutere(e.target.value)}
          data-testid="form-putere"
        >
          {PUTERI.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Număr de rame
        <input
          type="number"
          min={RAME_MIN}
          max={RAME_MAX}
          value={rame}
          onChange={(e) => setRame(e.target.value)}
          aria-invalid={campGresit === "rame"}
          data-testid="form-rame"
        />
      </label>

      {eroare && (
        <p className="error" data-testid="form-error">
          {eroare}
        </p>
      )}

      <button type="submit" className="btn" disabled={trimite} data-testid="form-submit">
        {trimite ? "Se salvează..." : "Adaugă stupul"}
      </button>
    </form>
  );
}
