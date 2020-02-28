import {TOGGLE_OPEN, LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOGOUT_SUCCESS, 
    FETCH_ALL_USER, FETCH_ALL_USER_SUCCESS, FETCH_ALL_USER_FAIL, 
    FETCH_SINGLE_USER, FETCH_SINGLE_USER_SUCCESS, FETCH_SINGLE_USER_FAIL,
    OPEN_POPUP_USER, CLOSE_POPUP_USER, TOGGLE_NOTIFICATION, CHANGE_USER_ROLE, CHANGE_USER_STATUS, 
    CHANGE_SELECTED_USER, SUBMIT_EDIT_USER, SUBMIT_EDIT_USER_FAIL, SUBMIT_EDIT_USER_SUCCESS, FETCH_ALL_PRODUCT, 
    FETCH_ALL_PRODUCT_SUCCESS, FETCH_ALL_PRODUCT_FAIL} from '../ActionConstant/ActionConstants'
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

export const fetchSingleUser = data =>({
    type : FETCH_SINGLE_USER,
    data
})

export const fetchSingleUserSuccess = data =>({
    type : FETCH_SINGLE_USER_SUCCESS,
    data
})

export const fetchSingleUserFail = data =>({
    type : FETCH_SINGLE_USER_FAIL,
    data
})
export const OpenPopUpUser = () =>({
    type : OPEN_POPUP_USER,
})
export const ClosePopUpUser = () =>({
    type : CLOSE_POPUP_USER,
})

export const toggleNotification = (data) =>({
    type : TOGGLE_NOTIFICATION,
    data
})

export const changeUserRole = (data)=> ({
    type : CHANGE_USER_ROLE,
    data
})
export const changeUserStatus = (data)=> ({
    type : CHANGE_USER_STATUS,
    data
})

export const changeSelectedUser = (data)=>({
    type : CHANGE_SELECTED_USER,
    data
})

export const submitEditUser = (data)=>({
    type : SUBMIT_EDIT_USER,
    data
})

export const submitEditUserSuccess = (data)=>({
    type : SUBMIT_EDIT_USER_SUCCESS,
    data
})

export const submitEditUserFail = (data)=>({
    type : SUBMIT_EDIT_USER_FAIL,
    data
})

export const fetchAllProduct = (data) =>({
    type : FETCH_ALL_PRODUCT,
    data
})
export const fetchAllProductSuccess = (data) => ({
    type : FETCH_ALL_PRODUCT_SUCCESS,
    data
})

export const fetchAllProductFail = (data) => ({
    type : FETCH_ALL_PRODUCT_FAIL,
    data
})