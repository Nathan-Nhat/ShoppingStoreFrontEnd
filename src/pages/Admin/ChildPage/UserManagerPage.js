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
import {useEffect} from 'react'
import {useState} from 'react'
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
    const [state, setState] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const setTablePage = response => {
        setState(response.data.content);
        setPage(response.data.number);
        setRowPerPage(response.data.size);
        setTotal(response.data.totalElements);
    }

    const handleChangePage = (event, newPage) => {
        console.log(event);
        console.log(newPage);
        getData(`/api/admin/all-users?page=${newPage}&size=${rowsPerPage}`,
        response => {setTablePage(response);
        console.log(response)},
        error => console.log(error),
        true);
    }

    const handleChangeRowsPerPage = event => {
        console.log(event.target.value);
        getData(`/api/admin/all-users?page=0&size=${event.target.value}`,
        response => {setTablePage(response);
        console.log(response)},
        error => console.log(error),
        true);
      };
    useEffect(() => {
        getData(`/api/admin/all-users?page=${page}&size=${rowsPerPage}`,
        response => setTablePage(response), 
        error => console.log(error), 
        true)
    }, [])

    return (
        <div className = {classes.container}>
        <Paper>
        <TableContainer className = {classes.tableContainer}>
             <Table className={classes.table} aria-label="simple table">
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
                {state.map(row => (
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
                            count={total}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
        </Paper>
    </div>
    );
};

export default UserManagerPage;