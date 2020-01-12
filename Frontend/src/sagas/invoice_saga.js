import { put, takeEvery, call } from 'redux-saga/effects';
import { delay } from 'redux-saga'
import "regenerator-runtime/runtime";
import * as API from './api';
import * as Action from '../actions/ActionTypes';
import history from '../history'

function* fetchAllInvoiceDocTypeGenerator() {
    try {
        const payload = yield call(API.fetchAllInvoiceDocType)
        yield put({
            type: Action.FETCH_ALL_INVOICE_DOC_TYPE_SUCCESS,
            payload
        })
    } catch (error) {
        console.log(error)
    }
}

function* fetchAllInvoiceTypeGenerator() {
    try {
        const payload = yield call(API.fetchAllInvoiceType);
        yield put({
            type: Action.FETCH_ALL_INVOICE_TYPE_SUCCESS,
            payload
        });
    } catch (error) {
        console.log(error)
    }
}

function* getInvoiceByOrderIdGenerator(action) {
    try {

        const payload = yield call(API.getInvoiceByOrderId, action.payload)
        yield put({
            type: Action.GET_INVOICE_BY_ORDER_ID_SUCCESS,
            payload
        })

    } catch (error) {
        console.log(error)
    }
}

function* getInvoiceByIdGenerator(action) {
    try {
        if (action.payload === 'new') {
            yield put({
                type: Action.CLEAR_INVOICE_DATA
            })
        } else {
            const payload = yield call(API.getInvoiceById, action.payload)
            yield put({
                type: Action.USER_GET_INVOICE_BY_ID_SUCCESS,
                payload
            })
        }
    } catch (error) {
        console.log(error)
    }
}

function* addUpdateInvoiceGeneration(action) {
    try {
        const payload = yield call(API.addUpdateInvoice, action.payload)
        yield put({
            type: Action.UPDATE_INVOICE_SUCCESS,
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
        if(action.payload.invoiceId == 0){
            yield call(history.push, '' + payload.data.obj.id)
        }
        
    } catch (error) {
        console.log(error)
    }
}

function* addUpdateInvoiceGenerationNoAlert(action) {
    try {
        const payload = yield call(API.addUpdateInvoice, action.payload)
        yield put({
            type: Action.UPDATE_INVOICE_SUCCESS,
            payload
        })
    } catch (error) {
        console.log(error)
    }
}

function* generateInvoiceGenerator(action) {
    try {
        yield call(addUpdateInvoiceGenerationNoAlert, action)
        const payload = yield call(API.generateInvoice, action.payload)
        yield put({
            type: Action.SHOW_INVOICE
        })
        yield put({
            type: Action.HIDE_INVOICE
        })
    } catch (error) {
        console.log(error)
    }
}

function* getInvoiceProductListGenerator(action) {
    try {
        if (action.payload === 'new') {
            yield put({
                type: Action.CLEAR_INVOICE_PRODUCT_LIST_DATA
            })
        } else {
            const payload = yield call(API.getInvoiceProductList, action.payload)
            yield put({
                type: Action.USER_GET_INVOICE_PRODUCT_LIST_SUCCESS,
                payload
            })
        }
    } catch (error) {
        console.log(error)
    }
}

function* updateInvoiceProductListGenerator(action) {
    try {
        const payload = yield call(API.updateInvoiceProductList, action.payload)
        yield put({
            type: Action.USER_UPDATE_INVOICE_PRODUCT_LIST_SUCCESS,
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

function* createNewTaxInvoiceByInvoiceIdGenerator(action){
    try{
        const payload = yield call(API.createNewTaxInvoiceByInvoiceId, action.payload)
        yield put({
            type: Action.USER_CREATE_NEW_TAX_INVOICE_BY_INVOICE_ID_SUCCESS,
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
        yield call(history.push, '' + payload.data.obj.id)

        yield call(getInvoiceByIdGenerator, { payload: payload.data.obj.id })
        yield call(getInvoiceProductListGenerator, { payload: payload.data.obj.id })
        
        window.scrollTo(0, 0)
    }catch(error){
        console.log(error)
    }
}

export const InvoiceSagas = [
    takeEvery(Action.USER_FETCH_ALL_INVOICE_TYPE, fetchAllInvoiceTypeGenerator),
    takeEvery(Action.USER_FETCH_ALL_INVOICE_DOC_TYPE, fetchAllInvoiceDocTypeGenerator),
    takeEvery(Action.USER_GET_INVOICE_BY_ORDER_ID, getInvoiceByOrderIdGenerator),
    takeEvery(Action.USER_UPDATE_INVOICE, addUpdateInvoiceGeneration),
    takeEvery(Action.USER_GENERATE_INVOICE, generateInvoiceGenerator),
    takeEvery(Action.USER_GET_INVOICE_BY_ID, getInvoiceByIdGenerator),
    takeEvery(Action.USER_GET_INVOICE_PRODUCT_LIST, getInvoiceProductListGenerator),
    takeEvery(Action.USER_UPDATE_INVOICE_PRODUCT_LIST, updateInvoiceProductListGenerator),
    takeEvery(Action.USER_CREATE_NEW_TAX_INVOICE_BY_INVOICE_ID, createNewTaxInvoiceByInvoiceIdGenerator)
]