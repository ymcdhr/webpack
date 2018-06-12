import { combineReducers } from 'redux'
import addedList from './addShoppingCart'
import productList from './filterProducts'

const reducers = combineReducers({
    addedList,
    productList
});

export default reducers;