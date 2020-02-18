import React from 'react';
import DrawerComponent from '../../../Components/Main/Drawer/Drawer.component';
import AppBarComponent from '../../../Components/Main/AppBar/AppBar.Component'
import useMainPageStyles from './MainPageStyle'
import theme from '../../../Themes/DrawerThemes'
import {Switch as SwitchRouter, Route} from 'react-router-dom'
import UserManagerPage from '../ChildPage/UserManagerPage'
import MainManagerPage from '../ChildPage/MainManagerPage'
function MainPage() {
        const classes = useMainPageStyles(theme);
        return (
            <div style = {{display : "flex"}}>
                <DrawerComponent/>
                <div style = {{width: "100%"}}>
                    <AppBarComponent/>
                    <SwitchRouter>
                        <Route exact path = "/" component = {MainManagerPage}/>
                        <Route exact path = "/users" component = {UserManagerPage}/>
                    </SwitchRouter> 
                </div>
            </div>
        );
    }

export default MainPage;

