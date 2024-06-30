import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      const content = action.payload
      state.push(content)
  },
  incrementVote(state, action) {
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

export const { appendAnecdote, incrementVote, setAnecdotes } = anecdoteSlice.actions

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const initialNotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(initialNotes))
  }
}

export const vote = (id) => {
  return async dispatch => {
    await anecdoteService.voteByID(id)
    dispatch(incrementVote(id))
  }
}

export default anecdoteSlice.reducer