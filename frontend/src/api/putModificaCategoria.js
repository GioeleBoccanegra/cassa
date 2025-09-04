const backendUrl = import.meta.env.VITE_URL_BACKEND



export const putModificaCategoria = async (cat) => {
  try {
    const res = await fetch(`${backendUrl}/api/categorie/${cat.id}`, {

      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: cat.nome,
        iva: cat.iva
      })
    });

    if (!res.ok) {
      throw new Error("errore nella modifica della categoria")
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