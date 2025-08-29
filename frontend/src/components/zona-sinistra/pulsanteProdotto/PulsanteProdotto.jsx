
import "./PulsateProdotto.css"
export default function PulsanteProdotto({ prodotto, setListaAcquisti, setIdProdottoAttuale }) {

  const prodottoCliccato = (prodotto) => {
    const id = Date.now()
    setListaAcquisti(prev => [...prev, {
      id: id,  // unico perché basato su millisecondi
      nome: prodotto.nome,
      qt: 1,
      ivato: prodotto.ivato
    }])
    setIdProdottoAttuale(id)
  }

  return (
    <div className="pulsante-prodotto" onClick={() => { prodottoCliccato(prodotto) }}>
      <p className="pulsante-nome-prodotto">{prodotto.nome}</p>
      <p className="pulsante-ivato-prodotto">€{prodotto.ivato}</p>
    </div>
  )
}