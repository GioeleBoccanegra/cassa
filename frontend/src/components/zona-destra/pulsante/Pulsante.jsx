import "./Pulsante.css";

export default function Pulsante({ val, setImporto, fattoTotale, setFattoTotale, importo }) {

  const handelclik = () => {



    if (fattoTotale) {
      setFattoTotale(false)
    }


    const nuovoImporto = importo + val;
    setImporto(nuovoImporto)

  }






  return (
    <button className="pulsante-cassa" type="button" onClick={handelclik} >
      {val}
    </button >
  )
}