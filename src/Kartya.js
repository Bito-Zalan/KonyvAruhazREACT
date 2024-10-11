
const Kartya = ({cim, szerzo, ar, kep}) => {
    return (
        <div className="kartyak">
            <h2>{cim}</h2>
            <img src={kep} alt = {cim} className="konyvkep"/>
            <p>{szerzo}</p>
            <p>{ar} Ft.</p>
            <button>Kosárba</button>
        </div>
    )
};
export default Kartya;