import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers : {
        sendNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return null
        }
    }
})

export const {sendNotification, removeNotification} = notificationSlice.actions

export const setNotification = (notification, time = 5) => {
    return async dispatch => {
        dispatch(sendNotification(notification))
        setTimeout(() => {
            dispatch(removeNotification(notification))
        }, time * 1000)
    }
}

export default notificationSlice.reducer