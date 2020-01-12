import {
    FULLFIELD_ALL_PRODUCTS,
    GETTING_ALL_PRODUCTS,
    FULLFIELD_PRODUCT_DETAIL
} from '../actions/ActionTypes'

export default function (state = { isLoading: false }, action) {
    switch (action.type) {
        case GETTING_ALL_PRODUCTS:
            return {
                ...state, isLoading: true
            }
        case FULLFIELD_ALL_PRODUCTS:
            return {
                ...state, isLoading: false, data: action.payload
            }
        case FULLFIELD_PRODUCT_DETAIL:
            return {
                ...state, detail: action.payload
            }
        default:
            return state
    }
}