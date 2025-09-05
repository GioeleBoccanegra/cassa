import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner"></div>
      <p>Caricamento...</p>
    </div>
  );
}
