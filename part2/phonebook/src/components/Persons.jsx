const Persons = ({  persons, newQuery, queryResults, deleteHandler }) => {
    return (
      <>
        {newQuery === '' ? persons.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => deleteHandler(person.id)}>Delete</button> </p>) : queryResults.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => deleteHandler(person.id)}>Delete</button> </p>)}
      </>
    )
  }

export default Persons;