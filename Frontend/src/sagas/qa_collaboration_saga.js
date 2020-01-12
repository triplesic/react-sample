import { put, takeEvery, call } from 'redux-saga/effects';
import history from '../history'
import "regenerator-runtime/runtime";
import * as API from './api';
import * as Action from '../actions/ActionTypes'

// import { fetchEngineerOrder, updateEngineerOrder, fetchEngineerQACollab } from './api';
function* addHandworkEngineerQACollaborationGenerator(action) {
    try {
        const payload = yield call(API.addHandworkEngineerQACollaboration, action.payload)
        yield put({
            type: Action.ADD_HANDWORK_ENGINEERING_QA_COLLABORATION_SUCCESS,
            payload
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield put({ type: Action.HIDE_SNACKBAR_MESSAGE })
        yield call(history.push, '/qc/engineer/handwork/' + payload.data.obj.workOrderId + '/' + payload.data.obj.id)
    } catch (error) {
        yield put({
            type: Action.ADD_HANDWORK_ENGINEERING_QA_COLLABORATION_FAILED,
            error
        })
    }
}


function* addHandworkProductionQACollaborationGenerator(action) {
    try {
        const payload = yield call(API.addHandworkProductionQACollaboration, action.payload)
        yield put({
            type: Action.ADD_HANDWORK_PRODUCTION_QA_COLLABORATION_SUCCESS,
            payload
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield put({ type: Action.HIDE_SNACKBAR_MESSAGE })
        yield call(history.push, '/qc/production/handwork/' + payload.data.obj.workOrderId + '/' + payload.data.obj.id)
    } catch (error) {
        yield put({
            type: Action.ADD_HANDWORK_PRODUCTION_QA_COLLABORATION_FAILED,
            error
        })
    }
}

function* addCNCEngineeringQACollaborationGenerator(action) {
    try {
        const payload = yield call(API.addCNCEngineerQACollaboration, action.payload)
        yield put({
            type: Action.ADD_CNC_ENGINEERING_QA_COLLABORATION_SUCCESS,
            payload
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield put({ type: Action.HIDE_SNACKBAR_MESSAGE })
        yield call(history.push, '/qc/engineer/cnc/' + payload.data.obj.workOrderId + '/' + payload.data.obj.id)
    } catch (error) {
        yield put({
            type: Action.ADD_CNC_ENGINEERING_QA_COLLABORATION_FAILED,
            error
        })
    }
}

function* addCNCProductionQACollaborationGenerator(action) {
    try {
        const payload = yield call(API.addCNCProductionQACollaboration, action.payload)
        yield put({
            type: Action.ADD_CNC_PRODUCTION_QA_COLLABORATION_SUCCESS,
            payload
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield put({ type: Action.HIDE_SNACKBAR_MESSAGE })
        yield call(history.push, '/qc/production/cnc/' + payload.data.obj.workOrderId + '/' + payload.data.obj.id)
    } catch (error) {
        yield put({
            type: Action.ADD_CNC_PRODUCTION_QA_COLLABORATION_FAILED,
            error
        })
    }
}


function* addDailyEngineerQACollaborationGenerator(action) {
    try {
        const payload = yield call(API.addDailyEngineerQACollaboration, action.payload)
        yield put({
            type: Action.ADD_DAILY_ENGINEERING_QA_COLLABORATION_SUCCESS,
            payload
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield put({ type: Action.HIDE_SNACKBAR_MESSAGE })
        yield call(history.push, '/qc/engineer/daily/' + payload.data.obj.workOrderId + '/' + payload.data.obj.id)
    } catch (error) {
        yield put({
            type: Action.ADD_DAILY_ENGINEERING_QA_COLLABORATION_FAILED,
            payload
        })
    }
}


function* addDailyProductionQACollaborationGenerator(action) {
    try {
        const payload = yield call(API.addDailyProductionQACollaboration, action.payload)
        yield put({
            type: Action.ADD_DAILY_PRODUCTION_QA_COLLABORATION_SUCCESS,
            payload
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield put({ type: Action.HIDE_SNACKBAR_MESSAGE })
        yield call(history.push, '/qc/production/daily/' + payload.data.obj.workOrderId + '/' + payload.data.obj.id)
    } catch (error) {
        yield put({
            type: Action.ADD_DAILY_PRODUCTION_QA_COLLABORATION_FAILED,
            payload
        })
    }
}

function* fetchEngineerQACollaborationInfoGenerator(action) {
    try {
        const payload = yield call(API.fetchEngineerQACollaborationInfo, action.payload)
        yield put({
            type: Action.FETCH_ENG_QA_COLLAB_SUCCESS,
            payload: payload
        })
    } catch (error) {
        yield put({
            type: Action.FETCH_ENG_QA_COLLAB_FAILED,
            error
        })
    }
}

function* fetchAllQCByWorkOrderGenerator(action) {
    try {
        const payload = yield call(API.fetchAllQCByWorkOrder, action.payload)
        yield put({
            type: Action.FETCH_ALL_QC_BY_WORK_ORDER_SUCCESS,
            payload: payload
        })
    } catch (error) {
        yield put({
            type: Action.FETCH_ALL_QC_BY_WORK_ORDER_FAILED,
            error
        })
    }
}

function* fetchProductionQACollaborationInfoGenerator(action) {
    try {
        const payload = yield call(API.fetchProductionQACollaborationInfo, action.payload)
        yield put({
            type: Action.FETCH_PROD_QA_COLLAB_SUCCESS,
            payload
        })
    } catch (error) {
        yield put({
            type: Action.FETCH_PROD_QA_COLLAB_FAILED,
            error
        })
    }
}

function* uploadNewEngineerQCImageGenerator(action) {
    try {
        const payload = yield call(API.uploadNewEngineerQCImage, action.payload)
        yield put({
            type: Action.UPLOAD_NEW_ENG_QC_IMAGE_SUCCESS,
            payload
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield put({ type: Action.HIDE_SNACKBAR_MESSAGE })

    } catch (error) {
        yield put({
            type: Action.UPLOAD_NEW_ENG_QC_IMAGE_FAILED
        })
    }
}

function* uploadNewProductionQCImageGeneration(action) {
    try {
        const payload = yield call(API.uploadNewProductionQCImage, action.payload)
        yield put({
            type: Action.UPLOAD_NEW_PROD_QC_IMAGE_SUCCESS,
            payload
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield put({ type: Action.HIDE_SNACKBAR_MESSAGE })
    } catch (error) {
        yield put({
            type: Action.UPLOAD_NEW_PROD_QC_IMAGE_FAILED
        })
    }
}

function* deleteEngineerQCImageGenerator(action) {
    try {
        const payload = yield call(API.deleteEngineerQCImage, action.payload)
        yield put({
            type: Action.DELETE_ENG_QC_IMAGE_SUCCESS,
            payload
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield put({ type: Action.HIDE_SNACKBAR_MESSAGE })
    } catch (error) {
        yield put({
            type: Action.DELETE_ENG_QC_IMAGE_FAILED
        })
    }
}

function* deleteProductionQCImageGenerator(action) {
    try {
        const payload = yield call(API.deleteProductionQCImage, action.payload)
        yield put({
            type: Action.DELETE_PROD_QC_IMAGE_SUCCESS,
            payload
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield put({ type: Action.HIDE_SNACKBAR_MESSAGE })
    } catch (error) {
        yield put({
            type: Action.DELETE_PROD_QC_IMAGE_FAILED
        })
    }
}

function* updateCNCEngineerQACollaborationGenerator(action) {
    try {
        const payload = yield call(API.updateCNCEngineerQACollaboration, action.payload)
        yield put({
            type: Action.UPDATE_CNC_ENGINEERING_QA_COLLABORATION_SUCCESS,
            payload
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield put({ type: Action.HIDE_SNACKBAR_MESSAGE })
    } catch (error) {
        yield put({
            type: Action.UPDATE_CNC_ENGINEERING_QA_COLLABORATION_FAILED
        })
    }
}

function* updateCNCProductionQACollaborationGenerator(action) {
    try {
        const payload = yield call(API.updateCNCProductionQACollaboration, action.payload)
        yield put({
            type: Action.UPDATE_CNC_PRODUCTION_QA_COLLABORATION_SUCCESS,
            payload
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield put({ type: Action.HIDE_SNACKBAR_MESSAGE })
    } catch (error) {
        yield put({
            type: Action.UPDATE_CNC_PRODUCTION_QA_COLLABORATION_FAILED
        })
    }
}

function* updateHandworkEngineerQACollaborationGenerator(action) {
    try {
        const payload = yield call(API.updateHandworkEngineerQACollaboration, action.payload)
        yield put({
            type: Action.UPDATE_HANDWORK_ENGINEERING_QA_COLLABORATION_SUCCESS,
            payload
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield put({ type: Action.HIDE_SNACKBAR_MESSAGE })
    } catch (error) {
        yield put({
            type: Action.UPDATE_HANDWORK_ENGINEERING_QA_COLLABORATION_FAILED
        })
    }
}

function* updateHandworkProductionQACollaborationGenerator(action) {
    try {
        const payload = yield call(API.updateHandworkProductionQACollaboration, action.payload)
        yield put({
            type: Action.UPDATE_HANDWORK_PRODUCTION_QA_COLLABORATION_SUCCESS,
            payload
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield put({ type: Action.HIDE_SNACKBAR_MESSAGE })
    } catch (error) {
        yield put({
            type: Action.UPDATE_HANDWORK_PRODUCTION_QA_COLLABORATION_FAILED,
            error
        })
    }
}

function* updateDailyEngineerQACollaborationGenerator(action) {
    try {
        const payload = yield call(API.updateDailyEngineerQACollaboration, action.payload)
        yield put({
            type: Action.UPDATE_DAILY_ENGINEERING_QA_COLLABORATION_SUCCESS,
            payload
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield put({ type: Action.HIDE_SNACKBAR_MESSAGE })
    } catch (error) {
        yield put({
            type: Action.UPDATE_DAILY_ENGINEERING_QA_COLLABORATION_FAILED,
            payload
        })
    }
}

function* updateDailyProductionQACollaborationGenerator(action) {
    try {
        const payload = yield call(API.updateDailyProductionQACollaboration, action.payload)
        yield put({
            type: Action.UPDATE_DAILY_PRODUCTION_QA_COLLABORATION_SUCCESS,
            payload
        })
        yield put({
            type: Action.SHOW_SNACKBAR_MESSAGE,
            payload: payload.data.message
        })
        yield put({ type: Action.HIDE_SNACKBAR_MESSAGE })
    } catch (error) {
        yield put({
            type: Action.UPDATE_DAILY_PRODUCTION_QA_COLLABORATION_FAILED,
            payload
        })
    }
}

export const QACollaborationSagas = [
    takeEvery(Action.USER_ADD_CNC_ENGINEERING_QA_COLLABORATION, addCNCEngineeringQACollaborationGenerator)
    , takeEvery(Action.USER_FETCH_ENG_QA_COLLAB, fetchEngineerQACollaborationInfoGenerator)
    , takeEvery(Action.USER_UPLOAD_NEW_ENG_QC_IMAGE, uploadNewEngineerQCImageGenerator)
    , takeEvery(Action.USER_DELETE_ENG_QC_IMAGE, deleteEngineerQCImageGenerator)
    , takeEvery(Action.USER_UPDATE_CNC_ENGINEERING_QA_COLLABORATION, updateCNCEngineerQACollaborationGenerator)
    , takeEvery(Action.USER_ADD_CNC_PRODUCTION_QA_COLLABORATION, addCNCProductionQACollaborationGenerator)
    , takeEvery(Action.USER_UPLOAD_NEW_PROD_QC_IMAGE, uploadNewProductionQCImageGeneration)
    , takeEvery(Action.USER_DELETE_PROD_QC_IMAGE, deleteProductionQCImageGenerator)
    , takeEvery(Action.USER_FETCH_PROD_QA_COLLAB, fetchProductionQACollaborationInfoGenerator)
    , takeEvery(Action.USER_UPDATE_CNC_PRODUCTION_QA_COLLABORATION, updateCNCProductionQACollaborationGenerator)
    , takeEvery(Action.USER_ADD_HANDWORK_ENGINEERING_QA_COLLABORATION, addHandworkEngineerQACollaborationGenerator)
    , takeEvery(Action.USER_UPDATE_HANDWORK_ENGINEERING_QA_COLLABORATION, updateHandworkEngineerQACollaborationGenerator)
    , takeEvery(Action.USER_ADD_HANDWORK_PRODUCTION_QA_COLLABORATION, addHandworkProductionQACollaborationGenerator)
    , takeEvery(Action.USER_UPDATE_HANDWORK_PRODUCTION_QA_COLLABORATION, updateHandworkProductionQACollaborationGenerator)
    , takeEvery(Action.USER_ADD_DAILY_ENGINEERING_QA_COLLABORATION, addDailyEngineerQACollaborationGenerator)
    , takeEvery(Action.USER_UPDATE_DAILY_ENGINEERING_QA_COLLABORATION, updateDailyEngineerQACollaborationGenerator)
    , takeEvery(Action.USER_ADD_DAILY_PRODUCTION_QA_COLLABORATION, addDailyProductionQACollaborationGenerator)
    , takeEvery(Action.USER_UPDATE_DAILY_PRODUCTION_QA_COLLABORATION, updateDailyProductionQACollaborationGenerator)
    , takeEvery(Action.USER_FETCH_ALL_QC_BY_WORK_ORDER, fetchAllQCByWorkOrderGenerator)
]