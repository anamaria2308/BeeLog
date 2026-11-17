import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// NavLink marcheaza singur pagina curenta
function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

// Antetul, navigatia si subsolul, comune tuturor paginilor
export default function Layout() {
  const [tema, setTema] = useState(temaInitiala);

  // Comutarea temei: state-ul pentru buton, atributul data-theme pentru CSS
  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <span className={styles.logoHex} aria-hidden="true">
              🐝
            </span>
            <span>
              <span className={styles.logo}>BeeLog</span>
              <span className={styles.tagline}>jurnalul stupinei</span>
            </span>
          </div>

          <nav className={styles.nav} data-testid="nav">
            <NavLink to="/" end className={navClass}>
              Stupi
            </NavLink>
            <NavLink to="/despre" className={navClass}>
              Despre
            </NavLink>
          </nav>

          <button
            type="button"
            className={styles.themeToggle}
            onClick={handleTema}
            aria-pressed={tema === "dark"}
          >
            {tema === "dark" ? "☀️ Mod luminos" : "🌙 Mod întunecat"}
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>🐝 BeeLog · Proiect Tehnologii Web</footer>
    </>
  );
}
