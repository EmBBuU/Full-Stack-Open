import React from "react";

const Country = ({ countriesToShow, setCountriesToShow }) => {
  if (countriesToShow.length === 1) return null;

  return (
    <div>
      {countriesToShow.map((country) => (
        <div key={country.numericCode}>
          {country.name.common}
          <button onClick={() => setCountriesToShow([country])}>show</button>
        </div>
      ))}
    </div>
  );
};

export default Country;
