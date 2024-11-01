import { createContext, useState } from "react";

export const KATTContext = createContext("");

export const KATTProvider = ({ children }) => {
  const [kosar, setKosar] = useState([]);

  const katt = (ujTermek) => {
    const hozzaAdott = kosar.find((termek) => termek.id === ujTermek.id);
    if (hozzaAdott) {
      const frissitettKosar = kosar.map((termek) => {
        if (termek.id === ujTermek.id) {
          return { ...termek, db: termek.db + 1 };
        }
        return termek;
      });
      setKosar(frissitettKosar);
    } else {
      const ujTermekAlap = { ...ujTermek, db: 1 };
      setKosar([...kosar, ujTermekAlap]);
    }
  };
  return (
    <KATTContext.Provider value={{ kosar, katt }}>
      {children}
    </KATTContext.Provider>
  );
};
