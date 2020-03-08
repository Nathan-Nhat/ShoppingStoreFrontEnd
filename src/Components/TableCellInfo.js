import React from 'react';
import {Box, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyle = makeStyles(theme => ({
    boxLeft : 
    {
        width: "40%", 
        backgroundColor : "#ebf1ff", 
        height: "50px", 
        border : "0.1px solid #ddd", 
        display : "flex", 
        justifyContent: "center", 
        flexDirection : "column"
    },
    boxRight : {
        width: "60%", 
        height: "50px", 
        border : "0.1px solid #ddd", 
        display : "flex", 
        justifyContent: "center", 
        flexDirection : "column"
    }
}))
const TableCellInfo = ({attribute, content}) => {
    const classes = useStyle();
    return (
        <Box>
            <Box style = {{display :"flex", flexDirection : "row"}}>
                <Box className = {classes.boxLeft}>
                    <Typography color = "primary" style = {{fontSize : 16, fontWeight: "bold", textAlign: "center"}}>{attribute}</Typography>
                </Box>
                <Box className = {classes.boxRight}>
                    <Typography color = "primary" style = {{marginLeft : "20px"}}>{content}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default TableCellInfo;