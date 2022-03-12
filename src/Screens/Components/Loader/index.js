import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Settings } from "Screens/Login/setting";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Loader extends Component {
  render() {
    return (
      <Grid
        className={
          this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === "dark"
            ? "dataDarkLoader"
            : ""
        }
      >
        <Grid className="dataLoader">
          <img
            src={require("assets/images/LoaderAim.gif")}
            alt=""
            title=""
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const { settings } = state.Settings;
  return {
    settings,
  };
};
export default withRouter(connect(mapStateToProps, { Settings })(Loader));
