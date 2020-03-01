import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import {Button, Container} from '@material-ui/core'
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import SearchComp from '../../../../Components/Main/SearchComp'
import {searchProduct, pageChange, sizeChange, deleteProduct} from '../../../../redux/Actions/ActionObjects/ActionsObjects'
import { deleteData } from '../../../../API/Api';
const ProductsPage = () => {
    const objSearch = useSelector(state => state.SearchReducer); 
    const allProduct = useSelector(state => state.AllProductReducer);
    console.log(allProduct);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(()=>{
        dispatch(searchProduct(objSearch));
    }, []);
    const handleChangePage = (event, newPage) => {
        dispatch(pageChange(newPage));
    }

    const handleChangeRowsPerPage = event => {
        var rowPerPage = event.target.value;
        dispatch(sizeChange(rowPerPage));
      };
    const handleDeleteProduct = (e, id) => {
       dispatch(deleteProduct({objSearch,
                                id : id}));
    }
    useEffect(()=>{
        dispatch(searchProduct(objSearch));
    }, [objSearch.page, objSearch.size])
    return (
    <Container>
        <div style = {{width : "450px", margin : "30px 0 30px 0", float : "right"}}>
            <SearchComp />
        </div>
        <TableContainer component = {Paper}>
             <Table stickyHeader aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Date Modified</TableCell>
                    <TableCell align="center">More</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {allProduct.content.map((row, index)=><TableRow key = {index}>
                        <TableCell><img style = {{height : "100px", width : "100px"}} src = {row.imageMain}/></TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center">{row.lastUpdate}</TableCell>
                        <TableCell align="center">
                            <Button onClick = {()=>{history.push(`/products/${row.id}`)}}>Detail</Button>
                            <Button onClick = {(e) => handleDeleteProduct(e, row.id)}>Delete</Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component= {Paper}
                            count={allProduct.totalElements}
                            rowsPerPage={allProduct.size}
                            page={allProduct.number}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />

    </Container>
    );
};

export default ProductsPage;