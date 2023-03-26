import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import AddPerson from "./components/AddPerson";
import Contacts from "./components/Contacts";
import noteService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [Message, setMessage] = useState(null);

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
      setMessage(`Added ${newName}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      noteService.create(personObject).then((returnedNote) => {
        setPersons(persons.concat(returnedNote));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleDelete = (id, name) => {
    const url = `http://localhost:3001/persons/${id}`;
    if (window.confirm("Delete this contact?")) {
      axios.delete(url).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
      setMessage(`Deleted ${name}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={Message} />
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
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
