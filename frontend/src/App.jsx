
import { useEffect, useState } from 'react'
import './App.css'
import Pulsante from "./components/zona-destra/pulsante/Pulsante"
import { getCategorie } from './api/getCategorie';
import { getProdotti } from './api/getProdotti'
import PulsanteProdotto from './components/zona-sinistra/pulsanteProdotto/PulsanteProdotto';

function App() {

  const [importo, setImporto] = useState("");
  const [simbolo, setSimbolo] = useState(null)
  const [totale, setTotale] = useState(0)
  const [fattoTotale, setFattoTotale] = useState(false)
  const [listaCategorie, setListacategorie] = useState([]);
  const [listaProdotti, setListaProdotti] = useState([]);
  const [idCategoria, setIdCategoria] = useState(null)
  const [nomeProdotto, setNomeProdotto] = useState("")
  const [qtProdotto, setQtProdotto] = useState(1)

  const simboli = ["+", "-", "*", "/"];



  useEffect(() => {
    const listaCategorie = async () => {
      const risposta = await getCategorie();
      setListacategorie(risposta)
      riceviProdotti();
    }

    listaCategorie();
  }, [])

  const riceviProdotti = async () => {
    const risposta = await getProdotti()
    setListaProdotti(risposta);
  }

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
                <button key={cat.nome} onClick={() => { setIdCategoria(cat.id) }}>{cat.nome}</button>
              ))
            )}
          </div>
          <div className='puls-prodotti'>
            {idCategoria && listaProdotti && (
              listaProdotti.filter((prodotto) => prodotto.category_id === idCategoria)
                .map((prodotto) => (
                  <PulsanteProdotto key={prodotto.id} prodotto={prodotto} setImporto={setImporto} setNomeProdotto={setNomeProdotto} />
                ))

            )}
          </div>
        </div>



        <div className='zona-destra'>
          <div className='monitor-cassa'>
            <div className='valore-corrente'>
              {nomeProdotto && <p className='nome-prodotto'>{nomeProdotto}  </p>}
              {simbolo && <p className='monitor-simbolo'>{simbolo}</p>}
              {qtProdotto && nomeProdotto && (<p className='monitor-quantità-prodotto'>X{qtProdotto}</p>)}

              {importo && <p className='monitor-prezzo-prodotto'>  €{importo}</p>}
              <p className='monitor-totale-prodotto'> €{qtProdotto * importo}</p>
            </div>
            <div className='monitor-valore-totale'>
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
