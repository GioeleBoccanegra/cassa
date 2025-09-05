const backendUrl = import.meta.env.VITE_URL_BACKEND
import { Validazione } from "../utils/validazione/Validazione";


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

    const data = Validazione(res)
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