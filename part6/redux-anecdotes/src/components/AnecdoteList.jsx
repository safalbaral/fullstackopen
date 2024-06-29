import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.filter === '' ? 
                                                                state.anecdotes
                                                               :state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter)))
    const dispatch = useDispatch()

    return(
        <div>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default AnecdoteList;