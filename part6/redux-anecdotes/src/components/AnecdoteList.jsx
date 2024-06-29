import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { sortByVotes } from '../reducers/anecdoteReducer'
import { sendNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.filter === '' ? 
                                                                sortByVotes(state.anecdotes)
                                                               :sortByVotes(state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))))
    const dispatch = useDispatch()

    const voteAndNotificationDispatcher = (anecdote) => {
      dispatch(vote(anecdote.id))
      dispatch(sendNotification(`You voted for ${anecdote.content}`))
      setTimeout(()=> {
        dispatch(removeNotification())
      }, 5000)
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