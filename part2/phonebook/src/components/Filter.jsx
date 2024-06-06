const Filter = ({ queryValue, queryHandler }) => {
    return (
      <>
  <h3>Filter shown with </h3> <input value={queryValue} onChange={queryHandler} />
    </>
    )
  }

export default Filter;