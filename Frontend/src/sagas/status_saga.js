import { put, takeEvery, call } from 'redux-saga/effects';
import "regenerator-runtime/runtime";
import * as API from './api';
import * as Action from '../actions/ActionTypes';


function* fetchAllStatusGenerator() {
    try {
        const payload = yield call(API.fetchAllStatus);
        yield put({
            type: Action.FETCH_ALL_STATUS_SUCCESS,
            payload
        });
    } catch (error) {
        console.log(error)
    }
}

export const StatusSagas = [
    takeEvery(Action.USER_FETCH_ALL_STATUS, fetchAllStatusGenerator)
];