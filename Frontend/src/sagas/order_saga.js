import { put, takeEvery, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import 'regenerator-runtime/runtime'
import * as API from './api'
import * as Action from '../actions/ActionTypes'

function* fetchOrderGenerator(action) {
    try {
        const payload = yield call(API.fetchOrder, action.payload)
        yield put({
            type: Action.FETCH_ORDER_SUCCESS,
            payload
        })

    } catch (error) {
        yield put({
            type: Action.ORDER_ERROR,
            error
        })
    }
}

function* updateOrderProductListGenerator(action) {
    try {
        const payload = yield call(API.updateOrderProductList, action.payload)
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield put({
            type: Action.USER_UPDATE_ORDER_PRODUCT_LIST_SUCCESS,
            payload
        })
    } catch (error) {
        console.error(error)
        yield put({
            type: Action.ORDER_ERROR,
            error
        })
    } finally {
        yield call(delay, 500)
        yield put({
            type: Action.HIDE_SNACKBAR_MESSAGE
        })
    }
}

export const OrderSagas = [
    takeEvery(Action.USER_FETCH_ORDER, fetchOrderGenerator),
    takeEvery(Action.USER_UPDATE_ORDER_PRODUCT_LIST, updateOrderProductListGenerator)
]