import React from "react";

const Contacts = ({ persons, filterName }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );
  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};
export default Contacts;
