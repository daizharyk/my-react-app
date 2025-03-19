import { useEffect, useState } from "react";

function SortPanel({ setFilteredCountries, countries }) {
  const [sortBy, setSortBy] = useState("population");
  const [unMember, setUnMember] = useState(false);
  const [independent, setIndependent] = useState(false);
  const [activeRegion, setActiveRegion] = useState(false);
  const regions = [
    "Americas",
    "Antarctic",
    "Asia",
    "Europe",
    "Africa",
    "Oceania",
  ];

  const handleActiveRegion = (region) => {
    setActiveRegion((prev) => (prev === region ? "" : region));
  };
  const handelUnMemberChecked = (e) => {
    setUnMember(e.target.checked);
  };

  const handeIndependetChecked = (e) => {
    setIndependent(e.target.checked);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    let filtered = countries.filter((country) => {
      return (
        (!unMember || country.unMember) &&
        (!independent || country.independent) &&
        (!activeRegion || country.region === activeRegion)
      );
    });

    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.common.localeCompare(b.name.common, "en", {
          sensitivity: "base",
        });
      } else if (sortBy === "population") {
        return b.population - a.population;
      } else if (sortBy === "area") {
        return b.area - a.area;
      }
      return 0;
    });

    setFilteredCountries(filtered);
  }, [unMember, independent, activeRegion, countries, sortBy]);

  return (
    <div className="sort-panel">
      <h3 className="sort-panel__title">Sort by</h3>
      <select
        value={sortBy}
        onChange={handleSortChange}
        className="sort-panel__select"
      >
        <option value="population">Population</option>
        <option value="name">Name</option>
        <option value="area">Area</option>
      </select>

      <h3 className="sort-panel__title">Region</h3>
      <div className="sort-panel__regions">
        {regions.map((region) => (
          <button
            key={region}
            className={`sort-panel__button ${
              activeRegion === region ? "active" : ""
            }`}
            onClick={() => handleActiveRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>

      <h3 className="sort-panel__title">Status</h3>
      <div className="sort-panel__status">
        <label className="sort-panel__checkbox">
          <input
            type="checkbox"
            value="unMember"
            onClick={handelUnMemberChecked}
          />
          Member of the United Nations
        </label>
        <label className="sort-panel__checkbox">
          <input
            type="checkbox"
            value="independent"
            onClick={handeIndependetChecked}
          />
          Independent
        </label>
      </div>
    </div>
  );
}

export default SortPanel;
