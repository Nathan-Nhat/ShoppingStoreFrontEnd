import {USER_SEARCH_TEXT_CHANGE, USER_PAGE_CHANGE, USER_SIZE_CHANGE} from '../../Actions/ActionConstant/ActionConstants'
const initialState = {
    textSearch : '',
    page : 0,
    size : 10,
};

const UserSearchReducer = (state = initialState, action)=>{
    switch(action.type) {
        case USER_SEARCH_TEXT_CHANGE:
            return {
                ...state,
                textSearch : action.data
            }
        case USER_PAGE_CHANGE:
            return {
                ...state,
                page :  action.data
            }
        case USER_SIZE_CHANGE:
            return {
                ...state,
                size :  action.data
            }
        default:
            return state;
    }
}

export default UserSearchReducer;