import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import CountryDetails from "./components/CountryDetails";
import SortPanel from "./components/SortPanel";
import CountryList from "./components/CountryList";
import "./App.css";

function Layout({
  children,
  countries,
  filteredCountries,
  setFilteredCountries,
}) {
  const location = useLocation();
  const isDetailsPage = location.pathname.startsWith("/country/");

  return (
    <div className="app">
      <img className="title" src="./public/svg/Logo.svg" alt="" />

      <div className={`container ${isDetailsPage ? "container--small" : ""}`}>
        {location.pathname === "/" && (
          <SearchBar
            countries={countries}
            filteredCountries={filteredCountries}
            setFilteredCountries={setFilteredCountries}
          />
        )}
        {children}
      </div>
    </div>
  );
}

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountries(res.data);
        setFilteredCountries(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              countries={countries}
              filteredCountries={filteredCountries}
              setFilteredCountries={setFilteredCountries}
            >
              <div className="container-wrapper">
                <SortPanel
                  filteredCountries={filteredCountries}
                  setFilteredCountries={setFilteredCountries}
                  countries={countries}
                />
                <CountryList countries={filteredCountries} />
              </div>
            </Layout>
          }
        />
        <Route
          path="/country/:countryName"
          element={
            <Layout
              countries={countries}
              filteredCountries={filteredCountries}
              setFilteredCountries={setFilteredCountries}
            >
              <CountryDetails countries={countries} />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
