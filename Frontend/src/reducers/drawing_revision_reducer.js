import { FULLFIELD_DRAWING_REVISION } from '../actions/ActionTypes'

export default function (state = {}, action) {
    switch (action.type) {
        case FULLFIELD_DRAWING_REVISION:
            return {
                ...state, data: action.payload
            }
        default:
            return state
    }
}