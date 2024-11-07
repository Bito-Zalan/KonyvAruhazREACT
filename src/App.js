import { useContext, useState } from "react";
import "./App.css";
import konyvek from "./adatok.js";
import Kartya from "./components/Kartya.js";
import { KATTContext } from "./context/KosarContext.js";

function App() {
  const { kosar, katt } = useContext(KATTContext);
  const dbAr = kosar.map((termek) => termek.ar * termek.db);
  const fizetendoOsszeg = dbAr.reduce((osszeg, ar) => osszeg + ar, 0);

  const rendelesKezelo = () => {
    if (kosar.length === 0) {
      alert("A kosár üres, rendeléshez adj hozzá terméket!");
    } else {
      alert(
        `Köszönjük a rendelést! Utánvétnél fizetendő összeg: ${fizetendoOsszeg} Ft.`
      );
    }
  };

  const [rendezes, setRendezes] = useState("");
  const [kereses, setKereses] = useState("");

  let szurtKonyvek;
  if (kereses === "") {
    szurtKonyvek = konyvek;
  } else {
    szurtKonyvek = konyvek.filter((konyv) => {
      return (
        konyv.cim.toUpperCase().includes(kereses.toUpperCase()) ||
        konyv.szerzo.toUpperCase().includes(kereses.toUpperCase())
      );
    });
  }

  const rendezettKonyvek = [...szurtKonyvek].sort((k1, k2) => {
    if (rendezes === "novekvo") {
      return k1.ar - k2.ar;
    } else {
      return k2.ar - k1.ar;
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Könyváruház</h1>
        <nav>
          <ul>
            <li>
              <a href="#termekek">Termékek</a>
              <a href="#admin">Admin</a>
              <select
                id="rendezes"
                name="rendezes"
                value={rendezes}
                onChange={(e) => setRendezes(e.target.value)}
              >
                <option value="novekvo">Ár szerint növekvő</option>
                <option value="csokkeno">Ár szerint csökkenő</option>
              </select>
              <input
                type="text"
                placeholder="Keresés (cím vagy szerző)"
                value={kereses}
                onChange={(e) => setKereses(e.target.value)}
              />
            </li>
          </ul>
        </nav>
      </header>
      <article>
        <h3>Termékek</h3>
        <div className="konyvek">
          {rendezettKonyvek.map((konyv) => (
            <Kartya
              key={konyv.id}
              cim={konyv.cim}
              szerzo={konyv.szerzo}
              ar={konyv.ar}
              kep={konyv.kep}
              kosarhozad={() => katt(konyv)}
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
              {kosar.map((konyv) => (
                <tr key={konyv.id}>
                  <td>{konyv.cim}</td>
                  <td>{konyv.ar * konyv.db} Ft</td>
                  <td>
                    <img class="kosarkep" src={konyv.kep} alt={konyv.cim} />
                  </td>
                  <td>{konyv.db}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Fizetendő: {fizetendoOsszeg} Ft</h2>
          <button className="rendeles" onClick={rendelesKezelo}>
            Rendelés
          </button>
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
