import { SET_CURRENT_USER } from '../actions/ActionTypes'
import _ from 'lodash'

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !_.isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state
    }
}