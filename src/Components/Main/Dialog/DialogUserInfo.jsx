import React , {useState, useEffect}from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {Button, Zoom, Divider, InputBase, Box, TextField} from '@material-ui/core'
import {useSelector, useDispatch, useStore} from 'react-redux'
import {ClosePopUpUser} from '../../../redux/Actions/ActionObjects/ActionsObjects'
import useDialogStyles from './Dialog.Style'
import TextComponent from './TextComponent'
import {fetchSingleUser,submitEditUser} from '../../../redux/Actions/ActionObjects/ActionsObjects'
import Skeleton from '@material-ui/lab/Skeleton';
import { changeUserRole, changeUserStatus } from '../../../redux/Actions/ActionObjects/ActionsObjects';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
  });
export default function DialogUserInfo({username}) {
    console.log(username);
    const userResponse = useSelector(state => state.SingleUserReducer);
    const dispatch = useDispatch();
    const [isEditable, setEditable] = useState(false);
    const isOpen = useSelector(state => state.TogglePopUpUserReducers);
    const classes = useDialogStyles();
    const store = useStore();
    const handleClose = ()=>{
        setEditable(false);
        dispatch(ClosePopUpUser());
    }
    const handleEdit = ()=> {
        dispatch(changeUserRole(userResponse.roles))
        dispatch(changeUserStatus(userResponse.status))
        setEditable(true);
    }

    const handleSave = () => {
    }

    const handleCacel = () => {
        setEditable(false)
    }
    useEffect(()=>{
        console.log("DIALOG DID MOUNT");
        const username = store.getState().EditFormReducer.username;
        dispatch(fetchSingleUser({username : username}));
    }, []);
    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = store.getState().EditFormReducer;
        dispatch(submitEditUser(data));
        setEditable(false)
    }
    return (
            <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth = {false}
        >
            <form onSubmit = {handleSubmit}>
            {userResponse !== null ?<DialogContent className = {classes.content}>
                <Box className = {classes.boxLeft}>
                    <img src = {userResponse.userDetails.avatarUrl} alt = "avatar" className = {classes.image}/>
                    <TextComponent content = {userResponse.userDetails.name}  style = {{marginTop : "20px"}} Editable = {false}/>
                </Box>
                <Divider orientation="vertical" variant = "middle"/>
                <Box className = {classes.boxRight}>
                    <TextComponent label = "Username" content = {userResponse.username} Editable = {false}/>
                    <Box className = {classes.innerRow}>
                        <TextComponent label = "Roles" name = "roles"  content = {userResponse.roles}  style = {{width : "47%"}} 
                            />
                        <TextComponent label = "Status" name = "status" content = {userResponse.status === 1? "ACTIVE" : "DISABLE"}  isSelect = {true}
                            style = {{width : "47%"}}  Editable = {isEditable  && userResponse.roles !== "ADMIN"} selectValue = {["ACTIVE", "DISABLE"]}/>
                    </Box>
                    <TextComponent label = "Email" content = {userResponse.userDetails.email} Editable = {false}/>
                    <TextComponent label = "Phone" content = {userResponse.userDetails.phone} Editable = {false}/>
                    <TextComponent label = "Address" content = {userResponse.userDetails.address} Editable = {false}/>
                </Box>
            </DialogContent>
            :
            <DialogContent className = {classes.content}>
                <Box className = {classes.boxLeft}>
                    <Skeleton animation="wave" variant="circle" width = {200} height = {200} />
                    <Skeleton animation="wave" style = {{marginTop : "20px"}} height = {80}/>
                </Box>
                <Divider orientation="vertical" variant = "middle"/>
                <Box className = {classes.boxRight}>
                    <Skeleton animation="wave" height = {80}/>
                    <Box className = {classes.innerRow}>
                        <Skeleton animation="wave" height = {80} width = {250}/>
                        <Skeleton animation="wave" height = {80} width = {250}/>
                    </Box>
                        <Skeleton animation="wave" height = {80} />
                        <Skeleton animation="wave" height = {80}/>
                        <Skeleton animation="wave" height = {80}/>
                    </Box>
            </DialogContent>}
            <DialogActions>
            {isEditable && userResponse.roles !== "ADMIN" ? <Button type = "submit" color="secondary" variant = "contained" style = {{width : "90px"}}>
                Save
            </Button> : null}
            {!isEditable && userResponse.roles !== "ADMIN" ? <Button onClick={handleEdit} color= "primary" variant = "contained" style = {{width : "90px"}}>
                Edit
            </Button> : null}
            {isEditable && userResponse.roles !== "ADMIN" ? <Button onClick={handleCacel} color="primary" variant = "contained" style = {{width : "90px"}}>
                Cancel
            </Button> : null}
            <Button onClick={handleClose} color="primary" variant = "outlined" style = {{width : "90px"}}>
                Close
            </Button>
            </DialogActions>
            </form>
        </Dialog>
    )
}