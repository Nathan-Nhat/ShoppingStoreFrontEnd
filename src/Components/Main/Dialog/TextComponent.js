import React from 'react';
import { TextField ,InputAdornment,FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
    root : {
        // height : "100%"
    },
    formControl : {
      width : "250px"
    }
})
const TextComponent = ({label, content, Editable, id, style, isSelect, selectValue}) => {
    const classes = useStyle();
    console.log(content);
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
          value={selectValue.indexOf(content)}
          // onChange={handleChange}
          // labelWidth={labelWidth}
        >
          { selectValue.map((item, index) =>
            <MenuItem value={index}>{item}</MenuItem>)
          } 
        </Select>
      </FormControl>
    return component;
};

export default TextComponent;