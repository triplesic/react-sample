import { put, takeEvery, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import 'regenerator-runtime/runtime'
import * as API from './api'
import * as Action from '../actions/ActionTypes'
import history from '../history'

function* hasPermissionGenerator(action) {
    try {
        const payload = yield call(API.hasPermission, action.payload)
        yield put({
            type: Action.CHECK_PERMISSION_SUCCESS,
            payload
        })
    } catch (error) {
        yield call(history.push, '/login')
    }
}

function* fetchAllRolesGenerator(action) {
    try {
        const payload = yield call(API.fetchAllRoles)
        yield put({
            type: Action.FETCH_ALL_ROLES_SUCCESS,
            payload
        })
    } catch (error) {
        console.log(error)
    }
}

function* updateUserRoleGenerator(action) {
    try {
        const payload = yield call(API.updateUserRole, { userList: action.payload })
        yield put({
            type: Action.UPDATE_USER_LIST_SUCCESS,
            payload
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield call(delay, 500)
        yield put({
            type: Action.HIDE_SNACKBAR_MESSAGE
        })
    } catch (error) {
        console.log(error)
    }
}

function* findAllPagesPermissionByUserIdGenerator(action) {
    try {
        const payload = yield call(API.findAllPagesPermissionByUserId, action.payload)
        yield put({
            type: Action.FIND_ALL_PAGES_PERMISSION_BY_USER_ID_SUCCESS,
            payload
        })
    } catch (error) {
        console.log(error)
    }
}

export const PermissionSagas = [
    takeEvery(Action.USER_CHECK_PERMISSION, hasPermissionGenerator),
    takeEvery(Action.USER_FETCH_ALL_ROLES, fetchAllRolesGenerator),
    takeEvery(Action.USER_UPDATE_USER_LIST, updateUserRoleGenerator),
    takeEvery(Action.USER_FIND_ALL_PAGES_PERMISSION_BY_USER_ID, findAllPagesPermissionByUserIdGenerator)
]