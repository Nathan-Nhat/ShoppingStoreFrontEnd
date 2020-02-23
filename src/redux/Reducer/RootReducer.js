import {combineReducers} from 'redux'
import ToggleDrawerReducer from "./ChildReducers/ToggleDrawerReducer"
import AuthenticationReducer from './ChildReducers/AuthenticationReducer'
import AllUsersReducer from './ChildReducers/AllUsersReducer'
import SingleUserReducer from './ChildReducers/SingleUserReducer'
import TogglePopUpUserReducers from './ChildReducers/TogglePopUpUser'
import NotificationReducer from './ChildReducers/NotificationReducer'
import { connectRouter } from 'connected-react-router'
import EditFormReducer from './ChildReducers/EditFormReducer'
const RootReducer = (history) => combineReducers({
    ToggleDrawerReducer,
    AuthenticationReducer,
    AllUsersReducer,
    SingleUserReducer,
    TogglePopUpUserReducers,
    NotificationReducer,
    EditFormReducer,
    router: connectRouter(history)
});
export default RootReducer;