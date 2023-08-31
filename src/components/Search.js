import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { randomCocktails, searchCocktails } from '../reducers/cocktailReducer'
import { setDisplayMethod } from '../reducers/displayMethodReducer'
import { displayNotification, emptyNotification } from '../reducers/notificationReducer'
import cocktailServices from '../services/cocktails'
import searchImg from '../assets/search.png'
import clearImg from '../assets/clear.png'
import { Form } from 'react-bootstrap'

const Search = () => {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const displayMethod = useSelector(state => state.displayMethod)

    const searchChanged = (event) => {
        event.preventDefault()
        setSearch(event.target.value)
    }

    const handleSearch = async () => {
        if (search !== '') {
            const results = await cocktailServices.searchCocktailsByName(search)
            dispatch(searchCocktails(results.drinks))
            dispatch(setDisplayMethod('Search'))
            navigate('/')
        }
        else {
            dispatch(displayNotification({ message: 'Type something to search!', type: 'error' }))
            dispatch(emptyNotification({}))
        }
    }

    const handleClear = () => {
        if (search !== '') {
            if (displayMethod === 'Random') {
                setSearch('')
            }
            else {
                setSearch('')
                dispatch(randomCocktails())
                dispatch(setDisplayMethod('Random'))
            }
        }
        else {
            if (displayMethod === 'Search') {
                dispatch(randomCocktails())
                dispatch(setDisplayMethod('Random'))
            }
            else {
                dispatch(displayNotification({ message: 'Search has been cleared already!', type: 'error' }))
                dispatch(emptyNotification({}))
            }
        }
    }

    return (
        <div className="searchForm">
            <Form.Control type='text' id='searchBar' placeholder="Search here..." onChange={searchChanged} value={search} />
            <button className="searchBtn" id='searchButton' type="button" onClick={() => handleSearch()}><img src={searchImg} alt="searchButton" /></button>
            <button className="clearBtn" id='clearButton' type="button" onClick={() => handleClear()}><img src={clearImg} alt="clearButton" /></button>
        </div>
    )
}

export default Search