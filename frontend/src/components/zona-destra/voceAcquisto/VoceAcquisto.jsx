
import "./VoceAcquisto.css"
export default function VoceAcquisto({ acquisto }) {



  return (
    <>
      {acquisto && (
        <div className='valore-corrente-acq'>
          <p className='nome-prodotto-acq'>{acquisto.nome}  </p>
          <p className='monitor-quantità-prodotto-acq'>X{acquisto.qt}</p>
          <p className='monitor-prezzo-prodotto-acq'>  €{acquisto.ivato}</p>
          <p className='monitor-totale-prodotto-acq'> €{acquisto.qt * acquisto.ivato}</p>
        </div>
      )}

    </>
  )
}