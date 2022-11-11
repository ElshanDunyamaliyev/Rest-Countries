import React from "react";
import "./Country.css";

const Country = ({ countryName, population, region, capital, src }) => {
  return (
    <div className="country">
      <img src={src} className="country-img" />
      <div className="country-text-content">
        <h2>{countryName}</h2>
        <p>
          Population: <span>{population}</span>
        </p>
        <p>
          Region: <span>{region}</span>
        </p>
        <p>
          Capital: <span>{capital}</span>
        </p>
      </div>
    </div>
  );
};

export default Country;
