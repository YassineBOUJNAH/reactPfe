import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import InternshipOffers from "views/studentViews/InternshipOffers.js"
import StudentHome from "views/studentViews/StudentHome.js"
import StudentPostssss from "views/studentViews/StudentPostssss.js"
import StudentMeetings from "views/studentViews/StudentMeetings.js"
import StudentReport from "views/studentViews/StudentReport.js"
import UpgradeToPro from "views/Upgrade.js";

var routesStudent = [{
        path: "/home",
        name: "Home",
        icon: "nc-icon nc-caps-small",
        component: StudentHome,
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
        path: "/myreports",
        name: "MyReports",
        icon: "nc-icon nc-caps-small",
        component: StudentReport,
        layout: "/student",
    },
    {
        path: "/myposts",
        name: "Posts",
        icon: "nc-icon nc-caps-small",
        component: StudentPostssss,
        layout: "/student",
    },
];
export default routesStudent;