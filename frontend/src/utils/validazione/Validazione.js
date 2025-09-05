export const Validazione = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    const errorMessage = data["errore nella validazione dei dati"]
      ? Object.values(data["errore nella validazione dei dati"]).flat().join(", ")
      : "Errore API";
    throw new Error(errorMessage);
  }
  return data;
}