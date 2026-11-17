import styles from "./Toast.module.css";

// Mesaj scurt in coltul ecranului; pagina parinte decide cand dispare.
// role="status" face ca cititoarele de ecran sa anunte mesajul.
export default function Toast({ notificare }) {
  return (
    <div className={styles.zona} role="status" aria-live="polite">
      {notificare && (
        <div key={notificare.id} className={styles.toast}>
          {notificare.text}
        </div>
      )}
    </div>
  );
}
