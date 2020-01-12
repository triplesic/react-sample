import { FULLFIELD_INVENTORY_TRANSACTION } from '../actions/ActionTypes'

export default (state = {}, action = {}) => {
    switch (action.type) {
        case FULLFIELD_INVENTORY_TRANSACTION:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}