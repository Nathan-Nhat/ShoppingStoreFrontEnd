import React from 'react';
import DrawerComponent from '../../../Components/Main/Drawer/Drawer.component';
import AppBarComponent from '../../../Components/Main/AppBar/AppBar.Component'
import useMainPageStyles from './MainPageStyle';
import theme from '../../../Themes/DrawerThemes';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import UserManagerPage from '../ChildPage/UserManagerPage';
import MainManagerPage from '../ChildPage/MainManagerPage';
import AddProductPage from '../ChildPage/ChildPagev2/AddProduct';
import ProductsPage from '../ChildPage/ChildPagev2/ProductsPage'
function MainPage() {
        let { path, url } = useRouteMatch();
        const classes = useMainPageStyles(theme);
        return (
            <div style = {{display : "flex"}}>
                <DrawerComponent/>
                <div style = {{width: "100%"}}>
                    <AppBarComponent/>
                    <Switch>
                        <Route exact path = {path}>
                                <MainManagerPage/>
                        </Route>
                        <Route path = "/users">
                            <UserManagerPage/>
                        </Route>
                        <Route path = "/add-product">
                            <AddProductPage/>
                        </Route>
                        <Route path = "/products">
                            <ProductsPage/>
                        </Route>
                    </Switch>
                </div>
            </div>
        );
    }

export default MainPage;

