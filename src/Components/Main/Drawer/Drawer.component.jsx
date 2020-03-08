import React, {useState} from 'react';
import useDrawerStyles from './DrawerStyles';
import clsx from 'clsx'
import {List,Divider, ListItem, ListItemText, Box} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ListItemAvatar, Avatar } from '@material-ui/core';
import {Paper, Typography, Collapse } from '@material-ui/core';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
export default function DrawerComponent() {
    const classes = useDrawerStyles();
    const history = useHistory();
    const [expanded, setExpanded] = useState(false);
    const currentUser = useSelector(state => state.SingleUserReducer);
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
    const handleProductClick = () => {
        setExpanded(!expanded);
    }

    const handleClickAddProduct = () => {
        history.push("/add-product");
    }
    const handleClickProduct = () => {
        history.push("/products");
    }
        return (
            <Paper style={{height: "100%", overflow: 'auto', width : "240px", position : "fixed"}} square>
                <List>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar
                                alt={`123`}
                                src={`https://www.w3schools.com/w3css/img_lights.jpg`}
                            />
                            </ListItemAvatar>
                            <ListItemText primary = "Tran Trung Nhat"/>
                        </ListItem>
                        <Divider variant="middle" classes = {{root: classes.divider}} />
                       
                        <ListItem button  className = {classes.listItem} onClick = {()=>handleItemClick(1)}>
                            <DashboardRoundedIcon className = {classes.center} style={{ marginRight: "20px" }}/>
                            <ListItemText primary = {<Typography color = "textPrimary">Dashboard</Typography>}/>
                        </ListItem>

                        <ListItem button  className = {classes.listItem} onClick = {()=>handleItemClick(2)}>
                            <GroupRoundedIcon className = {classes.center} style={{ marginRight: "20px" }}/>
                            <ListItemText primary = {<Typography color = "textPrimary">Users</Typography>}/>
                        </ListItem>

                        <ListItem button  className = {classes.listItem} onClick = {handleProductClick}>
                            <SettingsRoundedIcon className = {classes.center} style={{ marginRight: "20px" }}/>
                            <ListItemText primary = {<Typography color = "textPrimary">Product</Typography>}/>
                                <ExpandMoreIcon  className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}/>
                        </ListItem>
                        <Collapse in = {expanded} timeout = "auto" unmountOnExit>
                            <ListItem button  className = {classes.listItem} onClick = {handleClickProduct}>
                                <Box className = {classes.center} style={{ marginRight: "20px" , width :"20px" }}/>
                                <ListItemText primary = {<Typography color = "textPrimary">Product</Typography>}/>
                            </ListItem>
                            <ListItem button  className = {classes.listItem} onClick = {handleClickAddProduct}>
                                <Box className = {classes.center} style={{ marginRight: "20px", width :"20px"}}/>
                                <ListItemText primary = {<Typography color = "textPrimary">Add Product</Typography>}/>
                            </ListItem>
                        </Collapse>
                        <ListItem button  className = {classes.listItem}>
                                    <InboxIcon className = {classes.center} style={{ marginRight: "20px" }}/>
                                    <ListItemText primary = {<Typography color = "textPrimary">Add Product</Typography>}/>
                        </ListItem>
                </List>
            </Paper>
        );
    }