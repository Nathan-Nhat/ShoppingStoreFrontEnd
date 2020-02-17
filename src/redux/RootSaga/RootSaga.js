import {fork, take, call, takeEvery, put} from 'redux-saga/effects'
import {LOGIN} from '../Actions/ActionConstant/ActionConstants'
import {loginSuccess, loginFail} from '../Actions/ActionObjects/ActionsObjects'
import {postData} from '../../API/Api'
import axios from 'axios'
/*==============Authentication Saga================*/

function* takeAuthentication(action){
    // yield call()
    try{
       const response = yield call(postData, '/authenticate', action.payload,false);
       console.log(response);
        localStorage.setItem("jwt", response.data.jwtToken);
        yield put(loginSuccess());
    }
    catch {
        yield put(loginFail());
    }
}

function* watchChangeAuthentication(){
    yield takeEvery(LOGIN, takeAuthentication);
}
/*==============Fetch All User Saga================*/
function* watchFetchUsers(){
    console.log("watch fetch User");
}
/*==============Root Saga================*/
function* rootSaga(){
    console.log('This is root saga');
    yield fork(watchChangeAuthentication);
    yield fork(watchFetchUsers);
}

export default rootSaga;