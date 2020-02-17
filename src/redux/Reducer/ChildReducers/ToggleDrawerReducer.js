import {TOGGLE_OPEN} from '../../Actions/ActionConstant/ActionConstants'
const initialState = {
    isOpen : true,
    isHover : false,
}

const ToggleDrawerReducers = (state = initialState, action)=>{
    switch(action.type) {
        case TOGGLE_OPEN:
            return {
                ...state,
                isOpen : !state.isOpen
            }
        default:
            return state;
    }
}

export default ToggleDrawerReducers;