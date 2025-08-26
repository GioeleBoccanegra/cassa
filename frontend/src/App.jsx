
import './App.css'
import Pulsante from "./components/pulsante/Pulsante"

function App() {



  return (
    <>
      <div className='visual-cassa'>

        <div className='zona-sinistra'>
          <div className='puls-categorie'></div>
          <div className='puls-prodotti'></div>
        </div>



        <div className='zona-destra'>
          <div className='monitor-cassa'>
          </div>
          <div className='contenitore-pulsanti '>

            {Array.from({ length: 10 }, (_, i) => (
              <Pulsante key={i} val={i} />
            ))}
          </div>
        </div>
      </div>

    </>
  )
}

export default App
