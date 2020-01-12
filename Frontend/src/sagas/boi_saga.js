import { put, takeEvery, call } from 'redux-saga/effects';
import "regenerator-runtime/runtime";
import * as API from './api';
import * as Action from '../actions/ActionTypes'
import * as Constants from '../helpers/util/constant'

function* fetchAllBOITypeGenerator() {
    try {
        const payload = yield call(API.fetchAllBOIType)
        yield put({
            type: Action.USER_FETCH_ALL_BOI_TYPE_SUCCESS,
            payload
        });
    } catch (error) {
        console.log(error)
    }
}

export const BoiSagas = [
    takeEvery(Action.USER_FETCH_ALL_BOI_TYPE, fetchAllBOITypeGenerator)
];