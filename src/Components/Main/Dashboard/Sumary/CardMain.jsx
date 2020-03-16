import React, {useEffect, useState} from 'react'
import { Typography, Paper } from '@material-ui/core'
import { getData } from '../../../../API/Api'
import {makeStyles} from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyle = makeStyles(theme => ({
    container : {
        display: "flex", 
        flexDirection: "row", 
        padding : "15px"  
    },
    containerIncome : {
        backgroundColor : theme.palette.primary.main,
    },
    textContainer : {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center" 
    },
    textContent : {
        fontSize : "11px"
    },
    textColor : {
        color : "white",
    },
    textValue : {
        fontSize: "30px", 
        fontWeight: "bold"
    },
    icon : {
        display : "flex", 
        flexDirection: "column", 
        justifyContent : "center"
    }
}))

export default function CardMain({ content, value, children, link, type }) {
    const classes = useStyle();
    const [state, setState] = useState(0);
    useEffect(()=>{
        getData(`/api/secured${link}`, true)
        .then(response => setState(response.data.message))
        .catch(error=> console.log(error));
    }, []);
    const convertRevenue = (input)=>{
        var temp = input / 100000;
        temp = temp / 23000;
        var ret = "$ " + temp;
        return ret
    }
    return (
        <Paper className = {clsx(classes.container, type === "revenue" && classes.containerIncome)} >
            <div className = {classes.textContainer}>
                <Typography className = {clsx(classes.textContent, type ==="revenue" && classes.textColor)}>{content.toUpperCase()}</Typography>
                <Typography className = {clsx(classes.textValue, type === "revenue" && classes.textColor)}>{type === "revenue" ?convertRevenue(state) : state}</Typography>
            </div>
            <div style = {{flexGrow : 1}}></div>
            <div className = {classes.icon}>
                {children}
            </div>

        </Paper>
    )
}
