import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="panel" data-testid="not-found">
      <h2>🐝 Albina s-a rătăcit</h2>
      <p className="info">Adresa cerută nu duce la niciun stup din stupină.</p>
      <Link to="/">Înapoi la stupi</Link>
    </section>
  );
}
