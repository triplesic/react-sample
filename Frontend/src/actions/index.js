import axios from 'axios';
import * as ActionTypes from './ActionTypes';
import _ from 'lodash';
import Promise from 'Bluebird'
import update from 'immutability-helper'

export const ROOT_URL = Config.rootApiUrl

export function addItemToBucket(itemId, quantity, item) {
    return {
        type: ActionTypes.ADD_ITEM_BUCKET,
        payload: { itemId: itemId, quantity: quantity, item: item }
    }
}

export function removeItemToBucket(itemId, quantity) {
    return {
        type: ActionTypes.REMOVE_ITEM_BUCKET,
        payload: { itemId: itemId, quantity: quantity }
    }
}

export function clearItemInBucket() {
    return {
        type: ActionTypes.CLEAR_ALL_ITEM_BUCKET
    }
}

export function getAllItemInBucket() {
    return {
        type: ActionTypes.GET_ALL_ITEM_BUCKET
    }
}

export function fetchAllCustomers() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.GETTING_ALL_CUSTOMERS
        })
        fetchAllCustomerInfo()
            .then(res => {
                dispatch({
                    type: ActionTypes.FULLFIELD_ALL_CUSTOMERS,
                    payload: res.data
                })
            })
    }
}

export function fetchAllOrders() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.GETTING_ALL_ORDERS
        })
        axios.get(`${ROOT_URL}/api/order`)
            .then(res => {
                dispatch({
                    type: ActionTypes.FULLFIELD_ALL_ORDERS,
                    payload: res.data
                })
            })
    }
}

function fetchCustomers() {
    return axios.get(`${ROOT_URL}/api/customers`)
}
function fetchCustomerStatusById(statusId) {
    return axios.get(`${ROOT_URL}/api/customerStatus/` + statusId)
}

function fetchCustomerTypeById(typeId) {
    return axios.get(`${ROOT_URL}/api/customerType/` + typeId)
}

function fetchAllCustomerStatusInfo() {
    return axios.get(`${ROOT_URL}/api/customerStatus`)
}

function fetchAllCustomerTypesInfo() {
    return axios.get(`${ROOT_URL}/api/customerType`)
}

function fetchAllCustomerInfo() {
    return fetchCustomers()
        .then(
            res => {
                res.data.map(cust => {
                    cust.type = _.isEmpty(cust.customerType) ? '-' : cust.customerType.name
                    cust.status = _.isEmpty(cust.customerStatus) ? '-' : cust.customerStatus.name
                })
                return res
            },
            err => {
            })
}

export function fetchAllCustomerTypes() {
    return (dispatch) => fetchAllCustomerTypesInfo().then(res => {
        dispatch(
            {
                type: ActionTypes.FULLFIELD_ALL_CUSTOMER_TYPES,
                payload: res.data
            }
        )
    })
}

export function fetchAllCustomerStatus() {
    return (dispatch) => fetchAllCustomerStatusInfo().then(res => {
        dispatch(
            {
                type: ActionTypes.FULLFIELD_ALL_CUSTOMER_STATUS,
                payload: res.data
            }
        )
    })
}

export function fetchAllInventoryType() {
    return (dispatch) => axios.get(`${ROOT_URL}/api/inventoryType`).then(
        res => {
            dispatch(
                {
                    type: ActionTypes.FULLFIELD_ALL_INVENTORY_TYPES,
                    payload: res.data
                }
            )
        }
    )
}

export function fetchAllCategory() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.GETTING_ALL_CATEGORY
        })
        axios.get(`${ROOT_URL}/api/category`)
            .then(res => {
                res.data.map(cat => {
                    cat.inventoryType = _.isEmpty(cat.inventoryType) ? '-' : cat.inventoryType.name
                })
                return res
            })
            .then(res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_ALL_CATEGORY,
                        payload: res.data
                    }
                )
                return res
            })
    }
}

export function fetchAllMachineCategory() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.GETTING_ALL_CATEGORY
        })
        axios.get(`${ROOT_URL}/api/category/machine`)
            .then(res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_ALL_CATEGORY,
                        payload: res.data
                    }
                )
                return res
            })
    }
}

export function fetchAllMaterialCategory() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.GETTING_ALL_CATEGORY
        })
        axios.get(`${ROOT_URL}/api/category/material`)
            .then(res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_ALL_CATEGORY,
                        payload: res.data
                    }
                )
                return res
            })
    }
}

