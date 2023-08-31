import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {},
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        deleteNotification(state, action) {
            return action.payload
        }
    }
})

export const { setNotification, deleteNotification } = notificationSlice.actions

export const displayNotification = (content) => {
    return async dispatch => {
        dispatch(setNotification(content))
    }
}

export const emptyNotification = (content) => {
    return async dispatch => {
        setTimeout(() => {
            dispatch(setNotification(content))
        }, 3000)
    }
}

export default notificationSlice.reducer