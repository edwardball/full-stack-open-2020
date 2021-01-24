import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import axios from "axios";
import { create, getAll, deletePerson, update } from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterString, setFilterString] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    console.log(e.target.value.toLowerCase());
    setFilterString(e.target.value.toLowerCase());
    console.log(filterString);
  };

  const deletePersonFunction = (e, personToDelete) => {
    e.preventDefault();
    if (window.confirm(`Delete this user ${personToDelete.name}?`)) {
      deletePerson(personToDelete).then();
      setPersons(
        persons.filter((person) => {
          return person.name != personToDelete.name;
        })
      );
    }
  };

  const showNotification = (notification) => {
    setNotificationMessage({
      message: notification.message,
      type: notification.type,
    });
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const submitForm = (e) => {
    e.preventDefault();
    let newPerson = {
      name: newName,
      number: newNumber,
    };
    if (
      persons.find((person) => {
        return person.name === newName;
      }) === undefined
    ) {
      create(newPerson).then((response) => {
        setNewName("");
        setNewNumber("");
        setPersons(persons.concat(response.data));
        showNotification({ message: "New person added", type: "success" });
      });
    } else {
      if (
        window.confirm(
          `${newName} is already in the database. Do you want to update their number?`
        )
      ) {
        let newPerson = persons.find((person) => {
          return person.name === newName;
        });
        newPerson.number = newNumber;
        update(newPerson)
          .then((response) => {
            setNewName("");
            setNewNumber("");
            setPersons(
              persons.map((person) => {
                return person.id === newPerson.id ? response.data : person;
              })
            );

            showNotification({
              message: `${newPerson.name} updated.`,
              type: "success",
            });
          })
          .catch((response) => {
            showNotification({
              message: `${newName} has already been deleted from the database.`,
              type: "error",
            });
          });
      } else {
      }
    }
  };

  return (
    <div>
      <Notification notification={notificationMessage} />
      <h2>Phonebook</h2>
      <Filter handleChange={handleFilter} />
      <h2>Add a new contact</h2>
      <PersonForm
        submitFormHandler={submitForm}
        nameInputHandler={handleNameInput}
        numberInputHandler={handleNumberInput}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons.filter((person) =>
          person.name.toLowerCase().includes(filterString)
        )}
        deleteHandler={deletePersonFunction}
      />
    </div>
  );
};

export default App;
