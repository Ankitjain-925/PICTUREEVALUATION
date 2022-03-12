import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

// Added By Ankita Patient Component
import Register from "Screens/Register";
import Login from "Screens/Login";
import ForgotPass from "Screens/ChangePassword";
import ChangePass from "Screens/ChangePassword/changepassword";
import NotFound from "Screens/Components/NotFound";
import PatientProfile from "Screens/Patient/Profile/index";
import PatientPE from "Screens/Patient/PictureEvaluation/index";
import RegSuccuss from "Screens/Components/RegSuccess/index";
import FeedBack from "Screens/Patient/SubmitFeedback/index";

class Routermain extends Component {
  render() {
    return (
      <Router basename={"/"}>
        <Grid>
          <Switch>
            {/* Added by Ankita */}
            <Route exact path="/" render={(props) => <Login {...props} />} />
            <Route
              exact
              path="/register"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/forgot-password"
              render={(props) => <ForgotPass {...props} />}
            />
            <Route
              exact
              path="/change-password"
              render={(props) => <ChangePass {...props} />}
            />
            <Route
              exact
              path="/patient"
              render={(props) => <PatientProfile {...props} />}
            />
            <Route
              exact
              path="/patient/picture-evaluation"
              render={(props) => <PatientPE {...props} />}
            />
               <Route
              exact
              path="/patient/feedback"
              render={(props) => <FeedBack {...props} />}
            />

            <Route
              exact
              path="/register-successfull"
              render={(props) => <RegSuccuss {...props} />}
            />
          
            {/* <Route
              path="/virtualhospital/assign"
              exact={true}
              render={(props) => <AssignModelTask {...props} />}
            /> */}
           <Route
              path="*"
              exact={true}
              render={(props) => <NotFound {...props} />}
            />

             {/* End By Ankita */}
             
          </Switch>
        </Grid>
      </Router>
    );
  }
}
export default Routermain;
