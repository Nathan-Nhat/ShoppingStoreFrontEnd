import React from 'react'
import { Paper, Typography, IconButton } from '@material-ui/core'
import ImageOrders from '../Dashboard/ImageOrders'
import MessageRoundedIcon from '@material-ui/icons/MessageRounded';
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';
import {convertToDate} from '../../../API/Tools'
export default function CardOrder({ state }) {
    if (state.id === 0)
    return null
    else
    return (
        <Paper style={{ width: "100%", padding: "15px 20px 10px 25px", marginTop: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <Typography style={{ fontSize: "11px" }}>{`#${state.id}`}</Typography>
                    <div style={{ flexGrow: 1 }}></div>
                    <Typography style={{ fontSize: "12px" }}>{state.customerName}</Typography>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>{convertToDate(state.dateCreate)}</Typography>
                    <div style={{ flexGrow: 1 }}></div>
                    <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>{`${(state.totalPrice/100000/23000).toFixed(2)} $`}</Typography>
                </div>
                <div style={{ marginTop: "10px", display: "flex", flexDirection: "row" }}>
                    <ImageOrders productsImg={state.image} height="80px" width="80px" />
                    <div style={{ flexGrow: 1 }}></div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <IconButton>
                            <MessageRoundedIcon />
                        </IconButton>
                        <IconButton>
                            <OpenInNewRoundedIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        </Paper>
    )
}
