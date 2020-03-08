import React , {useState, useEffect}from 'react'
import Dialog from '@material-ui/core/Dialog';
import {Box, Zoom, Paper, IconButton, Typography, Button, Divider} from '@material-ui/core'
import {useSelector, useDispatch, useStore} from 'react-redux'
import useDialogStyles from './Dialog.Style'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import {useHistory} from 'react-router-dom'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
  });
export default function DialogUserInfo({username, isOpen, email, avatar_url, name, date, setClose}) {
    const dispatch = useDispatch();
    const classes = useDialogStyles();
    const history = useHistory();
    const handleClickDetail = () => {
        history.push(`/users/${username}`)
    }
    return (
            <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            maxWidth = {false}
        >
            <Paper className = {classes.content}>
                <IconButton  className = {classes.closeBtn} onClick = {setClose}>
                    <CloseRoundedIcon opacity = "50%" fontSize = "small"/>
                </IconButton>
                <Box className = {classes.imageContainer}>
                    <img className = {classes.image} src = {avatar_url}/>
                    <Box className = {classes.nameContainer}>
                        <Typography className = {classes.name} >{name}</Typography>
                        <Box className = {classes.email} color = "secondary">
                            <EmailRoundedIcon color = "secondary" style = {{marginRight : "5px"}}/>
                            <Typography color = "secondary">{email}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className = {classes.detail}>
                    <Typography style = {{fontWeight : "bold", fontSize : "16px", opacity: "70%"}}>Customer Stats</Typography>
                    <Divider style = {{marginTop :"5px"}}/>
                    <Box style = {{display : "flex", flexDirection : "row", opacity: "70%"}}>
                        <Box style = {{width : "50%", textAlign : "center", marginTop :"30px"}}>
                            <Typography color = "secondary" style = {{fontWeight : "bold", fontSize : "25px"}}>{date}</Typography>
                            <Typography  style = {{fontWeight : "bold"}}>Date Create</Typography>
                        </Box>
                        <Divider orientation = "vertical" flexItem style = {{marginTop : "30px"}}/>
                        <Box style = {{width : "50%", textAlign : "center", marginTop :"30px"}}>
                            <Typography color = "secondary" style = {{fontWeight : "bold", fontSize : "25px"}}>10</Typography>
                            <Typography  style = {{fontWeight : "bold"}}>Number Of Order</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className = {classes.action}>
                    <Button className = {classes.detailBtn} color = "primary" variant = "contained" size = "large" onClick = {handleClickDetail}>
                        <AssignmentIndRoundedIcon style = {{marginRight : "10px"}}/>
                        <Typography>View Details</Typography>
                    </Button>
                </Box>
            </Paper>
        </Dialog>
    )
}