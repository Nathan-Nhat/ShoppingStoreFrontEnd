import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux'
import {toggleNotification} from '../../redux/Actions/ActionObjects/ActionsObjects'
const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
export default function CustomizedSnackbars() {
    const classes = useStyles();
    const PopUp = useSelector(state=> state.NotificationReducer);
    const dispatch = useDispatch();
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      dispatch(toggleNotification({isOpen : false, message : PopUp.message, type : PopUp.type}))
    };
  
    return (
      <div className={classes.root}>
        <Snackbar open={PopUp.isOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin= {{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleClose} severity={PopUp.type}>
            {PopUp.message}
          </Alert>
        </Snackbar>
      </div>
    );
  }