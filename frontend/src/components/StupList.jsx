import StupCard from "./StupCard.jsx";

export default function StupList({ stupi }) {
  // 1. Randare condiționată dacă lista este goală
  if (stupi.length === 0) {
    return <p className="empty">Nu există niciun stup în stupină.</p>;
  }

  // 2. Randarea listei cu map și atributul obligatoriu key
  return (
    <ul className="task-list">
      {stupi.map((stup) => (
        <StupCard key={stup.id} stup={stup} />
      ))}
    </ul>
  );
}