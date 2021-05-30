import React, { useEffect, useState } from 'react'
import axios from "axios"

const Filter = ({ searchQuery, onSearchQueryChange }) => {
  return <div>Search for: <input value={searchQuery} onChange={onSearchQueryChange} /></div>
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onFormSubmit}>
      <div>name: <input value={props.newName} onChange={props.newNameInputChange} /></div>
      <div>number: <input value={props.newNumber} onChange={props.newNumberInputChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const People = ({ people }) => {
  return people.map(person =>
    <div key={person.name}>
      {person.name} {person.number}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const hook = () => {
    axios.get("http://127.0.0.1:3001/persons").then((response) => setPersons(response.data))
  }
  useEffect(hook, [])

  const newNameInputChange = (event) => setNewName(event.target.value)
  const newNumberInputChange = (event) => setNewNumber(event.target.value)
  const searchQueryChange = (event) => setSearchQuery(event.target.value)

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

  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchQuery={searchQuery} onSearchQueryChange={searchQueryChange} />
      <h3>Insert new:</h3>
      <PersonForm
        onFormSubmit={onFormSubmit}
        newName={newName}
        newNumber={newNumber}
        newNameInputChange={newNameInputChange}
        newNumberInputChange={newNumberInputChange}
      />
      <h2>Numbers</h2>
      <People people={filteredPersons} />
    </div>
  )
}

export default App
