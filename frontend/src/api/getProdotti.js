const backendUrl = import.meta.env.VITE_URL_BACKEND

export const getProdotti = async () => {
  try {
    const res = await fetch(`${backendUrl}/api/prodotti`);
    if (!res.ok) {
      throw new Error("errore nel recupero dei prodotti")
    }

    const data = await res.json();
    return data;
  } catch (error) {
    if (error.message.includes("Failed to fetch") || error.message.includes("ECONNREFUSED")) {
      throw new Error("Il server non è attivo. Avvia Laravel con: php artisan serve");
    } else {
      // altri errori
      throw new Error("Errore API:", error.message);
    }

  }
}