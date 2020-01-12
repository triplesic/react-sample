import { put, takeEvery, call } from 'redux-saga/effects';
import "regenerator-runtime/runtime";
import * as API from './api';
import * as Action from '../actions/ActionTypes';

function* fetchAllUserGenerator() {
    try {
        const payload = yield call(API.fetchAllUsers);
        yield put({
            type: Action.FETCH_ALL_USERS_SUCCESS,
            payload
        });
    } catch (error) {
        console.log(error)
    }
}

function* changePasswordGenerator(action) {
    try {
        const payload = yield call(API.changePassword, action.payload)
        yield put({
            type: Action.CHANGE_PASSWORD_SUCCESS,
            payload
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
    } catch (error) {
        console.log(error)
    }
}

export const UserSagas = [
    takeEvery(Action.USER_FETCH_ALL_USERS, fetchAllUserGenerator),
    takeEvery(Action.CHANGE_PASSWORD, changePasswordGenerator)
];