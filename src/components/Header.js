import Search from './Search'
import { useDispatch, useSelector } from 'react-redux'
import { setVisibility } from '../reducers/visibilityReducer'
import { Row, Col } from 'react-bootstrap'
import heartImg from '../assets/heart.png'
import logo from '../assets/Logo.png'
import logoSmall from '../assets/logoSmall.png'

const Header = () => {
    const dispatch = useDispatch()
    const visibility = useSelector(state => state.visibility)

    const handleFavourites = () => {
        dispatch(setVisibility(!visibility))
    }

    return (
        <Row className="header">
            <Col xs={2} sm={3} md={3} lg={4} className='logoBig'>
                <div>
                    <img src={logo} alt='logoBig'/>
                </div>
            </Col>
            <Col xs={2} sm={3} md={3} lg={4}  className='logoSm'>
                <div>
                    <img src={logoSmall} alt='logoBig'/>
                </div>
            </Col>
            <Col xs={8} sm={6} md={6} lg={4}>
                <Search />
            </Col>
            <Col xs={2} sm={3} md={3} lg={4}>
                <button className="favouriteBtn" id='favouriteBtn' type="button" onClick={handleFavourites}><span className="favouriteBtnLbl">Favourites</span> <img src={heartImg} alt="favouriteButton" /></button>
            </Col>
        </Row>
    )
}

export default Header