import { GETTING_ALL_DEPARTMENTS, FULLFIELD_ALL_DEPARTMENTS, FULLFIELD_DEPARTMENT_DETAIL } from '../actions/ActionTypes'

export default function (state = { isLoading: false }, action) {
    switch (action.type) {
        case GETTING_ALL_DEPARTMENTS:
            return {
                ...state,
                isLoading: true
            }
        case FULLFIELD_ALL_DEPARTMENTS:
            return {
                ...state,
                data: action.payload,
                isLoading: false
            }
        case FULLFIELD_DEPARTMENT_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        default:
            return state
    }
}