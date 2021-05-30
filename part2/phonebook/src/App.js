import React, { useState } from 'react'

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
  const defaultPersons = [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]
  const [persons, setPersons] = useState(defaultPersons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

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
