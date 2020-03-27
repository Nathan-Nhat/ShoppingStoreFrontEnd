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
import ProductDetails from '../ChildPage/ChildPagev2/ProductDetails';
import UserDetails from '../ChildPage/ChildPagev2/UserDetails'
import OrderDetails from '../ChildPage/ChildPagev2/OrderDetails';
const { width, height } = window;
function MainPage() {
        let { path, url } = useRouteMatch();
        const classes = useMainPageStyles(theme);
        console.log(width)
        return (
            <div style = {{display : "flex", flexDirection : "column"}}>
                <AppBarComponent/>
                <div>
                    <DrawerComponent/>
                    <div style = {{marginLeft : "240px"}}>
                    <Switch>
                        <Route exact path = {path}>
                                <MainManagerPage/>
                        </Route>
                        <Route exact path = "/users">
                            <UserManagerPage/>
                        </Route>
                        <Route path = "/add-product">
                            <AddProductPage/>
                        </Route>
                        <Route exact path = "/products">
                            <ProductsPage/>
                        </Route>
                        <Route path = "/products/:id">
                            <ProductDetails/>
                        </Route>
                        <Route path = "/users/:username">
                            <UserDetails/>
                        </Route>
                        <Route path = "/order/details/123">
                            <OrderDetails />
                        </Route>
                    </Switch>
                </div>
                </div>
            </div>
        );
    }

export default MainPage;

