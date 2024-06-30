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

export default {getAll, createNew}