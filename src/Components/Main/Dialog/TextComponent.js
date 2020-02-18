import React from 'react';
import { TextField ,InputAdornment} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
const useStyle = makeStyles({
    root : {
        // height : "100%"
    }
})
const BootstrapInput = withStyles(theme => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);
const TextComponent = ({label, content, isEditable, id, style, isSelect}) => {
    const classes = useStyle();
    console.log(content);
    const component = !isEditable?<TextField variant = "outlined" className = { classes.root} id={id} label={label} value={content}  InputProps={{
        readOnly: true,
        startAdornment: <InputAdornment position="start"></InputAdornment>,
      }} style = {style}/>: 
    (!isSelect? <TextField label = {label} value = {content} variant = "outlined" className = {classes.root}  InputProps={{
        endAdornment: <InputAdornment position="end"><ErrorIcon/></InputAdornment>,
      }} style = {style}/> : <NativeSelect
                                    style = {style}
                                    id="demo-customized-select-native"
                                    value={content}
                                    // onChange={handleChange}
                                    input={<BootstrapInput />}
                                    >
                                    <option value={0}>DISABLE</option>
                                    <option value={20}>ENABLE</option>
                                </NativeSelect>)
    return component;
};

export default TextComponent;