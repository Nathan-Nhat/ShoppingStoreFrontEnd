import {fork, take, call, takeEvery, put, takeLatest} from 'redux-saga/effects'
import {LOGIN, LOGOUT, FETCH_ALL_USER, FETCH_SINGLE_USER, SUBMIT_EDIT_USER, FETCH_ALL_PRODUCT, SEARCH_PRODUCT_PAGE_SIZE, DELETE_PRODUCT, HANDLE_ERROR} from '../Actions/ActionConstant/ActionConstants'
import {loginSuccess, loginFail, logoutSuccess, fetchAllUserSuccess, fetchAllUserFail, 
    fetchSingleUserSuccess, fetchSingleUserFail,toggleNotification, fetchAllUser,
    fetchAllProductSuccess, searchProduct} from '../Actions/ActionObjects/ActionsObjects'
import {postData, getData, putData, deleteData} from '../../API/Api'
import {push} from 'connected-react-router'
/*=============Authentication Saga================*/
function convertNumberToCategory(number){
    switch(number){
        case 0 : 
            return "all";
        case 1 : 
            return "Phones";
        case 2 : 
            return "Laptops";
        case 3 : 
            return "Watches";
        case 4 : 
            return "Accessories";
        case 5:
            return "Cameras";
        case 6:
            return "Sports"
        default:
            break;
    }
}
function* userLogin(action){
    // user login
    console.log("user login");
    try{
       const response = yield call(postData, '/authenticate', action.payload,{}, false);
       console.log(response);
       if (response.data.roles === "ADMIN")
       {
        localStorage.setItem("jwt", response.data.jwtToken);
        yield put(loginSuccess());
        yield put(push("/"));
        yield put(toggleNotification({isOpen : true, message : "Login Success", type : "success"}));
       }
       else{
            yield put(toggleNotification({isOpen : true, message : "You dont have permission to visit this site", type : "error"}));
       }
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
    yield put(push("/login"));
    yield put(toggleNotification({isOpen : true, message : "Logout Success", type : "success"}));

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
        const response = yield call(getData, `/api/secured/all-users?search=${action.data.textSearch}&page=${action.data.page}&size=${action.data.size}`, true);
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
        const response = yield call(getData, `/api/secured/users/${action.data.username}`,{}, true);
        yield put(fetchSingleUserSuccess(response.data));
    }
    catch(error) {
        yield handleErrorCode(error.response.data);
    }
}
function* watchFetchSingleUser(){
    yield takeEvery(FETCH_SINGLE_USER, fetchSingleUserSaga);
}

/*================Edit User==================*/
function *submitEditUSer(action){
    console.log(action);
   try{
    const response = yield call(putData, `/api/secured/users/`, action.data,{}, true);
    yield put(fetchSingleUserSuccess(response.data));
} catch(error) {
        yield handleErrorCode(error.response.data);
   }
}

function  *watchSubmitEditUser(){
yield takeEvery(SUBMIT_EDIT_USER, submitEditUSer);
}

/*==================Search Product=================*/
function *searchForProduct(action){
    try{
        const response = yield call(getData, `/api/public/products/search?query=${action.data.textSearch}&page=${action.data.page}&size=${action.data.size}&category=${convertNumberToCategory(action.data.category)}&type=price&sort=asc`, false);
        console.log(response);
        yield put(fetchAllProductSuccess(response.data));
    } catch(error) {
        handleErrorCode(error.response.data)
    }
}
function *watchSearchProduct(){
    yield takeEvery(SEARCH_PRODUCT_PAGE_SIZE, searchForProduct);
}
/*==================Search Product=================*/
function *deleteProductSaga(action){
    try {
        yield call(deleteData, `/api/secured/products/${action.data.id}`, true);
        yield put(searchProduct(action.data.objSearch));
    } catch(error){
        handleErrorCode(error.response.data)
    }
}
function *watchDeleteProduct(){
    yield takeEvery(DELETE_PRODUCT, deleteProductSaga);
}
/* ================Watch handle Error============*/
function *watchHandleError(){
    yield takeEvery(HANDLE_ERROR, handleErrorCode);
}

/*==============Root Saga================*/
function* rootSaga(){
    console.log('This is root saga');
    yield fork(watchUserLogin);
    yield fork(watchFetchUsers);
    yield fork(watchFetchSingleUser);
    yield fork(watchUserLogout);
    yield fork(watchSubmitEditUser);
    yield fork(watchSearchProduct);
    yield fork(watchDeleteProduct);
    yield fork(watchHandleError);
}

export default rootSaga;

/*=====================Local function=================================*/
function* handleErrorCode(action){
    const response = action.data;
    console.log(response);
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
            yield localStorage.removeItem("jwt");
            yield put(logoutSuccess());
            yield put(push("/login"));
            yield put(toggleNotification({isOpen : true, message : "Invalid JWT. Please Login again", type : "error"}));
        } else if (response.code === "EXPIRED_JWT_TOKEN"){
            yield localStorage.removeItem("jwt");
            yield put(logoutSuccess());
            yield put(push("/login"));
            yield put(toggleNotification({isOpen : true, message : "JWT expired. Please Login again", type : "error"}));
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