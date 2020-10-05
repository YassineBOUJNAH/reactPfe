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
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import Utilisateurs from 'views/Utilisateurs.js'
import UsersManagement from 'views/UsersManagement'
import IntershipsOffers from 'views/adminViews/IntershipsOffers'
import StudentsInterships from 'views/adminViews/StudentsInterships';

var routes = [
  // {
  //   path: "/users",
  //   name: "Utilisateurs",
  //   icon: "nc-icon nc-single-02",
  //   component: Utilisateurs,
  //   layout: "/admin",
  // }, 
  {
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-single-02",
    component: UsersManagement,
    layout: "/admin",
  },
  {
    path: "/intershipsOffers",
    name: "Interships Offers",
    icon: "nc-icon nc-briefcase-24",
    component: IntershipsOffers,
    layout: "/admin",
  },  
  {
    path: "/StudentsInterships",
    name: "Students Interships",
    icon: "nc-icon nc-hat-3",
    component: StudentsInterships,
    layout: "/admin",
  },
];
export default routes;
