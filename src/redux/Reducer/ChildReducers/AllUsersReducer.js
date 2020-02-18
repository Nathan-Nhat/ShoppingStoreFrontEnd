import {FETCH_ALL_USER_SUCCESS, FETCH_ALL_USER_FAIL} from '../../Actions/ActionConstant/ActionConstants'
const initialState = {
    content:[],
};

const AllUserReducer = (state = initialState, action)=>{
    switch(action.type) {
        case FETCH_ALL_USER_SUCCESS:
            return action.data;
        case FETCH_ALL_USER_FAIL:
            return [];
        default:
            return state;
    }
}

export default AllUserReducer;