import { useState } from 'react'
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newQuery, setNewQuery] = useState('')
  const [queryResults, setQueryResults] = useState([])

  
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
      setPersons(persons.concat(entryObject))
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter queryValue={newQuery} queryHandler={handleNewQuery} />
      <h3>Add a new</h3>
      <PersonForm submitHandler={addEntry} nameValue={newName} nameHandler={handleNameChange} numberValue={newNumber} numberHandler={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} newQuery={newQuery} queryResults={queryResults} />
    </div>
  )
}

export default App