import React , {useState, useEffect}from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useSelector, useDispatch} from 'react-redux'
import {ClosePopUpUser} from '../../../redux/Actions/ActionObjects/ActionsObjects'
export default function DialogUserInfo() {
    const userResponse = useSelector(state => state.SingleUserReducer);
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.TogglePopUpUserReducers);
    console.log(isOpen)
   
    const handleClose = ()=>{
        dispatch(ClosePopUpUser());
    }
    return (
        <div>
            <Dialog
            open={isOpen}
            onClose={handleClose}
            scroll= 'paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
            <DialogContent >
            <DialogContentText
                id="scroll-dialog-description"
                // ref={descriptionElementRef}
                tabIndex={-1}
            >
                <div> {userResponse.username} </div>
                <div> {userResponse.password} </div>
                <div> {userResponse.roles} </div>
                <div> {userResponse.status} </div>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            {/* <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
                Subscribe
            </Button> */}
            </DialogActions>
        </Dialog>
        </div>
    )
}