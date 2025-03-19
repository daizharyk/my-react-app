import { useEffect, useState } from "react";

function SearchBar({ countries, filteredCountries, setFilteredCountries }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  console.log("filtered", filteredCountries);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    const filtered = countries.filter((country) => {
      return (
        country.name.common.toLowerCase().includes(debouncedSearchTerm) ||
        country.region.toLowerCase().includes(debouncedSearchTerm) ||
        (country.subregion &&
          country.subregion.toLowerCase().includes(debouncedSearchTerm))
      );
    });
    setFilteredCountries(filtered);
  }, [debouncedSearchTerm, countries, setFilteredCountries]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  return (
    <div className="search-bar">
      <div className="search-info">
        <p>Found {filteredCountries.length} countries countries</p>
      </div>
      <div className="search-input">
        <label htmlFor="search" className="visually-hidden">
          Search by Name, Region, Subregion
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search by Name, Region, Subregion"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
}

export default SearchBar;
