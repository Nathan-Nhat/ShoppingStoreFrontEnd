import React from 'react';
import useDrawerStyles from './DrawerStyles';
import clsx from 'clsx'
import {List,Divider, ListItem, ListItemText, Drawer, ListItemIcon} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ListItemAvatar, Avatar } from '@material-ui/core';
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
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
export default function DrawerComponent() {
    const classes = useDrawerStyles();
    const history = useHistory();
    const isOpen = useSelector(state => state.ToggleDrawerReducer);
    console.log(isOpen);
    const handleItemClick = (id) => {
        switch(id){
            case 1: 
                history.push("/");
                break;
            case 2:
                history.push("/users");
                break;
            default:
                break;
            }
        }
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
                }}>
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
                                    onClick = {() => handleItemClick(item.id)}>
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