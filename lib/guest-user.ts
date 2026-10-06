// Usuario invitado guardado en localStorage (clave `av_user`), como en el prototipo.
// Aquí se conectaría la sesión real (REST o Supabase) para usuarios autenticados.

export type GuestUser = { name: string };

const KEY = "av_user";
const EVENT = "av-user-change";

export function subscribeUser(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

// Devuelve el JSON crudo para que useSyncExternalStore compare strings estables.
export function getUserSnapshot() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function parseUser(raw: string | null): GuestUser | null {
  try {
    return raw ? (JSON.parse(raw) as GuestUser) : null;
  } catch {
    return null;
  }
}

export function saveUser(user: GuestUser) {
  localStorage.setItem(KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(EVENT));
}

export function clearUser() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVENT));
}
