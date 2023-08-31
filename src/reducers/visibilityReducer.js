import { createSlice } from '@reduxjs/toolkit'

const visibilitySlice = createSlice({
    name: 'visibility',
    initialState: false,
    reducers: {
        setVisibility(state, action) {
            return action.payload
        }
    }
})

export const { setVisibility } = visibilitySlice.actions

export default visibilitySlice.reducer