export function fetchAllToolCategory() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.GETTING_ALL_CATEGORY
        })
        axios.get(`${ROOT_URL}/api/category/tool`)
            .then(res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_ALL_CATEGORY,
                        payload: res.data
                    }
                )
                return res
            })
    }
}

export function fetchAllProductCategory() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.GETTING_ALL_CATEGORY
        })
        axios.get(`${ROOT_URL}/api/category/product`)
            .then(res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_ALL_CATEGORY,
                        payload: res.data
                    }
                )
                return res
            })
    }
}

export function fetchAllInventory() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.GETTING_ALL_INVENTORY
        })
        axios.get(`${ROOT_URL}/api/inventory`)
            .then(res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_ALL_INVENTORIES,
                        payload: res.data
                    }
                )
                return res
            })
    }
}

export function fetchAllMaterialInventory() {
    return (dispatch) => {
        dispatch({ type: ActionTypes.GETTING_ALL_INVENTORY })
        axios.get(`${ROOT_URL}/api/inventory/material`)
            .then(res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_ALL_MATERIAL_INVENTORIES,
                        payload: res.data.obj
                    }
                )
            })
    }

}

export function fetchAllDepartments() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.GETTING_ALL_DEPARTMENTS
        })
        axios.get(`${ROOT_URL}/api/department`)
            .then(res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_ALL_DEPARTMENTS,
                        payload: res.data
                    }
                )
                return res
            })
    }
}

export function fetchAllMachine() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.GETTING_ALL_MACHINES
        })
        axios.get(`${ROOT_URL}/api/machine`)
            .then(res => {
                dispatch({
                    type: ActionTypes.FULLFIELD_ALL_MACHINES,
                    payload: res.data
                })
                return res
            })
    }
}

export function fetchAllProduct() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.GETTING_ALL_PRODUCTS
        })
        axios.get(`${ROOT_URL}/api/product`)
            .then(res => {
                dispatch({
                    type: ActionTypes.FULLFIELD_ALL_PRODUCTS,
                    payload: res.data
                })
                return res
            })
    }
}

export function getCustomerDetail(customerId) {
    return (dispatch) => axios.get(`${ROOT_URL}/api/customers/${customerId}`)
        .then(
            res => {
                dispatch({
                    type: ActionTypes.FULLFIELD_CUSTOMER_DETAIL,
                    payload: res.data.obj
                })
                return res
            })
}

export function getCategoryDetail(categoryId) {
    return (dispatch) => axios.get(`${ROOT_URL}/api/category/${categoryId}`)
        .then(
            res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_CATEGORY_DETAIL,
                        payload: res.data.obj
                    }
                )
                return res
            }
        )
}

export function getInventoryDetail(inventoryId) {
    return (dispatch) => axios.get(`${ROOT_URL}/api/inventory/${inventoryId}`)
        .then(
            res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_INVENTORY_DETAIL,
                        payload: res.data.obj
                    }
                )
                return res
            }
        )
}

export function getNextInventoryNo(inventoryType) {
    return (dispatch) => axios.get(`${ROOT_URL}/api/inventory/nextInventoryNo/${inventoryType}`)
        .then(
            res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_NEXT_INVENTORY_NO,
                        payload: res.data.obj
                    }
                )
                return res
            }
        )
}

export function getMachineMaintenanceRecord(machineId) {
    return (dispatch) => axios.get(`${ROOT_URL}/api/machine/${machineId}/maintenance`)
        .then(
            res => {
                dispatch({
                    type: ActionTypes.FULLFIELD_MACHINE_MAINTENANCE_RECORD,
                    payload: res.data.obj
                })
            }
        )
}

export function getDepartmentDetail(departmentId) {
    return (dispatch) => axios.get(`${ROOT_URL}/api/department/${departmentId}`)
        .then(
            res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_DEPARTMENT_DETAIL,
                        payload: res.data.obj
                    })
                return res
            })
}

export function getProductDetail(productId) {
    return (dispatch) => axios.get(`${ROOT_URL}/api/product/${productId}`)
        .then(
            res => {
                dispatch({
                    type: ActionTypes.FULLFIELD_PRODUCT_DETAIL,
                    payload: res.data.obj
                })
                return res
            })
}

