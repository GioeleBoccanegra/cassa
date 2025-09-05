import { useState } from "react";
import "./CreaCategoria.css"
import { postCreaCategoria } from "../../../../api/postCreaCategoria"
import { getCategorie } from "../../../../api/getCategorie";

export default function CreaCategoria({ annullaCreaCategoria, setListaCategorie }) {
  const [nomeCat, setNomeCat] = useState("");
  const [ivaCat, setIvaCat] = useState("");


  const creazioneCategoria = async (nome, iva) => {


    const categoria = {
      nome: nome,
      iva: iva
    }

    const nuovaCat = await postCreaCategoria(categoria);
    console.log(nuovaCat)
    const nuoveCategorie = await getCategorie()
    setListaCategorie(nuoveCategorie)

    annullaCreaCategoria()



  }

  return (
    <div className="pop-up-modifica-overlay" onClick={(e) => e.stopPropagation()} >
      <div className="pop-up-modifica" >
        <h2>Crea Categoria</h2>
        <form onSubmit={(e) => { e.preventDefault(); creazioneCategoria(nomeCat, ivaCat) }}>
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
            <button type="button" className="btn-cancel" onClick={() => annullaCreaCategoria()}>Annulla</button>
          </div>
        </form>
      </div>
    </div>

  )
}