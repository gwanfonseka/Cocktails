import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { randomCocktails } from './reducers/cocktailReducer'
import CocktailList from './components/Cocktail'
import Favourites from './components/Favourites'
import Header from './components/Header'
import Notification from './components/Notification'
import Details from './components/Details'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'

const App = () => {
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification)

    useEffect(() => {
        dispatch(randomCocktails())
    }, [dispatch])

    return (
        <Router>
            <Header />
            {notification === {} ? (<></>) : (<Notification />)}
            <Container className="mainContainer">
                <Routes>
                    <Route path='/' element={<CocktailList />} />
                    <Route path='/cocktail/:id' element={<Details />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <Favourites />
            </Container>
        </Router>
    )
}

const NotFound = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/')
    }, [navigate])

    return null
}

export default App