export function getOrderDetail(orderId) {
    return (dispatch) => axios.get(`${ROOT_URL}/api/order/${orderId}`)
        .then(
            res => {
                dispatch({
                    type: ActionTypes.FULLFIELD_ORDER_DETAIL,
                    payload: res.data.obj
                })
            }
        )
}

export function getNextOrderNo() {
    return (dispatch) => axios.get(`${ROOT_URL}/api/order/nextOrderNo`)
        .then(
            res => {
                dispatch({
                    type: ActionTypes.GET_NEXT_ORDER_NO,
                    payload: res.data.obj
                })
            })
}

export function getOrderDetailProductList(orderId) {
    return (dispatch) => axios.get(`${ROOT_URL}/api/order/${orderId}/detail`)
        .then(res => {

            res.data.obj.map(orderProd => {
                orderProd.total = orderProd.quantity * orderProd.unitPrice
            })

            dispatch({
                type: ActionTypes.FULLFIELD_ORDER_PRODUCT_LIST,
                payload: res.data.obj
            })
        })
}

export function findMaintenanceRecordDetail(inventoryId, maintenanceRecordId) {
    return (dispatch) => axios.get(`${ROOT_URL}/api/machine/${inventoryId}/maintenance/${maintenanceRecordId}`)
        .then(
            res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_MACHINE_MAINTENANCE_RECORD_DETAIL,
                        payload: res.data.obj
                    }
                )
                return res
            }
        )
}

export function getDrawingRevisionByProductId(productId) {
    return (dispatch) => axios.get(`${ROOT_URL}/api/drawingRevision/${productId}`)
        .then(
            res => {
                dispatch({
                    type: ActionTypes.FULLFIELD_DRAWING_REVISION,
                    payload: res.data.obj
                })
            }
        )
}

export function fetchInventoryTransactionByInventId(inventoryId) {
    return (dispatch) => axios.get(`${ROOT_URL}/api/inventory/transaction/${inventoryId}`)
        .then(
            res => {
                dispatch({
                    type: ActionTypes.FULLFIELD_INVENTORY_TRANSACTION,
                    payload: res.data.obj
                })
                return res
            })
}

export function getAllBanks() {
    return (dispatch) => axios.get(`${ROOT_URL}/api/bank`)
        .then(
            res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_ALL_BANKS,
                        payload: res.data
                    }
                )
            }
        )
}

export function getAllUnitTypes() {
    return (dispatch) => axios.get(`${ROOT_URL}/api/unitType`)
        .then(res => {
            dispatch({
                type: ActionTypes.FULLFIELD_ALL_UNIT_TYPES,
                payload: res.data
            })
        })
}


export function updateCustomer(customer, id) {
    return (dispatch) => axios.put(`${ROOT_URL}/api/customers/${id}`, customer)
        .then(
            res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_CUSTOMER_DETAIL,
                        payload: res.data.obj
                    }
                )
                return res
            }
        )
}

export function updateCategory(category, id) {
    return (dispatch) => axios.put(`${ROOT_URL}/api/category/${id}`, category)
        .then(
            res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_CATEGORY_DETAIL,
                        payload: res.data.obj
                    }
                )
                return res
            })
}

export function updateInventory(inventory, id) {
    return (dispatch) => axios.put(`${ROOT_URL}/api/inventory/${id}`, inventory)
        .then(
            res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_INVENTORY_DETAIL,
                        payload: res.data.obj
                    }
                )
                return res
            })
}

export function updateDepartment(department, id) {
    return (dispatch) => axios.put(`${ROOT_URL}/api/department/${id}`, department)
        .then(
            res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_DEPARTMENT_DETAIL,
                        payload: res.data.obj
                    }
                )
                return res
            })
}

export function updateMachineMaintenanceRecordDetail(id, maintenanceRecordDetail) {
    return (dispatch) => axios.put(`${ROOT_URL}/api/machine/maintenance/${id}`, maintenanceRecordDetail)
        .then(
            res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_MACHINE_MAINTENANCE_RECORD_DETAIL,
                        payload: res.data.obj
                    }
                )
                return res
            }
        )
}

export function updateProductDetail(id, productDetail) {
    return (dispatch) => axios.put(`${ROOT_URL}/api/product/${id}`, productDetail)
        .then(
            res => {
                dispatch({
                    type: ActionTypes.FULLFIELD_PRODUCT_DETAIL,
                    payload: res.data.obj
                })
                return res
            })
}

