import React from "react";
import "./SingleCountry.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import BackButton from "./BackButton";

const SingleCountry = () => {
  const [country, setCountry] = useState([]);

  const { name } = useParams();

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      const data = await res.json();
      setCountry(data);
    };
    fetchCountries();
  }, [name]);

  const noCountry = country.data || country.message;

  console.log(country);

  return (
    <div className="sdd">
      <BackButton />
      {!noCountry ? (
        country.map(({ flags, name, population, region, capital }) => {
          return (
            <div className="single-country-container">
              <div className="single-country">
                <div>
                  <img
                    src={flags.svg}
                    alt="country img"
                    className="single-country-img"
                  />
                </div>
                <div className="single-country-text-content">
                  <h2>{name.common}</h2>
                  <div className="details">
                    <div>
                      <h3>Population: {population}</h3>
                      <h3>
                        Region: <span>{region}</span>
                      </h3>
                      <h3>
                        Capital: <span>{capital}</span>
                      </h3>
                    </div>
                    <div>
                      <h3>Top Level Domain</h3>
                      <h3>Currencies: United State Dollar</h3>
                      <h3>Language: English</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <ErrorPage />
      )}
    </div>
  );
};

export default SingleCountry;
