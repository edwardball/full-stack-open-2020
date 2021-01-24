import React from "react";
import Person from "./Person";

const Persons = ({ persons, deleteHandler }) => {
  return (
    <ul>
      {persons.map((person) => {
        return (
          <Person
            deleteHandler={deleteHandler}
            key={person.id}
            person={person}
          />
        );
      })}
    </ul>
  );
};

export default Persons;
