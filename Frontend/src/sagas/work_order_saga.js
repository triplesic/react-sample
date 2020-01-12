import { put, takeEvery, call } from 'redux-saga/effects';
import "regenerator-runtime/runtime";
import * as API from './api';
import * as Action from '../actions/ActionTypes'
import * as Constants from '../helpers/util/constant'
import { fetchEngineerOrder, updateEngineerOrder, fetchEngineerQACollab } from './api';

function* fetchAllWorkOrders() {
    try {
        const payload = yield call(API.fetchAllWorkOrders)
        yield put({
            type: Action.FETCH_ALL_WORK_ORDER_SUCCESS,
            payload
        })
    } catch (error) {
        console.log(error)
    }
}
function* fetchWorkOrderGenerator(action) {
    try {
        const workOrder = yield call(API.fetchWorkOrder, action.payload)
        yield put({
            type: Action.FETCH_WORK_ORDER_SUCCESS,
            payload: workOrder
        })
        yield put({
            type: Action.USER_FETCH_ORDER,
            payload: workOrder.data.obj.orderId
        })
    }
    catch (error) {
        yield put({
            type: Action.WORK_ORDER_ERROR,
            error
        })
    }
}
function* generateNextWorkflowStep(value) {
    try {
        if (value.workOrderTypeId === Constants.WORK_ORDER_TYPE_NEW
            || value.workOrderTypeId === Constants.WORK_ORDER_TYPE_REPEATE
            || value.workOrderTypeId === Constants.WORK_ORDER_TYPE_STOCK
            || value.workOrderTypeId === Constants.WORK_ORDER_TYPE_MODIFY) {
            yield put({
                type: Action.FETCH_ENGENEER_ORDER_NOP_SUCCESS
            })
            yield put({
                type: Action.FETCH_PRODUCTION_ORDER_NOP_SUCCESS
            })
            yield put({
                type: Action.FETCH_DELIVERY_ORDER_NOP_SUCCESS
            })
        }
    } catch (error) {
        console.log(error)
    }
}

function* updateWorkOrderGenerator(action) {
    const { id, value } = action.payload
    let isSuccess = true;
    try {
        const payload = yield call(API.updateWorkOrder, id, value)
        yield put({
            type: Action.UPDATE_WORK_ORDER_SUCCESS,
            payload
        })
    }
    catch (error) {
        isSuccess = false
        const errorPayload = { responseMsg: error.response.data.message, responseCode: error.response.status }
        action.onSuccess();
        yield put({
            type: Action.WORK_ORDER_ERROR,
            payload: errorPayload
        })
    }
    if (isSuccess && action.onSuccess) {
        action.onSuccess();
        // yield call(generateNextWorkflowStep, value)
    }
}

function* fetchEngineerOrderGenerator(action) {
    try {
        const payload = yield call(API.fetchEngineerOrder, action.payload);
        if (payload.data.obj === null) {
            yield put({
                type: Action.FETCH_ENGENEER_ORDER_NOP_SUCCESS
            })
        }
        else {
            yield put({
                type: Action.FETCH_ENGINEER_ORDER_SUCCESS,
                payload
            })
        }
    }
    catch (error) {
        yield put({
            type: Action.ENGINEER_ORDER_ERROR,
            error
        })
    }
}

function* fetchEngineerOrderAllInfoGenerator(action) {
    try {
        const engineerOrder = yield call(API.fetchEngineerOrder, action.payload);
        yield put({
            type: Action.FETCH_ENGINEER_ORDER_SUCCESS,
            payload: engineerOrder
        })
        const workOrder = yield call(API.fetchWorkOrder, engineerOrder.data.obj.workOrderId)
        yield put({
            type: Action.FETCH_WORK_ORDER_SUCCESS,
            payload: workOrder
        })
        yield put({
            type: Action.USER_FETCH_ORDER,
            payload: workOrder.data.obj.orderId
        })
    } catch (error) {
        yield put({
            type: Action.ENGINEER_ORDER_ERROR,
            error
        })
    }
}

function* fetchProductionOrderAllInfoGenerator(action) {
    try {
        const productionOrder = yield call(API.fetchProductionOrder, action.payload);
        yield put({
            type: Action.FETCH_PRODUCTION_ORDER_SUCCESS,
            payload: productionOrder
        })
        const workOrder = yield call(API.fetchWorkOrder, productionOrder.data.obj.workOrderId)
        yield put({
            type: Action.FETCH_WORK_ORDER_SUCCESS,
            payload: workOrder
        })
        yield put({
            type: Action.USER_FETCH_ORDER,
            payload: workOrder.data.obj.orderId
        })
    } catch (error) {
        yield put({
            type: Action.ENGINEER_ORDER_ERROR,
            error
        })
    }
}

function* updateEngineerOrderGenerator(action) {
    try {
        const { workOrderId, value } = action.payload
        const payload = yield call(API.updateEngineerOrder, workOrderId, value)
        yield put({
            type: Action.UPDATE_ENGINEER_ORDER_SUCCESS,
            payload
        })
        if (action.onSuccess) {
            action.onSuccess();
        }
    } catch (error) {
        console.log(error)
    }
}

