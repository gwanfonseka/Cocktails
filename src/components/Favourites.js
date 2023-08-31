import { useSelector, useDispatch } from 'react-redux'
import { setVisibility } from '../reducers/visibilityReducer'
import { deletFavourites } from '../reducers/favouriteReducer'
import { displayNotification, emptyNotification } from '../reducers/notificationReducer'
import { Row, Col } from 'react-bootstrap'
import whiteCross from '../assets/whiteCross.png'
import trashCan from '../assets/trash.png'

const Favourite = ({ favourite }) => {
    const dispatch = useDispatch()

    const handleDelete = (drink) => {
        dispatch(deletFavourites(drink))
        dispatch(displayNotification({ message: `'${drink.strDrink}' removed from favourites!`, type: 'success' }))
        dispatch(emptyNotification({}))
    }

    return (
        <Row className="favouriteItemWrapper">
            <Col xs={3} sm={3} md={3}>
                <img src={favourite.strDrinkThumb} className="favouriteThumb" alt="favouriteImages" />
            </Col>
            <Col xs={6} sm={6} md={6}>
                <p className="favCocktailName">{favourite.strDrink}</p>
            </Col>
            <Col xs={3} sm={3} md={3} className="trashButtonWrapper">
                <button className="trashButton" type="button" onClick={() => handleDelete(favourite)}><img src={trashCan} alt="trash" /></button>
            </Col>
        </Row>
    )
}

const Favourites = () => {
    const dispatch = useDispatch()
    const visibility = useSelector(state => state.visibility)
    const favourites = useSelector(state => state.favourites)

    const handleClick = () => {
        dispatch(setVisibility(!visibility))
    }

    return (
        <Col xs={12} sm={4} md={5} lg={3} className={`box animated favouritesWrapper ${visibility ? 'visible' : ''}`}>
            <div>
                <div className="favouriteHEader">
                    <p>Favourites</p>
                    <button type="button" className="closeFavouriteBtn" onClick={handleClick}><img src={whiteCross} alt="closeFavourites" /></button>
                </div>

                {favourites.length === 0 ? (<div className="emptyResultTxtFavourites">No favorite items available...</div>) : (
                    <>
                        {favourites.map(favourite => {
                            return (
                                <Favourite favourite={favourite} key={favourite.idDrink} />
                            )
                        })}
                    </>
                )}
            </div>
        </Col>
    )
}

export default Favourites