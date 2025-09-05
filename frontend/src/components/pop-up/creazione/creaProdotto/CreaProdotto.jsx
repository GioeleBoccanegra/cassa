import { useState } from "react";
import "./CreaProdotto.css"
import { postCreaProdotto } from "../../../../api/postCreaProdotto"
import { getProdotti } from "../../../../api/getProdotti"
import Loader from "../../../../utils/loader/Loader";
import Errore from "../../../../utils/errore/Errore";


export default function CreaProdotto({ annullaCreaProdotto, setListaProdotti, idCategoria }) {
  const [nomeProd, setNomeProd] = useState("");
  const [ivatoProd, setIvatoProd] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")


  const creazioneCategoria = async (nome, ivato, category_id) => {

    setLoading(true)
    try {
      const prodotto = {
        category_id: category_id,
        nome: nome,
        ivato: ivato
      }

      const nuovoProd = await postCreaProdotto(prodotto);
      console.log(nuovoProd)
      const nuoveCategorie = await getProdotti()
      setListaProdotti(nuoveCategorie)

      annullaCreaProdotto()

    } catch (e) {
      setError(e.message || "errreo sconosciuto")
    } finally {
      setLoading(false)
    }



  }

  return (
    <div className="pop-up-modifica-overlay" onClick={(e) => e.stopPropagation()} >
      {loading && <Loader />}

      {error && <Errore error={error} setError={setError} />}
      <div className="pop-up-modifica" >
        <h2>Crea Prodotto</h2>
        <form onSubmit={(e) => { e.preventDefault(); creazioneCategoria(nomeProd, ivatoProd, idCategoria) }}>
          <div className="form-group">
            <label htmlFor="nome">Nome Prodotto</label>
            <input id="nome" type="text" value={nomeProd} onChange={(e) => { setNomeProd(e.target.value) }} />
          </div>

          <div className="form-group">
            <label htmlFor="iva">Prezzo Ivato</label>
            <input id="iva" type="number" value={ivatoProd} onChange={(e) => { setIvatoProd(e.target.value) }} />
          </div>

          <div className="button-group">
            <button type="submit" className="btn-confirm">Crea</button>
            <button type="button" className="btn-cancel" onClick={() => annullaCreaProdotto()}>Annulla</button>
          </div>
        </form>
      </div>
    </div>

  )
}