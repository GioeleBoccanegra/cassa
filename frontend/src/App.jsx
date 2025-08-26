
import { useState } from 'react'
import './App.css'
import Pulsante from "./components/zona-destra/pulsante/Pulsante"

function App() {

  const [importo, setImporto] = useState("0");
  const [importoCent, setImportoCent] = useState("0")
  const [decim, setDecim] = useState(false)

  const conferma = () => {
    setImporto("0")
    setDecim(false)
    setImportoCent("0")

  }

  const faiCent = (imp) => {
    return Number(imp.toString().slice(0, 2));
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
            <p>€{importo}</p>{importoCent > 0 && (
              <p>, {faiCent(importoCent)}</p>
            )}
          </div>
          <div className='contenitore-pulsanti'>

            {Array.from({ length: 10 }, (_, i) => (
              <Pulsante key={i} val={i} setImporto={setImporto} decim={decim} setImportoCent={setImportoCent} />
            ))}

            <button onClick={() => { setDecim(true) }}>,</button>

            <button onClick={conferma}>conferma</button>


          </div>
        </div>
      </div>

    </>
  )
}

export default App
