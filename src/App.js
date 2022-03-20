import React, { lazy, Suspense, Fragment, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import AdminLayout from "layouts/Admin.js";
import { Provider } from "react-redux";
import store from "../src/Redux/store";
import CustomerProfile from "./ReactViews/Admin/CustomerProfile";
import { createBrowserHistory } from "history";
import Customers from "ReactViews/Users/Customers";
import Home from "ReactViews/Home/Home";
import SignIn from "ReactViews/Auth/SignIn";
import ForgotPassword from "ReactViews/Auth/ForgotPassword";
import ResetPassword from "ReactViews/Auth/ResetPassword";
const history = createBrowserHistory();
function App() {
  // ...................................................................................
  var isLogin = false;
  let token = JSON.parse(localStorage.getItem("x-auth-token"));
  if (token) {
    isLogin = true;
  }
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Suspense fallback={<p>Loading....</p>}>
            <Switch>
              <Route exact path="/" render={props => <Home {...props} />} />
              <Route path="/login" render={props => <SignIn {...props} />} />
              <Route
                path="/forgot-password"
                render={props => <ForgotPassword {...props} />}
              />
              <Route
                path="/forgot-password"
                render={props => <ForgotPassword {...props} />}
              />
              <Route
                path="/reset-password/:token"
                render={props => <ResetPassword {...props} />}
              />
              {isLogin && (
                <Fragment>
                  <Route
                    path="/admin"
                    render={props => <AdminLayout {...props} />}
                  />
                  <Route
                    path="/customer"
                    render={props => <Customers {...props} />}
                  />
                  <Route
                    path="/customer-profile/:id"
                    render={props => <CustomerProfile {...props} />}
                  />
                </Fragment>
              )}
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
export default App;
