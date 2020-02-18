import {combineReducers} from 'redux'
import ToggleDrawerReducer from "./ChildReducers/ToggleDrawerReducer"
import AuthenticationReducer from './ChildReducers/AuthenticationReducer'
import AllUsersReducer from './ChildReducers/AllUsersReducer'
import SingleUserReducer from './ChildReducers/SingleUserReducer'
import TogglePopUpUserReducers from './ChildReducers/TogglePopUpUser'

const RootReducer = combineReducers({
    ToggleDrawerReducer,
    AuthenticationReducer,
    AllUsersReducer,
    SingleUserReducer,
    TogglePopUpUserReducers,
});
export default RootReducer;