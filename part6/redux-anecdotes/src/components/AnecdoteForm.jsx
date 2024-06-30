import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer';
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value 
    event.target.anecdote.value = ''
    const anecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(anecdote))
  }
  return(
      <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
    )
}

export default AnecdoteForm;