export function updateOrderDetail(orderId, orderDetail) {
    return (dispatch) => axios.put(`${ROOT_URL}/api/order/${orderId}`, orderDetail)
        .then(
            res => {
                dispatch({
                    type: ActionTypes.FULLFIELD_ORDER_DETAIL,
                    payload: res.data.obj
                })
                return res
            })
}

export function confirmOrderDetail(orderDetail) {
    return (dispatch) => axios.post(`${ROOT_URL}/api/order/confirmOrder`, orderDetail)
}

export function uploadNew3dDrawingRevision(id, data) {
    return (dispatch) => axios.post(`${ROOT_URL}/api/drawingRevision/${id}/3d`, data)
}

export function upload3dDrawingRevision(id, data) {
    return (dispatch) => axios.put(`${ROOT_URL}/api/drawingRevision/${id}/3d`, data)
}

export function upload2dDrawingRevision(id, data) {
    return (dispatch) => axios.put(`${ROOT_URL}/api/drawingRevision/${id}/2d`, data)
}

export function uploadActualImgDrawingRevision(id, data) {
    return (dispatch) => axios.put(`${ROOT_URL}/api/drawingRevision/${id}/actualImage`, data)
}

export function generateOrderQuotation(orderId) {
    return (dispatch) => axios.post(`${ROOT_URL}/api/order/${orderId}/quotation`)
}

export function deleteCategory(id) {
    return (dispatch) => axios.delete(`${ROOT_URL}/api/category/${id}`)
}

export function deleteCustomer(id) {
    return (dispatch) => axios.delete(`${ROOT_URL}/api/customers/${id}`)
}

export function deleteDepartment(id) {
    return (dispatch) => axios.delete(`${ROOT_URL}/api/department/${id}`)
}

export function deleteOrderDetail(orderId, orderDetailId) {
    return (dispatch) => axios.delete(`${ROOT_URL}/api/order/${orderId}/detail/${orderDetailId}`)
}

export function addCustomer(customer) {
    let addCustomerData = update(customer, { id: { $set: null } })
    return (dispatch) => axios.post(`${ROOT_URL}/api/customers`, addCustomerData)
        .then(
            res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_CUSTOMER_DETAIL,
                        payload: res.data.obj
                    }
                )
                return res
            }
        )
}

export function addCategory(category) {
    let addCategoryData = update(category, { id: { $set: null } })
    return (dispatch) => axios.post(`${ROOT_URL}/api/category`, addCategoryData)
        .then(
            res => {
                dispatch(
                    {
                        type: ActionTypes.FULLFIELD_CATEGORY_DETAIL,
                        payload: res.data.obj
                    }
                )
                return res
            }
        )
}

export function addInventory(inventory) {
    let addInventoryData = update(inventory, { id: { $set: null } })
    return (dispatch) => axios.post(`${ROOT_URL}/api/inventory`, addInventoryData)
        .then(
            res => {
                dispatch({
                    type: ActionTypes.FULLFIELD_INVENTORY_DETAIL,
                    payload: res.data.obj
                })
                return res
            }
        )
}

export function addInventoryProduct(inventoryObj, productObj) {
    let addedInventoryProductObj = {
        inventoryObj: inventoryObj,
        productObj: productObj
    }
    return (dispatch) => axios.post(`${ROOT_URL}/api/inventory/product`, addedInventoryProductObj)
}

export function addDepartment(department) {
    let addDepartmentData = update(department, { id: { $set: null } })
    return (dispatch) => axios.post(`${ROOT_URL}/api/department`, addDepartmentData)
        .then(
            res => {
                dispatch({
                    type: ActionTypes.FULLFIELD_DEPARTMENT_DETAIL,
                    payload: res.data.obj
                })
                return res
            })
}

export function addInventoryTransaction(inventoryTransaction) {
    let addInventoryTransactionData = update(inventoryTransaction, { id: { $set: null } })
    return (dispatch) => axios.post(`${ROOT_URL}/api/inventory/transaction`, inventoryTransaction)
}

export function addMachineMaintenanceRecordDetail(maintenanceRecordDetail) {
    let addData = update(maintenanceRecordDetail, { id: { $set: null } })
    return (dispatch) => axios.post(`${ROOT_URL}/api/machine/maintenance/`, maintenanceRecordDetail)
}

export function addNewProductOrder(orderId, newProductOrder) {
    return (dispatch) => axios.post(`${ROOT_URL}/api/order/${orderId}/detail`, newProductOrder)
}

