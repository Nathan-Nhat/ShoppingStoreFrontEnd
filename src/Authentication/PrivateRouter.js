import React from 'react'
import Redirect from 'react-router-dom/Redirect'
import Route from 'react-router-dom/Route'
import {useSelector} from 'react-redux'
const PrivateRoute = ({component : Component, ...rest})=>{
    const isAuthentication = useSelector(state => state.AuthenticationReducer);
    return(
    <Route {...rest} render = {()=>
        isAuthentication === 1 ? <Component/> : <Redirect
            to = "/login"/>
    }/>)
};
export default PrivateRoute;