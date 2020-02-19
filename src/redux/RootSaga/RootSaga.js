import {fork, take, call, takeEvery, put, takeLatest} from 'redux-saga/effects'
import {LOGIN, LOGOUT, FETCH_ALL_USER, FETCH_SINGLE_USER} from '../Actions/ActionConstant/ActionConstants'
import {loginSuccess, loginFail, logoutSuccess, fetchAllUserSuccess, fetchAllUserFail, fetchSingleUserSuccess, fetchSingleUserFail,toggleNotification} from '../Actions/ActionObjects/ActionsObjects'
import {postData, getData} from '../../API/Api'
import {push} from 'react-router-redux'
/*==================History====================*/
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
/*==============forward to history==============*/
function forwardTo(location) {
    console.log(history);
    history.push(location);
  }

/*=============Authentication Saga================*/

function* userLogin(action){
    // user login
    console.log("user login");
    try{
       const response = yield call(postData, '/authenticate', action.payload, false);
       console.log(response);
        localStorage.setItem("jwt", response.data.jwtToken);
        yield put(loginSuccess());
    }
    catch (error) {
        console.log(error.response)
        yield put(loginFail());
        yield handleErrorCode(error.response.data);
    }
}

function* userLogout(){
    //user log out
    yield localStorage.removeItem("jwt");
    yield put(logoutSuccess());
    yield put(toggleNotification({isOpen : true, message : "Logout Successful", type : "success"}))
}

function* watchUserLogin(){
    yield takeEvery(LOGIN, userLogin);
}

function* watchUserLogout(){
    yield takeEvery(LOGOUT, userLogout);
}

/*==============Fetch All User Saga================*/
function* fetchAllUserSaga(action){
    try{
        const response = yield call(getData, `/api/admin/all-users?page=${action.data.page}&size=${action.data.size}`, true);
        console.log(response.data);
        yield put(fetchAllUserSuccess(response.data));
    }
    catch (error) {
        yield handleErrorCode(error.response.data);
    }

}
function* watchFetchUsers(){
    console.log("watch fetch User");
    yield takeEvery(FETCH_ALL_USER, fetchAllUserSaga);
}

/*====================Fetch single User===================*/
function* fetchSingleUserSaga(action){
    try{
        const response = yield call(getData, `/api/admin/users/${action.data.username}`, true);
        yield put(fetchSingleUserSuccess(response.data));
    }
    catch(error) {
        yield handleErrorCode(error.response.data);
    }
}
function* watchFetchSingleUser(){
    yield takeEvery(FETCH_SINGLE_USER, fetchSingleUserSaga);
}
/*==============Root Saga================*/
function* rootSaga(){
    console.log('This is root saga');
    yield fork(watchUserLogin);
    yield fork(watchFetchUsers);
    yield fork(watchFetchSingleUser);
    yield fork(watchUserLogout);
}

export default rootSaga;

/*=====================Local function=================================*/
function* handleErrorCode(response){
    switch(response.status)
    {
    case 403:
        if(response.code === "USER_NOTFOUND"){
            yield put(toggleNotification({isOpen : true, message : "Invalid Username or Password", type : "error"}));
        } else if (response.code === "USER_DISABLE") {
            yield put(toggleNotification({isOpen : true, message : "User have been disabled", type : "error"}));
        } else {
            yield put(toggleNotification({isOpen : true, message : "You dont have permission to view this", type : "error"}));
        }
        break;
    case 500:
        if(response.code === "INVALID_JWT_TOKEN"){
            yield put(toggleNotification({isOpen : true, message : "Invalid JWT. Please Login again", type : "error"}));
            yield call(forwardTo, '/login');
        } else if (response.code === "EXPIRED_JWT_TOKEN"){
            yield put(toggleNotification({isOpen : true, message : "JWT expired. Please Login again", type : "error"}));
            yield call(forwardTo, '/login');
        } else {
            yield put(toggleNotification({isOpen : true, message : "Fail to fetch", type : "error"}));
        }
        break;
    case 404: {
            yield put(toggleNotification({isOpen : true, message : "Fail to fetch", type : "error"}));
            break;
        }
    default:
        yield put(toggleNotification({isOpen : true, message : "Fail to fetch", type : "error"}));
        break;
    }
}