import { createSlice } from '@reduxjs/toolkit'

const favouriteSlice = createSlice({
    name: 'favourites',
    initialState: [],
    reducers: {
        setFavourites(state, action) {
            return state.concat(action.payload)
        },
        deletFavourites(state, action) {
            return state.filter(favourite => favourite.idDrink !== action.payload.idDrink)
        }
    }
})

export const { setFavourites, deletFavourites } = favouriteSlice.actions

export default favouriteSlice.reducer