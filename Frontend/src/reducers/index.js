import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

import AuthReducer from './auth_reducer'
import InventoryTypeReducer from './inventory_type_reducer'
import CategoryReducer from './category_reducer'
import InventoryReducer from './inventory_reducer'
import StatusReducer from './status_reducer';
import Department from './department_reducer'
import Product from './product_reducer'

import UnitType from './unitType_reducer'
import DrawingRevision from './drawing_revision_reducer'
import UserReducer from './user_reducer'
import PermissionReducer from './permission_reducer'

import SnackbarReducer from './snackbar_reducer'

const rootReducer = combineReducers({
    form: FormReducer,
    auth: AuthReducer,
    inventoryType: InventoryTypeReducer,
    category: CategoryReducer,
    inventory: InventoryReducer,
    status: StatusReducer,
    department: Department,
    product: Product,
    unitType: UnitType,
    drawingRevision: DrawingRevision,
    users: UserReducer,
    snackbarMsg: SnackbarReducer,
    permission: PermissionReducer,
});

export default rootReducer;