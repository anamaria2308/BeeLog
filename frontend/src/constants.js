// Valorile fixe si etichetele lor, intr-un singur loc.
export const PUTERI = [
  { value: "puternica", label: "Puternică" },
  { value: "medie", label: "Medie" },
  { value: "slaba", label: "Slabă" },
];

export const ETICHETE_PUTERE = Object.fromEntries(
  PUTERI.map((p) => [p.value, p.label])
);

// Cate hexagoane se coloreaza in indicatorul de putere (din 3)
export const NIVEL_PUTERE = { slaba: 1, medie: 2, puternica: 3 };

// Limitele folosite la validarea formularului
export const NUME_MAX = 100;
export const RAME_MIN = 1;
export const RAME_MAX = 20;
