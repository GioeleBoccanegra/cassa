
import "./PulsateProdotto.css"
export default function PulsanteProdotto({ prodotto, setImporto, setNomeProdotto, setTotale, setQtProdotto, importo, qtProdotto, setListaAcquisti, nomeProdotto }) {

  const prodottoCliccato = (prodotto) => {
    setTotale(prev => prev + (importo * qtProdotto))
    if (nomeProdotto) {
      setListaAcquisti(prev => [...prev, {
        id: Date.now(),  // unico perché basato su millisecondi
        nome: nomeProdotto,
        qt: qtProdotto,
        ivato: importo
      }])
    }
    setQtProdotto(1)
    setImporto(prodotto.ivato)
    setNomeProdotto(prodotto.nome)
    console.log("meso totale a " + prodotto.ivato)

  }

  return (
    <div className="pulsante-prodotto" onClick={() => { prodottoCliccato(prodotto) }}>
      <p className="pulsante-nome-prodotto">{prodotto.nome}</p>
      <p className="pulsante-ivato-prodotto">€{prodotto.ivato}</p>
    </div>
  )
}