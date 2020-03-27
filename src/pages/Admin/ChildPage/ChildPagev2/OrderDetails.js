import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

const useStyle = makeStyles(theme => ({
    container : {
        padding : "50px"
    },
    paperContainer : {
        width : "80%",
        display: "flex",
        flexDirection : "column",
        padding : "30px 30px 30px 30px",
        margin : "auto"
    },
    header : {
        display : "flex",
        flexDirection : "row"
    },
    headerBlock : {
        width : "50%",
        display : "flex",
        flexDirection : "column",
        '&>*' : {
            marginTop : "5px",
        }
    }
}))
export default function OrderDetails() {
    const classes = useStyle();
    return (
        <div className = {classes.container}>
            <Paper className = {classes.paperContainer}>
                <div className = {classes.header}>
                    <div className = {classes.headerBlock}>
                        <Typography style = {{fontSize : "25px", fontWeight : "bold"}}>Shoptifun</Typography>
                        <Typography>Address : xxxxxxxxxxxxxxxxxxxxxxxxxxx</Typography>
                        <Typography>Phone : 01234567890</Typography>
                    </div>
                    <div className = {classes.headerBlock}>
                        <Typography style = {{fontSize : "25px", fontWeight : "bold"}}>ORDER</Typography>
                        <Typography>Order Id : xxxxx</Typography>
                        <Typography>Date : xx/xx/xxxx</Typography>
                        <Typography>Amount : x $</Typography>
                    </div>
                </div>
            </Paper>
        </div>
    )
}
