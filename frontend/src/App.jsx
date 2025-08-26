
import { useState } from 'react'
import './App.css'
import Pulsante from "./components/zona-destra/pulsante/Pulsante"

function App() {

  const [importo, setImporto] = useState(0);
  const [importoCent, setImportoCent] = useState(0)
  const [decim, setDecim] = useState(false)
  const [simbolo, setSimbolo] = useState(null)
  const [totale, setTotale] = useState(0)

  const simboli = ["+", "-", "*", "/"];

  const conferma = () => {
    setImporto("0")
    setDecim(false)
    setImportoCent("0")

  }

  const faiCent = (imp) => {
    return Number(imp.toString().slice(0, 2));
  }

  const faiTotale = () => {
    setTotale(prev => {
      switch (simbolo) {
        case "+":
          return prev + importo + faiCent(importoCent);
        case "-":
          return prev - importo + faiCent(importoCent);
        case "*":
          return prev * importo + faiCent(importoCent);
        case ":":
          return prev / importo + faiCent(importoCent);
        default:
          return importo + faiCent(importoCent);
      }
    })
    setImporto(0)
    setImportoCent(0)
    setSimbolo(null)
    setDecim(false)
  }

  const aggTotale = (s) => {
    setTotale(prev => {
      switch (simbolo) {
        case "+":
          return prev + importo + faiCent(importoCent);
        case "-":
          return prev - importo + faiCent(importoCent);
        case "*":
          return prev * importo + faiCent(importoCent);
        case ":":
          return prev / importo + faiCent(importoCent);
        default:
          if (prev == 0) {
            return importo + faiCent(importoCent);
          } else {
            return prev;
          }

      }
    })
    setImporto(0)
    setImportoCent(0)
    setSimbolo(s)
    setDecim(false)
  }


  return (
    <>
      <div className='visual-cassa'>

        <div className='zona-sinistra'>
          <div className='puls-categorie'></div>
          <div className='puls-prodotti'></div>
        </div>



        <div className='zona-destra'>
          <div className='monitor-cassa'>
            <div className='valore-corrente'>
              <p>€{importo}</p>{importoCent > 0 && (
                <p>, {faiCent(importoCent)}</p>
              )}
            </div>
            <div className='valore-totale'>
              <p>tot:{totale}</p>
            </div>

          </div>
          <div className='contenitore-pulsanti'>

            {Array.from({ length: 10 }, (_, i) => (
              <Pulsante key={i} val={i} setImporto={setImporto} decim={decim} setImportoCent={setImportoCent} />
            ))}

            {simboli.map((s) => (
              <button key={s} onClick={() => { aggTotale(s) }}>{s}</button>
            ))}

            <button onClick={() => { setDecim(true) }}>,</button>

            <button onClick={() => { faiTotale() }}>=</button>

            <button onClick={conferma}>conferma</button>




          </div>
        </div>
      </div>

    </>
  )
}

export default App
