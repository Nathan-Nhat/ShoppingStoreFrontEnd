import {fork, take, call, takeEvery, put, takeLatest} from 'redux-saga/effects'
import {LOGIN, LOGOUT, FETCH_ALL_USER} from '../Actions/ActionConstant/ActionConstants'
import {loginSuccess, loginFail, logoutSuccess, fetchAllUserSuccess, fetchAllUserFail} from '../Actions/ActionObjects/ActionsObjects'
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
/*==============Root Saga================*/
function* rootSaga(){
    console.log('This is root saga');
    yield fork(watchUserLogin);
    yield fork(watchFetchUsers);
    yield fork(watchUserLogout);
}

export default rootSaga;