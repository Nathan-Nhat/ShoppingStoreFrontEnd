import React , {useState, useEffect}from 'react';
import SendIcon from '@material-ui/icons/Send';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import BlockRoundedIcon from '@material-ui/icons/BlockRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import {Paper, Box, Typography, Divider,Table, TableRow, Button, TableHead, TableBody, TableCell} from '@material-ui/core'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import {useDispatch} from 'react-redux'
import {submitEditUser} from '../../../../../redux/Actions/ActionObjects/ActionsObjects';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
const StyledTableCell = withStyles(theme => ({
    body: {
      fontSize: 14,
    },
  }))(TableCell);
const Details = ({currentUser}) => {
    const dispatch = useDispatch();
    const [isloading, setloading] = useState(false);
    const [isloadingBtn, setloadingBtn] = useState(false);
    const handleDisableUser = () => {
        var  data = {
                username : currentUser.username,
                status : currentUser.status === 1? 0 : 1,
        }
        setloadingBtn(true);
        dispatch(submitEditUser(data));
    }
    useEffect(()=>{
        setloadingBtn(false);
    }, [currentUser])
    const handleSelectChange = () =>{

    }
    return (
        <div>
                <Box style = {{marginTop : "30px", display : "flex", flexDirection : "row", justifyContent :"space-between"}}>
                    <Paper style = {{width : "23%", minWidth : "350px"}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style = {{fontSize : "20px", fontWeight : "bold"}}>
                                        Details
                                    </StyledTableCell>
                                    <StyledTableCell>
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            <TableRow>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>{currentUser.userDetails.email}</StyledTableCell>
                            </TableRow>
                            <TableRow style = {{backgroundColor : "#ebebeb"}}>
                                <StyledTableCell >Phone</StyledTableCell>
                                <StyledTableCell>{currentUser.userDetails.phone}</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell>Address</StyledTableCell>
                                <StyledTableCell>{currentUser.userDetails.address}</StyledTableCell>
                            </TableRow>
                            <TableRow style = {{backgroundColor : "#ebebeb"}}>
                                <StyledTableCell>Date Created</StyledTableCell>
                                <StyledTableCell>{currentUser.dateCreated}</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell>Status</StyledTableCell>
                                <StyledTableCell>{currentUser.status === 1 ? "Normal" : "Disabled"}</StyledTableCell>
                            </TableRow>
                            <TableRow style = {{backgroundColor : "#ebebeb"}}>
                                <StyledTableCell>Roles</StyledTableCell>
                                <StyledTableCell>{currentUser.roles}</StyledTableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>

                    <Paper style = {{width : "23%", minWidth : "350px", height : "50%"}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style = {{fontSize : "20px", fontWeight : "bold"}}>
                                        Orders
                                    </StyledTableCell>
                                    <StyledTableCell>
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            <TableRow>
                                <StyledTableCell>Total Orders</StyledTableCell>
                                <StyledTableCell>10</StyledTableCell>
                            </TableRow>
                            <TableRow style = {{backgroundColor : "#ebebeb"}}>
                                <StyledTableCell >Completed</StyledTableCell>
                                <StyledTableCell>6</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell>Inprogress</StyledTableCell>
                                <StyledTableCell>3</StyledTableCell>
                            </TableRow>
                            <TableRow style = {{backgroundColor : "#ebebeb"}}>
                                <StyledTableCell>Rejected</StyledTableCell>
                                <StyledTableCell>1</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell>Total Paid</StyledTableCell>
                                <StyledTableCell>200$</StyledTableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>

                    <Paper style = {{width : "23%", minWidth : "350px", height : "50%", padding :"10px"}}>
                        <Typography style = {{fontSize : "20px", fontWeight : "bold",marginBottom : "10px"}}>Send emails</Typography>
                        <Divider></Divider>
                        <div style = {{display :"flex", flexDirection : "column", marginTop : "20px"}}>
                            <FormControl variant="outlined" >
                                <Select
                                value={10}
                                onChange={handleSelectChange}
                                >
                                    <MenuItem value={10}>Notify Orders</MenuItem>
                                    <MenuItem value={20}>Verify Acount</MenuItem>
                                    <MenuItem value={30}>Deleted Account</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant = "contained" style = {{fontSize : "16px", marginTop : "20px"}}>
                                <SendIcon style = {{marginRight : "10px"}}/>
                                Send Mail
                            </Button>
                        </div>
                    </Paper>

                    <Paper style = {{width : "23%", minWidth : "350px", height : "50%", padding :"10px"}}>
                        <Typography style = {{fontSize : "20px", fontWeight : "bold",marginBottom : "10px"}}>Other Actions</Typography>
                        <Divider></Divider>
                        {currentUser.roles === "ADMIN" ?<div>
                            <Typography style = {{fontSize : "20px", marginTop : "10px"}}>
                                No action with Admin
                            </Typography>
                        </div> : 
                        <div style = {{display :"flex", flexDirection : "column", marginTop : "20px"}}>
                            { currentUser.status === 1?
                            <Button variant = "contained" style = {{}} onClick = {handleDisableUser}> 
                                <div style = {{display : "flex", flexDirection : "row"}}>
                                    <BlockRoundedIcon/>
                                    <Typography style = {{marginLeft: "10px", fontSize : "16px", fontWeight : "bold"}}>Disable User</Typography>
                                </div>
                            </Button> : 
                            <Button variant = "contained" style = {{backgroundColor : "green"}} onClick = {handleDisableUser}> 
                                <div style = {{display : "flex", flexDirection : "row", color : "white"}}>
                                    <PersonAddRoundedIcon/>
                                    <Typography style = {{marginLeft: "10px", fontSize : "16px", fontWeight : "bold"}}>Enable User</Typography>
                                </div>
                            </Button>}
                            <Typography style = {{fontSize : "13px", marginTop : "10px"}}>
                                Remove this this customer’s data if he requested that, if not please be aware that what has been deleted can never brough back
                            </Typography>
                            <Button variant = "contained" style = {{marginTop : "10px", backgroundColor : "red"}}> 
                                <DeleteForeverRoundedIcon/>
                                <Typography style = {{marginLeft: "10px", fontSize : "16px", fontWeight : "bold"}}>Delete Users</Typography>
                            </Button>
                        </div>}
                    </Paper>
                </Box>
        </div>
    );
};

export default Details;