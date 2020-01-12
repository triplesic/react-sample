import { put, takeEvery, call } from 'redux-saga/effects';
import "regenerator-runtime/runtime";
import * as API from './api';
import * as Action from '../actions/ActionTypes'


function* fetchAllSuppliersGenerator() {
    try {
        yield put({
            type: Action.LOADING_SHOW
        })
        const payload = yield call(API.fetchAllSuppliers);
        yield put({
            type: Action.LOADING_CLOSE
        })
        yield put({
            type: Action.FETCH_ALL_SUPPLIER_SUCCESS,
            payload
        });
    } catch (error) {
        console.log(error)
    }
}

function* fetchSupplierGenerator(action) {
    try {
        yield put({
            type: Action.LOADING_SHOW
        })
        const payload = yield call(API.fetchSupplier, action.payload);
        yield put({
            type: Action.LOADING_CLOSE
        })
        yield put({
            type: Action.FETCH_SUPPLIER_SUCCESS,
            payload
        })
    }
    catch (error) {
        yield put({
            type: Action.SUPPLIER_ERROR,
            error
        })
    }
}

function* addSupplierGenerator(action) {
    try {
        const payload = yield call(API.addSupplier, action.payload);
        yield put({
            type: Action.ADD_SUPPLIER_SUCCESS,
            payload
        })
        if (action.onSuccess) {
            action.onSuccess();
        }
    }
    catch (error) {
        yield put({
            type: Action.SUPPLIER_ERROR,
            error
        })
    }
}

function* updateSupplierGenerator(action) {
    try {
        const { id, value } = action.payload;
        const payload = yield call(API.updateSupplier, id, value)
        yield put({
            type: Action.UPDATE_SUPPLIER_SUCCESS,
            payload
        })
        if (action.onSuccess) {
            action.onSuccess();
        }
    }
    catch (error) {
        yield put({
            type: Action.SUPPLIER_ERROR,
            error
        })
    }
}

function* deleteSupplierGenerator(action) {
    try {
        const id = action.payload
        yield call(API.deleteSupplier, id);
        if (action.onSuccess) {
            action.onSuccess();
        }
    }
    catch (error) {
        yield put({
            type: Action.SUPPLIER_ERROR,
            error
        })
    }
}

export const SupplierSagas = [
    takeEvery(Action.USER_FETCH_ALL_SUPPLIER, fetchAllSuppliersGenerator),
    takeEvery(Action.USER_FETCH_SUPPLIER, fetchSupplierGenerator),
    takeEvery(Action.USER_ADD_SUPPLIER, addSupplierGenerator),
    takeEvery(Action.USER_UPDATE_SUPPLIER, updateSupplierGenerator),
    takeEvery(Action.USER_DELETE_SUPPLIER, deleteSupplierGenerator),
];