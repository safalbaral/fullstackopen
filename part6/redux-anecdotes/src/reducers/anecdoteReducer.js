import { createSlice } from '@reduxjs/toolkit'
import { sendNotification, removeNotification } from '../reducers/notificationReducer';

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push(content)
  },
  vote(state, action) {
    const id = action.payload  
    return state.map(anecdote => anecdote.id !== id ? anecdote : {...anecdote, votes: anecdote.votes + 1})
  },
  setAnecdotes(state, action) {
    return action.payload
  }
}
})

export const sortByVotes = (state) => {
  console.log('STATE', state)
  return [...state].sort((a, b) => b.votes - a.votes) // A copy of state is created using [...state] because state is read only - meant to be immutable
}

export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer