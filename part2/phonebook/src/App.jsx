import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

import entries from './services/entries';

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newQuery, setNewQuery] = useState('')
  const [queryResults, setQueryResults] = useState([])

  useEffect(() => {
    entries
    .getAll()
    .then(allEntries => {
      setPersons(allEntries)
    })
  }, [])

  const addEntry = (event) => {
    event.preventDefault();
    if (retrieveEntry(newName) !== undefined) {
      alert(`${newName} is already added to the phonebook`)
    }
    else 
    {
      const entryObject = {
        name: newName, 
        number: newNumber,
        id: persons.length + 1
      }
      entries
      .create(entryObject)
      .then(newEntry => {
        setPersons(persons.concat(newEntry))
      })
      setNewName('')
      setNewNumber('')
    }
  }

  const retrieveEntry = (query) => persons.find(person => person.name === query)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewQuery = (event) => {
    const syncedQuery = event.target.value
    setNewQuery(syncedQuery)
    setQueryResults(syncedQuery === '' ? persons : persons.filter(person => person.name.toLowerCase().startsWith(syncedQuery.toLowerCase())))
  }

  const deleteHandler = (id) => {
    const entryToDelete = persons.find(person => person.id === id).name
    if (window.confirm(`Do you want to delete ${entryToDelete}? `)) {
      entries.deleteEntry(id)
      .then(deletedEntry => {
        alert('Entry deleted');
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter queryValue={newQuery} queryHandler={handleNewQuery} />
      <h3>Add a new</h3>
      <PersonForm submitHandler={addEntry} nameValue={newName} nameHandler={handleNameChange} numberValue={newNumber} numberHandler={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} newQuery={newQuery} queryResults={queryResults} deleteHandler={deleteHandler} />
    </div>
  )
}

export default App