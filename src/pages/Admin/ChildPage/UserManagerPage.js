import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, Typography, Toolbar} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllUser, OpenPopUpUser, changeSelectedUser, userSearchTextChange, userSizeChange, userPageChange} from '../../../redux/Actions/ActionObjects/ActionsObjects'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DialogUserInfo from '../../../Components/Main/Dialog/DialogUserInfo'
import Skeleton from '@material-ui/lab/Skeleton';
import SearchComp from '../../../Components/Main/SearchComp';

const useStyles = makeStyles({
    container: {
        width: '100%'
    },
    tableContainer : {
        height: "70vh",
    },
    skeleton : {
        height: "70vh"
    }
  });

const StyledTableCell = withStyles(theme => ({
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const UserManagerPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const dataResponse = useSelector(state => state.AllUsersReducer);
    const [state, setState] = useState({isOpen : false , username : "", email : "", avatar_url : "", name :"", date : ""});
    const objUserSearch = useSelector(state => state.UserSearchReducer); 

    var rowPerPage = 10;
    var page = 0;
    console.log(dataResponse)
    const handleChangePage = (event, newPage) => {
        page = newPage;
        dispatch(userPageChange(page));
    }

    const handleChangeRowsPerPage = event => {
        rowPerPage = event.target.value;
        dispatch(userSizeChange(rowPerPage))
      };

    const handleIconMoreClick = (username, email, avatar_url, name, date) =>{
        setState({isOpen : true, username : username, email, avatar_url , name, date})
    }

    useEffect(()=>{
        dispatch(fetchAllUser(objUserSearch));
    }, [objUserSearch.page, objUserSearch.size, objUserSearch.category])

    const handleCloseDialog = () => {
        setState({...state, isOpen : false})
    }

    const handleUserChange = (e) =>{
        dispatch(userSearchTextChange(e.target.value))
    }
    const handleUserClickChange = () =>{
        dispatch(fetchAllUser(objUserSearch));
    }
    return (
        <div style = {{padding : "50px"}}>
        <Typography style = {{marginTop : "10px"}}>Managerment</Typography>
        <Typography style = {{fontSize : "30px", fontWeight :"bold"}}>Customer</Typography>
        <div  style = {{marginTop : "10px"}}>
        <SearchComp handleChange = {handleUserChange} handleClickSearch = {handleUserClickChange}/>
        </div>
        <Typography style = {{marginTop : "20px"}} >{`${dataResponse.totalElements} Records found. Page ${dataResponse.number + 1} of ${dataResponse.totalPages + 1}`}</Typography>
        <Paper className = {classes.container} style = {{marginTop : "10px"}}>
        <TableContainer className = {classes.tableContainer}>
             <Table aria-label="simple table" >
                <TableHead>
                <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell align="left">Name</StyledTableCell>
                    <StyledTableCell align="left" >Username</StyledTableCell>
                    <StyledTableCell align="left">Phone number</StyledTableCell>
                    <StyledTableCell align="left">Roles</StyledTableCell>
                    <StyledTableCell align="left">Status</StyledTableCell>
                    <StyledTableCell align="Right">Action</StyledTableCell>
                </TableRow>
                </TableHead>
                {dataResponse.content == null? (<TableBody>
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map((row, idx) => (<TableRow key = {idx} hover>
                        <StyledTableCell><Skeleton animation="wave" /></StyledTableCell>
                        <StyledTableCell align="left" color><Skeleton animation="wave" /></StyledTableCell>
                        <StyledTableCell align="left" color><Skeleton animation="wave" /></StyledTableCell>
                        <StyledTableCell align="left"><Skeleton animation="wave" /></StyledTableCell>
                        <StyledTableCell align="left"><Skeleton animation="wave" /></StyledTableCell>
                        <StyledTableCell align="left"><Skeleton animation="wave" /></StyledTableCell>
                        <StyledTableCell align="Right"><Skeleton animation="wave" /></StyledTableCell>
                    </TableRow>))}
                </TableBody>)
                : 
                (<TableBody>
                    {dataResponse.content.map(row => (
                    <TableRow key={row.id} hover>
                        <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                        <StyledTableCell align="left">
                            <div style = {{display : "flex", flexDirection : "row"}}>
                                <img src = {row.userDetails.avatarUrl} style = {{borderRadius: "50%", width : "50px", height : "50px"}}/>
                                <div style = {{display : "flex", flexDirection: "column", justifyContent :"center", marginLeft : "20px"}}>
                                    <Typography style = {{fontWeight :"bold", textAlign :"left"}}> {row.userDetails.name}</Typography>
                                    <Typography>{row.userDetails.email}</Typography>
                                </div>
                            </div>
                        </StyledTableCell>
                        <StyledTableCell align="left">{row.username}</StyledTableCell>
                        <StyledTableCell align="left">{row.userDetails.phone}</StyledTableCell>
                        <StyledTableCell align="left">{row.roles}</StyledTableCell>
                        <StyledTableCell align="left">{row.status === 1 ? "ACTIVE" : "DISABLE"}</StyledTableCell>
                        <StyledTableCell align="Right">
                            <Button variant = "outlined" color = "primary" onClick = {()=>handleIconMoreClick(row.username, row.userDetails.email, row.userDetails.avatarUrl, row.userDetails.name, row.dateCreated)}>
                                View
                            </Button>
                            </StyledTableCell>
                    </TableRow>
                ))}
                    </TableBody>)}
                   
            </Table>
            </TableContainer>
            <TablePagination
                                component="div"
                                style = {{postion : "fixed", bottom : 0}}
                                rowsPerPageOptions={[10, 25, 100]}
                                count={dataResponse.totalElements}
                                rowsPerPage={dataResponse.size === 0 ? 10 : dataResponse.size}
                                page={dataResponse.number}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                    />

        <DialogUserInfo setClose = {handleCloseDialog} isOpen = {state.isOpen} username = {state.username} email = {state.email} avatar_url = {state.avatar_url} name = {state.name} date = {state.date.substring(0, 10)}/>
    </Paper>
    </div>
    );
};

export default UserManagerPage;