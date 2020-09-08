/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import 'font-awesome/css/font-awesome.min.css'

import Login from './components/Login';

import AdminLayout from "layouts/Admin.js";

export const hist = createBrowserHistory();

const ProtectedComponent = () => {
  if (!sessionStorage.getItem("jwt")) {
    return <Router history={hist}>
             <Switch>
               <Route exact path='/login' component={Login} />
               <Redirect to="/login" />
            </Switch>
          </Router>

  }
  return (<Router history={hist}>
          <Switch>
            <Route render={(props) => <AdminLayout {...props} />} />  
          </Switch>
  </Router>)
}


ReactDOM.render(
  ProtectedComponent(),
  document.getElementById("root")
);
