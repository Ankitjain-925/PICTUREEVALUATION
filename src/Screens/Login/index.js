import React, { Component } from "react";
import { LanguageFetchReducer } from "Screens/actions";
import { Redirect, Route } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { LoginReducerAim } from "./actions";
import { Settings } from "./setting";
import { Doctorarrays } from "./doctorarray";
import Grid from "@material-ui/core/Grid";
import { authy } from "./authy.js";
import { CometChat } from '@cometchat-pro/chat';
import { OptionList } from "./metadataaction.js";
import { Invoices } from "./invoices";
import {
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import sitedata from "sitedata";
import { getLanguage } from "translations/index"
import { commonNoTokentHeader } from "component/CommonHeader/index";
import * as actions from "Screens/Components/CometChat/store/action";
import Toggle from "react-toggle";
import queryString from "query-string";
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
      mode:
        this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode
          ? this.props.settings.setting.mode
          : "normal",
    };
    this.toggleShow = this.toggleShow.bind(this);
  }

  changeValue(languageType, language) {
    this.setState({ dropDownValue: language });
    this.props.LanguageFetchReducer(languageType);
  }

  componentDidMount = () => {
    actions.logout();
    this.logoutUser();
    this.props.Doctorarrays("logout");
    this.props.Invoices("logout");
    // this.movedashboard();
    this.unsetCategory();
    localStorage.removeItem("token");
    localStorage.removeItem("SUBSCRIPTION_CHECKED_ON");
    let url = this.props.location.search;
    let params = queryString.parse(url);
    this.setState({ logintoken: params.token });
    setTimeout(() => {
      this.logoutUser();
    }, 5000);
  };

  logoutUser = () => {
    CometChat.logout().then(
      console.log('loggedout from cometchat11')
    )
    this.props.OptionList(false);
    this.props.authy(false);
    this.props.Invoices(false);
    let languageType =
      this.props.stateLanguageType && this.props.stateLanguageType !== ""
        ? this.props.stateLanguageType
        : "en";
    this.props.LanguageFetchReducer(languageType);
    this.anotherPatient();
  };

  anotherPatient = () => {
    var user_id = null;
    var pin = null;
  };
  unsetCategory() {
    let category = "all";
    // this.props.filterate(category);
  }

  //Link for the register
  register = () => {
    this.props.history.push("/register");
  };

  //Link for the forgot Password
  forgotPassword = () => {
    this.props.history.push("/forgot-password");
  };

  handleChange = (input, value) => {
    this.setState({
      [input]: value,
    });
  };
  //For validate the email
  validateEmail = (elementValue) => {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
  };

  //Send email and Password to login`
  BtnSubmit = () => {
    this.setState({
      loginError: false,
      loginError2: false,
      loginError9: false,
    });
    if (this.state.inputPass && this.state.inputPass !== "") {
      if (this.validateEmail(this.state.inputEmail)) {
        let email = this.state.inputEmail;
        let password = this.state.inputPass;
        this.setState({ loaderImage: true });
        var logintoken= false;
        if(this.state.logintoken != '' && this.state.logintoken != undefined){
          logintoken = this.state.logintoken
        }
        this.setState({otherUser: false})
        this.props.LoginReducerAim(email, password,logintoken, () => {
          this.setState({ myLogin: true });
          this.setState({ loaderImage: false });
        if (
            this.props.stateLoginValueAim &&
            this.props.stateLoginValueAim?.user &&
            !this.props.stateLoginValueAim?.user?.is2fa
          ) {
            this.props.OptionList(true, () => {
              this.props.authy(true);
            });
          } else if (this.props.stateLoginValueAim.token === 450 || this.props.stateLoginValueAim.token === 401) {
            this.setState({ thisverify: false });
          } else {
            this.setState({ thisverify: true });
          }
        });
      } else {
        this.setState({ loginError2: true });
      }
    } else {
      this.setState({ loginError9: true });
    }
  }

  //For verify the code of Authy
  Verifycode = () => {
    this.setState({ loaderImage: true });
    axios
      .post(
        path + "/verifyLogin",
        {
          mob_token: this.state.mob_token,
          authyId: this.props.stateLoginValueAim.user.authyId,
        },
        commonNoTokentHeader()
      )
      .then((response) => {
        this.setState({ loaderImage: false });
        if (response.data.hassuccessed === true) {
          this.props.OptionList(true, () => {
            this.props.authy(true);
          });
        } else {
          this.setState({ loginError1: true });
        }
      });
  };
  // handlePasswordChange(e) {
  //     this.setState({ password: e.target.value });
  // }
  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }
  componentDidMount() {
    if (this.props.password) {
      this.setState({ password: this.props.password });
    }
  }

  onKeyDownlogin = (e) => {
    if (e.key === "Enter") {
      this.BtnSubmit();
    }
  };
  onKeyDownverify = (e) => {
    if (e.key === "Enter") {
      this.Verifycode();
    }
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

    let translate = getLanguage(this.props.stateLanguageType)
    let {
      Log_into,
      Register_email,
      login_Password,
      login_Forgotpassword,
      DarkMode,
      login_LOGIN_btn,
      login_an_account,
      login_Registerhere,
      two_fac_auth,
      code_not_verified,
      email_not_valid,
      password_cant_empty,
      user_not_exist,
      wrong_password,
      user_is_blocked,
      verifyAccount,
      needUnblock
    } = translate;

    if (
      stateLoginValueAim.token !== 401 &&
      stateLoginValueAim.token !== 450 &&
      stateLoginValueAim?.user?.type === "patient" &&
      this.props.verifyCode.code
    ) {
      return <Redirect to={"/patient/picture-evaluation"} />;
    } else {
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
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={11} md={10}>
                <Grid className="regHead">
                  <Grid container direction="row" justify="center">
                    <Grid item xs={6} sm={6} className="LogoForms">
                      <a href={sitedata.data.live_site}>
                        <img
                          src={require("assets/images/LogoPNG.png")}
                          alt=""
                          title=""
                        />
                      </a>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Grid className="regSelectTop">
                        <Grid className={this.props.stateLanguageType !== "pt" ? "changeLang" : "changeLang1"}>
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

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={11} sm={7} md={7}>
                <Grid className="logData">
                  <h1>{Log_into} Aimedis Online Diagnose</h1>
                </Grid>
                <Grid className="logFormMain">
                  <Grid className="logForm">
                    <div className="err_message">
                      {this.state.loginError1
                        ? code_not_verified
                        : this.state.loginError2
                        ? email_not_valid
                        : this.state.loginError9
                        ? password_cant_empty 
                        : stateLoginValueAim.isVerified == false 
                        ? verifyAccount
                        : stateLoginValueAim.permission == false 
                        ? 'User is not able to login from here, Only patient have right to login'
                        : stateLoginValueAim.isBlocked == true 
                        ? stateLoginValueAim.type === 'patient' ? user_is_blocked : needUnblock
                        : this.state.loginError === false &&
                          stateLoginValueAim.token === 450 &&
                          myLogin &&
                          stateLoginValueAim.message
                        ? stateLoginValueAim.message === "User does not exist"
                          ? user_not_exist
                          : stateLoginValueAim.message === "Wrong password"
                          ? wrong_password 
                          : false
                        : false}
                      {

                      }
                    </div>
                    <Grid className="logRow">
                      <Grid>
                        <label>{Register_email}</label>
                      </Grid>
                      <Grid>
                        <input
                          type="text"
                          value={this.state.inputEmail}
                          onKeyDown={this.onKeyDownlogin}
                          onChange={(e) =>
                            this.handleChange("inputEmail", e.target.value)
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid className="logRow logpassInst">
                      <Grid container direction="row">
                        <Grid item xs={11} sm={6} md={6}>
                          <label>{login_Password}</label>
                        </Grid>
                        <Grid
                          item
                          xs={11}
                          sm={6}
                          md={6}
                          className="logFrgtpass"
                        >
                          <label>
                            <a onClick={this.forgotPassword}>
                              {login_Forgotpassword}
                            </a>
                          </label>
                        </Grid>
                      </Grid>

                      <Grid className="logPass">
                        <input
                          type={this.state.hidden ? "password" : "text"}
                          value={this.state.inputPass}
                          onKeyDown={this.onKeyDownlogin}
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
                    </Grid>
                    {this.state.thisverify && (
                      <Grid className="logRow">
                        <Grid>
                          <label>{two_fac_auth}</label>
                        </Grid>
                        <Grid>
                          <input
                            type="text"
                            value={this.state.mob_token}
                            onKeyDown={this.onKeyDownverify}
                            onChange={(e) =>
                              this.setState({ mob_token: e.target.value })
                            }
                          />
                        </Grid>
                      </Grid>
                    )}

                    <Grid className="logRow">
                      {!this.state.thisverify ? (
                        <Grid className="regCrtAc">
                          <input
                            type="submit"
                            value={login_LOGIN_btn}
                            onClick={this.BtnSubmit.bind(this)}
                          />
                        </Grid>
                      ) : (
                        <Grid className="regCrtAc">
                          <input
                            type="submit"
                            value="VERIFY"
                            onClick={this.Verifycode.bind(this)}
                          />
                        </Grid>
                      )}
                    </Grid>
                    <p className="regOnlog">
                      {login_an_account}{" "}
                      <a onClick={this.register}>{login_Registerhere}</a>
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    }
  }
}
const mapStateToProps = (state) => {
  const {
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
  } = state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { verifyCode } = state.authy;
  const { metadata } = state.OptionList;
  const { settings } = state.Settings;
  const { doctorarray } = state.Doctorarrays;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    verifyCode,
    settings,
    doctorarray,
    metadata,
  };
};

export default connect(mapStateToProps, {
  Doctorarrays,
  LoginReducerAim,
  LanguageFetchReducer,
  authy,
  Settings,
  OptionList,
  Invoices,
})(Index);