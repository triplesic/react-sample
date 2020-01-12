import axios from 'axios';
import * as Mock from './mock_object'

export const API_URL = Config.rootApiUrl + '/api'


export const fetchAllSuppliers = () => {
    return axios.get(`${API_URL}/suppliers`)
}

export const fetchSupplier = (id) => {
    return axios.get(`${API_URL}/suppliers/${id}`)
}

export const addSupplier = (supplier) => {
    return axios.post(`${API_URL}/suppliers`, supplier);
}

export const updateSupplier = (id, supplier) => {
    return axios.put(`${API_URL}/suppliers/${id}`, supplier);
}

export const deleteSupplier = (id) => {
    return axios.delete(`${API_URL}/suppliers/${id}`);
}

export const fetchAllStatus = () => {
    return axios.get(`${API_URL}/statuses`)
}

export const fetchAllUsers = () => {
    return axios.get(`${API_URL}/users`)
}

export const fetchAllWorkOrders = () => {
    return axios.get(`${API_URL}/workorder/`);
}

export const fetchWorkOrder = (id) => {
    return axios.get(`${API_URL}/workorder/${id}`)
}

export const fetchAllWorkOrderType = () => {
    return axios.get(`${API_URL}/workorder/types`)
}

export const fetchAllWorkOrderDrawing = (id) => {
    return axios.get(`${API_URL}/workorder/${id}/drawing`)
}

export const updateWorkOrder = (id, workOrder) => {
    return axios.put(`${API_URL}/workorder/${id}`, workOrder);
}

export const fetchEngineerOrder = (id) => {
    return axios.get(`${API_URL}/workorder/${id}/engineerWorkOrder`)
}

export const updateEngineerOrder = (id, engineerOrder) => {
    return axios.put(`${API_URL}/workorder/${id}/engineerWorkOrder/`, engineerOrder)
}

export const fetchProductionOrder = (id) => {
    return axios.get(`${API_URL}/workorder/${id}/productionWorkOrder`)
}

export const updateProductionOrder = (id, productionOrder) => {
    return axios.put(`${API_URL}/workorder/${id}/productionWorkOrder/`, productionOrder)
}

export const fetchDeliveryOrder = (id) => {
    return axios.get(`${API_URL}/workorder/${id}/deliveryWorkOrder`)
}

export const updateDeliveryOrder = (id, deliveryOrder) => {
    return axios.put(`${API_URL}/workorder/${id}/deliveryWorkOrder/`, deliveryOrder)
}

export const fetchEngineerQACollab = (id) => {
    return axios.get(`${API_URL}/workorder/${id}/engineerQA`)
}

export const fetchProductionQACollab = (id) => {
    return axios.get(`${API_URL}/workorder/${id}/productionQA`)
}

export const fetchOrder = (id) => {
    return axios.get(`${API_URL}/order/${id}`)
}

export const addCNCEngineerQACollaboration = (obj) => {
    return axios.post(`${API_URL}/qc/engineer/cnc`, obj)
}

export const addCNCProductionQACollaboration = (obj) => {
    return axios.post(`${API_URL}/qc/production/cnc`, obj)
}

export const addHandworkEngineerQACollaboration = (obj) => {
    return axios.post(`${API_URL}/qc/engineer/handwork`, obj)
}

export const addHandworkProductionQACollaboration = (obj) => {
    return axios.post(`${API_URL}/qc/production/handwork`, obj)
}

export const addDailyEngineerQACollaboration = (obj) => {
    return axios.post(`${API_URL}/qc/engineer/daily/`, obj)
}

export const addDailyProductionQACollaboration = (obj) => {
    return axios.post(`${API_URL}/qc/production/daily/`, obj)
}

export const fetchEngineerQACollaborationInfo = (id) => {
    return axios.get(`${API_URL}/qc/engineer/${id}`)
}

export const fetchProductionQACollaborationInfo = (id) => {
    return axios.get(`${API_URL}/qc/production/${id}`)
}

export const uploadNewEngineerQCImage = (payload) => {
    return axios.post(`${API_URL}/qc/engineer/${payload.id}/image`, payload.data)
}

export const uploadNewProductionQCImage = (payload) => {
    return axios.post(`${API_URL}/qc/production/${payload.id}/image`, payload.data)
}

export const deleteEngineerQCImage = (id) => {
    return axios.delete(`${API_URL}/qc/engineer/image/${id}`)
}

export const deleteProductionQCImage = (id) => {
    return axios.delete(`${API_URL}/qc/production/image/${id}`)
}

export const updateCNCEngineerQACollaboration = (payload) => {
    return axios.put(`${API_URL}/qc/engineer/cnc/${payload.id}`, payload.data)
}

export const updateCNCProductionQACollaboration = (payload) => {
    return axios.put(`${API_URL}/qc/production/cnc/${payload.id}`, payload.data)
}

