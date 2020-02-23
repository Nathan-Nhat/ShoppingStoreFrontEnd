import {CHANGE_USER_ROLE, CHANGE_USER_STATUS, CHANGE_SELECTED_USER} from '../../Actions/ActionConstant/ActionConstants'
const initialState = {
    username : '',
    roles : "CUSTOMER", //0 Customer// 1 Admin
    status : 1 // 1 Active 0: Inactive;
};

const EditFormReducer = (state = initialState, action)=>{
    console.log(state);
    switch(action.type) {
        case CHANGE_USER_ROLE:
            return {
                ...state,
                roles : action.data
            };
        case CHANGE_USER_STATUS:
            return {
                ...state,
                status : action.data
            };
        case CHANGE_SELECTED_USER:
            return {
                ...state,
                username : action.data
            };
        default:
            return state;
    }
}

export default EditFormReducer;