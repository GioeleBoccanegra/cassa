
import { useEffect, useState } from 'react'
import './App.css'
import Pulsante from "./components/zona-destra/pulsante/Pulsante"
import { getCategorie } from './api/getCategorie';
import { getProdotti } from './api/getProdotti'
import PulsanteProdotto from './components/zona-sinistra/pulsanteProdotto/PulsanteProdotto';

import VoceAcquisto from './components/zona-destra/voceAcquisto/VoceAcquisto';

function App() {

  const [importo, setImporto] = useState("");
  const [fattoTotale, setFattoTotale] = useState(false)
  const [listaCategorie, setListacategorie] = useState([]);
  const [listaProdotti, setListaProdotti] = useState([]);
  const [idCategoria, setIdCategoria] = useState(null)
  const [listaAcquisti, setListaAcquisti] = useState([])
  const [idProdottoAttuale, setIdProdottoAttuale] = useState();



  useEffect(() => {
    const listaCategorie = async () => {
      const risposta = await getCategorie();
      setListacategorie(risposta)

    }
    const riceviProdotti = async () => {
      const risposta = await getProdotti()
      setListaProdotti(risposta);
    }

    riceviProdotti();

    listaCategorie();
  }, [])

  const impostaQt = () => {
    if (idProdottoAttuale !== "totale") {


      if (Number(importo) > 0) {
        setListaAcquisti(prev => prev.map(acquisto => acquisto.id === idProdottoAttuale
          ? { ...acquisto, qt: importo } : acquisto))
        setImporto("0")
      }
    } else {
      console.log("sei su totale")
    }

  }

  const impostaPrezzo = () => {
    if (idProdottoAttuale !== "totale") {

      if (Number(importo) > 0) {
        setListaAcquisti(prev => prev.map(acquisto => acquisto.id === idProdottoAttuale
          ? { ...acquisto, ivato: importo, sconto: 0 } : acquisto))
        setImporto("0")
      }
    } else {
      console.log("sei su totale")
    }
  }


  const impostaSconto = () => {
    if (parseImporto(importo) > 0 && parseImporto(importo) < 100) {
      if (idProdottoAttuale !== "totale") {
        setListaAcquisti(prev => {
          return prev.map((prod) => {
            if (prod.id == idProdottoAttuale) {
              return {
                ...prod, sconto: parseImporto(importo)
              }

            } else {
              return { ...prod }
            }
          })
        })

      } else {
        setListaAcquisti(prev => {
          return prev.map((prod) => {
            return {
              ...prod, sconto: parseImporto(importo)
            }
          })
        })

      }
      setImporto("0")
    } else {
      console.log("non puoi fare sconti superiori al 99%")
    }
  }


  const conferma = () => {
    setImporto("")
    setFattoTotale(false)

  }

  const parseImporto = (imp) => {
    return parseFloat(
      (imp || "0").replace(",", ".")
    );
  };

  const arr = (tot) => Number.isFinite(tot) ? tot.toFixed(2) : 0;




  const faiTotale = () => {
    setImporto("")
    setFattoTotale(true)
    console.log(listaAcquisti)
  }





  const elimina = () => {
    if (importo.length > 0) {
      setImporto(prev => prev.slice(0, -1));
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
                  <PulsanteProdotto key={prodotto.id} prodotto={prodotto} setListaAcquisti={setListaAcquisti} setIdProdottoAttuale={setIdProdottoAttuale} importo={importo} setImporto={setImporto} />
                ))

            )}
          </div>
        </div>



        <div className='zona-destra'>
          <div className='monitor-cassa'>
            <div className='monito-visual-valore'>{importo}</div>
            <div className='lista-acquisti-container'>
              <div className='indicazioni-lista-voci-monitor'>
                <p>nome  </p>
                <p>Quantità</p>

                <p>  prezzo</p>

                <p > sconto </p>

                <p >tot</p>
              </div>
              {listaAcquisti && listaAcquisti.map((acquisto) => (
                <VoceAcquisto key={acquisto.id} acquisto={acquisto} setIdProdottoAttuale={setIdProdottoAttuale} idProdottoAttuale={idProdottoAttuale} parseImporto={parseImporto} arr={arr} />
              ))}
            </div>
            <div className={`monitor-valore-totale ${idProdottoAttuale === "totale" ? "evidenziato" : ""}`} key={"totale"} onClick={() => { setIdProdottoAttuale("totale") }}>
              <p>tot:{arr(listaAcquisti.reduce((acc, acquisto) => {
                if (acquisto.sconto == 0) {
                  return acc + parseImporto(acquisto.ivato) * acquisto.qt
                } else {
                  return acc + (parseImporto(acquisto.ivato) - (parseImporto(acquisto.ivato) * acquisto.sconto / 100)) * acquisto.qt
                }
              }, 0))}</p>
            </div>

          </div>
          <div className='contenitore-pulsanti'>

            {Array.from({ length: 10 }, (_, i) => (
              <Pulsante key={i} val={i} setImporto={setImporto} fattoTotale={fattoTotale} setFattoTotale={setFattoTotale} importo={importo} />
            ))}



            <button onClick={() => { setImporto(prev => prev.includes(",") ? prev : prev + ","); }}>,</button>
            <button onClick={() => { impostaQt() }}>QT</button>
            <button onClick={() => { impostaPrezzo() }}>€</button>
            <button onClick={() => { impostaSconto() }}>%</button>

            <button onClick={() => { faiTotale() }}>=</button>

            <button onClick={conferma}>Cassa</button>
            <button onClick={() => { elimina() }}>elimina</button>




          </div>
        </div>
      </div >

    </>
  )
}

export default App
