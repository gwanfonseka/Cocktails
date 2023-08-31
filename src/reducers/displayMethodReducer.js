import { createSlice } from '@reduxjs/toolkit'

const displayMethodSlice = createSlice({
    name: 'disaplyMethod',
    initialState: 'Random',
    reducers: {
        setDisplayMethod(state, action) {
            return action.payload
        }
    }
})

export const { setDisplayMethod } = displayMethodSlice.actions

export default displayMethodSlice.reducer