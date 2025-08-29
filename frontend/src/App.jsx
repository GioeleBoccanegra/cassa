
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
  const [usaQt, setUsaQt] = useState(false)
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
                  <PulsanteProdotto key={prodotto.id} prodotto={prodotto} setListaAcquisti={setListaAcquisti} setIdProdottoAttuale={setIdProdottoAttuale} />
                ))

            )}
          </div>
        </div>



        <div className='zona-destra'>
          <div className='monitor-cassa'>
            <div className='lista-acquisti-container'>
              {listaAcquisti && listaAcquisti.map((acquisto) => (
                <VoceAcquisto key={acquisto.id} acquisto={acquisto} setIdProdottoAttuale={setIdProdottoAttuale} idProdottoAttuale={idProdottoAttuale} parseImporto={parseImporto} />
              ))}
            </div>
            <div className='monitor-valore-totale'>

              <p>tot:{arr(listaAcquisti.reduce((acc, acquisto) => {
                return acc + parseImporto(acquisto.ivato) * acquisto.qt
              }, 0))}</p>
            </div>

          </div>
          <div className='contenitore-pulsanti'>

            {Array.from({ length: 10 }, (_, i) => (
              <Pulsante key={i} val={i} setImporto={setImporto} fattoTotale={fattoTotale} setFattoTotale={setFattoTotale} setUsaQt={setUsaQt} usaQt={usaQt} idProdottoAttuale={idProdottoAttuale} setListaAcquisti={setListaAcquisti} importo={importo} />
            ))}



            <button onClick={() => { setImporto(prev => prev.includes(",") ? prev : prev + ","); }}>,</button>
            <button onClick={() => { setUsaQt(true) }}>QT</button>

            <button onClick={() => { faiTotale() }}>=</button>

            <button onClick={conferma}>Cassa</button>
            <button onClick={() => { elimina() }}>elimina</button>




          </div>
        </div>
      </div>

    </>
  )
}

export default App
