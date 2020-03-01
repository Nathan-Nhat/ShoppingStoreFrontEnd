import React, {useState} from 'react';
import {InputBase, Paper, IconButton} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import {useDispatch, useSelector} from 'react-redux'
import {searchTextChange, searchProduct} from '../../redux/Actions/ActionObjects/ActionsObjects'
const SearchComp = () => {
    const obj = useSelector(state => state.SearchReducer);
    console.log(obj);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        dispatch(searchTextChange(e.target.value));
    }
    const handleClickSearch = (e) => {
        e.preventDefault();
        dispatch(searchProduct(obj));
    }
    return (
            <Paper style = {{display : "flex", padding: "10px", width : "100%"}}>
                <InputBase
                    style = {{ flexGrow : "1", fontSize : "16px", margin: "auto 16px"}}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange = {handleChange}
                />
                <IconButton onClick = {handleClickSearch}>
                    <SearchIcon style = {{opacity : "50%", margin : "auto"}}/>
                </IconButton>
            </Paper>)
};

export default SearchComp;