import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import AddPerson from "./components/AddPerson";
import Contacts from "./components/Contacts";
import noteService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setPersons(initialNotes);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const names = persons.map((person) => person.name);

    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      noteService.create(personObject).then((returnedNote) => {
        setPersons(persons.concat(returnedNote));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search:</h2>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <h2>New contact:</h2>
      <AddPerson
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Contacts
        persons={persons}
        filterName={filterName}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
