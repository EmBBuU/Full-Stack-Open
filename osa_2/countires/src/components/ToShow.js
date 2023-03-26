import React from "react";

const ToShow = ({ country }) => {
  if (!country) {
    return null;
  }
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area.toString()} km²</div>
      <div>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <div>
          <img
            src={country.flags.png}
            alt="Country Flag"
            height="200"
            width="300"
          />
        </div>
      </div>
    </div>
  );
};

export default ToShow;
