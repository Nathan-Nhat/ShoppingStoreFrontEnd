import React, { useEffect } from 'react';
import CardMain from '../../../Components/Main/CardMain'
import MouseRoundedIcon from '@material-ui/icons/MouseRounded';
import { Typography, Paper } from '@material-ui/core';
import Chart from '../../../Components/Main/Dashboard/ChartComponent';
import TableUsers from '../../../Components/Main/Dashboard/TableUsers';
import TableOrders from '../../../Components/Main/Dashboard/TableOrders';
import ChartComponent from '../../../Components/Main/Dashboard/ChartComponent';
const MainManagerPage = () => {

    return (
        <div style={{ padding: "30px" }}>
            <Typography>Dashboard</Typography>
            <Typography>Hello Admin</Typography>
            <Typography>Here's what's happening</Typography>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ width: "24%", minWidth: "150px" }}>
                    <CardMain content="Total Click" value="1234">
                        <MouseRoundedIcon style={{
                            fontSize: "40px", padding: "10px", fontWeight: "bold",
                            borderRadius: "50%", color: "white", backgroundColor: "green"
                        }} />
                    </CardMain>
                </div>
                <div style={{ width: "24%", minWidth: "150px" }}>
                    <CardMain content="Total Click" value="1234">
                        <MouseRoundedIcon style={{
                            fontSize: "40px", padding: "10px", fontWeight: "bold",
                            borderRadius: "50%", color: "white", backgroundColor: "green"
                        }} />
                    </CardMain>
                </div>
                <div style={{ width: "24%", minWidth: "150px" }}>
                    <CardMain content="Total Click" value="1234">
                        <MouseRoundedIcon style={{
                            fontSize: "40px", padding: "10px", fontWeight: "bold",
                            borderRadius: "50%", color: "white", backgroundColor: "green"
                        }} />
                    </CardMain>
                </div>
                <div style={{ width: "24%", minWidth: "150px" }}>
                    <CardMain content="Total Click" value="1234">
                        <MouseRoundedIcon style={{
                            fontSize: "40px", padding: "10px", fontWeight: "bold",
                            borderRadius: "50%", color: "white", backgroundColor: "green"
                        }} />
                    </CardMain>
                </div>
            </div>
            <div style={{
                display: "flex", flexDirection: "row",
                height: "500px", justifyContent: "space-between", marginTop: "20px"
            }}>
                <div style={{ width: "24%", minWidth: "150px" }}>
                    <Paper style={{ width: "100%", height : "100%" }}>

                    </Paper>
                </div>
                <div style={{ width: "74.5%", minWidth: "350px", height : "100%" }}>
                    <ChartComponent />
                </div>
            </div>
            <div style={{
                display: "flex", flexDirection: "row",
                justifyContent: "space-between", marginTop: "20px", height: "500px"
            }}>
                <div style={{ width: "39.5%", minWidth: "150px" }}>
                    <TableUsers></TableUsers>
                </div>
                <div style={{ width: "59%", minWidth: "350px" }}>
                    <TableOrders />
                </div>
            </div>
        </div>
    );
};

export default MainManagerPage;
