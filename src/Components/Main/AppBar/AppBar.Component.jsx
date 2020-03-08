import React from 'react';
import {AppBar, Toolbar, IconButton, Button, Typography} from '@material-ui/core'
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useAppBarStyle from './AppBar.Styles'
import { toggleOpen, logout } from '../../../redux/Actions/ActionObjects/ActionsObjects';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import Iconlist from '../IconList/Iconlist'
import {useSelector, useDispatch} from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
export default function AppBarComp() {
    const classes = useAppBarStyle();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.AuthenticationReducer);
    const handleSignout = () => {
        dispatch(logout());
    }
    return (
        <AppBar
        position = "sticky"
        className={classes.AppBar}
        >
            <Toolbar>
                <Button href = "/" style = {{color : "white", fontWeight : "bold", fontSize : "25px"}}>Dashboard</Button>
                <div className= {classes.space}></div>
                {isAuthenticated === 1?<div>
                    <IconButton>
                        <PersonIcon fontSize = "large" style = {{color : "white"}}/>
                    </IconButton>
                    <IconButton>
                        <NotificationsIcon fontSize = "large" style = {{color : "white"}}/>
                    </IconButton>
                    <Button onClick = {handleSignout}>
                        <ExitToAppIcon fontSize = "large" style = {{color : "white"}}/>
                        <Typography style = {{fontWeight : "bold", color : "white"}}>Sign out</Typography>
                    </Button>
                </div> : null}
            </Toolbar>
        </AppBar>
        );
}
