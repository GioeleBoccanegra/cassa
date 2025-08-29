
import { useEffect, useState } from 'react'
import './App.css'
import Pulsante from "./components/zona-destra/pulsante/Pulsante"
import { getCategorie } from './api/getCategorie';
import { getProdotti } from './api/getProdotti'
import PulsanteProdotto from './components/zona-sinistra/pulsanteProdotto/PulsanteProdotto';

function App() {

  const [importo, setImporto] = useState("");
  const [totale, setTotale] = useState(0)
  const [fattoTotale, setFattoTotale] = useState(false)
  const [listaCategorie, setListacategorie] = useState([]);
  const [listaProdotti, setListaProdotti] = useState([]);
  const [idCategoria, setIdCategoria] = useState(null)
  const [nomeProdotto, setNomeProdotto] = useState("")
  const [qtProdotto, setQtProdotto] = useState(1)
  const [usaQt, setUsaQt] = useState(false)



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
    setTotale(0)
    setFattoTotale(false)
    setNomeProdotto("")
    setQtProdotto(1)

  }

  const parseImporto = (imp) => {
    return parseFloat(
      (imp || "0").replace(",", ".")
    );
  };

  const arr = (tot) => Number.isFinite(tot) ? tot.toFixed(2) : 0;




  const faiTotale = () => {
    setTotale(prev => prev + (qtProdotto * importo))
    console.log(totale)
    setImporto("")
    setFattoTotale(true)
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
                  <PulsanteProdotto key={prodotto.id} prodotto={prodotto} setImporto={setImporto} setNomeProdotto={setNomeProdotto} setTotale={setTotale} setQtProdotto={setQtProdotto} importo={importo} qtProdotto={qtProdotto} />
                ))

            )}
          </div>
        </div>



        <div className='zona-destra'>
          <div className='monitor-cassa'>
            <div className='valore-corrente'>
              {nomeProdotto && <p className='nome-prodotto'>{nomeProdotto}  </p>}
              {qtProdotto && nomeProdotto && (<p className='monitor-quantità-prodotto'>X{qtProdotto}</p>)}

              {importo && <p className='monitor-prezzo-prodotto'>  €{importo}</p>}
              <p className='monitor-totale-prodotto'> €{qtProdotto * importo}</p>
            </div>
            <div className='monitor-valore-totale'>
              <p>tot:{arr(totale + (qtProdotto * importo))}</p>
            </div>

          </div>
          <div className='contenitore-pulsanti'>

            {Array.from({ length: 10 }, (_, i) => (
              <Pulsante key={i} val={i} setImporto={setImporto} fattoTotale={fattoTotale} setFattoTotale={setFattoTotale} setTotale={setTotale} setUsaQt={setUsaQt} usaQt={usaQt} setQtProdotto={setQtProdotto} />
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
