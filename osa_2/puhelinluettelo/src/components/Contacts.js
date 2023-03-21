import React from "react";
import axios from "axios";
import "../App";

const Contacts = ({ persons, filterName, setPersons }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const handleDelete = (id, name) => {
    const url = `http://localhost:3001/persons/${id}`;
    if (window.confirm("Delete this contact?")) {
      axios.delete(url).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};
export default Contacts;
