import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import {Button, Container, AppBar, Tab, Tabs, Divider, Typography} from '@material-ui/core'
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import SearchComp from '../../../../Components/Main/SearchComp'
import {searchProduct, pageChange, sizeChange, deleteProduct, categoryChange} from '../../../../redux/Actions/ActionObjects/ActionsObjects'
import { deleteData } from '../../../../API/Api';
import Skeleton from '@material-ui/lab/Skeleton';
import {searchTextChange} from '../../../../redux/Actions/ActionObjects/ActionsObjects'
import {withStyles, makeStyles} from '@material-ui/core/styles'
const useStyle = makeStyles({
    textName : {
        float : "left",
        '&:hover' : {
            cursor : "pointer",
            textDecoration : "underline",
        }
    }
})
const StyledTableCell = withStyles(theme => ({
    body: {
      fontSize: 14,
    },
  }))(TableCell);
const ProductsPage = () => {
    const objSearch = useSelector(state => state.SearchReducer); 
    const allProduct = useSelector(state => state.AllProductReducer);
    console.log(allProduct);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyle();
    useEffect(()=>{
        setLoading(true);
        dispatch(searchProduct(objSearch));
    }, []);
    const handleChangePage = (event, newPage) => {
        dispatch(pageChange(newPage));
        setLoading(true);
    }

    const handleChangeRowsPerPage = event => {
        var rowPerPage = event.target.value;
        dispatch(sizeChange(rowPerPage));
        setLoading(true);
      };
    const handleDeleteProduct = (e, id) => {
       dispatch(deleteProduct({objSearch,
                                id : id}));
        setLoading(true);
    }
    useEffect(()=>{
        dispatch(searchProduct(objSearch));
    }, [objSearch.page, objSearch.size, objSearch.category])

    const handleChange = (e, value) => {
        console.log(value)
        dispatch(categoryChange(value));
        setLoading(true);
    }

    useEffect(()=>{
        if (allProduct.content.length !== 0){
            setLoading(false);
        }
    }, [allProduct])

    const obj = useSelector(state => state.SearchReducer);
    const handleSearchChange = (e) => {
        dispatch(searchTextChange(e.target.value));
    }
    const handleClickSearchChange = (e) => {
        e.preventDefault();
        dispatch(searchProduct(obj));
    }

    return (
        <div style = {{padding : "50px"}}>
            <Typography style = {{fontSize : "30px", fontWeight : "bold", textDecoration : "underline"}}>Products</Typography>
            <AppBar position="static" color="transparent" style = {{minWidth : "600px", boxShadow : "none"}}>
                <Tabs
                    value={objSearch.category}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="All" />
                    <Tab label="Phones"  />
                    <Tab label="Laptops"  />
                    <Tab label="Watches"  />
                    <Tab label="Accessories" />
                    <Tab label="Cameras" />
                    <Tab label="Sports" />
                </Tabs>
            </AppBar>
            <Divider/>
            <div style = {{width : "450px", margin : "30px 0 30px 0"}}>
                <SearchComp handleChange = {handleSearchChange} handleClickSearch = {handleClickSearchChange} obj = {obj}/>
            </div>
            <Paper style = {{minWidth : "600px"}}>
            <TableContainer component = {Paper}>
                <Table aria-label="simple table">
                <TableHead>
                <TableRow hover>
                    <StyledTableCell align="center">Image</StyledTableCell>
                    <StyledTableCell align="left">Name</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    <StyledTableCell align="center">Date Modified</StyledTableCell>
                    <StyledTableCell align="center">More</StyledTableCell>
                </TableRow>
                </TableHead>
                {loading? <TableBody>
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map((row, idx) => (<TableRow key = {idx} hover>
                        <StyledTableCell><Skeleton animation="wave" /></StyledTableCell>
                        <StyledTableCell align="left"><Skeleton animation="wave" /></StyledTableCell>
                        <StyledTableCell align="center"><Skeleton animation="wave" /></StyledTableCell>
                        <StyledTableCell align="center"><Skeleton animation="wave" /></StyledTableCell>
                        <StyledTableCell align="center"><Skeleton animation="wave" /></StyledTableCell>
                    </TableRow>))}
                </TableBody>
                : 
                <TableBody>
                {(allProduct.content.map((row, index)=><TableRow key = {index} hover>
                        <StyledTableCell><img style = {{height : "100px", width : "100px"}} src = {row.imageMain}/></StyledTableCell>
                        <StyledTableCell align="left">
                            <Typography onClick = {()=>{history.push(`/products/${row.id}`)}} className = {classes.textName}>
                                {row.name}
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.price/10000}</StyledTableCell>
                        <StyledTableCell align="center">{row.lastUpdate.substring(0,10)}</StyledTableCell>
                        <StyledTableCell align="center">
                            <div style= {{display : "flex", flexDirection : "column"}}>
                            <Button variant = "outlined" color = "primary" onClick = {()=>{history.push(`/products/${row.id}`)}}>Detail</Button>
                            <Button variant = "outlined" color = "primary" onClick = {(e) => handleDeleteProduct(e, row.id)}  style = {{marginTop :"10px"}}>Delete</Button>
                            </div>
                        </StyledTableCell>
                    </TableRow>))}
                </TableBody>}
               </Table>
        </TableContainer>
        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component= {Paper}
                            count={allProduct.totalElements ? allProduct.totalElements : 0}
                            rowsPerPage={allProduct.size ? allProduct.size : 0}
                            page={allProduct.number ? allProduct.number : 0}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
        </Paper>
    </div>
    );
};

export default ProductsPage;