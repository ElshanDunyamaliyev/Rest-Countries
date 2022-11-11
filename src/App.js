import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import SearchIcon from "@mui/icons-material/Search";
import Country from "./components/Country";
import SingleCountry from "./components/SingleCountry";
import ErrorPage from "./components/ErrorPage";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  const [countries, setCountries] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const inputRef = useRef();
  const selectRef = useRef();

  const fetchCountries = async () => {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    setCountries(data);
  };

  useEffect(() => {
    try {
      fetchCountries();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const searchCountry = () => {
    const inputValue = inputRef.current.value;
    if (inputValue.trim()) {
      const fetchSearch = async () => {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${inputValue}`
        );
        const data = await res.json();
        setCountries(data);
      };
      try {
        fetchSearch();
      } catch (err) {
        console.error(err);
      }
    } else {
      fetchCountries();
    }
  };

  const filterByRegion = () => {
    const selectValue = selectRef.current.value;
    if (selectValue.trim()) {
      const filterCountries = async () => {
        const res = await fetch(
          `https://restcountries.com/v3.1/region/${selectValue}`
        );
        const data = await res.json();
        setCountries(data);
      };
      if (selectValue === "All") {
        fetchCountries();
      } else {
        filterCountries();
      }
    }
  };

  const darkModeState = (state) => {
    setDarkMode(state);
  };

  const noCountries = countries.data || countries.message;

  return (
    <div className="App ">
      <Header darkModeState={darkModeState} />
      <div className={!darkMode ? "dark-mode" : "light-mode"}>
        <Routes>
          <Route
            index
            element={
              <div className="app-body">
                <div className="inputs">
                  <div className="search-input">
                    <SearchIcon className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search for country"
                      ref={inputRef}
                      onChange={searchCountry}
                    />
                  </div>
                  <div className="select-input">
                    <select ref={selectRef} onChange={filterByRegion}>
                      <option>All</option>
                      <option>Africa</option>
                      <option>Americas</option>
                      <option>Asia</option>
                      <option>Europe</option>
                      <option>Oceania</option>
                    </select>
                  </div>
                </div>
                <div className="row country-container ">
                  {!noCountries ? (
                    countries?.map((country) => (
                      <Link className="link" to={`/${country.name.common}`}>
                        <Country
                          key={country.id}
                          countryName={country.name.common}
                          population={country.population}
                          region={country.region}
                          capital={country.capital}
                          src={country.flags.png}
                        />
                      </Link>
                    ))
                  ) : (
                    <ErrorPage />
                  )}
                </div>
              </div>
            }
          />
          <Route
            path="/:name"
            element={<SingleCountry darkMode={darkMode} />}
          />
          <Route path="*" element={countries.message} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
