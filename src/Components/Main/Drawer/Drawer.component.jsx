import React, {useState} from 'react';
import useDrawerStyles from './DrawerStyles';
import clsx from 'clsx'
import {List,Divider, ListItem, ListItemText, Drawer, ListItemIcon} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ListItemAvatar, Avatar } from '@material-ui/core';
import {IconButton, Typography, Collapse } from '@material-ui/core';
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
]
export default function DrawerComponent() {
    const classes = useDrawerStyles();
    const history = useHistory();
    const isOpen = useSelector(state => state.ToggleDrawerReducer);
    const [expanded, setExpanded] = useState(false);
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
    const handleProductClick = () => {
        setExpanded(!expanded);
    }

    const handleClickAddProduct = () => {
        history.push("/add-product");
    }
    const handleClickProduct = () => {
        history.push("products");
    }
    const handleClickEditProduct = () =>{
        history.push("/edit-product");
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
                        {
                        listItemObject.map((item, index)=>{
                            return(
                                <ListItem button
                                className = {classes.listItem}
                                    onClick = {() => handleItemClick(item.id)}>
                                    {item.icon === "InboxIcon"? <InboxIcon className = {classes.center} style={{ color: "#ffffff" }}/> : null}
                                <ListItemText primary = {<Typography color = "textPrimary">{item.label}</Typography>}/>
                                </ListItem>
                            )
                            })
                        }
                        <ListItem button  className = {classes.listItem} onClick = {handleProductClick}>
                            <InboxIcon className = {classes.center} style={{ color: "#ffffff" }}/>
                            <ListItemText primary = {<Typography color = "textPrimary">Product</Typography>}/>
                                <ExpandMoreIcon  className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}/>
                        </ListItem>
                        <Collapse in = {expanded} timeout = "auto" unmountOnExit className = {classes.collapse}>
                            <ListItem button  className = {classes.listItem} onClick = {handleClickProduct}>
                                <InboxIcon className = {classes.center} style={{ color: "#ffffff" }}/>
                                <ListItemText primary = {<Typography color = "textPrimary">Product</Typography>}/>
                            </ListItem>
                            <ListItem button  className = {classes.listItem} onClick = {handleClickAddProduct}>
                                <InboxIcon className = {classes.center} style={{ color: "#ffffff" }}/>
                                <ListItemText primary = {<Typography color = "textPrimary">Add Product</Typography>}/>
                            </ListItem>
                            <ListItem button  className = {classes.listItem} onClick = {handleClickEditProduct}>
                                <InboxIcon className = {classes.center} style={{ color: "#ffffff" }} />
                                <ListItemText primary = {<Typography color = "textPrimary">Edit Product</Typography>}/>
                            </ListItem>
                        </Collapse>
                        <ListItem button  className = {classes.listItem}>
                                    <InboxIcon className = {classes.center} style={{ color: "#ffffff" }}/>
                                    <ListItemText primary = {<Typography color = "textPrimary">Add Product</Typography>}/>
                        </ListItem>

                        
                            
                    </List>
                </Drawer>
        );
    }