function* fetchProductionOrderGenerator(action) {
    try {
        const payload = yield call(API.fetchProductionOrder, action.payload);
        if (payload.data.obj === null) {
            yield put({
                type: Action.FETCH_PRODUCTION_ORDER_NOP_SUCCESS
            })
        }
        else {
            yield put({
                type: Action.FETCH_PRODUCTION_ORDER_SUCCESS,
                payload
            })
        }
    }
    catch (error) {
        yield put({
            type: Action.PRODUCTION_ORDER_ERROR,
            error
        })
    }
}

function* updateProductionOrderGenerator(action) {
    try {
        const { workOrderId, value } = action.payload
        const payload = yield call(API.updateProductionOrder, workOrderId, value)
        yield put({
            type: Action.UPDATE_PRODUCTION_ORDER_SUCCESS,
            payload
        })
        if (action.onSuccess) {
            action.onSuccess()
        }
    } catch (error) {
        console.log(error)
    }
}

function* fetchDeliveryOrderGenerator(action) {
    try {
        const payload = yield call(API.fetchDeliveryOrder, action.payload);
        if (payload.data.obj === null) {
            yield put({
                type: Action.FETCH_DELIVERY_ORDER_NOP_SUCCESS
            })
        }
        else {
            yield put({
                type: Action.FETCH_DELIVERY_ORDER_SUCCESS,
                payload
            })
        }
    }
    catch (error) {
        yield put({
            type: Action.DELIVERY_ORDER_ERROR,
            error
        })
    }
}

function* updateDeliveryOrderGenerator(action) {
    try {
        const { workOrderId, value } = action.payload
        const payload = yield call(API.updateDeliveryOrder, workOrderId, value)
        yield put({
            type: Action.UPDATE_DELIVERY_ORDER_SUCCESS,
            payload
        })
        if (action.onSuccess) {
            action.onSuccess();
        }
    } catch (error) {
        console.log(error)
    }
}

function* fetchEngineerQACollabGenerator(action) {
    try {
        const payload = yield call(API.fetchEngineerQACollab, action.payload)
        yield put({
            type: Action.FETCH_ENGINEER_ORDER_QA_COLLAB_SUCCESS,
            payload
        })
    } catch (error) {
        console.log(error)
    }
}

function* fetchProductionQACollabGenerator(action) {
    try {
        const payload = yield call(API.fetchProductionQACollab, action.payload)
        yield put({
            type: Action.FETCH_PRODUCTION_ORDER_QA_COLLAB_SUCCESS,
            payload
        })
    } catch (error) {
        console.log(error)
    }
}

function* fetchWorkOrderTypeGenerator() {
    try {
        const payload = yield call(API.fetchAllWorkOrderType)
        yield put({
            type: Action.FETCH_ALL_WORK_ORDER_TYPE_SUCCESS,
            payload
        });
    } catch (error) {
        console.log(error)
    }
}

function* fetchWorkOrderDrawingGenerator(action) {
    try {
        const payload = yield call(API.fetchAllWorkOrderDrawing, action.payload)
        yield put({
            type: Action.FETCH_ALL_WORK_ORDER_DRAWING_SUCCESS,
            payload
        })
    } catch (error) {
        console.log(error)
    }
}

export const WorkOrderFamilySagas = [
    takeEvery(Action.USER_FETCH_ALL_WORK_ORDER_TYPE, fetchWorkOrderTypeGenerator),
    takeEvery(Action.USER_FETCH_WORK_ORDER, fetchWorkOrderGenerator),
    takeEvery(Action.USER_UPDATE_WORK_ORDER, updateWorkOrderGenerator),
    takeEvery(Action.USER_FETCH_ENGINEER_ORDER, fetchEngineerOrderGenerator),
    takeEvery(Action.USER_UPDATE_ENGINEER_ORDER, updateEngineerOrderGenerator),
    takeEvery(Action.USER_FETCH_PRODUCTION_ORDER, fetchProductionOrderGenerator),
    takeEvery(Action.USER_UPDATE_PRODUCTION_ORDER, updateProductionOrderGenerator),
    takeEvery(Action.USER_FETCH_DELIVERY_ORDER, fetchDeliveryOrderGenerator),
    takeEvery(Action.USER_UPDATE_DELIVERY_ORDER, updateDeliveryOrderGenerator),
    takeEvery(Action.USER_FETCH_ENGINEER_ORDER_QA_COLLAB, fetchEngineerQACollabGenerator),
    takeEvery(Action.USER_FETCH_PRODUCTION_ORDER_QA_COLLAB, fetchProductionQACollabGenerator),
    takeEvery(Action.USER_FETCH_ALL_WORK_ORDER_DRAWING, fetchWorkOrderDrawingGenerator),
    takeEvery(Action.USER_FETCH_ENGINEER_ORDER_ALL_INFO, fetchEngineerOrderAllInfoGenerator),
    takeEvery(Action.USER_FETCH_PRODUCTION_ORDER_ALL_INFO, fetchProductionOrderAllInfoGenerator),
    takeEvery(Action.USER_FETCH_ALL_WORK_ORDERS, fetchAllWorkOrders)
];