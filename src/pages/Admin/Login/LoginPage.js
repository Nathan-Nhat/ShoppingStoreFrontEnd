import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, CircularProgress, Typography, Paper, Divider, Checkbox, FormControlLabel } from '@material-ui/core';
import {useLoginStyles} from './LoginPage.style'
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../../../redux/Actions/ActionObjects/ActionsObjects'
import {useStore} from 'react-redux'
import {useHistory} from 'react-router-dom'
import AppBarComp from '../../../Components/Main/AppBar/AppBar.Component';
function LoginPage(){
    const store = useStore();
    const isAuthenticated = useSelector(state => state.AuthenticationReducer)
    const [state, setState] = useState({
        username : "",
        password : ""
    });
    const dispatch = useDispatch();
    console.log(isAuthenticated);

    const classes = useLoginStyles();

    const handleChange = (e) =>{
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setState({
            ...state,
            [name]: value
        })
    }
    const onClick = (e) =>{
        e.preventDefault();
        dispatch(login(state));
    }
    const handleCloseDialog = ()=>{
        console.log("Close");
    }
    return (
        <div className = {classes.root}>
            <AppBarComp/>
            <Paper elevation={4} className = {classes.paper}>
                <Typography align = "center" variant = "h2" className = {classes.title} color = "textSecondary"> Login</Typography>
                <Divider variant = "middle"/>
                <form className = {classes.loginForm}>
                    <TextField required id = "username" label = "Username" className = {classes.element} onChange = {handleChange} name = "username"/>
                    <TextField required id = "password" label = "Password" className = {classes.element} onChange = {handleChange} name = "password"/>
                    <Button onClick = {onClick} type = "submit" 
                        color = "primary" variant = "contained" className = {classes.button}>Login</Button>
                </form>
            </Paper>
        </div>
        );
}

export default LoginPage;