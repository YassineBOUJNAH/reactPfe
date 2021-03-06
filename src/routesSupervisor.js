
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js"; 
import Internships from "views/supervisorViews/internships" ;  
import Meetings from 'views/supervisorViews/meetings' ;  
import Post from 'views/supervisorViews/post' ; 
import Reports from 'views/supervisorViews/reports'

var routes = [
  {
    path: "/internships",
    name: "internships",
    icon: " nc-icon nc-single-02",
    component: Internships,
    layout: "/supervisor",
  },
  {
    path: "/meetings",
    name: "Meetings",
    icon: "nc-icon nc-bell-55",
    component: Meetings,
    layout: "/supervisor",
  }, 
  {
    path: "/posts",
    name: "Posts",
    icon: "nc-icon nc-bullet-list-67",
    component: Post ,
    layout: "/supervisor",
  } ,
  {
    path: "/reports",
    name: "reports monitoring",
    icon: "nc-icon nc-book-bookmark",
    component: Reports,
    layout: "/supervisor",
  } , 
   
 
];
export default routes ;
