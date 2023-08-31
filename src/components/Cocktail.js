import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { randomCocktails } from '../reducers/cocktailReducer'
import { setDisplayMethod } from '../reducers/displayMethodReducer'
import { setFavourites } from '../reducers/favouriteReducer'
import { displayNotification, emptyNotification } from '../reducers/notificationReducer'
import { manipulateCocktailObject } from '../reducers/detailReducer'
import { Row, Col } from 'react-bootstrap'
import refreshBtn from '../assets/refresh.png'
import heartCircle from '../assets/heartCircle.png'

const Cocktail = ({ cocktail }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const favourites = useSelector(state => state.favourites)

    const handleFavourite = (e, cocktail) => {
        e.stopPropagation()
        const cocktailFound = favourites.filter(x => x.idDrink === cocktail.idDrink)
        if (cocktailFound.length === 0) {
            dispatch(displayNotification({ message: `'${cocktail.strDrink}' added to the favourites!`, type: 'success' }))
            dispatch(setFavourites(cocktail))
            dispatch(emptyNotification({}))
        }
        else {
            dispatch(displayNotification({ message: `'${cocktail.strDrink}' is already added to the favourites!`, type: 'error' }))
            dispatch(emptyNotification({}))
        }
    }

    const handleClickOnCocktail = (cocktail) => {
        dispatch(manipulateCocktailObject(cocktail))
        navigate(`/cocktail/${cocktail.idDrink}`)
    }

    return (
        <Col lg={4} md={6} sm={4} xs={6}>
            <div className="cocktailBlock" onClick={() => handleClickOnCocktail(cocktail)}>
                <img className="cocktailImg" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                <div className="cocktailInfo">
                    <p className="cocktailName">{cocktail.strDrink}</p>
                    <p className="cocktailCategory">{cocktail.strCategory}</p>
                    <button type="button" className="heartButton" onClick={(e) => handleFavourite(e, cocktail)}><img className="favouriteHeartBtn" src={heartCircle} alt="favouriteBtn" /></button>
                </div>
            </div>
        </Col>
    )
}

const CocktailList = () => {
    const dispatch = useDispatch()
    const cocktails = useSelector(state => state.cocktails)
    const displayMethod = useSelector(state => state.displayMethod)

    const handleRefresh = () => {
        dispatch(randomCocktails())
        dispatch(setDisplayMethod('Random'))
    }

    if (cocktails === null) {
        return (
            <div className="emptyResultTxt">
                No cocktails available for your search...
            </div>
        )
    }
    else {
        return (
            <div id='cocktailsWrapper' className="cocktailWrapper">
                <Row>
                    {cocktails.map(cocktail => {
                        return (
                            <Cocktail key={cocktail.idDrink} cocktail={cocktail} />
                        )
                    })}

                    {displayMethod === 'Search' ? (<></>) : (
                        <Col lg={4} md={6} sm={4} xs={6}>
                            <div>
                                <button type="button" id='refreshBtn' className="refreshBtn" onClick={() => handleRefresh()}>
                                    <img className="cocktailImg" src={refreshBtn} alt="refreshBtn" />
                                    <span className="refreshTxt">Refresh</span>
                                </button>
                            </div>
                        </Col>
                    )}
                </Row>
            </div>
        )
    }
}

export default CocktailList