export function addOrderDetail(orderDetail) {
    return (dispatch) => axios.post(`${ROOT_URL}/api/order`, orderDetail)
        .then(
            res => {
                dispatch({
                    type: ActionTypes.FULLFIELD_ORDER_DETAIL,
                    payload: res.data.obj
                })
                return res
            })
}

export function fetchAllSuppliers() {
    return {
        type: ActionTypes.USER_FETCH_ALL_SUPPLIER
    }
}

export function fetchSupplier(id) {
    return {
        type: ActionTypes.USER_FETCH_SUPPLIER,
        payload: id
    }
}

export function addSupplier(value, onSuccess) {
    return {
        type: ActionTypes.USER_ADD_SUPPLIER,
        payload: value,
        onSuccess
    }
}

export function updateSupplier(id, value, onSuccess) {
    return {
        type: ActionTypes.USER_UPDATE_SUPPLIER,
        payload: { id, value },
        onSuccess
    }
}

export function deleteSupplier(id, onSuccess) {
    return {
        type: ActionTypes.USER_DELETE_SUPPLIER,
        payload: id,
        onSuccess
    }
}

export function fetchAllStatuses() {
    return {
        type: ActionTypes.USER_FETCH_ALL_STATUS
    }
}

export function fetchAllWorkOrderType() {
    return {
        type: ActionTypes.USER_FETCH_ALL_WORK_ORDER_TYPE
    }
}

export function fetchAllWorkOrderDrawing(id) {
    return {
        type: ActionTypes.USER_FETCH_ALL_WORK_ORDER_DRAWING,
        payload: id
    }
}

export function fetchWorkOrder(id) {

    return {
        type: ActionTypes.USER_FETCH_WORK_ORDER,
        payload: id
    }
}

export function updateWorkOrder(id, value, onSuccess) {
    return {
        type: ActionTypes.USER_UPDATE_WORK_ORDER,
        payload: { id, value },
        onSuccess
    }
}

export function fetchEngineerOrder(id) {
    return {
        type: ActionTypes.USER_FETCH_ENGINEER_ORDER,
        payload: id
    }
}

export function fetchEngineerOrderAllInfo(id) {
    return {
        type: ActionTypes.USER_FETCH_ENGINEER_ORDER_ALL_INFO,
        payload: id
    }
}

export function fetchProductionOrderAllInfo(id) {
    return {
        type: ActionTypes.USER_FETCH_PRODUCTION_ORDER_ALL_INFO,
        payload: id
    }
}

export function updateEngineerOrder(workOrderId, value, onSuccess) {
    return {
        type: ActionTypes.USER_UPDATE_ENGINEER_ORDER,
        payload: { workOrderId, value },
        onSuccess
    }
}

export function fetchProductionOrder(id) {
    return {
        type: ActionTypes.USER_FETCH_PRODUCTION_ORDER,
        payload: id
    }
}

export function updateProductionOrder(workOrderId, value, onSuccess) {
    return {
        type: ActionTypes.USER_UPDATE_PRODUCTION_ORDER,
        payload: { workOrderId, value },
        onSuccess
    }
}

export function fetchDeliveryOrder(id) {
    return {
        type: ActionTypes.USER_FETCH_DELIVERY_ORDER,
        payload: id
    }
}

export function updateDeliveryOrder(workOrderId, value, onSuccess) {
    return {
        type: ActionTypes.USER_UPDATE_DELIVERY_ORDER,
        payload: { workOrderId, value },
        onSuccess
    }
}

export function fetchEngineerQACollab(id) {
    return {
        type: ActionTypes.USER_FETCH_ENGINEER_ORDER_QA_COLLAB,
        payload: id
    }
}

export function fetchProductionQACollab(id) {
    return {
        type: ActionTypes.USER_FETCH_PRODUCTION_ORDER_QA_COLLAB,
        payload: id
    }
}

export function fetchAllWorkOrder() {
    return {
        type: ActionTypes.USER_FETCH_ALL_WORK_ORDERS
    }
}

export function fetchAllUsers() {
    return {
        type: ActionTypes.USER_FETCH_ALL_USERS
    }
}

export function fetchOrder(id) {
    console.log('fetch order action')
    return {
        type: ActionTypes.USER_FETCH_ORDER,
        payload: id
    }
}

