import React, { useState, useEffect } from 'react'
import { Box, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CardOrder from '../../../../../Components/Main/UserOrderDetails/CardOrder'
import { getData } from '../../../../../API/Api'
const useStyle = makeStyles(theme => ({
    toolBar: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "3px"
    }
}))
export default function OrderUserChild({ type, username}) {
    const classes = useStyle();
    const [state, setState] = useState([{
        id: 0,
        customerName: '',
        dateCreate: '',
        totalPrice: 0,
        image: []
    }])
    useEffect(() => {
        console.log("============================test")
        console.log(state[0])
        getData(`/api/secured/users/${username}/orders?type=${type}`, true)
            .then(response => {
                var newState = response.data;
                setState(newState);
            })
            .catch(error => console.log(error))
    }, [])
    return (
        <div>
            <Toolbar className={classes.toolBar} style={type === "INPROGRESS" ? {} : (type === "COMPLETED" ? { backgroundColor: "#4caf50" } : { backgroundColor: "#ffeb3b" })}>
                <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>{type}</Typography>
            </Toolbar>
            <div>
                {state.map((item, index)=> <CardOrder key = {index} state = {item}/>)
                }
            </div>
        </div>
    )
}
