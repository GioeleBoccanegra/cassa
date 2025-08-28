
import { useEffect, useState } from 'react'
import './App.css'
import Pulsante from "./components/zona-destra/pulsante/Pulsante"
import { getCategorie } from './api/getCategorie';

function App() {

  const [importo, setImporto] = useState("");
  const [simbolo, setSimbolo] = useState(null)
  const [totale, setTotale] = useState(0)
  const [fattoTotale, setFattoTotale] = useState(false)
  const [listaCategorie, setListacategorie] = useState([]);

  const simboli = ["+", "-", "*", "/"];



  useEffect(() => {
    const listaCategorie = async () => {
      const risposta = await getCategorie();
      setListacategorie(risposta)
      console.log(risposta);
    }
    listaCategorie();
  }, [])

  const conferma = () => {
    setImporto("")
    setTotale(0)
    setSimbolo(null)
    setFattoTotale(false)

  }

  const parseImporto = (imp) => {
    return parseFloat(
      (imp || "0").replace(",", ".")
    );
  };

  const arr = (tot) => Number.isFinite(tot) ? tot.toFixed(2) : 0;

  const calcola = (simbolo) => {
    setTotale(prev => {
      switch (simbolo) {
        case "+":
          return prev + parseImporto(importo);
        case "-":
          return prev - parseImporto(importo);
        case "*":
          return prev * parseImporto(importo);

        case "/":
          return prev / parseImporto(importo);
        default:
          return parseImporto(importo);
      }
    })
  }


  const faiTotale = () => {
    calcola(simbolo)
    setImporto("")
    setSimbolo(null)
    setFattoTotale(true)
  }



  const aggTotale = (s) => {

    if (importo) calcola(simbolo)


    setSimbolo(s)
    setImporto("")
    setFattoTotale(false)
  }

  const elimina = () => {
    if (importo.length > 0) {
      setImporto(prev => prev.slice(0, -1));
    } else {
      setSimbolo(null)
    }
  }


  return (
    <>
      <div className='visual-cassa'>

        <div className='zona-sinistra'>
          <div className='puls-categorie'>
            {listaCategorie && (
              listaCategorie.map((cat) => (
                <p key={cat.nome}>{cat.nome}</p>
              ))
            )}
          </div>
          <div className='puls-prodotti'>

          </div>
        </div>



        <div className='zona-destra'>
          <div className='monitor-cassa'>
            <div className='valore-corrente'>
              {simbolo && <p>{simbolo}</p>}
              <p>€{importo}</p>
            </div>
            <div className='valore-totale'>
              <p>tot:{arr(totale)}</p>
            </div>

          </div>
          <div className='contenitore-pulsanti'>

            {Array.from({ length: 10 }, (_, i) => (
              <Pulsante key={i} val={i} setImporto={setImporto} fattoTotale={fattoTotale} setFattoTotale={setFattoTotale} setTotale={setTotale} />
            ))}

            {simboli.map((s) => (
              <button key={s} onClick={() => { aggTotale(s) }}>{s}</button>
            ))}

            <button onClick={() => { setImporto(prev => prev.includes(",") ? prev : prev + ","); }}>,</button>

            <button onClick={() => { faiTotale() }}>=</button>

            <button onClick={conferma}>conferma</button>
            <button onClick={() => { elimina() }}>elimina</button>




          </div>
        </div>
      </div>

    </>
  )
}

export default App
