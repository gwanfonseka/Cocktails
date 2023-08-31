import { createSlice } from '@reduxjs/toolkit'

const detailSlice = createSlice({
    name: 'details',
    initialState: {},
    reducers: {
        setDetails(state, action) {
            return action.payload
        }
    }
})

export const { setDetails } = detailSlice.actions

export const manipulateCocktailObject = (cocktail) => {
    return async dispatch => {
        const cocktailObject = cocktail
        const ingredients = []
        let i = 0
        for (const key in cocktailObject) {
            if (key.startsWith('strIngredient')) {
                const ingredient = cocktailObject[key]
                if (ingredient) {
                    ingredients.push({ id: i, name: ingredient })
                    i++
                }
            }
        }
        dispatch(setDetails({ ...cocktail, ingredients: ingredients }))
    }
}

export default detailSlice.reducer