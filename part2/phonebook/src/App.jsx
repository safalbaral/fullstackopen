import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';

import entries from './services/entries';

import './index.css';

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newQuery, setNewQuery] = useState('')
  const [queryResults, setQueryResults] = useState([])
  const [message, setMessage] = useState({
    message: null,
    success: true
  })

  useEffect(() => {
    entries
    .getAll()
    .then(allEntries => {
      setPersons(allEntries)
    })
  }, [])

  const displayNotification = (message, success=true) => {
    const messageObject = {message, success}
    setMessage(messageObject)
    setTimeout(() => {
      console.log('Set message to null', )
      setMessage({
        message: null,
        success: true
      })
    }, 5000)
  }

  const addEntry = (event) => {
    event.preventDefault();
    if (retrieveEntry(newName) !== undefined) {
      if (window.confirm(`${newName} is already added to the phonebook, do you want to update the old entry?`)) {
        const entryObject = {
          ...persons.find(person => person.name === newName), 
          number: newNumber
        }
        entries
        .update(entryObject.id, entryObject)
        .then(updatedEntry => {
          setPersons(persons.map(person => person.id === updatedEntry.id ? updatedEntry : person))
        })
        setNewName('')
        setNewNumber('')
        displayNotification('Updated entry successfully')
      }
    }
    else 
    {
      const entryObject = {
        name: newName, 
        number: newNumber
      }
      entries
      .create(entryObject)
      .then(newEntry => {
        setPersons(persons.concat(newEntry))
      })
      setNewName('')
      setNewNumber('')
      displayNotification('Added entry successfully')
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
      .then(response => {
        alert('Entry deleted');
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        alert(`Error: Entry might already be deleted from the server.`)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messageObject={message} />
      <Filter queryValue={newQuery} queryHandler={handleNewQuery} />
      <h3>Add a new</h3>
      <PersonForm submitHandler={addEntry} nameValue={newName} nameHandler={handleNameChange} numberValue={newNumber} numberHandler={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} newQuery={newQuery} queryResults={queryResults} deleteHandler={deleteHandler} />
    </div>
  )
}

export default App