import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

const createNew = async (anecdote) => {
    const anecdoteObject = {
        content: anecdote,
        votes: 0
    }
    const response = await axios.post(baseURL, anecdoteObject)
    return response.data
}

const getByID = async (id) => {
    const response = await axios.get(`${baseURL}/${id}`)
    return response.data
}

const voteByID = async(id) => {
    const anecdote = await getByID(id)
    console.log('ID THINGY', anecdote, typeof(anecdote))
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    return updateByID(updatedAnecdote, id)
}

const updateByID = async (anecdote, id) => {
    const response = await axios.put(`${baseURL}/${id}`, anecdote)
    return response.data
}

export default {getAll, createNew, getByID, voteByID}