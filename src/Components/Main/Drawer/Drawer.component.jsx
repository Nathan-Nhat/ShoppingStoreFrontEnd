import React, { Component } from 'react';
import DrawerStyles from './DrawerStyles';
import clsx from 'clsx'
import {withStyles,List,Divider, ListItem, ListItemText, Drawer, ListItemIcon} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ListItemAvatar, Avatar } from '@material-ui/core';
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
const listItemObject = [{
    id : 1,
    label : "Dashboard",
    icon : "InboxIcon"
},
{
    id : 2,
    label : "Users",
    icon : "InboxIcon"
},
{
    id : 3,
    label : "Test3",
    icon : "InboxIcon"
},
]
class DrawerComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected : -1,
        }
    }
    handleItemClick = (id) => {
        switch(id){
            case 1: 
                this.props.history.push("/");
                break;
            case 2:
                this.props.history.push("/users");
                break;
            default:
                break;
        }
    }
    render() {
        const isOpen = this.props.toggleDrawer.isOpen;
        const {classes} = this.props;
        const {selected} = this.state;
        console.log(this.props)
        return (
                <Drawer variant = "permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: isOpen,
                    [classes.drawerClose] : !isOpen
                    })}
                classes={{
                    paper: clsx(classes.drawer, {
                    [classes.drawerOpen]: isOpen,
                    [classes.drawerClose] : !isOpen
                    }),
                }}
                onMouseEnter = {this.mouseEnter}
                onMouseLeave = {this.mouseLeave}>
                    <List >
                        <ExpansionPanel className={classes.expandPanel}>
                            <ExpansionPanelSummary  className={classes.expandPanelSumary}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar
                                        alt={`123`}
                                        src={`https://www.w3schools.com/w3css/img_lights.jpg`}
                                    />
                                    </ListItemAvatar>
                                    <ListItemText primary = "Tran Trung Nhat"/>
                                </ListItem>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Typography>
                                log out
                            </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <Divider variant="middle" classes = {{root: classes.divider}} />
                        {
                        listItemObject.map((item, index)=>{
                            return(
                                <ListItem button
                                className = {classes.listItem}
                                    onClick = {() => this.handleItemClick(item.id)}>
                                    <ListItemIcon  className = {classes.listIcon}>
                                        {item.icon === "InboxIcon"? <InboxIcon className = {classes.center} style={{ color: "#ffffff" }}/> : null}
                                    </ListItemIcon>
                                <ListItemText primary = {<Typography color = "textPrimary">{item.label}</Typography>}/>
                                </ListItem>
                            )
                            })
                        }
                    </List>
                </Drawer>
        );
    }
}

const mapStateToProps = (state) => ({toggleDrawer : state.ToggleDrawerReducer});

export default withStyles(DrawerStyles)(withRouter((connect(mapStateToProps, null)(DrawerComponent))));