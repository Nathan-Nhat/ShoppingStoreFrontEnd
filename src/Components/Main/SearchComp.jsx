import React, {useState} from 'react';
import {InputBase, Paper, Button} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import {useDispatch, useSelector} from 'react-redux'
import {searchTextChange, searchProduct} from '../../redux/Actions/ActionObjects/ActionsObjects'
const SearchComp = ({obj, handleChange, handleClickSearch}) => {
    return (
        <div style = {{display: "flex", flexDirection : "row"}}>
            <Paper style = {{display : "flex", padding: "10px"}}>
                <SearchIcon style = {{opacity : "50%", margin : "auto"}}/>
                <InputBase
                    style = {{ flexGrow : "1", fontSize : "16px", margin: "auto 16px"}}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange = {handleChange}
                >
                </InputBase>
            </Paper>
            <Button onClick = {handleClickSearch} variant = "contained" style = {{marginLeft : "20px", backgroundColor :"white", fontSize : "14px", fontWeight : "bold"}}> Search
            </Button>
        </div>)
};

export default SearchComp;