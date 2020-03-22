import React, { useEffect, useState } from 'react'
import { Paper, Toolbar, TableRow, TableCell, Table, TableHead, Divider, TableBody, Typography, IconButton } from '@material-ui/core'
import { getData } from '../../../API/Api'
import { handleError } from '../../../redux/Actions/ActionObjects/ActionsObjects';
import { useDispatch } from 'react-redux'
import { convertToDate } from '../../../API/Tools'
import { styled, makeStyles } from '@material-ui/core/styles'
import theme from '../../../Themes/DrawerThemes'
import clsx from 'clsx'
import { green, yellow, red } from '@material-ui/core/colors';
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';
import { useHistory } from 'react-router-dom'
import ImageOrders from './ImageOrders'
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
const inprogress = yellow[500];
const reject = red[500];
const done = green[500];
const useStyle = makeStyles(theme => ({
    headTableColor: {
        backgroundColor: theme.palette.primary.main,
        color: "white"
    },
    styleStatus: {
        borderRadius: "10px",
        width: "100px",
        padding: "5px",
        fontSize: "12px",
        margin: "auto",
        boxShadow: "3px -1px 10px -5px rgba(0,0,0,0.75)"
    },
    colorProgress: {
        backgroundColor: inprogress,
    },
    colorDone: {
        backgroundColor: done,
    },
    colorReject: {
        backgroundColor: reject,
        color: "white",
    },

}))

export default function TableOrders() {
    const [state, setState] = useState([]);
    const dispatch = useDispatch();
    const classes = useStyle(theme);
    const history = useHistory();
    useEffect(() => {
        getData("/api/secured/orders/summary?top=10", true)
            .then(response => setState(response.data))
            .catch(error => {
                if (error.response !== undefined) {
                    dispatch(handleError(error.response.data));
                }
            })
    }, [])
    const handleClickMore = () => {
        history.push("/orders/all")
    }
    return (
        <Paper style={{ width: "100%", height: "100%" }} >
            <Toolbar style={{ display: "flex", flexDirection: "row" }}>
                <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>Recently Orders</Typography>
                <div style={{ flexGrow: 1 }}></div>
                <IconButton onClick={handleClickMore}>
                    <MoreVertRoundedIcon fontSize="large" />
                </IconButton>
            </Toolbar>
            <Divider></Divider>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.headTableColor} align="center">ID</TableCell>
                        <TableCell className={classes.headTableColor} align="center">Orders</TableCell>
                        <TableCell className={classes.headTableColor} align="center">Customer</TableCell>
                        <TableCell className={classes.headTableColor} align="center">Update Time</TableCell>
                        <TableCell className={classes.headTableColor} align="center">Total Price</TableCell>
                        <TableCell className={classes.headTableColor} align="center">Status</TableCell>
                        <TableCell className={classes.headTableColor} align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.map((item) =>
                        <TableRow key={item.id}>
                            <TableCell align="center">{item.id}</TableCell>
                            <TableCell align="center">
                                <ImageOrders productsImg={item.image} height="40px" width="40px" />
                            </TableCell>
                            <TableCell align="center">{item.username}</TableCell>
                            <TableCell align="center">{convertToDate(item.dateUpdate)}</TableCell>
                            <TableCell align="center">{`${(item.totalPrice / 100000) / 23000} $`}</TableCell>
                            <TableCell align="center">
                                <Typography className={clsx(classes.styleStatus, item.status === "INPROGRESS" ? classes.colorProgress : item.status === "DONE" ? classes.colorDone : classes.colorReject)}>{item.status}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <IconButton onClick={handleClickMore}>
                                    <OpenInNewRoundedIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Paper>
    )
}
