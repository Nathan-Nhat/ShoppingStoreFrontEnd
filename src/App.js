import React from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles'
import theme from './Themes/DrawerThemes';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useAppStyles} from './App.styles';
import {Provider} from 'react-redux';
import storeConfig from './redux/store/storeConfig';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import {Switch} from 'react-router-dom'
import PrivateRoute from "./Authentication/PrivateRouter";
import LoginPage from "./pages/Admin/Login/LoginPage";
import MainPage from "./pages/Admin/MainPage/MainPage";
import Notification from "./Components/Notification/Notification"
const store = storeConfig();
function App() {
    const classes = useAppStyles();
    return (
      <Provider store = {store}>
        <MuiThemeProvider theme = {theme}>
          <CssBaseline/>
          <BrowserRouter>
          <Switch>
            <PrivateRoute path = "/" component = {MainPage}/>
            <Route path = "/login" component = {LoginPage}/>
          </Switch>    
          </BrowserRouter>
          <Notification/>
        </MuiThemeProvider>             
      </Provider>
    );
  }
export default App;
