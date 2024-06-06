const Persons = ({  persons, newQuery, queryResults }) => {
    return (
      <>
        {newQuery === '' ? persons.map(person => <p key={person.id}>{person.name} {person.number}</p>) : queryResults.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
      </>
    )
  }

export default Persons;