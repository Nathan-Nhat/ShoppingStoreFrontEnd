import {LOGIN_SUCCESS, LOGIN_FAIL} from '../../Actions/ActionConstant/ActionConstants'
const initialState = localStorage.getItem("jwt")? 1 : -1;

const AuthenticationReducer = (state = initialState, action)=>{
    console.log(action);
    switch(action.type) {
        case LOGIN_SUCCESS:
            return 1;
        case LOGIN_FAIL:
            return 0;
        default:
            return state;
    }
}

export default AuthenticationReducer;