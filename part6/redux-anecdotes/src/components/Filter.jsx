import { createFilter } from "../reducers/filterReducer"
import { useSelector, useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()
   
    const handleChange = (event) => {
        dispatch(createFilter(event.target.value))    
    }

    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} name='filter' />
      </div>
    )
  }
  
  export default Filter