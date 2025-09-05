import { useEffect, useState } from "react"
import "./Scontrino.css"

export default function Scontrino({ listaAcquisti, svuota }) {
  const [totaleScontrino, setTotaleScontrino] = useState(0);
  const [ivaTotaleScontrino, setIvaTotaleScontrino] = useState(0);

  useEffect(() => {
    let totale = 0;
    let totaleIva = 0;

    listaAcquisti.map((acq) => {
      let nuovoTot;
      if (acq.sconto > 0) {
        nuovoTot = acq.qt * (acq.ivato - (acq.ivato * acq.sconto) / 100);
      } else {
        nuovoTot = acq.ivato * acq.qt;
      }

      totale += nuovoTot;
      totaleIva += (nuovoTot * acq.iva) / (100 + acq.iva);
    });

    setTotaleScontrino(totale);
    setIvaTotaleScontrino(totaleIva);


  }, [listaAcquisti]);

  return (
    <div className="background-scontrino" onClick={(e) => { e.stopPropagation() }}>
      <div className="scontrino">
        <div className="intestazione">
          <h2> Nome Azienda </h2>
          <p>Via dell'azienda </p>
          <p>contatti</p>
          <p>p.iva</p>
        </div>

        <div className="corpo">
          <div className="indice-scontrino">
            <p>Descrizione</p>
            <p>IVA</p>
            <p>Prezzo</p>
          </div>


          {listaAcquisti && (
            listaAcquisti.map((acq) => {

              return (

                <div className="voci-scontrino" key={acq.id}>
                  <p>{acq.nome}</p>

                  <p>{acq.qt > 1 ? (acq.qt + "X" + acq.ivato) : ""}</p>
                  <p>{acq.sconto > 0 ? "Sconti: " + (acq.ivato * acq.sconto / 100).toFixed(2) : ""}</p>
                  <p>{acq.iva}</p>
                  <p>{acq.sconto > 0 ? (acq.qt * (acq.ivato - ((acq.ivato * acq.sconto)) / 100)).toFixed(2) : (acq.qt * acq.ivato).toFixed(2)}</p>

                </div>

              )

            })
          )}

          <div className="totale">
            <p>TOTALE COMPLESSIVO</p>
            <p>{totaleScontrino.toFixed(2)}</p>
          </div>

          <div className="iva-su-tot">
            <p>di cui iva</p>
            <p>{ivaTotaleScontrino.toFixed(2)}</p>
          </div>

        </div>
        <button onClick={() => { svuota() }}>chiudi</button>


      </div >
    </div>
  )

}