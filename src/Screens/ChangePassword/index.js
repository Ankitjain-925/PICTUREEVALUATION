import React, { Component } from "react";
import { LanguageFetchReducer } from "Screens/actions";
import { Redirect, Route } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import Grid from "@material-ui/core/Grid";
import { authy } from "Screens/Login/authy.js";
import Toggle from "react-toggle";
import { getLanguage } from "translations/index"
import { Settings } from "Screens/Login/setting";
import {
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import sitedata from "sitedata";
import Loader from "Screens/Components/Loader/index";
const path = sitedata.data.path + "/UserProfile";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      password: "",
      dropDownValue: "Select",
      inputEmail: "",
      inputPass: "",
      show: false,
      myLogin: false,
      weoffer: [],
      loginError: false,
      logintoken: "",
      anotherlogin: false,
      loggedIn: false,
      loginError2: false,
      loginError9: false,
      loaderImage: false,
      mode:
        this.props.settings &&
        this.props.settings.setting &&
        this.props.settings.setting.mode
          ? this.props.settings.setting.mode
          : "normal",
    };
  }
  handleChange = (input, value) => {
    this.setState({
      [input]: value,
      errorMsg: "",
    });
  };
  componentDidMount = () => {};

  changeValue(languageType, language) {
    this.setState({ dropDownValue: language });
    this.props.LanguageFetchReducer(languageType);
  }

  //For set the language
  SetMode = () => {
    var mode = this.state.mode === "normal" ? "dark" : "normal";
    this.setState({ mode: mode }, () => {
      this.props.Settings("loggedOut", mode);
    });
  };                                        

  //send the email on email id for the reset password
  BtnSubmit = () => {
    var email_not_exist, email_exist;
    var validEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/gim;
    if (!validEmail.test(this.state.inputEmail)) {
      this.setState({ emailValid: false });
    } else {
      let userEmail = this.state.inputEmail;
      this.setState({ emailValid: true, loaderImage: true });
      axios
        .post(path + "/forgotPassword?email=" + userEmail, {
          lan: this.props.stateLanguageType,
          passFrom: "landing",
        })
        .then((response) => {
          this.setState({ loaderImage: false });
          if (response.data.status === 450) {
            this.setState({
              createHospitalError: true,
              errorMsg: "Email does not exist",
            });
          } else {
            this.setState({
              successMsg: true,
              successMsgText: "Please check your email for change password",
              inputEmail: "",
            });
            setTimeout(
              function () {
                this.setState({
                  successMsg: false,
                  successMsgText: "",
                });
                this.props.history.push("/");
              }.bind(this),
              3000
            );
          }
        })
        .catch((error) => {});
    }
  };

  render() {
    const { stateLoginValueAim } = this.props;
    const { myLogin } = this.state;
    if (stateLoginValueAim.token !== 450 && this.props.verifyCode.code) {
      return <Redirect to={"/"} />;
    }

    let translate = getLanguage(this.props.stateLanguageType)
    let {
      Register_email,
      forget_password,
      plz_enter_valid_email,
      DarkMode,
    } = translate;

    return (
      <Grid
        className={
          this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === "dark"
            ? "loginSiteUpr homeBgDrk"
            : "loginSiteUpr"
        }
      >
        <Grid className="loginSite">
          {this.state.loaderImage && <Loader />}
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={11} md={10}>
              <Grid className="regHead">
                <Grid container direction="row" justify="center">
                  <Grid item xs={6} sm={6} className="LogoForms">
                    <a>
                      <img
                        src={require("assets/images/LogoPNG.png")}
                        alt=""
                        title=""
                      />
                    </a>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Grid className="regSelectTop">
                      <Grid className="changeLang">
                        <li>
                          <span className="ThemeModeSet1"> {DarkMode} </span>
                          <span className="ThemeModeSet">
                            <Toggle
                              icons={false}
                              checked={this.state.mode === "dark"}
                              name="mode"
                              onClick={(e) => this.SetMode(e)}
                            />
                          </span>
                        </li>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                              {this.state.dropDownValue}
                            </DropdownToggle>
                            {/* 
                                                en => English
                                                de => German  

                                            */}
                            <DropdownMenu className="langInerFooter">
                              <DropdownItem
                                onClick={() => {
                                  this.changeValue("en", "English");
                                }}
                              >
                                <NavLink>English</NavLink>
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  this.changeValue("de", "German");
                                }}
                              >
                                <NavLink>German</NavLink>
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  this.changeValue("ch", "Chinese");
                                }}
                              >
                                <NavLink>Chinese</NavLink>
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  this.changeValue("pt", "Portuguese");
                                }}
                              >
                                <NavLink>Portuguese</NavLink>
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  this.changeValue("sp", "Spanish");
                                }}
                              >
                                <NavLink>Spanish</NavLink>
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  this.changeValue("rs", "Russian");
                                }}
                              >
                                <NavLink>Russian</NavLink>
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  this.changeValue("sw", "Swahili");
                                }}
                              >
                                <NavLink>Swahili</NavLink>
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  this.changeValue("fr", "French");
                                }}
                              >
                                <NavLink>French</NavLink>
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  this.changeValue("ar", "Arabic");
                                }}
                              >
                                <NavLink>Arabic</NavLink>
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  this.changeValue("tr", "Turkish");
                                }}
                              >
                                <NavLink>Turkish</NavLink>
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={11} sm={7} md={7}>
              <Grid className="logData">
                <h1>{forget_password}</h1>
              </Grid>
              <Grid className="logFormMain">
                <Grid className="logForm">
                  {this.state.errorMsg && this.state.errorMsg !== "" && (
                    <div className="err_message">{this.state.errorMsg}</div>
                  )}
                  {this.state.successMsg && this.state.successMsgText && (
                    <div className="success_message">
                      {this.state.successMsgText}
                    </div>
                  )}
                  {this.state.emailValid === false ? plz_enter_valid_email : ""}
                  <Grid className="logRow">
                    <Grid>
                      <label>{Register_email}</label>
                    </Grid>
                    <Grid>
                      <input
                        type="text"
                        value={this.state.inputEmail}
                        onChange={(e) =>
                          this.handleChange("inputEmail", e.target.value)
                        }
                      />
                    </Grid>
                  </Grid>

                  <Grid className="logRow">
                    <Grid className="regCrtAc">
                      <input
                        type="submit"
                        value={forget_password}
                        onClick={this.BtnSubmit.bind(this)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
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
  const { verifyCode } = state.authy;
  const { settings } = state.Settings;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
  };
};

export default connect(mapStateToProps, {
  LoginReducerAim,
  LanguageFetchReducer,
  authy,
  Settings,
})(Index);
// export default Index;
