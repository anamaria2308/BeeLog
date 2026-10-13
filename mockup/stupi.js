// Datele de test inițiale (fiecare cu un id unic)
const stupi = [
  { id: 1, nume: "Stupul 01 - Salcâm", inspectat: false, putere: "puternica" },
  { id: 2, nume: "Stupul 02 - Tei", inspectat: true, putere: "medie" },
  { id: 3, nume: "Stupul 03 - Polifloră", inspectat: false, putere: "slaba" }
];

// Valori permise pentru eticheta fixă
const PUTERI = ["slaba", "medie", "puternica"];

// 1. Listarea numelor stupilor
function listeazaNume(lista) {
  return lista.map((s) => s.nume);
}

// 2. Numărarea stupilor neinspectați (activi)
function numaraActive(lista) {
  return lista.filter((s) => !s.inspectat).length;
}

// 3. Căutarea după nume (case-insensitive)
function cautaDupaNume(lista, text) {
  const textCautat = text.toLowerCase();
  return lista.filter((s) => s.nume.toLowerCase().includes(textCautat));
}

// Funcție ajutătoare pentru calcularea următorului ID unic (folosind reduce)
function nextId(lista) {
  return lista.reduce((max, s) => Math.max(max, s.id), 0) + 1;
}

// 4. Adăugarea unui stup nou cu validare
function adaugaStup(lista, nume, putere = "medie") {
  const numeCurat = nume.trim();

  // Validare nume
  if (!numeCurat) {
    console.log("Numele stupului nu poate fi gol.");
    return lista;
  }

  // Validare etichetă
  if (!PUTERI.includes(putere)) {
    console.log(`Putere invalidă: ${putere}`);
    return lista;
  }

  // Creare obiect nou cu următorul id
  const stupNou = {
    id: nextId(lista),
    nume: numeCurat,
    inspectat: false,
    putere: putere
  };

  // Returnare array nou (imutabilitate)
  return [...lista, stupNou];
}

// 5. Comutarea stării de inspecție (folosind map)
function comutaInspectat(lista, id) {
  return lista.map((s) => {
    if (s.id === id) {
      return { ...s, inspectat: !s.inspectat };
    }
    return s;
  });
}

// 6. Ștergerea unui stup după ID (folosind filter)
function stergeStup(lista, id) {
  return lista.filter((s) => s.id !== id);
}

// --- Testele din consolă ---

console.log("--- Citire ---");
console.log("Stupi:", listeazaNume(stupi).join(", "));
console.log("Active (de inspectat):", numaraActive(stupi));
console.log("Căutare 'salcâm':", listeazaNume(cautaDupaNume(stupi, "salcâm")).join(", "));

console.log("--- Adăugare ---");
let lista = adaugaStup(stupi, "Stupul 04 - Rapiță", "puternica");
console.log("Lista nouă:", lista.length, "stupi");
console.log("Originalul a rămas cu:", stupi.length, "stupi");

console.log("--- Modificare și ștergere ---");
lista = comutaInspectat(lista, 1);
console.log("După inspectarea id 1, active rămase:", numaraActive(lista));
lista = stergeStup(lista, 3);
console.log("După ștergerea id 3:", listeazaNume(lista).join(", "));

console.log("--- Validare ---");
adaugaStup(lista, "");
adaugaStup(lista, "Stup Nou", "necunoscuta");