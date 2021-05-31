import React, { useEffect, useState } from 'react'
import personsService from "./services/personsService"
import "./App.css"

const Notification = ({ notification }) => {
  if (!notification.message) return null
  return <div className={`notification notification__${notification.type}`}>{notification.message}</div>
}

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

const People = ({ people, onDeletePerson }) => {
  return people.map(person =>
    <div key={person.id}>
      {person.name} {person.number} <button onClick={() => onDeletePerson(person)}>delete</button>
    </div>
  )
}

const App = () => {
  const [currentNotification, setCurrentNotification] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])
  const hook = () => personsService.getAll().then(people => setPersons(people))
  useEffect(hook, [])

  const newNameInputChange = (event) => setNewName(event.target.value)
  const newNumberInputChange = (event) => setNewNumber(event.target.value)
  const searchQueryChange = (event) => setSearchQuery(event.target.value)

  const displayNotification = (notification) => {
    setCurrentNotification(notification)
    setTimeout(() => {
      setCurrentNotification({})
    }, 3000);
  };

  const clearFields = () => {
    setNewName("")
    setNewNumber("")
  }

  const onFormSubmit = (event) => {
    event.preventDefault()

    const person = persons.find(p => p.name === newName)
    if (person) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old phone number with a new one?`)) {
        personsService.update(person.id, { ...person, number: newNumber })
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : updatedPerson))
            clearFields()
            displayNotification({ type: "success", message: `Updated ${person.name}` })
          })
      }
    } else {
      // add to db
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personsService.add(newPerson)
        .then(p => {
          console.log(p)
          setPersons([...persons, p])
          clearFields()
          displayNotification({ type: "success", message: `Added ${p.name}` })
        })
    }
  }

  const onDeletePerson = (person) => {
    if (!window.confirm(`Are you sure you want to delete ${person.name}?`)) return
    personsService.remove(person.id)
      .catch(() => {
        displayNotification({ type: "error", message: `${person.name} was already deleted` })
      })
    setPersons(persons.filter(p => p.id !== person.id))
    displayNotification({ type: "error", message: `Deleted ${person.name}` })
  }

  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={currentNotification} />
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
      <People people={filteredPersons} onDeletePerson={onDeletePerson} />
    </div>
  )
}

export default App
