import { configureStore } from '@reduxjs/toolkit'
import cocktailReducer from './reducers/cocktailReducer'
import displayMethodReducer from './reducers/displayMethodReducer'
import favouriteReducer from './reducers/favouriteReducer'
import visibilityReducer from './reducers/visibilityReducer'
import notificationReducer from './reducers/notificationReducer'
import detailReducer from './reducers/detailReducer'

const store = configureStore({
    reducer: {
        cocktails: cocktailReducer,
        displayMethod: displayMethodReducer,
        favourites: favouriteReducer,
        visibility: visibilityReducer,
        notification: notificationReducer,
        details: detailReducer
    }
})

export default store