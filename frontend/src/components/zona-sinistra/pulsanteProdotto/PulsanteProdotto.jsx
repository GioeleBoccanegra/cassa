
import "./PulsateProdotto.css"
export default function PulsanteProdotto({ prodotto, setImporto, setNomeProdotto }) {

  const prodottoCliccato = (prodotto) => {
    setImporto(prodotto.ivato)
    setNomeProdotto(prodotto.nome)

  }

  return (
    <div className="pulsante-prodotto" onClick={() => { prodottoCliccato(prodotto) }}>
      <p className="pulsante-nome-prodotto">{prodotto.nome}</p>
      <p className="pulsante-ivato-prodotto">€{prodotto.ivato}</p>
    </div>
  )
}