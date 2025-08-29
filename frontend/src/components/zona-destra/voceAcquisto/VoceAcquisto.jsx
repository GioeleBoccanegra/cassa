
import "./VoceAcquisto.css"
export default function VoceAcquisto({ acquisto, setIdProdottoAttuale, idProdottoAttuale }) {

  const seleziona = (idAcquisto) => {
    setIdProdottoAttuale(idAcquisto)

  }

  return (
    <>
      {acquisto && (
        <div className={`valore-corrente-acq ${idProdottoAttuale === acquisto.id ? "evidenziato" : ""}`} onClick={() => { seleziona(acquisto.id) }}>
          <p className='nome-prodotto-acq'>{acquisto.nome}  </p>
          <p className='monitor-quantità-prodotto-acq'>X{acquisto.qt}</p>
          <p className='monitor-prezzo-prodotto-acq'>  €{acquisto.ivato}</p>
          <p className='monitor-totale-prodotto-acq'> €{acquisto.qt * acquisto.ivato}</p>
        </div>
      )}

    </>
  )
}