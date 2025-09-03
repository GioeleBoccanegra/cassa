
import { useEffect, useState } from 'react'
import './App.css'
import Pulsante from "./components/zona-destra/pulsante/Pulsante"
import { getCategorie } from './api/getCategorie';
import { getProdotti } from './api/getProdotti'
import PulsanteProdotto from './components/zona-sinistra/pulsanteProdotto/PulsanteProdotto';
import Scontrino from './components/pop-up/scontrino/Scontrino';
import VoceAcquisto from './components/zona-destra/voceAcquisto/VoceAcquisto';

function App() {

  const [importo, setImporto] = useState("");
  const [listaCategorie, setListacategorie] = useState([]);
  const [listaProdotti, setListaProdotti] = useState([]);
  const [idCategoria, setIdCategoria] = useState(null)
  const [listaAcquisti, setListaAcquisti] = useState([])
  const [idProdottoAttuale, setIdProdottoAttuale] = useState();
  const [visualScontrino, setVisualScontrino] = useState(false)



  useEffect(() => {
    const listaCategorie = async () => {
      const risposta = await getCategorie();
      setListacategorie(risposta)
      if (idCategoria == null) {
        setIdCategoria(risposta[0].id)
      }

    }

    listaCategorie();



  }, [idCategoria])

  useEffect(() => {
    const riceviProdotti = async () => {
      const risposta = await getProdotti()
      setListaProdotti(risposta);
    }
    riceviProdotti();
  }, [])

  const impostaQt = () => {
    if (idProdottoAttuale !== "totale") {


      if (parseImporto(importo) > 0 && Number.isInteger(parseImporto(importo))) {
        setListaAcquisti(prev => prev.map(acquisto => acquisto.id === idProdottoAttuale
          ? { ...acquisto, qt: parseImporto(importo) } : acquisto))
        setImporto("0")
      }
    } else {
      console.log("sei su totale")
    }

  }

  const impostaPrezzo = () => {
    if (idProdottoAttuale !== "totale") {

      if (parseImporto(importo) > 0) {
        setListaAcquisti(prev => prev.map(acquisto => acquisto.id === idProdottoAttuale
          ? { ...acquisto, ivato: parseImporto(importo), sconto: 0 } : acquisto))
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

  const svuota = () => {
    setVisualScontrino(false)
    setImporto("0")
    setIdProdottoAttuale(null)
    setListaAcquisti([])
  }


  const conferma = () => {

    if (listaAcquisti.length > 0) {
      console.log(listaAcquisti)
      setVisualScontrino(true)


    } else {
      alert("nessun conto da evadere")
    }


  }

  const setVirgola = () => {
    setImporto(prev => prev.includes(",") ? prev : prev + ",");
    console.log(importo)
  }

  const parseImporto = (imp) => {
    return parseFloat(
      (String(imp) || "0").replace(",", ".")
    );
  };

  const arr = (tot) => Number.isFinite(tot) ? tot.toFixed(2) : "0,00";










  const elimina = () => {
    if (importo.length > 0) {
      setImporto(prev => prev.slice(0, -1));
    } else {
      if (listaAcquisti) {
        if (idProdottoAttuale == "totale") {
          setListaAcquisti([])
        } else {
          setListaAcquisti(prev => prev.map(acquisto => {
            if (idProdottoAttuale == acquisto.id) {
              if (acquisto.qt > 1) {
                // se quantità maggiore di 1, decrementa
                return { ...acquisto, qt: acquisto.qt - 1 }
              } else {
                setIdProdottoAttuale(null)
                // altrimenti lo eliminiamo
                return null
              }
            }
            //ritorno ogetto anche se null
            return acquisto;


          })
            //pulisco array da valori null
            .filter(acquisto => acquisto !== null)
          )

        }
      }
    }
  }




  return (
    <>
      <div className='visual-cassa'>
        {visualScontrino && <Scontrino listaAcquisti={listaAcquisti} svuota={svuota} />}
        <div className='zona-sinistra'>
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
            <p className='monitor-visual-valore'>VAL:{arr(parseImporto(importo))}</p>
            <p>TOT:€{arr(listaAcquisti.reduce((acc, acquisto) => {
              if (acquisto.sconto == 0) {
                return acc + parseImporto(acquisto.ivato) * acquisto.qt
              } else {
                return acc + (parseImporto(acquisto.ivato) - (parseImporto(acquisto.ivato) * acquisto.sconto / 100)) * acquisto.qt
              }
            }, 0))}</p>
          </div>

        </div>




        <div className='zona-destra'>
          <div className='monitor-cassa'>
            <div className='monitor-categorie-prodotti'>
              <div className='puls-categorie'>
                {listaCategorie && (
                  listaCategorie.map((cat) => (
                    <button className={idCategoria == cat.id ? "evidenziato" : ""} key={cat.nome} onClick={() => { setIdCategoria(cat.id) }}>{cat.nome}</button>
                  ))
                )}
              </div>
              <div className='puls-prodotti'>
                {idCategoria && listaProdotti && (
                  listaProdotti.filter((prodotto) => prodotto.category_id === idCategoria)
                    .map((prodotto) => (
                      <PulsanteProdotto key={prodotto.id} prodotto={prodotto} setListaAcquisti={setListaAcquisti} setIdProdottoAttuale={setIdProdottoAttuale} importo={importo} setImporto={setImporto} parseImporto={parseImporto} />
                    ))

                )}
              </div>
            </div>
            <div className='tutti-pulsanti-calc'>
              <div className='contenitore-pulsanti'>

                {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((val) => (
                  <Pulsante
                    key={val}
                    val={val}
                    setImporto={setImporto}
                    importo={importo}
                  />
                ))}





                <button onClick={() => { impostaQt() }}>QT</button>
                <Pulsante key={0} val={0} setImporto={setImporto} importo={importo} />
                <button onClick={() => { setVirgola() }}>,</button>


                <button onClick={() => { impostaPrezzo() }}>€</button>
                <button onClick={() => { impostaSconto() }}>%</button>
                <button onClick={() => { elimina() }}><img src="/cestino.png" /></button>








              </div>
              <div className='container-pulsante-cassa-tot'>
                <button className='pulsante-cassa-tot' onClick={conferma}>Cassa</button>
              </div>
            </div>
          </div>
        </div >
      </div>

    </>
  )
}

export default App
