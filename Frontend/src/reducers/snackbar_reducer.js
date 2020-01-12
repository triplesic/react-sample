import * as Action from '../actions/ActionTypes'

export default function (state = {}, action) {
    switch (action.type) {
        case Action.SHOW_SNACKBAR_MESSAGE:
            return {
                responseMsg: action.payload
            }
        case Action.HIDE_SNACKBAR_MESSAGE:
            return {
                responseMsg: ''
            }
        default:
            return state
    }
}