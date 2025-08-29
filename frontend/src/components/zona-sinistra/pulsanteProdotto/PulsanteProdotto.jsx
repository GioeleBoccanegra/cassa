
import "./PulsateProdotto.css"
export default function PulsanteProdotto({ prodotto, setListaAcquisti, setIdProdottoAttuale }) {

  const prodottoCliccato = (prodotto) => {


    setListaAcquisti(prev => {
      // controlla se esiste già il prodotto
      const esiste = prev.some(
        acquisto => acquisto.id === prodotto.id && acquisto.ivato === prodotto.ivato
      );

      if (esiste) {
        return prev.map(acquisto =>
          acquisto.id === prodotto.id && acquisto.ivato === prodotto.ivato
            ? { ...acquisto, qt: acquisto.qt + 1 }
            : acquisto
        );
      } else {
        return [...prev, {
          id: prodotto.id,
          nome: prodotto.nome,
          qt: 1,
          ivato: prodotto.ivato
        }]
      }
    })




    setIdProdottoAttuale(prodotto.id)
  }

  return (
    <div className="pulsante-prodotto" onClick={() => { prodottoCliccato(prodotto) }}>
      <p className="pulsante-nome-prodotto">{prodotto.nome}</p>
      <p className="pulsante-ivato-prodotto">€{prodotto.ivato}</p>
    </div>
  )
}