const PersonForm = ({  submitHandler, nameValue, nameHandler, numberValue, numberHandler}) => {
    return (
      <form onSubmit={submitHandler}>
          <div>
            name: <input value={nameValue} onChange={nameHandler} />
            <div>number: <input value={numberValue} onChange={numberHandler} /></div>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }

export default PersonForm;