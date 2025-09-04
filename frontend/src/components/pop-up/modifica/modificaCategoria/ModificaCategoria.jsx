
import "./ModificaCatgeoria.css"

export default function ModifiaCategoria({ annullaModCat, categoria }) {
  return (
    <div className="pop-up-modifica-overlay">
      <div className="pop-up-modifica">
        <h2>Modifica Categoria</h2>
        <form>
          <div className="form-group">
            <label htmlFor="nome">{categoria.nome}</label>
            <input id="nome" type="text" placeholder="Inserisci nome categoria" />
          </div>

          <div className="form-group">
            <label htmlFor="iva">IVA</label>
            <input id="iva" type="number" placeholder="Inserisci IVA (%)" />
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