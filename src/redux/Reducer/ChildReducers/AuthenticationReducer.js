import {LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from '../../Actions/ActionConstant/ActionConstants'
const initialState = localStorage.getItem("jwt")? 1 : -1;

const AuthenticationReducer = (state = initialState, action)=>{
    switch(action.type) {
        case LOGIN_SUCCESS:
            return 1;
        case LOGIN_FAIL:
            return 0;
        case LOGOUT:
            console.log(state);
            return 2;
        default:
            return state;
    }
}

export default AuthenticationReducer;