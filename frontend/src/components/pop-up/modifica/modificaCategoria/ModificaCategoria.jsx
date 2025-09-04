
import "./ModificaCatgeoria.css"
import { putModificaCategoria } from "../../../../api/putModificaCategoria"
import { useState } from "react"
import { getCategorie } from "../../../../api/getCategorie";

export default function ModifiaCategoria({ annullaModCat, categoria, setListacategorie }) {
  const [nomeCat, setNomeCat] = useState(categoria.nome);
  const [ivaCat, setIvaCat] = useState(categoria.iva);

  const modificaCat = async () => {
    try {
      const categoriaMod = {
        id: categoria.id,
        nome: nomeCat,
        iva: ivaCat
      }
      const risposta = await putModificaCategoria(categoriaMod)
      console.log(risposta)
      const nuoveCategorie = await getCategorie();
      setListacategorie(nuoveCategorie);
      annullaModCat()
    } catch (e) {
      console.log(e)
    }
  }



  return (
    <div className="pop-up-modifica-overlay" onClick={(e) => e.stopPropagation()} >
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
      </div>
    </div>
  );


}