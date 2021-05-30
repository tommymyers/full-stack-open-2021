import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const newNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }
    console.log(newPerson)
    setPersons([...persons, newPerson])
    setNewName("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onFormSubmit}>
        <div>
          name: <input value={newName} onChange={newNameInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <div key={person.name}>
          {person.name}
        </div>
      )}
    </div>
  )
}

export default App