export const updateHandworkEngineerQACollaboration = (payload) => {
    return axios.put(`${API_URL}/qc/engineer/handwork/${payload.id}`, payload.data)
}

export const updateHandworkProductionQACollaboration = (payload) => {
    return axios.put(`${API_URL}/qc/production/handwork/${payload.id}`, payload.data)
}

export const updateDailyEngineerQACollaboration = (payload) => {
    return axios.put(`${API_URL}/qc/engineer/daily/${payload.id}`, payload.data)
}

export const updateDailyProductionQACollaboration = (payload) => {
    return axios.put(`${API_URL}/qc/production/daily/${payload.id}`, payload.data)
}

export const saveQuotationProductList = (payload) => {
    return axios.post(`${API_URL}/quotation/productlist`, { orderMaster: payload.orderMaster, productList: payload.productList })
}

export const getOrderAndQuotationProduct = (orderId) => {
    return axios.get(`${API_URL}/quotation/productlist/${orderId}`)
}

export const generateQuotation = (orderId) => {
    return axios.post(`${API_URL}/quotation/${orderId}/generate`)
}

export const fetchAllQCByWorkOrder = (workOrderId) => {
    return axios.get(`${API_URL}/qc/workorder/${workOrderId}`)
}

export const fetchAllInvoiceType = () => {
    return axios.get(`${API_URL}/invoiceType`)
}

export const fetchAllInvoiceDocType = () => {
    return axios.get(`${API_URL}/invoiceDocType`)
}

export const getInvoiceByOrderId = (orderId) => {
    return axios.get(`${API_URL}/invoice/order/${orderId}`)
}

export const getInvoiceById = (invoiceId) => {
    return axios.get(`${API_URL}/invoice/${invoiceId}`)
}

export const addUpdateInvoice = (payload) => {
    return axios.put(`${API_URL}/invoice/${payload.invoiceId}`, payload.data)
}

export const generateInvoice = (payload) => {
    let { invoiceId, orderId } = payload
    return axios.post(`${API_URL}/invoice/${invoiceId}/order/${orderId}/generate`)
    // return axios.post(`${API_URL}/invoice/${orderId}/generate`)
}

export const getDeliveryNoteByOrderId = (orderId) => {
    return axios.get(`${API_URL}/deliveryNote/order/${orderId}`)
}

export const generateDeliveryNote = (payload) => {
    let { deliveryNoteId, orderId } = payload
    return axios.post(`${API_URL}/deliveryNote/${deliveryNoteId}/order/${orderId}/generate`)
}

export const hasPermission = (payload) => {
    let { userId, pageId } = payload
    return axios.get(`${API_URL}/permission/user/${userId}/page/${pageId}`)
}

export const fetchAllRoles = () => {
    return axios.get(`${API_URL}/role`)
}

export const updateUserRole = (payload) => {
    var userListArr = _.map(payload.userList, (user) => user)
    return axios.put(`${API_URL}/users`, { userList: userListArr })
}

export const findAllPagesPermissionByUserId = (userId) => {
    return axios.get(`${API_URL}/permission/page/user/${userId}`)
}

export const updateOrderProductList = (obj) => {
    return axios.put(`${API_URL}/order/${obj.orderId}/detail`, { orderMasterDetailList: obj.orderMasterDetailList })
}

export const fetchAllBOIType = () => {
    return axios.get(`${API_URL}/boi-type`)
}

export const getInvoiceProductList = (invoiceId) => {
    return axios.get(`${API_URL}/invoice/${invoiceId}/productList`)
}

export const updateInvoiceProductList = (payload) => {
    let { invoiceId, productList } = payload
    return axios.put(`${API_URL}/invoice/${invoiceId}/productList`, productList)
}

export const createNewTaxInvoiceByInvoiceId = (invoiceId) => {
    return axios.post(`${API_URL}/invoice/${invoiceId}/new-tax-invoice`)
}

export const getDeliveryNoteById = (deliveryNoteId) => {
    return axios.get(`${API_URL}/deliveryNote/${deliveryNoteId}`)
}

export const getDeliveryNoteProductList = (deliveryNoteId) => {
    return axios.get(`${API_URL}/deliveryNote/${deliveryNoteId}/productList`)
}

export const updateDeliveryNoteProductList = (payload) => {
    let { deliveryNoteId, deliveryNoteProductList } = payload
    return axios.put(`${API_URL}/deliveryNote/${deliveryNoteId}/productList`, deliveryNoteProductList)
}

export const addUpdateDeliveryNote = (payload) => {
    let { deliveryNoteId, data } = payload
    return axios.put(`${API_URL}/deliveryNote/${deliveryNoteId}`, data)
}

export const changePassword = (userDto) => {
    return axios.post(`${API_URL}/users/changePassword`, userDto)
}