import {combineReducers} from 'redux'
import ToggleDrawerReducer from "./ChildReducers/ToggleDrawerReducer"
import AuthenticationReducer from './ChildReducers/AuthenticationReducer'
import AllUsersReducer from './ChildReducers/AllUsersReducer'
const RootReducer = combineReducers({
    ToggleDrawerReducer,
    AuthenticationReducer,
    AllUsersReducer,
});
export default RootReducer;