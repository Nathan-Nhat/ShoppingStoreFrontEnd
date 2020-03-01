import {FETCH_ALL_PRODUCT, FETCH_ALL_PRODUCT_SUCCESS, FETCH_ALL_PRODUCT_FAIL} from '../../Actions/ActionConstant/ActionConstants'
const initialState = {
    content : []
};

const AllProductReducer = (state = initialState, action)=>{
    console.log(action.data);
    switch(action.type) {
        case FETCH_ALL_PRODUCT_SUCCESS:
            return action.data;
        case FETCH_ALL_PRODUCT_FAIL:
            return [];
        default:
            return state;
    }
}

export default AllProductReducer;