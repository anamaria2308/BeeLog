import StupCard from "./StupCard.jsx";

export default function StupList({ stupi }) {
  if (stupi.length === 0) {
    return <p className="empty">Nu există niciun stup în stupină.</p>;
  }

  return (
    <ul className="task-list">
      {stupi.map((stup) => (
        <StupCard key={stup.id} stup={stup} />
      ))}
    </ul>
  );
}