export function addCNCEngineerQACollaboration(obj) {
    return {
        type: ActionTypes.USER_ADD_CNC_ENGINEERING_QA_COLLABORATION,
        payload: obj
    }
}

export function addCNCProductionQACollaboration(obj) {
    return {
        type: ActionTypes.USER_ADD_CNC_PRODUCTION_QA_COLLABORATION,
        payload: obj
    }
}

export function fetchEngineerQACollaborationInfo(id) {
    return {
        type: ActionTypes.USER_FETCH_ENG_QA_COLLAB,
        payload: id
    }
}

export function fetchProductionQACollaborationInfo(id) {
    return {
        type: ActionTypes.USER_FETCH_PROD_QA_COLLAB,
        payload: id
    }
}

export function uploadNewEngineerQCImage(id, data) {
    return {
        type: ActionTypes.USER_UPLOAD_NEW_ENG_QC_IMAGE,
        payload: { id, data }
    }
}

export function uploadNewProductionQCImage(id, data) {
    return {
        type: ActionTypes.USER_UPLOAD_NEW_PROD_QC_IMAGE,
        payload: { id, data }
    }
}

export function deleteEngineerQCImage(id) {
    return {
        type: ActionTypes.USER_DELETE_ENG_QC_IMAGE,
        payload: id
    }
}

export function updateCNCEngineerQACollaboration(id, data) {
    return {
        type: ActionTypes.USER_UPDATE_CNC_ENGINEERING_QA_COLLABORATION,
        payload: { id, data }
    }
}

export function updateCNCProductionQACollaboration(id, data) {
    return {
        type: ActionTypes.USER_UPDATE_CNC_PRODUCTION_QA_COLLABORATION,
        payload: { id, data }
    }
}

export function deleteProductionQCImage(id) {
    return {
        type: ActionTypes.USER_DELETE_PROD_QC_IMAGE,
        payload: id
    }
}

export function addHandworkEngineerQACollaboration(data) {
    return {
        type: ActionTypes.USER_ADD_HANDWORK_ENGINEERING_QA_COLLABORATION,
        payload: data
    }
}

export function updateHandworkEngineerQACollaboration(id, data) {
    return {
        type: ActionTypes.USER_UPDATE_HANDWORK_ENGINEERING_QA_COLLABORATION,
        payload: { id, data }
    }
}

export function addHandworkProductionQACollaboration(data) {
    return {
        type: ActionTypes.USER_ADD_HANDWORK_PRODUCTION_QA_COLLABORATION,
        payload: data
    }
}

export function updateHandworkProductionQACollaboration(id, data) {
    return {
        type: ActionTypes.USER_UPDATE_HANDWORK_PRODUCTION_QA_COLLABORATION,
        payload: { id, data }
    }
}

export function addDailyEngineerQACollaboration(data) {
    return {
        type: ActionTypes.USER_ADD_DAILY_ENGINEERING_QA_COLLABORATION,
        payload: data
    }
}

export function addDailyProductionQACollaboration(data) {
    return {
        type: ActionTypes.USER_ADD_DAILY_PRODUCTION_QA_COLLABORATION,
        payload: data
    }
}

export function updateDailyEngineerQACollaboration(id, data) {
    return {
        type: ActionTypes.USER_UPDATE_DAILY_ENGINEERING_QA_COLLABORATION,
        payload: { id, data }
    }
}

export function updateDailyProductionQACollaboration(id, data) {
    return {
        type: ActionTypes.USER_UPDATE_DAILY_PRODUCTION_QA_COLLABORATION,
        payload: { id, data }
    }
}

export function saveQuotationProductList(orderMaster, productList) {
    return {
        type: ActionTypes.USER_SAVE_QUOTATION_PRODUCT_LIST,
        payload: { orderMaster, productList }
    }
}

export function getOrderAndQuotationProduct(orderId) {
    return {
        type: ActionTypes.USER_GET_ORDER_MASTER_AND_QUOTATION_PRODUCT_LIST,
        payload: orderId
    }
}

export function generationQuotation(orderId, orderMaster, productList) {
    return {
        type: ActionTypes.USER_GENERATE_QUOTATION,
        payload: { orderId, orderMaster, productList }
    }
}

export function fetchAllQCByWorkOrder(workOrderId) {
    return {
        type: ActionTypes.USER_FETCH_ALL_QC_BY_WORK_ORDER,
        payload: workOrderId
    }
}

