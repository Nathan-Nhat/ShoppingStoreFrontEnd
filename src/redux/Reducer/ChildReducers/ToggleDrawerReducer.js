import {TOGGLE_OPEN} from '../../Actions/ActionConstant/ActionConstants'
const initialState = true;

const ToggleDrawerReducers = (state = initialState, action)=>{
    switch(action.type) {
        case TOGGLE_OPEN:
            return !state;
        default:
            return state;
    }
}

export default ToggleDrawerReducers;