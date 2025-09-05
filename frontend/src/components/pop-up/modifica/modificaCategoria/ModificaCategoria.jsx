
import "./ModificaCatgeoria.css"
import { putModificaCategoria } from "../../../../api/putModificaCategoria"
import { useState } from "react"
import { getCategorie } from "../../../../api/getCategorie";
import { getProdotti } from "../../../../api/getProdotti"
import { deleteCategoria } from "../../../../api/deleteCategoria"
import Loader from "../../../../utils/loader/Loader";
import Errore from "../../../../utils/errore/Errore";

export default function ModifiaCategoria({ annullaModCat, categoria, setListaCategorie, setListaProdotti }) {
  const [nomeCat, setNomeCat] = useState(categoria.nome);
  const [ivaCat, setIvaCat] = useState(categoria.iva);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  const modificaCat = async () => {
    setLoading(true)
    try {
      const categoriaMod = {
        id: categoria.id,
        nome: nomeCat,
        iva: Number(ivaCat)
      }
      const risposta = await putModificaCategoria(categoriaMod)
      console.log(risposta)
      const nuoveCategorie = await getCategorie();
      setListaCategorie(nuoveCategorie);
      const nuoviProdotti = await getProdotti()
      setListaProdotti(nuoviProdotti);
      annullaModCat()
    } catch (e) {
      setError(e.message || "errreo sconosciuto")
    } finally {
      setLoading(false)
    }
  }

  const deleteCat = async (id) => {
    setLoading(true)
    try {
      const risposta = await deleteCategoria(id)
      console.log(risposta)
      const nuoveCategorie = await getCategorie();
      setListaCategorie(nuoveCategorie);
      annullaModCat()
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
        <h2>Modifica Categoria</h2>
        <form onSubmit={(e) => { e.preventDefault(); modificaCat() }}>
          <div className="form-group">
            <label htmlFor="nome">Nome categoria</label>
            <input id="nome" type="text" value={nomeCat} onChange={(e) => { setNomeCat(e.target.value) }} />
          </div>

          <div className="form-group">
            <label htmlFor="iva">IVA</label>
            <input id="iva" type="number" value={ivaCat} onChange={(e) => { setIvaCat(e.target.value) }} />
          </div>




          <div className="button-group">
            <button type="submit" className="btn-confirm">Conferma</button>
            <button type="button" className="btn-cancel" onClick={() => annullaModCat()}>Annulla</button>
          </div>
        </form>
        <button onClick={() => { deleteCat(categoria.id) }}>elimina</button>
      </div>
    </div>
  );


}