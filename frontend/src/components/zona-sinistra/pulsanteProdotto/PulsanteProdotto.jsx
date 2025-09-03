
import "./PulsateProdotto.css"
export default function PulsanteProdotto({ prodotto, setListaAcquisti, setIdProdottoAttuale, importo, setImporto, parseImporto }) {

  const prodottoCliccato = (prodotto) => {


    setListaAcquisti(prev => {
      // controlla se esiste già il prodotto
      const esiste = prev.some(
        acquisto => acquisto.id === prodotto.id
      );

      if (esiste) {
        if (importo > 1) {
          return prev.map(acquisto => {
            if (acquisto.id === prodotto.id) {
              const aggiornato = {
                ...acquisto, qt: acquisto.qt + Number(importo)
              }
              setImporto("0")
              return aggiornato
            }
            return acquisto
          })

        } else {
          return prev.map(acquisto =>
            acquisto.id === prodotto.id
              ? { ...acquisto, qt: acquisto.qt + 1 }
              : acquisto
          )
        }



      } else {

        if (importo > 1) {

          const nuovoAcquisto = {
            id: prodotto.id,
            nome: prodotto.nome,
            iva: Number(prodotto.iva),
            qt: Number(importo),
            ivato: parseImporto(prodotto.ivato),
            sconto: 0
          };
          setImporto("0");
          return [...prev, nuovoAcquisto];


        } else {
          return [...prev, {
            id: prodotto.id,
            nome: prodotto.nome,
            iva: Number(prodotto.iva),
            qt: 1,
            ivato: parseImporto(prodotto.ivato),
            sconto: 0
          }]
        }

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