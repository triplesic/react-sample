import { all } from 'redux-saga/effects';
import "regenerator-runtime/runtime";
import { SupplierSagas } from './supplier_saga';
import { StatusSagas } from './status_saga';
import { WorkOrderFamilySagas } from './work_order_saga';
import { UserSagas } from './user_saga';
import { OrderSagas } from './order_saga';
import { QACollaborationSagas } from './qa_collaboration_saga'
import { QuotationSagas } from './quotation_saga'
import { InvoiceSagas } from './invoice_saga'
import { DeliveryNoteSagas } from './deliveryNote_saga'
import { PermissionSagas } from './permission_saga'
import { BoiSagas } from './boi_saga'

export default function* rootSaga() {
    yield all([
        ...WorkOrderFamilySagas,        
        ...SupplierSagas,
        ...StatusSagas,
        ...UserSagas,
        ...OrderSagas,
        ...QACollaborationSagas,
        ...QuotationSagas,
        ...InvoiceSagas,
        ...DeliveryNoteSagas,
        ...PermissionSagas,
        ...BoiSagas
    ])
}