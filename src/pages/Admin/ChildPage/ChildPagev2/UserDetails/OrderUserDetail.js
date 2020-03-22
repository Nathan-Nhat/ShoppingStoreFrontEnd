import React, {useState, useEffect} from 'react'
import { Box, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CardOrder from '../../../../../Components/Main/UserOrderDetails/CardOrder'
import OrderUserChild from './OrderUserChild'
const useStyle = makeStyles(theme => ({
    toolBar: {
        backgroundColor: theme.palette.primary.main,
        borderRadius : "3px"
    }
}))
export default function OrderUserDetail({username}) {
    const classes = useStyle();
    useEffect(() => {
        
    }, [])
    return (
        <div style={{ padding: "30px", display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <Box style={{ width: "32%" }}>
                <OrderUserChild type = "INPROGRESS" username = {username}/>
            </Box>
            <Box style={{ width: "32%" }}>
                <OrderUserChild type = "COMPLETED" username = {username}/>   
            </Box>
            <Box style={{ width: "32%" }}>
                <OrderUserChild type = "REJECTED" username = {username}/>
            </Box>

        </div>
    )
}
