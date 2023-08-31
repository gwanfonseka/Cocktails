import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { displayNotification, emptyNotification } from '../reducers/notificationReducer'
import { setFavourites } from '../reducers/favouriteReducer'
import { Row, Col, Breadcrumb } from 'react-bootstrap'
import heartCircle from '../assets/heartCircle.png'

const Details = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const imageBasePath = 'https://www.thecocktaildb.com/images/ingredients/'
    const cocktailDetails = useSelector(state => state.details)
    const favourites = useSelector(state => state.favourites)

    useEffect(() => {
        if (cocktailDetails.idDrink === undefined) {
            navigate('/')
        }
    }, [navigate])

    const handleFavourite = (drink) => {
        const cocktail = { ...drink }
        delete cocktail.ingredients

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

    return (
        <>
            <div id='cocktailsWrapper' className="cocktailWrapper">
                <Row>
                    <Breadcrumb>
                        <Breadcrumb.Item className='homeLink' onClick={() => navigate('/')}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item className='cocktailLink' active><span>Cocktail-{cocktailDetails.idDrink}</span></Breadcrumb.Item>
                    </Breadcrumb>
                </Row>
                <Row className='cocktailHeaderWrapper'>
                    <p className='cocktailDetailsName'>{cocktailDetails.strDrink}</p>
                    <button type="button" className="heartButton_details" onClick={() => handleFavourite(cocktailDetails)}><img className="favouriteHeartBtn" src={heartCircle} alt="favouriteBtn" /></button>
                </Row>
                <Row className='cocktailDetailWrapper'>
                    <Col sm={6} md={6} lg={6}>
                        <div className='cocktailBlock cocktailBlock_details'>
                            <img className='cocktailImg' src={cocktailDetails.strDrinkThumb} alt='Cocktail Details Image' />
                        </div>
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                        <Row>
                            <Col xs={4} sm={6} md={4} lg={4}>
                                <p className='cocktailLabel'>Cocktail id</p>
                            </Col>
                            <Col xs={8} sm={6} md={8} lg={8}>
                                <p className='cocktailDetail'>: #{cocktailDetails.idDrink}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} sm={6} md={4} lg={4}>
                                <p className='cocktailLabel'>Cocktail category</p>
                            </Col>
                            <Col xs={8} sm={6} md={8} lg={8}>
                                <p className='cocktailDetail'>: {cocktailDetails.strCategory}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} sm={6} md={4} lg={4}>
                                <p className='cocktailLabel'>Served in</p>
                            </Col>
                            <Col xs={8} sm={6} md={8} lg={8}>
                                <p className='cocktailDetail'>: {cocktailDetails.strGlass}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} sm={6} md={4} lg={4}>
                                <p className='cocktailLabel'>Alcoholic status</p>
                            </Col>
                            <Col xs={8} sm={6} md={8} lg={8}>
                                <p className='cocktailDetail'>: {cocktailDetails.strAlcoholic}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={12} lg={12}>
                                <p className='ingredientHeader'>Instructions</p>
                            </Col>
                            <Col sm={12} md={12} lg={12}>
                                <p className='cocktailDetail'>{cocktailDetails.strInstructions}</p>
                            </Col>
                        </Row>
                        <Row>
                            <p className='ingredientHeader'>Ingredients</p>
                            {cocktailDetails.ingredients && cocktailDetails.ingredients.map(ingredient => {
                                return (
                                    <Col xs={6} sm={3} md={3} lg={3} key={ingredient.id}>
                                        <div className='cocktailBlock ingredientWrapper'>
                                            <img className='ingredientThumb' src={`${imageBasePath}${ingredient.name}-Medium.png`} alt={ingredient.name} />
                                        </div>
                                        <p className='ingredientName'>{ingredient.name}</p>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Details