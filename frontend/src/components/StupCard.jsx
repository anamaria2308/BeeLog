const ETICHETE_PUTERE = {
  slaba: "Slabă",
  medie: "Medie",
  puternica: "Puternică"
};

export default function StupCard({ stup, onToggle, onDelete }) {
  return (
    <li className={stup.inspectat ? "task-card done" : "task-card"}>
      <label className="task-main">
        <input
          type="checkbox"
          checked={stup.inspectat}
          onChange={() => onToggle(stup.id)}
        />
        <div className="card-left">
          <div className="hive-icon">🐝</div>
          <div>
            <h3>{stup.nume}</h3>
            <span className={`badge badge-${stup.putere}`}>
              Putere: {ETICHETE_PUTERE[stup.putere]}
            </span>
          </div>
        </div>
      </label>

      <div className="card-right">
        <span className="status">
          <span className={`status-dot ${stup.inspectat ? "dot-done" : "dot-pending"}`}></span>
          {stup.inspectat ? "Inspectat" : "De inspectat"}
        </span>

        <button
          type="button"
          className="btn-danger"
          onClick={() => onDelete(stup.id)}
          aria-label={`Șterge ${stup.nume}`}
        >
          Șterge
        </button>
      </div>
    </li>
  );
}