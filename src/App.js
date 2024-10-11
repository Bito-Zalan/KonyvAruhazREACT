import logo from "./logo.svg";
import "./App.css";
import konyvek from "./adatok.js";
import Kartya from "./Kartya";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Könyváruház</h1>
      </header>
      <article>
        <h3>Termékek</h3>
        <div className="konyvek">
          {konyvek.map((konyv) => (
            <Kartya
              key={konyv.id}
              cim={konyv.cim}
              szerzo={konyv.szerzo}
              ar={konyv.ar}
              kep={konyv.kep}
            />
          ))}
        </div>
      </article>
      <aside>
        <div className="kosar">
          <h3>Kosár Tartalma</h3>
        </div>
      </aside>
      <footer>
        <p>Bitó Zalán</p>
        <p>@Minden jog fenntartva.</p>
      </footer>
    </div>
  );
}

export default App;
