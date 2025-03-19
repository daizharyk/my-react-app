import { Link } from "react-router-dom";

function CountryList({ countries }) {
  return (
    <div className="country-list">
      <div className="country-list__header">
        <span>Flag</span>
        <span>Name</span>
        <span>Population</span>
        <span>Area (km²)</span>
        <span>Region</span>
      </div>
      <div className="country-list__body">
        {countries.map((country) => (
          <Link to={`/country/${country.name.common}`} key={country.cca3}>
            <div className="country-list__item">
              <img
                src={country.flags.svg}
                alt={country.name.common}
                className="country-flag"
              />
              <span>{country.name.common}</span>
              <span>{country.population.toLocaleString()}</span>
              <span>{country.area.toLocaleString()}</span>
              <span>{country.region}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CountryList;
