import React from 'react'
import CardMain from './Sumary/CardMain'
import MouseRoundedIcon from '@material-ui/icons/MouseRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
// import 
export default function SumaryComponent() {
    
    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <div style={{ width: "24%", minWidth: "150px" }}>
                <CardMain content="Total Click" value="1234" link = {'/total-clicks?num-days=7'} type = "click">
                    <MouseRoundedIcon style={{
                        fontSize: "50px", padding: "10px", fontWeight: "bold",
                        borderRadius: "50%", color: "white", backgroundColor: "#009688"
                    }} />
                </CardMain>
            </div>
            <div style={{ width: "24%", minWidth: "150px" }}>
                <CardMain content="Total Orders" value="1234" link = {'/total-orders?num-days=7'} type = "order">
                    <ShoppingCartRoundedIcon style={{
                        fontSize: "50px", padding: "10px", fontWeight: "bold",
                        borderRadius: "50%", color: "white", backgroundColor: "#3f51b5"
                    }} />
                </CardMain>
            </div>
            <div style={{ width: "24%", minWidth: "150px" }}>
                <CardMain content="New Users" value="1234" link = {'/total-users?num-days=7'} type = "user">
                    <PersonAddRoundedIcon style={{
                        fontSize: "50px", padding: "10px", fontWeight: "bold",
                        borderRadius: "50%", color: "white", backgroundColor: "#ff9100", elevation : "50deg"
                    }} />
                </CardMain>
            </div>
            <div style={{ width: "24%", minWidth: "150px" }}>
                <CardMain content="Total Income" value="1234" link = {'/revenue?num-days=7'} type = "revenue">
                    <AttachMoneyRoundedIcon color = "primary" style={{
                        fontSize: "50px", padding: "10px", fontWeight: "bold",
                        borderRadius: "50%", backgroundColor: "white"
                    }} />
                </CardMain>
            </div>
        </div>
    )
}
