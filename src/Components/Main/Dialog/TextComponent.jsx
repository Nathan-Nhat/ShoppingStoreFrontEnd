import React from 'react';
import { TextField ,InputAdornment,FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {useStore, useDispatch, useSelector} from 'react-redux'
import { changeUserRole, changeUserStatus } from '../../../redux/Actions/ActionObjects/ActionsObjects';
const useStyle = makeStyles({
    root : {
        // height : "100%"
    },
    formControl : {
      width : "250px"
    }
})
const convertRolestoValue = (role) => {
  switch(role){
    case "ADMIN" : 
      return 1;
    case "CUSTOMER": 
      return 0;
    default:
      return 0;
  }
}

const convertValueToRoles = (value) => {
  switch(value){
    case 1 : 
      return "ADMIN";
    case 0: 
      return "CUSTOMER";
    default:
      return "CUSTOMER";
  }
}


const TextComponent = ({label, name ,content, Editable, id, style, isSelect}) => {
    const classes = useStyle();
    const currentUser = useSelector(state => state.EditFormReducer);
    console.log(currentUser);
    const dispatch = useDispatch();
    const handleChange = (e)=> {
      console.log(e.target.name + "- "+ e.target.value)
      if (e.target.name === "roles")
        dispatch(changeUserRole(convertValueToRoles(e.target.value)))
      else
        dispatch(changeUserStatus(e.target.value));
    }
    const component = !Editable || !isSelect? <TextField variant = "outlined" className = { classes.root} id={id} label={label} value={content}  InputProps={{
        readOnly: true,
        startAdornment: <InputAdornment position="start"></InputAdornment>,
      }} style = {style}/> : 
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Age
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={name === "roles"? convertRolestoValue(currentUser.roles) : currentUser.status}
          name = {name}
          onChange={handleChange}
          // labelWidth={labelWidth}
        >
         <MenuItem value={0}>{name === "roles" ? "CUSTOMER" : "DISABLE"}</MenuItem>
         <MenuItem value={1}>{name === "roles" ? "ADMIN" : "ACTIVE"}</MenuItem>

        </Select>
      </FormControl>
    return component;
};

export default TextComponent;