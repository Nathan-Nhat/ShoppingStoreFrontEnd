import React from 'react';
import {IconButton, Typography} from '@material-ui/core'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useHistory} from 'react-router-dom';
const Iconlist = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    let history = useHistory();
    const handleClick = (event) =>{
        setAnchorEl(event.currentTarget);
        console.log(event.currentTarget);
    }
    const handleClose = (position) => {
        setAnchorEl(null);
        if(position === 3){
            localStorage.removeItem("jwt");
            history.push("/login");
        }
      };
    return (
        <div>
            <IconButton aria-haspopup="true" onClick={handleClick}
                    elevation = {3}
                >
                    {props.icon}
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style = {{marginTop : "60px"}}
            >
                <MenuItem onClick={()=>handleClose(1)}><Typography color = "secondary"> Profile</Typography></MenuItem>
                <MenuItem onClick={()=>handleClose(2)}><Typography color = "secondary"> My Account</Typography></MenuItem>
                <MenuItem onClick={()=>handleClose(3)}><Typography color = "secondary"> Log out</Typography></MenuItem>
            </Menu>
        </div>
    );
};

export default Iconlist;