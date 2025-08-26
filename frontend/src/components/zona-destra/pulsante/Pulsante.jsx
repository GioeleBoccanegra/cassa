import "./Pulsante.css";

export default function Pulsante({ val, setImporto, decim, setImportoCent }) {

  const handelclik = () => {


    if (!decim) {
      setImporto(prev => prev * 10 + val)
    } else {
      setImportoCent(prev => prev * 10 + val)
    }

  }




  return (
    <button className="pulsante-cassa" type="button" onClick={handelclik} >
      {val}
    </button >
  )
}