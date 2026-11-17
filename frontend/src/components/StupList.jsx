import StupCard from "./StupCard.jsx";
import styles from "./StupList.module.css";

export default function StupList({ stupi, onToggle, onDelete, mesajGol }) {
  if (stupi.length === 0) {
    return (
      <p className="empty" data-testid="empty">
        {mesajGol ?? "Nu există niciun stup în stupină."}
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {stupi.map((stup, index) => (
        <StupCard
          key={stup.id}
          stup={stup}
          index={index}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
