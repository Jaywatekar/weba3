import { jwtDecode } from "jwt-decode";

export async function authenticateUser(username, pwd) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ userName: username, password: pwd }),
  });

  const body = await res.json();

  if (res.ok) {
    storeToken(body.token);
    return true;
  }

  throw new Error(body.message);
}

export async function registerUser(username, pw1, pw2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ userName: username, password: pw1, password2: pw2 }),
  });

  const body = await res.json();

  if (res.ok) return true;

  throw new Error(body.message);
}

function storeToken(t) {
  localStorage.setItem("access_token", t);
}

export function fetchToken() {
  try {
    return localStorage.getItem("access_token");
  } catch {
    return null;
  }
}

export function clearToken() {
  localStorage.removeItem("access_token");
}

export function decodeToken() {
  try {
    const tok = fetchToken();
    return tok ? jwtDecode(tok) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return decodeToken() ? true : false;
}
