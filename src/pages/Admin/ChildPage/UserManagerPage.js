import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import {getData} from '../../../API/Api.js'
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { fetchAllUserFail } from '../../../redux/Actions/ActionObjects/ActionsObjects.js';
import {fetchAllUser} from '../../../redux/Actions/ActionObjects/ActionsObjects'
import AllUsersReducer from '../../../redux/Reducer/ChildReducers/AllUsersReducer'
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
    useEffect(() => {
       dispatch(fetchAllUser({
           page:page,
           size:rowPerPage
       }))
    }, [])
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
                    <TableCell align="center">Password</TableCell>
                    <TableCell align="center">Roles</TableCell>
                    <TableCell align="center">Status</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {dataResponse.content.map(row => (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell align="center">{row.username}</TableCell>
                        <TableCell align="center">{row.password}</TableCell>
                        <TableCell align="center">{row.roles}</TableCell>
                        <TableCell align="center">{row.status}</TableCell>
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
    </div>
    );
};

export default UserManagerPage;