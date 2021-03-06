import {SEARCH_TEXT_CHANGE, PAGE_CHANGE, SIZE_CHANGE, CATEGORY_CHANGE} from '../../Actions/ActionConstant/ActionConstants'
const initialState = {
    textSearch : '',
    page : 0,
    size : 10,
    category : 0,
};

const SearchReducer = (state = initialState, action)=>{
    switch(action.type) {
        case SEARCH_TEXT_CHANGE:
            return {
                ...state,
                textSearch : action.data
            }
        case PAGE_CHANGE:
            return {
                ...state,
                page :  action.data
            }
        case SIZE_CHANGE:
            return {
                ...state,
                size :  action.data
            }
        case CATEGORY_CHANGE:
            return {
                ...state,
                category : action.data
            }
        default:
            return state;
    }
}

export default SearchReducer;