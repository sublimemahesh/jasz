import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import Home from '././components/Home_Content/Home_Content';
import Products from '././components/Products/Products';
import View_Product from '././components/View_Product/View_Product';
import Cart from '././components/Cart/Cart';
import Checkout from '././components/Checkout/Checkout';
import Login from '././components/Login/Login';
import MyAccount from '././components/My_Account/Profile';
import Brand from '././components/Brand/Brand';
import About from '././components/About/About';
import Offer from '././components/Offer/Offer';
import View_Offer from '././components/View_Offer/View_Offer';
import Contact from '././components/Contact/Contact';
import Terms_And_Conditions from '././components/Terms_And_Conditions/Terms_And_Conditions';
import Pending_Orders from '././components/My_Account/Pending_Orders';
import Confirmed_Orders from '././components/My_Account/Confirmed_Orders';
import Canceled_Orders from '././components/My_Account/Canceled_Orders';
import Success_Orders from '././components/My_Account/Success_Orders';
import Edit_Profile from '././components/My_Account/Edit_Profile';
import Change_Password from '././components/My_Account/Change_Password';
import View_Order from '././components/My_Account/Order_View';
import Forget_Password from '././components/Login/Forget_Password';
import Reset_Password from '././components/Login/Reset_Password';
import history from './history'

const Routes = () => (
<BrowserRouter  history={history}>
<Switch>

<Route exact path="/" component={Home}/>
<Route path="/home" component={Home}/>
<Route path="/products" component={Products}/>
<Route path="/product-view/:product" component={View_Product}/>
<Route path="/cart" component={Cart}/>
<Route path="/checkout" component={Checkout}/>
<Route path="/login" component={Login}/>
<Route path="/my-account/profile" component={MyAccount}/>
<Route path="/brands" component={Brand}/>
<Route path="/about" component={About}/>
<Route path="/contact" component={Contact}/>
<Route path="/offer" component={Offer}/>
<Route path="/offer-view/:offer" component={View_Offer}/>
<Route path="/terms-and-conditions" component={Terms_And_Conditions}/>
<Route path="/forget-password" component={Forget_Password}/>
<Route path="/reset-password" component={Reset_Password}/>
<Route path="/my-account/pending-orders" component={Pending_Orders}/>
<Route path="/my-account/confirmed-orders" component={Confirmed_Orders}/>
<Route path="/my-account/canceled-orders" component={Canceled_Orders}/>
<Route path="/my-account/success-orders" component={Success_Orders}/>
<Route path="/my-account/profile-edit" component={Edit_Profile}/>
<Route path="/my-account/change-password" component={Change_Password}/>
<Route path="/my-account/view-order" component={View_Order}/>
</Switch>
</BrowserRouter>
);
export default Routes;