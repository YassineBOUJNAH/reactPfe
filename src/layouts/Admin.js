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
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, Redirect } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";
import routesSupervisor from "routesSupervisor.js";
import routesStudent from "routesStudent.js";



var ps;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      routes: <div/>,
      current:{}
    };
    this.mainPanel = React.createRef();
    this.renderRoute = this.renderRoute.bind(this);
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");

    }
    this.renderRoute();

  }


  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleActiveClick = (color) => {
    this.setState({ activeColor: color });
  };
  handleBgClick = (color) => {
    this.setState({ backgroundColor: color });
  };

  //this.fetchCurrentUser();
  //console.log(this.state.Current) 

  renderRoute() {

    const token = sessionStorage.getItem('jwt');
    fetch('http://localhost:8081/Current', {
      headers: { 'Authorization': token }
    })
      .then((response) => response.json())
      .then((res) => {
        sessionStorage.setItem('role',res.role);  
        sessionStorage.setItem('currentuser',JSON.stringify(res));
        
        if (res.role === 'ADMIN') {
          console.log("admin")
          this.setState({
            current : 'ADMIN',
            routes: <Switch>
              {routes.map((prop, key) => {
                return (
                  <Route
                    path={prop.layout + prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              })}
              <Redirect to="/admin/users" />
            </Switch>
          })
        } 
        else if (res.role === 'STUDENT') {
          console.log("STUDENT")
          this.setState({
            current : 'STUDENT',
            routes: <Switch>
              {routesStudent.map((prop, key) => {
                return (
                  <Route
                    path={prop.layout + prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              })}
              <Redirect to="/student/home" />
            </Switch>
          })
        } 
        
        else {
          console.log("supervisor")
          this.setState({
            current : 'SUPERVISOR',
            routes: <Switch>
              {routesSupervisor.map((prop, key) => {
                return (
                  <Route
                    path={prop.layout + prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              })}
              <Redirect to="supervisor/internships" />
            </Switch> 
          })

        }


      })
      .catch(err => console.error(err));
  }

  render() {

    let router; 
    if(this.state.current === 'ADMIN'){ 
      router=routes;
    }
    else if(this.state.current === 'STUDENT'){
     router=routesStudent;}
    else
     router=routesSupervisor;

    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={router}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} />
          {this.state.routes}
          <Footer fluid />
        </div>
        <FixedPlugin
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
          handleActiveClick={this.handleActiveClick}
          handleBgClick={this.handleBgClick}
        />
      </div>
    );
  }
}

export default Dashboard;
