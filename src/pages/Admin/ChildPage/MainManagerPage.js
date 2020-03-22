import React, { useEffect } from 'react';
import { Typography, Paper } from '@material-ui/core';
import TableUsers from '../../../Components/Main/Dashboard/TableUsers';
import TableOrders from '../../../Components/Main/Dashboard/TableOrders';
import ChartComponent from '../../../Components/Main/Dashboard/ChartComponent';
import SumaryComponent from '../../../Components/Main/Dashboard/SumaryComponent';
import IncomeChart from '../../../Components/Main/Dashboard/IncomeChart';
const MainManagerPage = () => {

    return (
        <div style={{ margin: "30px 40px 40px 40px" }}>
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
                <div style={{ width: "49.25%", minWidth: "150px" }}>
                    <IncomeChart/>
                </div>
                <div style={{ width: "49.25%", minWidth: "350px", height: "100%" }}>
                    <ChartComponent />
                </div>
            </div>
            <div style={{
                display: "flex", flexDirection: "row",
                justifyContent: "space-between", marginTop: "20px", minWidth :"500px"
            }}>
                <div style={{ width: "39.5%", minWidth: "400px" }}>
                    <TableUsers></TableUsers>
                </div>
                <div style={{ width: "59%", minWidth: "600px" }}>
                    <TableOrders />
                </div>
            </div>
        </div>
    );
};

export default MainManagerPage;
