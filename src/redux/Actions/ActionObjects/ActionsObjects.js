import {TOGGLE_OPEN, LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOGOUT_SUCCESS, FETCH_ALL_USER, FETCH_ALL_USER_SUCCESS, FETCH_ALL_USER_FAIL} from '../ActionConstant/ActionConstants'
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

export const logout = () => ({
    type : LOGOUT
})

export const logoutSuccess = () =>({
    type : LOGOUT_SUCCESS
})

export const fetchAllUser = data => ({
    type : FETCH_ALL_USER,
    data
})

export const fetchAllUserSuccess = data => ({
    type : FETCH_ALL_USER_SUCCESS,
    data
})

export const fetchAllUserFail = data => ({
    type : FETCH_ALL_USER_FAIL,
    data
})