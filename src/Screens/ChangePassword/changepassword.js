import React, { Component } from "react";
import { LanguageFetchReducer } from "Screens/actions";
import { Redirect, Route } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import Grid from "@material-ui/core/Grid";
import { authy } from "Screens/Login/authy.js";
import queryString from "query-string";
import Loader from "Screens/Components/Loader/index";
import { Settings } from "Screens/Login/setting";
import Toggle from "react-toggle";
import {
  NavLink,
  UncontrolledDropdown,
  DropdownToggle, 
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index"

import { getLanguage } from "translations/index"

const path = sitedata.data.path + "/UserProfile";
var letter = /([a-zA-Z])+([ -~])*/,
  number = /\d+/,
  specialchar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

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
      regisError0: "",
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

  changeValue(languageType, language) {
    this.setState({ dropDownValue: language });
    this.props.LanguageFetchReducer(languageType);
  }
  componentDidMount = () => {};
  redirectPage() {
    this.props.history.push("/");
  }

  //On send the Change Password
  BtnSubmit = () => {
    let password_valid, auth_error, pass_change;
    let password = this.state.inputPass;
    if (
      this.state.inputPass.match(letter) &&
      this.state.inputPass.match(number) &&
      this.state.inputPass.match(specialchar)
    ) {
      this.setState({
        passError: false,
        errorMsg: "",
        regisError0: "",
      });
      const values = queryString.parse(this.props.location.search);
      const user_token = values.token;
      if (user_token) {
        this.setState({ loaderImage: true });
        axios
          .put(
            path + "/setpassword?password=" + password,
            {},
            commonHeader(user_token))
          .then((response) => {
            if (response.data.msg === "Password is updated") {
              this.setState({
                successMsg: true,
                successMsgText: "Password has been changed.",
                inputPass: "",
              });
              setTimeout(
                function () {
                  this.redirectPage();
                }.bind(this),
                3000
              );
            } else {
              this.setState({
                passError: true,
                errorMsg: "Authentication required.",
              });
            }
            this.setState({ loaderImage: false });
          })
          .catch((error) => {
            this.setState({ loaderImage: false });
            this.setState({
              passError: true,
              errorMsg: "Authentication required.",
            });
            setTimeout(
              function () {
                this.redirectPage();
              }.bind(this),
              3000
            );
          });
      }
    } else {
      this.setState({ regisError0: "Password is not valid" });
    }
  };
  toggleShow = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  //For set the language
  SetMode = () => {
    var mode = this.state.mode === "normal" ? "dark" : "normal";
    this.setState({ mode: mode }, () => {
      this.props.Settings("loggedOut", mode);
    });
  };

  render() {
    const { stateLoginValueAim } = this.props;
    const { myLogin } = this.state;
    if (stateLoginValueAim.token !== 450 && this.props.verifyCode.code) {
      return <Redirect to={"/"} />;
    }
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      email,
      change_password,
      password_reset,
      login_Password,
      password_must_have_its_condition,
      DarkMode,
      Register_characters,
      Register_letter,
      Register_number,
      Register_special,
      Register_Passwordshould,
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
                        src={require("assets/images/LogoPNG.png")}s
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
                <h1>{password_reset}</h1>
              </Grid>
              <Grid className="logFormMain">
                <Grid className="logForm">
                  <div className="err_message">
                    {this.state.errorMsg}
                    {this.state.regisError0}
                    {this.state.passwordValid === false
                      ? password_must_have_its_condition
                      : ""}
                  </div>
                  {this.state.successMsg && this.state.successMsgText && (
                    <div className="success_message">
                      {this.state.successMsgText}
                    </div>
                  )}
                  <Grid className="registerRow passInstMain">
                    <Grid>
                      <label>{login_Password}</label>
                    </Grid>
                    <Grid className="registerPass">
                      <input
                        type={this.state.hidden ? "password" : "text"}
                        value={this.state.inputPass}
                        onChange={(e) =>
                          this.handleChange("inputPass", e.target.value)
                        }
                      />
                      {this.state.hidden && (
                        <a onClick={this.toggleShow}>
                          <img
                            src={require("assets/images/showeye.svg")}
                            alt=""
                            title=""
                          />
                        </a>
                      )}
                      {!this.state.hidden && (
                        <a onClick={this.toggleShow}>
                          <img
                            src={require("assets/images/hide.svg")}
                            alt=""
                            title=""
                          />
                        </a>
                      )}
                    </Grid>
                    {this.state.inputPass ? (
                      <div className="passInst">
                        <div className="passInstIner">
                          <p>{Register_Passwordshould}</p>
                          <img
                            src={require("assets/images/passArrow.png")}
                            alt=""
                            title=""
                            className="passArow"
                          />
                          <ul>
                            <li>
                              {this.state.inputPass &&
                                this.state.inputPass.length > 8 && (
                                  <a>
                                    <img
                                      src={require("assets/images/CheckCircle.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Register_characters}
                                  </a>
                                )}
                              {this.state.inputPass &&
                                this.state.inputPass.length <= 8 && (
                                  <a>
                                    <img
                                      src={require("assets/images/CloseCircle.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Register_characters}
                                  </a>
                                )}
                            </li>
                            <li>
                              {this.state.inputPass &&
                                !this.state.inputPass.match(letter) && (
                                  <a>
                                    <img
                                      src={require("assets/images/CloseCircle.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Register_letter}
                                  </a>
                                )}
                              {this.state.inputPass &&
                                this.state.inputPass.match(letter) && (
                                  <a>
                                    <img
                                      src={require("assets/images/CheckCircle.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Register_letter}
                                  </a>
                                )}
                            </li>
                            <li>
                              {this.state.inputPass &&
                                !this.state.inputPass.match(number) && (
                                  <a>
                                    <img
                                      src={require("assets/images/CloseCircle.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Register_number}
                                  </a>
                                )}
                              {this.state.inputPass &&
                                this.state.inputPass.match(number) && (
                                  <a>
                                    <img
                                      src={require("assets/images/CheckCircle.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Register_number}
                                  </a>
                                )}
                            </li>
                            <li>
                              {this.state.inputPass &&
                                !this.state.inputPass.match(specialchar) && (
                                  <a>
                                    <img
                                      src={require("assets/images/CloseCircle.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Register_special}
                                  </a>
                                )}
                              {this.state.inputPass &&
                                this.state.inputPass.match(specialchar) && (
                                  <a>
                                    <img
                                      src={require("assets/images/CheckCircle.svg")}
                                      alt=""
                                      title=""
                                    />
                                    {Register_special}
                                  </a>
                                )}
                            </li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="passInst">
                        <div className="passInstIner">
                          <p>{Register_Passwordshould}:</p>
                          <img
                            src={require("assets/images/passArrow.png")}
                            alt=""
                            title=""
                            className="passArow"
                          />
                          <ul>
                            <li>
                              <a>
                                <img
                                  src={require("assets/images/CloseCircle.svg")}
                                  alt=""
                                  title=""
                                />
                                {Register_characters}
                              </a>
                            </li>
                            <li>
                              <a>
                                <img
                                  src={require("assets/images/CloseCircle.svg")}
                                  alt=""
                                  title=""
                                />
                                {Register_letter}
                              </a>
                            </li>
                            <li>
                              <a>
                                <img
                                  src={require("assets/images/CloseCircle.svg")}
                                  alt=""
                                  title=""
                                />
                                {Register_number}
                              </a>
                            </li>
                            <li>
                              <a>
                                <img
                                  src={require("assets/images/CloseCircle.svg")}
                                  alt=""
                                  title=""
                                />
                                {Register_special}
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </Grid>

                  {/* <Grid className="logRow">
                                    <Grid><label>Password</label></Grid>
                                    <Grid><input type="password" 
                                     value={this.state.inputPass} onChange={e => this.handleChange('inputPass', e.target.value)}/></Grid>
                                </Grid> */}

                  <Grid className="logRow">
                    <Grid className="regCrtAc">
                      <input
                        type="submit"
                        value={change_password}
                        onClick={()=>this.BtnSubmit()}
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