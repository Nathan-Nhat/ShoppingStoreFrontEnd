import React from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles'
import theme from './Themes/DrawerThemes';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useAppStyles} from './App.styles';
import {Provider} from 'react-redux';
import storeConfig from './redux/store/storeConfig';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import PrivateRoute from "./Authentication/PrivateRouter";
import LoginPage from "./pages/Admin/Login/LoginPage";
import MainPage from "./pages/Admin/MainPage/MainPage";
const store = storeConfig();
function App() {
    const classes = useAppStyles();
    return (
      <Provider store = {store}>
        <MuiThemeProvider theme = {theme}>
          <CssBaseline/>
          <Router>
            <PrivateRoute exact path = "/" component = {MainPage}/>
            <Route path = "/login" component = {LoginPage}/>
          </Router>
        </MuiThemeProvider>             
      </Provider>
    );
  }
export default App;
