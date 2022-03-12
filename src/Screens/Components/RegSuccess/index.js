import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { LanguageFetchReducer } from "Screens/actions";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import "react-calendar/dist/Calendar.css";
import { getLanguage } from "translations/index"
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      openDash: false,
      date: new Date(),
    };
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };
  redirectPage = () => {
    this.props.history.push("/");
  };
  // fancybox open
  handleOpenDash = () => {
    this.setState({ openDash: true });
  };
  handleCloseDash = () => {
    this.setState({ openDash: false });
  };

  onChange = (date) => this.setState({ date });

  render() {
    const { selectedOption } = this.state;
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      RegisteredSuccessfully,
      emailverification,
      Youregisteredsuccessfully,
      page_temparary_unavailable,
      go_to_home,
    } = translate;
    return (
      <Grid
        className={
          this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === "dark"
            ? "homeBg homeBgDrk"
            : "homeBg"
        }
      >
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={11} md={8} lg={6}>
              <Grid className="webLogo">
                <a href="/">
                  <img
                    src={require("assets/images/LogoPNG.png")}
                    alt=""
                    title=""
                  />
                </a>
              </Grid>
              <div className="NotFound">
                <h1>{RegisteredSuccessfully}</h1>
              </div>
              <div className="NotFoundContent">
                <div>{Youregisteredsuccessfully}. </div>
                <div>{emailverification}.</div>
                <div onClick={this.redirectPage} className="BackHomeBtn">
                  {go_to_home}
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
export default connect(mapStateToProps, {
  LoginReducerAim,
  Settings,
  LanguageFetchReducer,
})(Index);
