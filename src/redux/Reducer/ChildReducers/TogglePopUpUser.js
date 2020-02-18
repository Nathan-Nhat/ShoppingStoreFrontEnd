import {OPEN_POPUP_USER, CLOSE_POPUP_USER} from '../../Actions/ActionConstant/ActionConstants'
const initialState = false;

const TogglePopUpUserReducers = (state = initialState, action)=>{
    console.log(state);
    switch(action.type) {
        case OPEN_POPUP_USER:
            return true;
        case CLOSE_POPUP_USER:
            return false;
        default:
            return state;
    }
}

export default TogglePopUpUserReducers;