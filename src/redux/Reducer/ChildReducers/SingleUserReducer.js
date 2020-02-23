import {FETCH_SINGLE_USER_SUCCESS, FETCH_SINGLE_USER_FAIL, SUBMIT_EDIT_USER_SUCCESS, SUBMIT_EDIT_USER_FAIL} from '../../Actions/ActionConstant/ActionConstants'
const initialState = {
    userDetails : {}
};

const SingleUserReducer = (state = initialState, action)=>{
    switch(action.type) {
        case FETCH_SINGLE_USER_SUCCESS:
            return action.data;
        case FETCH_SINGLE_USER_FAIL:
            return {};
        case SUBMIT_EDIT_USER_SUCCESS:
            return action.data;
        case SUBMIT_EDIT_USER_FAIL:
            return action.data;
        default:
            return state;
    }
}

export default SingleUserReducer;