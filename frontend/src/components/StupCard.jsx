const ETICHETE_PUTERE = {
  slaba: "slabă",
  medie: "medie",
  puternica: "puternică"
};

export default function StupCard({ stup }) {
  return (
    <li className={stup.inspectat ? "task-card done" : "task-card"}>
      <div className="card-left">
        <div className="hive-icon">🐝</div>
        <div>
          <h3>{stup.nume}</h3>
          <span className={`badge badge-${stup.putere}`}>
            Putere: {ETICHETE_PUTERE[stup.putere]}
          </span>
        </div>
      </div>

      <div className="card-right">
        <span className="status">
          <span className={`status-dot ${stup.inspectat ? "dot-done" : "dot-pending"}`}></span>
          {stup.inspectat ? "Inspectat" : "De inspectat"}
        </span>
      </div>
    </li>
  );
}