import React, {useEffect, useState} from 'react';
import {Paper, Box, Typography, Divider,Table, TableRow, Button, TableHead, TableBody, TableCell} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'
import { fetchSingleUser } from '../../../../redux/Actions/ActionObjects/ActionsObjects';
import {useParams, useHistory, useLocation} from 'react-router-dom';
import {makeStyles, withStyles} from '@material-ui/core/styles'
import {submitEditUser} from '../../../../redux/Actions/ActionObjects/ActionsObjects';
import {AppBar, Tab, Tabs} from '@material-ui/core'
import Details from './UserDetails/Details';

const UserDetails = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.SingleUserReducer);
    const { username } = useParams();
    const [value, setValue] = useState(0);
    console.log(currentUser);
    useEffect(()=>{
        dispatch(fetchSingleUser({username}));
    }, [])

    const handleChange = (e, value) =>{

        setValue(value);
    }
    return (
        <div style = {{padding : "30px"}}>
            <Typography style = {{fontSize : "13px"}}>CUSTOMERS</Typography>
            <Typography style = {{fontSize : "25px", fontWeight: "bold"}}>{currentUser.userDetails.name}</Typography>
            <AppBar color = "transparent" position="static" style = {{minWidth : "600px", boxShadow : "none" , marginTop :"20px"}}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="standard"
                    aria-label="full width tabs example"
                >
                    <Tab label="Details" />
                    <Tab label="Orders"  />
                </Tabs>
            </AppBar>
            <Divider style = {{width : "100%"}}></Divider>
            { value === 0 ?<Details currentUser = {currentUser}/> :
            <div>
                123
            </div>}
        </div>
    );
};

export default UserDetails;