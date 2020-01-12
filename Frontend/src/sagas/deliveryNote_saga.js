import { put, takeEvery, call } from 'redux-saga/effects';
import { delay } from 'redux-saga'
import "regenerator-runtime/runtime";
import * as API from './api';
import * as Action from '../actions/ActionTypes';
import history from '../history'

function* getDeliveryNoteByOrderIdGenerator(action) {
    try {
        const payload = yield call(API.getDeliveryNoteByOrderId, action.payload.orderId)
        yield put({
            type: Action.GET_DELIVERY_NOTE_SUCCESS,
            payload: payload.data.obj
        })
    } catch (error) {
        console.log(error)
    }
}

function* addUpdateDeliveryNoteGenerator(action) {
    try {
        const payload = yield call(API.addUpdateDeliveryNote, action.payload)
        yield put({
            type: Action.UPDATE_DELIVERY_NOTE_SUCCESS,
            payload: payload.data.obj
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield call(delay, 500)
        yield put({
            type: Action.HIDE_SNACKBAR_MESSAGE
        })

        if(action.payload.deliveryNoteId == 0){
            yield call(history.push, '' + payload.data.obj.id)
        }
    } catch (error) {
        console.log(error)
    }
}

function* addUpdateDeliveryNoteGeneratorNoAlert(action) {
    try {
        if (action.payload.id == 'new') {
            action.payload.id = 0
        }
        const payload = yield call(API.addUpdateDeliveryNote, action.payload)
        yield put({
            type: Action.UPDATE_DELIVERY_NOTE_SUCCESS,
            payload: payload.data.obj
        })
    } catch (error) {
        console.log(error)
    }
}

function* generateDeliveryNoteGenerator(action) {
    try {
        yield call(updateDeliveryNoteProductListGenerator, action)
        yield call(addUpdateDeliveryNoteGeneratorNoAlert, action)
        const payload = yield call(API.generateDeliveryNote, action.payload)
        yield put({
            type: Action.SHOW_DELIVERY_NOTE,
            payload: action.payload
        })
        yield put({
            type: Action.HIDE_DELIVERY_NOTE,
            payload: action.payload
        })
    } catch (error) {
        console.log(error)
    }
}

function* getDeliveryNoteByIdGenerator(action) {
    try {
        if (action.payload === 'new') {
            yield put({
                type: Action.CLEAR_DELIVERY_NOTE_DATA
            })
        } else {
            const payload = yield call(API.getDeliveryNoteById, action.payload)
            yield put({
                type: Action.USER_GET_DELIVERY_NOTE_BY_ID_SUCCESS,
                payload: payload.data.obj
            })
        }
    } catch (error) {
        console.log(error)
    }
}

function* getDeliveryNoteProductListGenerator(action) {
    try {
        if (action.payload === 'new') {
            yield put({
                type: Action.CLEAR_DELIVERY_NOTE_PRODUCT_LIST_DATA
            })
        } else {
            const payload = yield call(API.getDeliveryNoteProductList, action.payload)
            yield put({
                type: Action.USER_GET_DELIVERY_NOTE_PRODUCT_LIST_SUCCESS,
                payload: payload.data.obj
            })
        }
    } catch (error) {
        console.log(error)
    }
}

function* updateDeliveryNoteProductListGenerator(action) {
    try {
        const payload = yield call(API.updateDeliveryNoteProductList, action.payload)
        yield put({
            type: Action.USER_UPDATE_DELIVERY_NOTE_PRODUCT_LIST_SUCCESS,
            payload: payload.data.obj
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

export const DeliveryNoteSagas = [
    takeEvery(Action.USER_GET_DELIVERY_NOTE_BY_ORDER_ID, getDeliveryNoteByOrderIdGenerator),
    takeEvery(Action.USER_UPDATE_DELIVERY_NOTE, addUpdateDeliveryNoteGenerator),
    takeEvery(Action.USER_GENERATE_DELIVERY_NOTE, generateDeliveryNoteGenerator),
    takeEvery(Action.USER_GET_DELIVERY_NOTE_BY_ID, getDeliveryNoteByIdGenerator),
    takeEvery(Action.USER_GET_DELIVERY_NOTE_PRODUCT_LIST, getDeliveryNoteProductListGenerator),
    takeEvery(Action.USER_UPDATE_DELIVERY_NOTE_PRODUCT_LIST, updateDeliveryNoteProductListGenerator)
]