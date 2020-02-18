import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {IconButton} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllUser, fetchSingleUser, OpenPopUpUser} from '../../../redux/Actions/ActionObjects/ActionsObjects'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import DialogUserInfo from '../../../Components/Main/Dialog/DialogUserInfo'
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    container: {
        padding : "50px",
    },
    tableContainer : {
        height: "70vh"
    }
  });

const UserManagerPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const dataResponse = useSelector(state => state.AllUsersReducer);
    var rowPerPage = 10;
    var page = 0;
    const handleChangePage = (event, newPage) => {
        page = newPage;
        dispatch(fetchAllUser({
            page:page,
            size:rowPerPage
        }))
    }

    const handleChangeRowsPerPage = event => {
        rowPerPage = event.target.value;
        dispatch(fetchAllUser({
            page:page,
            size:rowPerPage
        }))
      };

    const handleIconMoreClick = username =>{
        console.log(username);
        dispatch(OpenPopUpUser());
        dispatch(fetchSingleUser({username : username}));
    }
    useEffect(() => {
       dispatch(fetchAllUser({
           page:page,
           size:rowPerPage
       }))
    }, [])

    // const descriptionElementRef = React.useRef(null);
    // useEffect(() => {
    //     if (open) {
    //       const { current: descriptionElement } = descriptionElementRef;
    //       if (descriptionElement !== null) {
    //         descriptionElement.focus();
    //       }
    //     }
    //   }, [open]);
    console.log(dataResponse);
    return (
        <div className = {classes.container}>
        <Paper>
        <TableContainer className = {classes.tableContainer}>
             <Table stickyHeader className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="center" color>Username</TableCell>
                    <TableCell align="center">Phone number</TableCell>
                    <TableCell align="center">Roles</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">More Info</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {dataResponse.content.map(row => (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell align="center">{row.username}</TableCell>
                        <TableCell align="center">{row.password}</TableCell>
                        <TableCell align="center">{row.roles}
                        <IconButton>
                            <EditIcon fontSize = "small"/>
                        </IconButton></TableCell>
                        <TableCell align="center">{row.status === 1 ? "ACTIVE" : "DISABLE"}
                        <IconButton>
                            <EditIcon fontSize = "small"/>
                        </IconButton></TableCell>
                        <TableCell align="center">
                            <IconButton onClick = {()=>handleIconMoreClick(row.username)}>
                            <MoreHorizIcon/>
                            </IconButton>
                            </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={dataResponse.totalElements}
                            rowsPerPage={dataResponse.size}
                            page={dataResponse.number}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
        </Paper>
        <DialogUserInfo />
    </div>
    );
};

export default UserManagerPage;