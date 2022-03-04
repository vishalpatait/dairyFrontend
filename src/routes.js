/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";

import Icons from "views/examples/Icons.js";
import UserTable from "./ReactViews/Admin/UserTable";
import CustomerTable from "./ReactViews/Admin/CustomerTable";
import CustomerProfile from "./ReactViews/Admin/CustomerProfile";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/user-table",
    name: "Users",
    icon: "ni ni-tv-2 text-primary",
    component: UserTable,
    layout: "/admin"
  },
  {
    path: "/customer-table",
    name: "Customers",
    icon: "ni ni-tv-2 text-primary",
    component: CustomerTable,
    layout: "/admin"
  },

  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  }
];
export default routes;
