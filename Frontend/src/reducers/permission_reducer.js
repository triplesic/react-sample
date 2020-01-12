import { 
    CHECK_PERMISSION_SUCCESS, 
    FETCH_ALL_ROLES_SUCCESS,
    FIND_ALL_PAGES_PERMISSION_BY_USER_ID_SUCCESS } from '../actions/ActionTypes'

export default function (state = {
    canView: true,
    canUpdate: true,
    roles: {},
    pagePermissionList: []
}, action) {
    switch (action.type) {
        case CHECK_PERMISSION_SUCCESS:
            return {
                ...state,
                canView: action.payload.data.obj.canView,
                canUpdate: action.payload.data.obj.canUpdate
            }
        case FETCH_ALL_ROLES_SUCCESS:
            return {
                ...state,
                roles: action.payload.data.obj
            }
        case FIND_ALL_PAGES_PERMISSION_BY_USER_ID_SUCCESS:
            return {
                ...state,
                pagePermissionList: action.payload.data.obj
            }
        default:
            return state
    }
}