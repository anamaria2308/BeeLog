// Toate cererile HTTP stau aici; componentele nu apeleaza fetch direct.
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// Functie comuna: trimite JSON si arunca eroare daca raspunsul nu este 2xx
async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) {
    throw new Error(`Eroare server: ${res.status}`);
  }
  // 204 No Content nu are corp
  return res.status === 204 ? null : res.json();
}

export function fetchStupi() {
  return request("/stupi");
}

export function createStup(stup) {
  return request("/stupi", { method: "POST", body: JSON.stringify(stup) });
}

export function updateStup(id, changes) {
  return request(`/stupi/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
}

export function deleteStup(id) {
  return request(`/stupi/${id}`, { method: "DELETE" });
}
