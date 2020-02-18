import React , {useState, useEffect}from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {Button, Zoom, Divider, InputBase, Box, TextField} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'
import {ClosePopUpUser} from '../../../redux/Actions/ActionObjects/ActionsObjects'
import useDialogStyles from './Dialog.Style'
import TextComponent from './TextComponent'
import {fetchSingleUser} from '../../../redux/Actions/ActionObjects/ActionsObjects'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
  });
export default function DialogUserInfo({username}) {
    console.log(username);
    const userResponse = useSelector(state => state.SingleUserReducer);
    const dispatch = useDispatch();
    const [isEditable, setEditable] = useState(false);
    const isOpen = useSelector(state => state.TogglePopUpUserReducers);
    console.log(userResponse.userDetails )
    const classes = useDialogStyles();
    const handleClose = ()=>{
        setEditable(false);
        dispatch(ClosePopUpUser());
    }
    const handleEdit = ()=> {
        setEditable(true);
    }
    useEffect(()=>{
        console.log("DIALOG DID MOUNT")
        dispatch(fetchSingleUser({username : username}));
    }, []);

    return (
            <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth = {false}
        >
            <DialogContent className = {classes.content}>
            <Box className = {classes.boxLeft}>
                <img src = {userResponse.userDetails.avatarUrl} alt = "avatar" className = {classes.image}/>
                <TextComponent content = {userResponse.userDetails.name}  isEditable = {false}/>
            </Box>
            <Divider orientation="vertical" variant = "middle"/>
            <Box className = {classes.boxRight}>
                <TextComponent label = "Username" content = {userResponse.username} isEditable = {false}/>
                <Box className = {classes.innerRow}>
                    <TextComponent label = "Roles"    content = {userResponse.roles} isEditable = {isEditable} style = {{width : "47%"}} isSelect = {true}/>
                    <TextComponent label = "Status" content = {userResponse.status === 1? "ACTIVE" : "DISABLE"} isEditable = {isEditable} style = {{width : "47%"}} isSelect = {true}/>
                </Box>
                <TextComponent label = "Email" content = {userResponse.userDetails.email} isEditable = {false}/>
                <TextComponent label = "Phone" content = {userResponse.userDetails.phone} isEditable = {false}/>
                <TextComponent label = "Address" content = {userResponse.userDetails.address} isEditable = {false}/>

            </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleEdit} color="primary" variant = "contained" style = {{width : "90px"}}>
                {isEditable? "Save" : "Edit"}
            </Button>
            <Button onClick={handleClose} color="primary" variant = "outlined" style = {{width : "90px"}}>
                Cancel
            </Button>
            </DialogActions>
        </Dialog>
    )
}