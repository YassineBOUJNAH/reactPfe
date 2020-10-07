import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import InternshipOffers from "views/studentViews/InternshipOffers.js"
import StudentHome from "views/studentViews/StudentHome.js"
import StudentPosts from "views/studentViews/StudentPosts.js"
import StudentMeetings from "views/studentViews/StudentMeetings.js"
import UpgradeToPro from "views/Upgrade.js";

var routesStudent = [{
        path: "/home",
        name: "Home",
        icon: "nc-icon nc-caps-small",
        component: StudentHome,
        layout: "/student",
    },
    {
        path: "/myoffers",
        name: "MyOffers",
        icon: "nc-icon nc-caps-small",
        component: InternshipOffers,
        layout: "/student",
    },
    {
        path: "/mymeetings",
        name: "MyMeetings",
        icon: "nc-icon nc-caps-small",
        component: StudentMeetings,
        layout: "/student",
    },
    {
        path: "/myposts",
        name: "MyPosts",
        icon: "nc-icon nc-caps-small",
        component: StudentPosts,
        layout: "/student",
    },
    {
        pro: true,
        path: "/upgrade",
        name: "Upgrade to PRO",
        icon: "nc-icon nc-spaceship",
        component: UpgradeToPro,
        layout: "/admin",
    },
];
export default routesStudent;