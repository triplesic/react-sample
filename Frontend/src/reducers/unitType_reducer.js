import { FULLFIELD_ALL_UNIT_TYPES } from '../actions/ActionTypes'

export default function (state = {}, action) {
    switch (action.type) {
        case FULLFIELD_ALL_UNIT_TYPES:
            return {
                data: action.payload
            }
        default:
            return state
    }
}