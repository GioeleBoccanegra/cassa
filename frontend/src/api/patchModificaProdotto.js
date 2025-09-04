const backendUrl = import.meta.env.VITE_URL_BACKEND



export const patchModificaProdotto = async (prod) => {
  try {
    const res = await fetch(`${backendUrl}/api/prodotti/${prod.id}`, {

      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        category_id: prod.category_id,
        nome: prod.nome,
        ivato: prod.ivato
      })
    });

    if (!res.ok) {
      throw new Error("errore nella modifica del prodotto")
    }

    const data = await res.json()
    return data
  } catch (error) {
    if (error.message.includes("Failed to fetch") || error.message.includes("ECONNREFUSED")) {
      throw new Error("Il server non è attivo. Avvia Laravel con: php artisan serve");
    } else {
      // altri errori
      throw new Error("Errore API:", error.message);
    }
  }
}