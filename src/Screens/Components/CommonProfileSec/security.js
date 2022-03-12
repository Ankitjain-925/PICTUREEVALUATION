import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { LanguageFetchReducer } from "Screens/actions";
import { Settings } from "Screens/Login/setting";
import { withRouter } from "react-router-dom";
import { ChangePass, ChangePassword, Change2fa } from "./securityapi";
import Loader from "Screens/Components/Loader/index";
import { getLanguage } from "translations/index"

var letter = /([a-zA-Z])+([ -~])*/,
  number = /\d+/,
  specialchar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Current_state: this.props.LoggedInUser,
      Password: {},
      is2fa: this.props.LoggedInUser.is2fa,
      is2faDone: false,
      PassDone: false,
      notmatch: false,
      loaderImage: false,
      fillall: false,
    };
  }
  
  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      Change,
      password,
      is,
      we_use_authy,
      supportive_text,
      Passwordisnotvalid,
      Current,
      confirm_password,
      new_password,
      two_fac_auth,
      password_changed,
      new_and_confirm_pass_not_same,
      enabled,
      disabled,
      current_pass_not_match,
      plz_fill_fields,
      Register_characters,
      Disable,
      Enable,
      change_password,
      Register_Passwordshould,
      Register_letter,
      Register_number,
      Register_special,
    } = translate;

    return (
      <div>
        {this.state.loaderImage && <Loader />}
        {this.state.PassDone && (
          <div className="success_message">{password_changed}</div>
        )}
        {this.state.notVlidpass && (
          <div className="err_message">{Passwordisnotvalid}</div>
        )}
        {this.state.notmatchCon && (
          <div className="err_message">{new_and_confirm_pass_not_same}</div>
        )}
        {this.state.notmatch && (
          <div className="err_message">{current_pass_not_match}</div>
        )}
        {this.state.fillall && (
          <div className="err_message">{plz_fill_fields}</div>
        )}
        {this.state.is2faDone && (
          <div className="success_message">
            {two_fac_auth} {this.state.is2fa ? enabled : disabled}
          </div>
        )}
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item xs={12} md={5}>
            <Grid className="chngPasswrd">
              <h2>{change_password}</h2>
              {/* <p>{supportive_text}</p> */}
            </Grid>
            <Grid className="genPass">
              <Grid className="genPassInr">
                <label>
                  {Current} {password}
                </label>
                <Grid>
                  <input
                    type="password"
                    name="current_pass"
                    onChange={(e)=> ChangePass(e, this)}
                  />
                </Grid>
              </Grid>
              <Grid className="genPassInr RelativeatSecurity">
                <label>{new_password}</label>
                <Grid>
                  <input
                    type="password"
                    name="new_pass"
                    onChange={(e)=> ChangePass(e, this)}
                  />
                </Grid>

                {this.state.Password && this.state.Password.new_pass ? (
                  <div className="passInst">
                    <div className="passInstIner ">
                      <p>{Register_Passwordshould}</p>
                      <img
                        src={require("assets/images/passArrow.png")}
                        alt=""
                        title=""
                        className="passArow"
                      />
                      <ul>
                        <li>
                          {this.state.Password &&
                            this.state.Password.new_pass &&
                            this.state.Password.new_pass.length > 8 && (
                              <a>
                                <img
                                  src={require("assets/images/CheckCircle.svg")}
                                  alt=""
                                  title=""
                                />
                                {Register_characters}
                              </a>
                            )}
                          {this.state.Password &&
                            this.state.Password.new_pass &&
                            this.state.Password.new_pass.length <= 8 && (
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
                          {this.state.Password &&
                            this.state.Password.new_pass &&
                            !this.state.Password.new_pass.match(letter) && (
                              <a>
                                <img
                                  src={require("assets/images/CloseCircle.svg")}
                                  alt=""
                                  title=""
                                />
                                {Register_letter}
                              </a>
                            )}
                          {this.state.Password &&
                            this.state.Password.new_pass &&
                            this.state.Password.new_pass.match(letter) && (
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
                          {this.state.Password &&
                            this.state.Password.new_pass &&
                            !this.state.Password.new_pass.match(number) && (
                              <a>
                                <img
                                  src={require("assets/images/CloseCircle.svg")}
                                  alt=""
                                  title=""
                                />
                                {Register_number}
                              </a>
                            )}
                          {this.state.Password &&
                            this.state.Password.new_pass &&
                            this.state.Password.new_pass.match(number) && (
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
                          {this.state.Password &&
                            this.state.Password.new_pass &&
                            !this.state.Password.new_pass.match(
                              specialchar
                            ) && (
                              <a>
                                <img
                                  src={require("assets/images/CloseCircle.svg")}
                                  alt=""
                                  title=""
                                />
                                {Register_special}
                              </a>
                            )}
                          {this.state.Password &&
                            this.state.Password.new_pass &&
                            this.state.Password.new_pass.match(specialchar) && (
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
                      <p>{Register_Passwordshould}</p>
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
              <Grid className="genPassInr">
                <label>{confirm_password}</label>
                <Grid>
                  <input
                    type="password"
                    name="new_pass_comfirm"
                    onChange={(e)=> ChangePass(e, this)}
                  />
                </Grid>
              </Grid>
              <Grid className="genPassInr">
                <Grid>
                  <input
                    type="submit"
                    value={change_password}
                    onClick={()=>ChangePassword(this)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid className="twofactorAuth">
              <Grid className="factorAuth">
                <h3>{two_fac_auth}</h3>
                <p>{we_use_authy}</p>
              </Grid>
              <Grid className="factorAuthEnbl">
                <h4>
                  {this.state.is2fa && (
                    <img
                      src={require("assets/images/watched.svg")}
                      alt=""
                      title=""
                    />
                  )}{" "}
                  {two_fac_auth} {is} {this.state.is2fa ? enabled : disabled}
                </h4>
                <Grid className="genPass">
                  <input
                    type="submit"
                    onClick={()=>Change2fa(this)}
                    value={
                      this.state.is2fa
                        ? `${Disable} ${two_fac_auth}`
                        : `${Enable} ${two_fac_auth}`
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={7}></Grid>
        </Grid>
      </div>
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
