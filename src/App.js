import { useState } from "react";
import "./App.css";
import konyvek from "./adatok.js";
import Kartya from "./components/Kartya.js";

function App() {
  const [kosar, setKosar] = useState([]);

  const kosarHozzaAd = (ujTermek) => {
    const hozzaAdott = kosar.find((termek) => termek.id === ujTermek.id)
    if (hozzaAdott){
      const frissitettKosar = kosar.map((termek) => {
        if(termek.id === ujTermek.id){
          return {...termek,db: termek.db +1};
        }
        return termek;
      });
      setKosar(frissitettKosar);
    } else{
      const ujTermekAlap = {...ujTermek,db: 1};
      setKosar([...kosar,ujTermekAlap]);
    }
  }

  const dbAr = kosar.map((termek) => termek.ar * termek.db);
  const fizetendoOsszeg = dbAr.reduce((osszeg, ar) => osszeg + ar, 0);

  const rendelesKezelo = () => {
    if(kosar.length === 0){
      alert("A kosár üres, rendeléshez adj hozzá terméket!")
    } else{
      alert(`Köszönjük a rendelést! Utánvétnél fizetendő összeg: ${fizetendoOsszeg} Ft.`)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Könyváruház</h1>
        <nav>
          <ul>
            <li>
              <a href ="#termekek">Termékek</a>
              <a href ="#admin">Admin</a>
            </li>
          </ul>
        </nav>
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
              kosarhozad={() => kosarHozzaAd(konyv)}
            />
          ))}
        </div>
      </article>
      <aside>
        <h3>Kosár Tartalma</h3>
        <div className="kosar">
          <table>
            <thead>
              <tr>
                <th>Könyv</th>
                <th>Ár</th>
                <th>Kép</th>
                <th>Db</th>
              </tr>
            </thead>
            <tbody>
              {kosar.map((konyv) =>(
                <tr key={konyv.id}>
                  <td>{konyv.cim}</td>
                  <td>{konyv.ar * konyv.db} Ft</td>
                  <td><img  class= "kosarkep" src={konyv.kep} alt={konyv.cim} /></td>
                  <td>{konyv.db}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Fizetendő: {fizetendoOsszeg} Ft</h2>
          <button className="rendeles" onClick={rendelesKezelo}>Rendelés</button>
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
