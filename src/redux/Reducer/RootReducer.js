import {combineReducers} from 'redux'
import AuthenticationReducer from './ChildReducers/AuthenticationReducer'
import AllUsersReducer from './ChildReducers/AllUsersReducer'
import SingleUserReducer from './ChildReducers/SingleUserReducer'
import NotificationReducer from './ChildReducers/NotificationReducer'
import { connectRouter } from 'connected-react-router'
import EditFormReducer from './ChildReducers/EditFormReducer'
import AllProductReducer from './ChildReducers/AllProductReducer'
import SearchReducer from  './ChildReducers/SearchReducer'
import UserSearchReducer from './ChildReducers/UserSearchReducer'
const RootReducer = (history) => combineReducers({
    AuthenticationReducer,
    AllUsersReducer,
    SingleUserReducer,
    NotificationReducer,
    EditFormReducer,
    AllProductReducer,
    SearchReducer,
    UserSearchReducer,
    router: connectRouter(history)
});
export default RootReducer;