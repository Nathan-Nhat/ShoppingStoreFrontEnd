import {combineReducers} from 'redux'
import ToggleDrawerReducer from "./ChildReducers/ToggleDrawerReducer"
import AuthenticationReducer from './ChildReducers/AuthenticationReducer'
const RootReducer = combineReducers({
    ToggleDrawerReducer,
    AuthenticationReducer
});
export default RootReducer;