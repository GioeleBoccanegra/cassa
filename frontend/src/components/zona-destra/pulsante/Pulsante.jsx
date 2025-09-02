import "./Pulsante.css";

export default function Pulsante({ val, setImporto, importo }) {

  const handelclik = () => {





    const dec = importo.split(",")[1]
    if (!dec || dec.length < 2) {
      const nuovoImporto = importo + val;

      setImporto(nuovoImporto)
    }



  }






  return (
    <button className="pulsante-cassa" type="button" onClick={handelclik} >
      {val}
    </button >
  )
}