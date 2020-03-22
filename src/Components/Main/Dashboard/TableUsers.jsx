import React, { useEffect, useState } from 'react'
import { Paper, Toolbar, TableRow, TableCell, Table, TableHead, Divider, TableBody, Typography, IconButton, FormControl } from '@material-ui/core'
import { getData } from '../../../API/Api'
import { handleError } from '../../../redux/Actions/ActionObjects/ActionsObjects';
import { useDispatch } from 'react-redux'
import { Select, MenuItem } from '@material-ui/core'
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
    nameCell : {
        margin : "auto 0",
        '&:hover' : {
            cursor : "pointer",
        }
    }

}))
export default function TableUsers() {
    const [state, setState] = useState([]);
    const dispatch = useDispatch();
    const classes = useStyle(theme);
    const history = useHistory();
    const [selected, setSelected] = useState(7);
    useEffect(() => {
        getData(`/api/secured/analyst/users?num-days=${selected}&top=10`, true)
            .then(response => setState(response.data))
            .catch(error => {
                if (error.response !== undefined) {
                    dispatch(handleError(error.response.data));
                }
            })
    }, [])
    const handleChange = (e) => {
        let newVal = e.target.value;
        getData(`/api/secured/analyst/users?num-days=${newVal}&top=10`, true)
            .then(response => {
                setState(response.data);
                setSelected(newVal)
            })
            .catch(error => {
                if (error.response !== undefined) {
                    dispatch(handleError(error.response.data));
                }
            })
        console.log("change")
    }
    return (
        <Paper style={{ width: "100%", height: "100%" }}>
            <Toolbar style={{ display: "flex", flexDirection: "row" }}>
                <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>Top Users Orders</Typography>
                <div style={{ flexGrow: 1 }}></div>
                <FormControl style={{ width: "150px" }}>
                    <Select
                        value={selected}
                        onChange={handleChange}
                    >
                        <MenuItem value={7}>Last 7 days</MenuItem>
                        <MenuItem value={30}>Last month</MenuItem>
                        <MenuItem value={90}>Last 3 months</MenuItem>
                    </Select>
                </FormControl>
            </Toolbar>
            <Divider></Divider>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.headTableColor} align="center">ID</TableCell>
                        <TableCell className={classes.headTableColor} align="center">Customer</TableCell>
                        <TableCell className={classes.headTableColor} align="center">Total paids</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.map((item, index) =>
                        <TableRow key={item.id}>
                            <TableCell align="center">{item.id}</TableCell>
                            <TableCell align="center" style = {{display : "flex", flexDirection : "row", justifyContent : "center"}}>
                                {index === 0 && item !== null ? <img style={{ width: "40px", height: "40px" }} src="https://thumbs.dreamstime.com/b/mvp-gold-medal-award-white-background-vector-stock-illustration-mvp-gold-medal-award-white-background-vector-stock-169797733.jpg"></img> : null}
                                <Typography className = {classes.nameCell} onClick = {()=>{history.push(`users/${item.username}`)}}>{item.name}</Typography>
                            </TableCell>
                            <TableCell align="center">{`${item.totalOrders / 100000 / 23000} $`}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Paper>
    )
}
