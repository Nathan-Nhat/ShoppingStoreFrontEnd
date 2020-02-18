import {fork, take, call, takeEvery, put, takeLatest} from 'redux-saga/effects'
import {LOGIN, LOGOUT, FETCH_ALL_USER, FETCH_SINGLE_USER} from '../Actions/ActionConstant/ActionConstants'
import {loginSuccess, loginFail, logoutSuccess, fetchAllUserSuccess, fetchAllUserFail, fetchSingleUserSuccess, fetchSingleUserFail} from '../Actions/ActionObjects/ActionsObjects'
import {postData, getData} from '../../API/Api'
/*==============Authentication Saga================*/

function* userLogin(action){
    // user login
    console.log("user login");
    try{
       const response = yield call(postData, '/authenticate', action.payload, false);
       console.log(response);
        localStorage.setItem("jwt", response.data.jwtToken);
        yield put(loginSuccess());
    }
    catch {
        yield put(loginFail());
    }
}

function* userLogout(){
    //user log out
    localStorage.removeItem("jwt");
    yield put(logoutSuccess());
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
    catch{
        yield put(fetchAllUserFail());
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
    catch{
        yield put(fetchSingleUserFail());
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