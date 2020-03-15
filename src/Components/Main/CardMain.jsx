import React from 'react'
import { Typography, Paper } from '@material-ui/core'

export default function CardMain({ content, value, children }) {
    return (
        <Paper style={{ display: "flex", flexDirection: "row", padding : "15px" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Typography style = {{fontSize : "11px"}}>{content.toUpperCase()}</Typography>
                <Typography style={{ fontSize: "30px", fontWeight: "bold" }}>{value}</Typography>
            </div>
            <div style = {{flexGrow : 1}}></div>
            <div style = {{display : "flex", flexDirection: "column", justifyContent : "center"}}>
                {children}
            </div>

        </Paper>
    )
}
