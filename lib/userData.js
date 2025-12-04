import { fetchToken } from "./authenticate";

const authHeader = () => ({
  Authorization: `JWT ${fetchToken()}`,
});

export async function getFavourites() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
      method: "GET",
      headers: authHeader(),
    });

    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}

export async function addToFavourites(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: "PUT",
      headers: authHeader(),
    });

    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}

export async function removeFromFavourites(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: "DELETE",
      headers: authHeader(),
    });

    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}
