import { createSlice } from '@reduxjs/toolkit'
import cocktailServices from '../services/cocktails'

const cocktailSlice = createSlice({
    name: 'cocktails',
    initialState: [],
    reducers: {
        setCocktails(state, action) {
            return action.payload
        },
        searchCocktails(state, action) {
            return action.payload
        }
    }
})

export const { setCocktails, searchCocktails } = cocktailSlice.actions

export const randomCocktails = () => {
    return async dispatch => {
        const randomLetter = generateRandomLetter()
        const cocktails = await cocktailServices.getCocltailsByLetter(randomLetter)
        const randomCocktails = pickFiveRandomCocktails(cocktails.drinks)
        dispatch(setCocktails(randomCocktails))
    }
}

const generateRandomLetter = () => {
    // generates a random character code between 65 (A) and 90 (Z)
    let randomCharCode = Math.floor(Math.random() * 26) + 65

    // skipping U, X, Y because not enough cocktails available with this letter
    if (randomCharCode === 85 || randomCharCode === 89) {
        randomCharCode++
    }
    else if (randomCharCode === 88) {
        randomCharCode = randomCharCode + 2
    }

    // converts the character code into a letter
    const randomLetter = String.fromCharCode(randomCharCode)
    return randomLetter
}

const pickFiveRandomCocktails = (cocktails) => {
    const length = cocktails.length
    const randomIndexes = []

    while (randomIndexes.length < 5) {
        const randomIndex = Math.floor(Math.random() * length)
        if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex)
        }
    }

    const randomObjects = []

    randomIndexes.forEach(index => {
        randomObjects.push(cocktails[index])
    })

    return randomObjects
}

export default cocktailSlice.reducer