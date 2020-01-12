import { put, takeEvery, call } from 'redux-saga/effects';
import { delay } from 'redux-saga'
import history from '../history'
import "regenerator-runtime/runtime";
import * as API from './api';
import * as Action from '../actions/ActionTypes'

function* saveQuotationProductListGenerator(action) {
    try {
        const payload = yield call(API.saveQuotationProductList, action.payload)
        yield put({
            type: Action.SAVE_QUOTATION_PRODUCT_LIST_SUCCESS,
            payload
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield call(delay, 500)
        yield put({
            type: Action.HIDE_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield put({ type: Action.HIDE_SNACKBAR_MESSAGE })
    } catch (error) {
        console.log(error)
    }
}

function* saveQuotationProductListNoAlertGenerator(action) {
    try {
        const payload = yield call(API.saveQuotationProductList, action.payload)
        yield put({
            type: Action.SAVE_QUOTATION_PRODUCT_LIST_SUCCESS,
            payload
        })
        yield put({ type: Action.HIDE_SNACKBAR_MESSAGE })
    } catch (error) {
        console.log(error)
    }
}

function* getOrderAndQuotationProductGenerator(action) {
    try {
        const payload = yield call(API.getOrderAndQuotationProduct, action.payload)
        yield put({
            type: Action.GET_ORDER_MASTER_AND_QUOTATION_PRODUCT_LIST_SUCCESS,
            payload
        })
    } catch (error) {
        console.log(error)
    }
}

function* generationQuotationGenerator(action) {
    try {
        yield call(saveQuotationProductListNoAlertGenerator, action)
        const payload = yield call(API.generateQuotation, action.payload.orderId)
        yield put({
            type: Action.SHOW_QUOTATION,
            payload: action.payload
        })
        yield put({
            type: Action.HIDE_QUOTATION,
            payload: action.payload
        })
    } catch (error) {
        console.log(error)
    }
}

export const QuotationSagas = [
    takeEvery(Action.USER_SAVE_QUOTATION_PRODUCT_LIST, saveQuotationProductListGenerator),
    takeEvery(Action.USER_GET_ORDER_MASTER_AND_QUOTATION_PRODUCT_LIST, getOrderAndQuotationProductGenerator),
    takeEvery(Action.USER_GENERATE_QUOTATION, generationQuotationGenerator)
]