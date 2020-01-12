import { FULLFIELD_ALL_INVENTORY_TYPES } from '../actions/ActionTypes'

export default function (state = {}, action) {
    switch (action.type) {
        case FULLFIELD_ALL_INVENTORY_TYPES:
            return {
                ...state, data: action.payload
            }
        default:
            return state
    }
}