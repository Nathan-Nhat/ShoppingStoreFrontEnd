import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {IconButton, Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import Skeleton from '@material-ui/lab/Skeleton';
import {fetchAllProduct} from '../../../../redux/Actions/ActionObjects/ActionsObjects'
const ProductsPage = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const allProduct = useSelector(state => state.AllProductReducer);
    console.log(allProduct);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchAllProduct({page, size}));
    }, []);
    return (
        <Container>
        <Paper>
        <TableContainer>
             <Table stickyHeader aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Date Modified</TableCell>
                    <TableCell align="center">Number Click</TableCell>
                    <TableCell align="center">Number Ordered</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {allProduct.map((row, index)=><TableRow key = {index}>
                        <TableCell>{`xxxx`}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center">{row.lastUpdate}</TableCell>
                        <TableCell align="center">{row.numClick}</TableCell>
                        <TableCell align="center">{row.numOrdered}</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            // count={dataResponse.totalElements}
                            // rowsPerPage={dataResponse.size}
                            // page={dataResponse.number}
                            // onChangePage={handleChangePage}
                            // onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
        </Paper>
    </Container>
    );
};

export default ProductsPage;