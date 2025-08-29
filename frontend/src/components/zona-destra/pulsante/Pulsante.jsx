import "./Pulsante.css";

export default function Pulsante({ val, setImporto, fattoTotale, setFattoTotale, setUsaQt, usaQt, idProdottoAttuale, setListaAcquisti }) {

  const handelclik = () => {
    if (usaQt) {
      setListaAcquisti(prev => prev.map(acquisto => acquisto.id === idProdottoAttuale
        ? { ...acquisto, qt: val } : acquisto))
      setUsaQt(false)
    } else {


      if (fattoTotale) {
        setFattoTotale(false)
      }

      setImporto(prev => prev + val)
    }
  }






  return (
    <button className="pulsante-cassa" type="button" onClick={handelclik} >
      {val}
    </button >
  )
}