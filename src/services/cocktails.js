import axios from 'axios'

const basePath = 'https://www.thecocktaildb.com/api/json/v1/1'

const getCocltailsByLetter = async (randomLetter) => {
    const response = await axios.get(`${basePath}/search.php?f=${randomLetter}`)
    return response.data
}

const searchCocktailsByName = async (name) => {
    const response = await axios.get(`${basePath}/search.php?s=${name}`)
    return response.data
}

const apiObj = { getCocltailsByLetter, searchCocktailsByName }

export default apiObj