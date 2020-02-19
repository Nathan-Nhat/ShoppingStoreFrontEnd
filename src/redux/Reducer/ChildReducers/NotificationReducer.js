import {TOGGLE_NOTIFICATION} from '../../Actions/ActionConstant/ActionConstants'
const initialState = {
    isOpen : false,
    message : '',
    type : ''
};

const NotificationReducer = (state = initialState, action)=>{
    switch(action.type) {
        case TOGGLE_NOTIFICATION:
            console.log(action.data)
            return action.data;
        default:
            return state;
    }
}

export default NotificationReducer;