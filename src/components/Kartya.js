
const Kartya = ({cim, szerzo, ar, kep, kosarhozad}) => {
    return (
        <div className="kartyak">
            <h2>{cim}</h2>
            <img src={kep} alt = {cim} className="konyvkep"/>
            <p>{szerzo}</p>
            <p>{ar} Ft.</p>
            <button onClick={kosarhozad}>Kosárba</button>
        </div>
    )
};
export default Kartya;