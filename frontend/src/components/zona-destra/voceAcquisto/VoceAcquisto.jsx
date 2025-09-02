
import "./VoceAcquisto.css"
export default function VoceAcquisto({ acquisto, setIdProdottoAttuale, idProdottoAttuale, parseImporto, arr }) {

  const seleziona = (idAcquisto) => {
    setIdProdottoAttuale(idAcquisto)
  }

  return (
    <>
      {acquisto && (
        <div className={`valore-corrente-acq ${idProdottoAttuale === acquisto.id ? "evidenziato" : ""}`} onClick={() => { seleziona(acquisto.id) }}>
          <p className='nome-prodotto-acq'>{acquisto.nome}  </p>
          <p className='monitor-quantità-prodotto-acq'>X{Number(acquisto.qt)}</p>

          <p className='monitor-prezzo-prodotto-acq'>  €{acquisto.sconto == 0 ? arr(Number(acquisto.ivato)) : arr(parseImporto(acquisto.ivato) - (parseImporto(acquisto.ivato) * acquisto.sconto / 100))}</p>
          {acquisto.sconto > 0 && (
            <p className='monitor-sconot-prodotto-acq'>  %{acquisto.sconto}</p>
          )}

          {acquisto.sconto == 0 && (
            <p className='monitor-sconot-prodotto-acq'> no </p>
          )}
          <p className='monitor-totale-prodotto-acq'> €{acquisto.sconto == 0 ? arr(acquisto.qt * parseImporto(acquisto.ivato)) : arr(acquisto.qt * (parseImporto(acquisto.ivato) - (parseImporto(acquisto.ivato) * acquisto.sconto / 100)))}</p>
        </div>
      )}

    </>
  )
}