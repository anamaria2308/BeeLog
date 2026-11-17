// Logica inspectiei, fara React: functii pure care primesc un stup si intorc date noi.

// Criteriile pe care apicultorul le verifica la fiecare inspectie
export const CRITERII = [
  { cheie: "matca", label: "Matcă văzută sau ouă proaspete", detaliu: "colonia are matcă activă" },
  { cheie: "puiet", label: "Puiet compact și sănătos", detaliu: "fără goluri mari în fagure" },
  { cheie: "hrana", label: "Rezerve suficiente de hrană", detaliu: "miere și păstură pe rame" },
  { cheie: "boli", label: "Fără semne de boală sau varroa", detaliu: "loca, nosemoză, acarieni" },
  { cheie: "roire", label: "Fără botci de roire", detaliu: "colonia nu pregătește roiul" },
  { cheie: "spatiu", label: "Spațiu suficient în stup", detaliu: "rame libere pentru dezvoltare" },
];

const TOATE = CRITERII.map((c) => c.cheie);

// Data de azi ca text "2026-11-17", salvata in db.json la finalul inspectiei
export function azi() {
  return new Date().toISOString().slice(0, 10);
}

// Criteriile bifate ale unui stup (stupii vechi, fara lista, au doar inspectat)
export function verificariStup(stup) {
  if (Array.isArray(stup.verificari)) return stup.verificari;
  return stup.inspectat ? TOATE : [];
}

// Starea inspectiei: "inspectat" (toate bifate), "in-curs" (unele) sau "de-inspectat" (niciunul)
export function stareInspectie(stup) {
  const bifate = verificariStup(stup).length;
  const total = CRITERII.length;
  let stare = "de-inspectat";
  if (bifate === total) stare = "inspectat";
  else if (bifate > 0) stare = "in-curs";
  return { bifate, total, stare };
}

// Modificarile trimise la server cand se bifeaza sau se debifeaza un criteriu.
// inspectat se calculeaza din criterii: devine true doar cand sunt bifate toate.
export function comutaCriteriu(stup, cheie) {
  const curente = verificariStup(stup);
  const verificari = curente.includes(cheie)
    ? curente.filter((c) => c !== cheie)
    : TOATE.filter((c) => c === cheie || curente.includes(c)); // pastreaza ordinea din CRITERII
  const inspectat = verificari.length === TOATE.length;
  return { verificari, inspectat, dataInspectie: inspectat ? azi() : null };
}

// Bifa de pe card: marcheaza toate criteriile sau le goleste pe toate
export function marcheazaTot(inspectat) {
  return {
    verificari: inspectat ? TOATE : [],
    inspectat,
    dataInspectie: inspectat ? azi() : null,
  };
}

// Data salvata ("2026-11-17") afisata in romana: "17 noiembrie 2026" sau, scurt, "17 nov. 2026"
export function formatData(text, scurt = false) {
  if (!text) return "–";
  return new Date(`${text}T12:00:00`).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: scurt ? "short" : "long",
    year: "numeric",
  });
}
