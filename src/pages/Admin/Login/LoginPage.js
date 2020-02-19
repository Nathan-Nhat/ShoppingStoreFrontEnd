import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, CircularProgress, Typography, Paper, Divider, Checkbox, FormControlLabel } from '@material-ui/core';
import {useLoginStyles} from './LoginPage.style'
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../../../redux/Actions/ActionObjects/ActionsObjects'
import { useHistory } from 'react-router-dom'
function LoginPage(){
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        username : "",
        password : ""
    });
    const history = useHistory();
    const isAuthenticated = useSelector(state => state.AuthenticationReducer)
    const dispatch = useDispatch();

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
        setOpen(true);
        dispatch(login(state));
    }
    console.log(isAuthenticated);
    const handleCloseDialog = ()=>{
        setOpen(false);
        console.log("Close");
    }

    useEffect(()=>{
        if (isAuthenticated === 1){
            history.push('/');
        }
    }, [isAuthenticated])
    return (
        <div className = {classes.root}>
            <Paper elevation={4} className = {classes.paper}>
                <Typography align = "center" variant = "h2" className = {classes.title} color = "textSecondary"> Login</Typography>
                <Divider variant = "middle"/>
                {isAuthenticated === 0? <Typography align = "center" variant = "h6" color = "textSecondary">Invalid Username/Password</Typography> : null}
                {isAuthenticated === 2? <Typography align = "center" variant = "h6" color = "textSecondary">Logout Success</Typography> : null}
                <form className = {classes.loginForm}>
                    <TextField required id = "username" label = "Username" className = {classes.element} onChange = {handleChange} name = "username"/>
                    <TextField required id = "password" label = "Password" className = {classes.element} onChange = {handleChange} name = "password"/>
                    <Button onClick = {onClick} type = "submit" 
                        color = "primary" variant = "contained" className = {classes.button}>Login</Button>
                    <Dialog open = {isAuthenticated === 0 | isAuthenticated === 1? false : open?true: false}
                        onClose = {handleCloseDialog}>
                        <CircularProgress />
                        <Typography>Please wait...</Typography>
                    </Dialog>
                </form>
            </Paper>
        </div>
        );
}

export default LoginPage;