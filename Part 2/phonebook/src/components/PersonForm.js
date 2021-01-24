import React from 'react';

const PersonForm = ({submitFormHandler, nameInputHandler, numberInputHandler, newName, newNumber}) => {
    return (
        <form onSubmit={submitFormHandler}>
        <div>
          name: <input onChange={nameInputHandler} value={newName} />
        </div>
        <div>
          number: <input onChange={numberInputHandler} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      );
}

export default PersonForm;