export function fetchAllInvoiceType() {
    return {
        type: ActionTypes.USER_FETCH_ALL_INVOICE_TYPE
    }
}

export function fetchAllInvoiceDocType() {
    return {
        type: ActionTypes.USER_FETCH_ALL_INVOICE_DOC_TYPE
    }
}

export function getInvoiceByOrderId(orderId) {
    return {
        type: ActionTypes.USER_GET_INVOICE_BY_ORDER_ID,
        payload: orderId
    }
}

export function getInvoiceById(invoiceId) {
    return {
        type: ActionTypes.USER_GET_INVOICE_BY_ID,
        payload: invoiceId
    }
}

export function addUpdateInvoice(invoiceId, data) {
    return {
        type: ActionTypes.USER_UPDATE_INVOICE,
        payload: { invoiceId, data }
    }
}

export function generateInvoice(orderId, invoiceId, data) {
    return {
        type: ActionTypes.USER_GENERATE_INVOICE,
        payload: { orderId, invoiceId, data }
    }
}

export function getDeliveryNoteByOrderId(orderId) {
    return {
        type: ActionTypes.USER_GET_DELIVERY_NOTE_BY_ORDER_ID,
        payload: { orderId }
    }
}

export function addUpdateDeliveryNote(deliveryNoteId, data) {
    return {
        type: ActionTypes.USER_UPDATE_DELIVERY_NOTE,
        payload: { deliveryNoteId, data }
    }
}

export function hasPermission(pageId, userId) {
    return {
        type: ActionTypes.USER_CHECK_PERMISSION,
        payload: { pageId, userId }
    }
}

export function fetchAllRoles() {
    return {
        type: ActionTypes.USER_FETCH_ALL_ROLES
    }
}

export function updateUserRole(userList) {
    return {
        type: ActionTypes.USER_UPDATE_USER_LIST,
        payload: userList
    }
}

export function findAllPagesPermissionByUserId(userId) {
    return {
        type: ActionTypes.USER_FIND_ALL_PAGES_PERMISSION_BY_USER_ID,
        payload: userId
    }
}

export function updateOrderProductList(orderMasterDetailList, orderId) {
    return {
        type: ActionTypes.USER_UPDATE_ORDER_PRODUCT_LIST,
        payload: {
            orderMasterDetailList, orderId
        }
    }
}

export function fetchAllBOIType() {
    return {
        type: ActionTypes.USER_FETCH_ALL_BOI_TYPE
    }
}

export function getInvoiceProductList(invoiceId) {
    return {
        type: ActionTypes.USER_GET_INVOICE_PRODUCT_LIST,
        payload: invoiceId
    }
}

export function updateInvoiceProductList(invoiceId, productList) {
    return {
        type: ActionTypes.USER_UPDATE_INVOICE_PRODUCT_LIST,
        payload: { invoiceId, productList }
    }
}

export function createNewTaxInvoiceByInvoiceId(invoiceId) {
    return {
        type: ActionTypes.USER_CREATE_NEW_TAX_INVOICE_BY_INVOICE_ID,
        payload: invoiceId
    }
}

export function getDeliveryNoteById(deliveryNoteId) {
    return {
        type: ActionTypes.USER_GET_DELIVERY_NOTE_BY_ID,
        payload: deliveryNoteId
    }
}

export function getDeliveryNoteProductList(deliveryNoteId) {
    return {
        type: ActionTypes.USER_GET_DELIVERY_NOTE_PRODUCT_LIST,
        payload: deliveryNoteId
    }
}

export function updateDeliveryNoteProductList(deliveryNoteId, deliveryNoteProductList) {
    return {
        type: ActionTypes.USER_UPDATE_DELIVERY_NOTE_PRODUCT_LIST,
        payload: { deliveryNoteId, deliveryNoteProductList }
    }
}

export function generateDeliveryNote(orderId, deliveryNoteId, data, deliveryNoteProductList) {
    return {
        type: ActionTypes.USER_GENERATE_DELIVERY_NOTE,
        payload: { orderId, deliveryNoteId, data, deliveryNoteProductList }
    }
}

export function changePassword(userDto) {
    return {
        type: ActionTypes.CHANGE_PASSWORD,
        payload: userDto
    }
}

export function hideSnackbarMsg(){
    return (dispatch) => {
        dispatch({
            type: ActionTypes.HIDE_SNACKBAR_MESSAGE
        })
    }
}