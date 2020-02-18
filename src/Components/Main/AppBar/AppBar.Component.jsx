import React from 'react';
import {AppBar, Toolbar, IconButton, Button} from '@material-ui/core'
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useAppBarStyle from './AppBar.Styles'
import { toggleOpen } from '../../../redux/Actions/ActionObjects/ActionsObjects';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import Iconlist from '../IconList/Iconlist'
import {useSelector, useDispatch} from 'react-redux';
export default function AppBarComp() {
    const classes = useAppBarStyle();
    const isOpen = useSelector(state => state.ToggleDrawerReducer);
    const dispatch = useDispatch();
    const handleDrawerOpen = () => {
        dispatch(toggleOpen());
    }
    return (
        <AppBar
        position = "sticky"
        className={classes.AppBar}
        >
            <Toolbar>
                <IconButton
                    onClick={handleDrawerOpen}
                    elevation = {3}
                    className = {classes.menuButton}
                >
                    {!isOpen?<ArrowForwardRoundedIcon color = "secondary" size = "large"/> : 
                    <MoreVertIcon color = "secondary" size = "large"/> }
                </IconButton>
                <Button color = "secondary" size="large" href = "/">Dashboard</Button>
                <div className= {classes.space}></div>
                <Iconlist icon = {<NotificationsIcon color = "secondary"/>}/>
                <Iconlist icon = {<PersonIcon color = "secondary"/>}/>
            </Toolbar>
        </AppBar>
        );
}
