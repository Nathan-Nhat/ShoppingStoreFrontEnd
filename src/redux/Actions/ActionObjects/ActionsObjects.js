import {TOGGLE_OPEN, LOGIN, LOGIN_SUCCESS, LOGIN_FAIL} from '../ActionConstant/ActionConstants'
export const toggleOpen = ()=>({
    type : TOGGLE_OPEN
})

export const login = (data) => ({
    type : LOGIN,
    payload : data
})

export const loginSuccess = () => ({
    type : LOGIN_SUCCESS
})

export const loginFail = () => ({
    type : LOGIN_FAIL
})