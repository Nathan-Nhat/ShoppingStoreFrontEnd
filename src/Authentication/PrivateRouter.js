import React from 'react'
import {Redirect,Route} from 'react-router-dom'
import {useStore} from 'react-redux'
const PrivateRoute = ({children,...rest})=>{
    const store = useStore();
    console.log("1231231231231231231");
    console.log(store.getState().AuthenticationReducer);
    return(
    <Route {...rest} render = {({location})=>
        store.getState().AuthenticationReducer === 1 ? children : <Redirect
        to={{
            pathname: "/login",
          }}/>
    }/>)
};
export default PrivateRoute;