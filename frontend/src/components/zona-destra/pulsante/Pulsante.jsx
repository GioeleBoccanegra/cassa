import "./Pulsante.css";

export default function Pulsante({ val, setImporto, fattoTotale, setFattoTotale, setTotale, setUsaQt, usaQt, setQtProdotto }) {

  const handelclik = () => {
    if (usaQt) {
      setQtProdotto(val)
      setUsaQt(false)
    } else {


      if (fattoTotale) {
        setTotale(0)
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