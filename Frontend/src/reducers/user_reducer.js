import _ from 'lodash';
import * as Action from '../actions/ActionTypes';


export default function(state = {}, action) {
    switch (action.type) {
        case Action.FETCH_ALL_USERS_SUCCESS:
            return _.mapKeys(action.payload.data.obj, 'name');
        case Action.UPDATE_USER_LIST_SUCCESS:
            return _.mapKeys(action.payload.data.obj, 'name');
        default:
            return state;
    }
}