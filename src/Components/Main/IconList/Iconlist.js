import React , {useEffect} from 'react';
import {IconButton, Typography} from '@material-ui/core'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../../../redux/Actions/ActionObjects/ActionsObjects'
const Iconlist = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    let history = useHistory();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.AuthenticationReducer);
    const handleClick = (event) =>{
        setAnchorEl(event.currentTarget);
    }
    const handleClose = (position) => {
        setAnchorEl(null);
        if(position === 3){
            dispatch(logout());
        }
      };

      useEffect(()=>{
        if (isAuthenticated === 2){
            history.push('/login');
        }
    }, [isAuthenticated])
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
                onClose={()=>handleClose(0)}
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