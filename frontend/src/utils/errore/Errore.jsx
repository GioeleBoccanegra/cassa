import "./Errore.css";

export default function Errore({ error, setError }) {
  return (
    <div className="errore-overlay">
      <div className="errore-box">
        <p>{error}</p>
        <button onClick={() => { setError("") }}>Chiudi</button>
      </div>
    </div>
  );
}
