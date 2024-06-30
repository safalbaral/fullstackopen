import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { sortByVotes } from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.filter === '' ? 
                                                                sortByVotes(state.anecdotes)
                                                               :sortByVotes(state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))))
    const dispatch = useDispatch()

    const voteAndNotificationDispatcher = (anecdote) => {
      dispatch(vote(anecdote.id))
      dispatch(setNotification(`You voted for ${anecdote.content}`, 5))
    }

    return(
        <div>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => voteAndNotificationDispatcher(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default AnecdoteList;