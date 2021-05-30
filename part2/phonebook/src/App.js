import React, { useState } from 'react'

const App = () => {
  const defaultPersons = [
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]
  const [persons, setPersons] = useState(defaultPersons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const newNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const newNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    console.log(newPerson)
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebok`)
      return
    }
    setPersons([...persons, newPerson])
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onFormSubmit}>
        <div>name: <input value={newName} onChange={newNameInputChange} /></div>
        <div>number: <input value={newNumber} onChange={newNumberInputChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      )}
    </div>
  )
}

export default App
