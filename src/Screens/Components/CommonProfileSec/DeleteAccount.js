import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { LanguageFetchReducer } from "Screens/actions";
import { Settings } from "Screens/Login/setting";
import { withRouter } from "react-router-dom";
import sitedata from "sitedata";
import axios from "axios";
import Loader from "Screens/Components/Loader/index";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { getLanguage} from "translations/index";
import { commonHeader, commonCometDelHeader } from 'component/CommonHeader/index';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Current_state: this.props.LoggedInUser,
      Password: {},
      notmatch: false,
      loaderImage: false,
      enterpass: false
    };
  }

  //FOR DELETING THE USER
  DeleteUser=(deletekey, profile_id, bucket)=>{
    this.setState({ loaderImage: true });
    const user_token = this.props.stateLoginValueAim.token;
    axios.delete(sitedata.data.path + '/admin/deleteUser/' + deletekey+'?bucket='+bucket, commonHeader(user_token))
        .then((response) => {
            this.setState({ loaderImage: false });
            var data = JSON.stringify({"permanent":true});
            var config = {
              method: 'delete',
              url: 'https://api-eu.cometchat.io/v2.0/users/'+profile_id.toLowerCase(),
              headers: commonCometDelHeader(),
              data : data
            };
            
            axios(config)
            .then(function (response) { })
            .catch(function (error) { });
            this.props.history.push('/');

        }).catch((error) => {});
}

  //Dialog for deleting accoount 
  DeleteAccount=()=>{
      if(!this.state.notmatch){
        let translate = getLanguage(this.props.stateLanguageType)
        let { cancel, ok, reallyWantDelete, looseAllData } = translate;
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div
                  className={
                    this.props.settings &&
                      this.props.settings.setting &&
                      this.props.settings.setting.mode === "dark"
                      ? "dark-confirm react-confirm-alert-body"
                      : "react-confirm-alert-body"
                  }
                >
                  <h1 className="deletewarninghead">{reallyWantDelete}</h1>
                  <p className="deletewarning">{looseAllData}</p>
                  <div className="react-confirm-alert-button-group">
                    <button
                      onClick={() => {
                        this.DeleteUser(this.state.Current_state._id, this.state.Current_state.profile_id, this.state.Current_state.bucket);
                        onClose();
                      }}
                    >
                      {ok}
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                      }}
                    >
                      {cancel}
                    </button>
                  </div>
                </div>
              );
            },
          });
      }
  }
  //For Change Password State For version V4
  ChangePass = (e) => {
    const state = this.state.Password;
    state[e.target.name] = e.target.value;
    if (
      e.target.value &&
      e.target.value.length > 0 &&
      e.target.name === "current_pass"
    ) {
      axios
        .post(
          sitedata.data.path + "/UserProfile/Users/checkPass",
          {
            password: this.state.Password.current_pass,
          },
          commonHeader(this.props.user_token)
        )
        .then((responce) => {
          if (responce.data.data) {
            this.setState({ notmatch: false, fillall: false });
          } else {
            this.setState({ notmatch: true, fillall: false });
          }
        });
    }
    this.setState({ Password: state });
  };

 
  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      password,
      Current,
      Submit,
      delete_your_account,
      delete_account,
      current_pass_not_match,
    } = translate;

    return (
      <div>
        {this.state.loaderImage && <Loader />}
        {this.state.notmatch && (
          <div className="err_message">{current_pass_not_match}</div>
        )}
      
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item xs={12} md={5}>
              
            <Grid className="chngPasswrd">
              <h2>{delete_your_account}</h2>
              {/* <p>{supportive_text}</p> */}
            </Grid>
            <Grid className="infoSub">
                <input
                type="submit"
                className=""
                onClick={()=>{this.setState({enterpass: true})}}
                value={delete_account}
                />
            </Grid>
            {this.state.enterpass && 
            <Grid className="genPass current_pass_sec">
                <Grid className="genPassInr">
                    <label>
                    {Current} {password}
                    </label>
                    <input
                      type="password"
                      name="current_pass"
                      onChange={(e)=>this.ChangePass(e)}
                    />
                    <input
                      type="submit"
                      onClick={this.DeleteAccount}
                      value={Submit} 
                    />
                </Grid>   
              </Grid>}
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