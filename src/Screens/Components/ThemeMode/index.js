import React, { Component } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from "Screens/actions";
import sitedata from "sitedata";
import axios from "axios";
import Loader from "Screens/Components/Loader/index";
import { commonHeader } from "component/CommonHeader/index"

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode,
    };
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.mode !== this.props.mode) {
      this.setState({ mode: this.props.mode });
    }
  };
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.mode !== this.props.mode || nextState.mode !== this.state.mode
    );
  }
  //For set the language
  SetMode = () => {
    var mode = this.state.mode === "normal" ? "dark" : "normal";
    this.setState({ loaderImage: true, mode: mode }, () => {
      axios
        .put(
          sitedata.data.path + "/UserProfile/updateSetting",
          {
            mode: this.state.mode,
            user_id: this.props.stateLoginValueAim.user._id,
            user_profile_id: this.props.stateLoginValueAim.user.profile_id,
          },
          commonHeader(this.props.stateLoginValueAim.token)
        )
        .then((responce) => {
          this.setState({ loaderImage: false });
          this.props.getSetting();
        });
    });
  };

  render() {
    return (
      <span>
        {this.state.loaderImage && <Loader />}
        <Toggle
          icons={false}
          checked={this.state.mode === "dark"}
          name="mode"
          onClick={(e) => this.SetMode(e)}
        />
      </span>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
  } = state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
  };
};
export default withRouter(
  connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(
    Index
  )
);
