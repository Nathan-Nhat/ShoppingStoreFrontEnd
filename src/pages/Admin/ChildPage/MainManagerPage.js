import React, { useEffect } from 'react';
import { Typography, Paper } from '@material-ui/core';
import TableUsers from '../../../Components/Main/Dashboard/TableUsers';
import TableOrders from '../../../Components/Main/Dashboard/TableOrders';
import ChartComponent from '../../../Components/Main/Dashboard/ChartComponent';
import SumaryComponent from '../../../Components/Main/Dashboard/SumaryComponent'
const MainManagerPage = () => {

    return (
        <div style={{ margin: "30px 40px 0px 40px" }}>
            <Typography style = {{fontSize : "13px", marginTop : "10px"}}>DASHBOARD</Typography>
            <Typography style = {{fontSize : "30px", fontWeight:"bold", marginTop : "10px"}}>Hello, Admin</Typography>
            <Typography style = {{marginTop : "10px"}}>Here's what's happening last 7 days</Typography>
            <div style = {{marginTop : "30px"}}>
                <SumaryComponent />
            </div>
            <div style={{
                display: "flex", flexDirection: "row",
                height: "500px", justifyContent: "space-between", marginTop: "20px"
            }}>
                <div style={{ width: "24%", minWidth: "150px" }}>
                    <Paper style={{ width: "100%", height: "100%" }}>

                    </Paper>
                </div>
                <div style={{ width: "50%", minWidth: "350px", height: "100%" }}>
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
