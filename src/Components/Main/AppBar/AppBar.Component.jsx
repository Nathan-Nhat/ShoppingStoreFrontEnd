import React, { Component } from 'react';
import {withStyles, AppBar, Toolbar, IconButton, Button} from '@material-ui/core'
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppBarStyles from './AppBar.Styles'
import {connect} from 'react-redux'
import { toggleOpen } from '../../../redux/Actions/ActionObjects/ActionsObjects';
import clsx from 'clsx';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import Iconlist from '../IconList/Iconlist'
class AppBarComp extends Component {

    handleDrawerOpen = ()=>{
        this.props.toggleDrawerByOpen();
    }
    render() {
        const {isOpen} = this.props.toggleDrawer;
        const {classes} = this.props;
        return (
        <AppBar
        position = "sticky"
        className={classes.AppBar}
        >
            <Toolbar>
                <IconButton
                    onClick={this.handleDrawerOpen}
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
}

const mapStateToProps = (state) => ({
    toggleDrawer : state.ToggleDrawerReducer
})
const mapDispatchToProps = (dispatch) =>({
    toggleDrawerByOpen : ()=>{
        dispatch(toggleOpen())
    }
})

export default withStyles(AppBarStyles)(connect(mapStateToProps, mapDispatchToProps)(AppBarComp));