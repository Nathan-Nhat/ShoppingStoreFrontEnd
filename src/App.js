import React from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles'
import theme from './Themes/DrawerThemes';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Provider} from 'react-redux';
import storeConfig, {history} from './redux/store/storeConfig';
import {BrowserRouter  as Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from "./Authentication/PrivateRouter";
import LoginPage from "./pages/Admin/Login/LoginPage";
import MainPage from "./pages/Admin/MainPage/MainPage";
import Notification from "./Components/Notification/Notification"
import { ConnectedRouter } from 'connected-react-router'
const store = storeConfig();
function App() {
    // console.log(LoginPage);
    return (
      <Provider store = {store}>
        <MuiThemeProvider theme = {theme}>
          <CssBaseline/>
          <ConnectedRouter history={history}>
            <Switch>
            <Route exact path = "/login">
                <LoginPage/>
                </Route>
              <PrivateRoute path = "/"> 
                <MainPage /> 
              </PrivateRoute>
            </Switch>   
          </ConnectedRouter>
          <Notification/>
        </MuiThemeProvider>             
      </Provider>
    );
  }
export default App;
