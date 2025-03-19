import { useParams, Link } from "react-router-dom";

function CountryDetails({ countries }) {
  const { countryName } = useParams();
  console.log(countryName);

  const country = countries.find((c) => c.name.common === countryName);

  if (!country) {
    return <h2>Country not found</h2>;
  }
  console.log(countries);

  return (
    <div className="country-details">
      <Link to="/" className="back">
        Back
      </Link>
      <img
        src={country.flags.svg}
        alt={country.name.common}
        className="country-details__flag"
      />

      <div className="country-details__header">
        <h1 className="country-details__name">{country.name.common}</h1>
        <h5 className="country-details__official">{country.name.official}</h5>
      </div>

      <div className="country-details__info">
        <div className="country-details__stats">
          <p>
            <strong>Population</strong> <span className="separator">|</span>{" "}
            {country.population.toLocaleString()}
          </p>
          <p>
            <strong>Area (km²)</strong> <span className="separator">|</span>{" "}
            {country.area.toLocaleString()} km²
          </p>
        </div>
        <div className="country-details__additional">
          <p>
            <strong>Capital:</strong> {country.capital?.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Subregion:</strong> {country.subregion || "N/A"}
          </p>
          <p>
            <strong>Languages:</strong>{" "}
            {country.languages
              ? Object.values(country.languages).join(", ")
              : "N/A"}
          </p>
          <p>
            <strong>Currencies:</strong>{" "}
            {country.currencies
              ? Object.values(country.currencies)
                  .map((c) => c.name)
                  .join(", ")
              : "N/A"}
          </p>
          <p>
            <strong>Continents:</strong> {country.continents.join(", ")}
          </p>
          <div className="country-details__neighbour-detail">
            <p>Neighbouring Countries</p>
            <div className="country-details__neighbouring-countries">
              {country.borders && country.borders.length > 0 ? (
                countries
                  .filter((c) => country.borders.includes(c.cca3)) // Фильтруем только соседей
                  .map((neighbour) => (
                    <Link
                      className="country-item "
                      to={`/country/${neighbour.name.common}`}
                      key={neighbour.cca3}
                    >
                      <img
                        src={neighbour.flags.svg}
                        alt={neighbour.name.common}
                        className="country-flag"
                      />
                      <span>{neighbour.name.common}</span>
                    </Link>
                  ))
              ) : (
                <p>No neighbouring countries</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
