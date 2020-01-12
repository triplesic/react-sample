import {
    GETTING_ALL_INVENTORY,
    FULLFIELD_ALL_INVENTORIES,
    FULLFIELD_INVENTORY_DETAIL,
    FULLFIELD_ALL_MATERIAL_INVENTORIES,
    FULLFIELD_NEXT_INVENTORY_NO
} from '../actions/ActionTypes'

export default (state = { isLoading: false,
    material: [] }, action = {}) => {
    switch (action.type) {
        case GETTING_ALL_INVENTORY:
            return {
                ...state,
                isLoading: true
            }
        case FULLFIELD_ALL_INVENTORIES:
            return {
                ...state,
                data: action.payload,
                isLoading: false
            }
        case FULLFIELD_INVENTORY_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case FULLFIELD_ALL_MATERIAL_INVENTORIES:
            return {
                ...state,
                material: action.payload
            }
        case FULLFIELD_NEXT_INVENTORY_NO:
            return {
                ...state,
                nextInvtStr: action.payload
            }
        default:
            return state
    }
}