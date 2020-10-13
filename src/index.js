
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import 'font-awesome/css/font-awesome.min.css'
import 'react-table/react-table.css';
import 'react-toastify/dist/ReactToastify.css';

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
