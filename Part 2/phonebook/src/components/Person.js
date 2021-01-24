import React from 'react';

const Person = ({person, deleteHandler}) => {
    return (
        <li key={person.name}>
          {person.name}: {person.number}<button onClick={(e)=>deleteHandler(e, person)}>Delete</button>
        </li>
      );
}

export default Person;