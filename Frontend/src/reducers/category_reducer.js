import { GETTING_ALL_CATEGORY, FULLFIELD_ALL_CATEGORY, FULLFIELD_CATEGORY_DETAIL } from '../actions/ActionTypes'

export default function (state = { isLoading: false }, action) {
    switch (action.type) {
        case GETTING_ALL_CATEGORY:
            return {
                ...state,
                isLoading: true
            }
        case FULLFIELD_ALL_CATEGORY:
            return {
                ...state, data: action.payload,
                isLoading: false
            }
        case FULLFIELD_CATEGORY_DETAIL:
            return {
                ...state, detail: action.payload
            }
        default:
            return state
    }
}