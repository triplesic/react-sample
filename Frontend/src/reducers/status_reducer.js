import _ from 'lodash';
import * as Action from '../actions/ActionTypes';

export default function(state = {}, action) {
    switch (action.type) {
        case Action.FETCH_ALL_STATUS_SUCCESS:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}