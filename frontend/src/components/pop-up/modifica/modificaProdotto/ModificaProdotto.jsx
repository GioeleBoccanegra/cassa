import "./ModificaProdotto.css"
import { useState } from "react"
import { patchModificaProdotto } from "../../../../api/patchModificaProdotto";
import { getProdotti } from "../../../../api/getProdotti"
import { deleteProduct } from "../../../../api/deleteProduct"
import Loader from "../../../../utils/loader/Loader";
import Errore from "../../../../utils/errore/Errore";


export default function ModificaProdotto({ annullaModProd, prodotto, setListaProdotti }) {

  const [nomeProd, setNomeProd] = useState(prodotto.nome);
  const [ivatoProd, setIvatoProd] = useState(prodotto.ivato);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  const modificaProdotto = async () => {
    setLoading(true)
    try {
      const prodottoModificato = {
        id: prodotto.id,
        category_id: prodotto.category_id,
        ivato: ivatoProd,
        nome: nomeProd
      }

      const res = await patchModificaProdotto(prodottoModificato);
      console.log(res)

      const nuovaLista = await getProdotti()
      setListaProdotti(nuovaLista)
      annullaModProd();
    } catch (e) {
      setError(e.message || "errreo sconosciuto")
    } finally {
      setLoading(false)
    }

  }




  const deleteProdotto = async (id) => {
    setLoading(true)
    try {
      const risposta = await deleteProduct(id)
      console.log(risposta)
      const nuoveCategorie = await getProdotti();
      setListaProdotti(nuoveCategorie);
      annullaModProd()
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
        <h2>Modifica prodotto</h2>
        <form onSubmit={(e) => { e.preventDefault(); modificaProdotto() }}>
          <div className="form-group">
            <label htmlFor="nome">Nome prodotto</label>
            <input id="nome" type="text" value={nomeProd} onChange={(e) => { setNomeProd(e.target.value) }} />
          </div>

          <div className="form-group">
            <label htmlFor="ivato">ivato Prodotto</label>
            <input id="ivato" type="number" value={ivatoProd} onChange={(e) => { setIvatoProd(e.target.value) }} />
          </div>
          <label htmlFor="iva">Iva</label>
          <p id="iva">{prodotto.iva}%</p>

          <label htmlFor="imponibile">Imponibile</label>
          <p id="imponibile">{(ivatoProd * 100 / (prodotto.iva + 100)).toFixed(2)}</p>

          <div className="button-group">
            <button type="submit" className="btn-confirm">Conferma</button>
            <button type="button" className="btn-cancel" onClick={() => annullaModProd()}>Annulla</button>
          </div>
        </form>

        <button onClick={() => { deleteProdotto(prodotto.id) }}>elimina</button>
      </div>
    </div>
  );


}