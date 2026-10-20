// Etichete pentru afișarea cu diacritice pe ecran
const ETICHETE_PUTERE = {
  slaba: "slabă",
  medie: "medie",
  puternica: "puternică"
};

export default function StupCard({ stup }) {
  return (
    <li className={stup.inspectat ? "task-card done" : "task-card"}>
      <div>
        <h3>{stup.nume}</h3>
        <span className={`badge badge-${stup.putere}`}>
          Putere: {ETICHETE_PUTERE[stup.putere]}
        </span>
      </div>
      <span className="status">
        {stup.inspectat ? "Inspectat" : "De inspectat"}
      </span>
    </li>
  );
}