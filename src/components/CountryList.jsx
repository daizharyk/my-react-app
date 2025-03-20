import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const PAGE_SIZE = 20;

function CountryList({ countries }) {
  const [visibleCountries, setVisibleCountries] = useState([]);

  const observer = useRef();


  useEffect(() => {
    setVisibleCountries(countries.slice(0, PAGE_SIZE)); // Обновляем видимые страны при изменении пропсов
  }, [countries]);

  const lastElementRef = (node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {


      if (
        entries[0].isIntersecting &&
        visibleCountries.length < countries.length
      ) {
        loadMoreCountries();
      }
    });
    if (node) observer.current.observe(node);
  };

  const loadMoreCountries = () => {
    setVisibleCountries((prev) => {
      const nextItems = countries.slice(prev.length, prev.length + PAGE_SIZE);
      return [...prev, ...nextItems];
    });
  };

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
        {visibleCountries.map((country, index) => (
          <Link
            to={`/country/${country.name.common}`}
            key={country.cca3}
            ref={index === visibleCountries.length - 1 ? lastElementRef : null} 
          >
            <div className="country-list__item">
              <img
                src={country.flags.svg}
                alt={country.name.common}
                className="country-flag"
                loading="lazy"
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
