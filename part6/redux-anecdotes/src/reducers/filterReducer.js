const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'FILTER_CHANGED':
            return action.payload.query
        default:
            return state
    }
} 

export const createFilter = (query) => {
    return {
        type: 'FILTER_CHANGED',
        payload: {query}
    }
}

export default filterReducer