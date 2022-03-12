import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import FileUploader from "Screens/Components/JournalFileUploader/index";
import ShowHide from "Screens/Components/ShowHide/index";
import { LoginReducerAim } from "Screens/Login/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { pure } from "recompose";
import sitedata from "sitedata";
import axios from "axios";
import { LanguageFetchReducer } from "Screens/actions";
import { getLanguage } from "translations/index"
import { commonHeader } from "component/CommonHeader/index"
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateTrack: this.props.updateTrack,
      date_format: this.props.date_format,
      time_format: this.props.time_format,
      options: this.props.options,
      searchName: [],
      name : '',
    };
  }

  componentDidMount = () => {};

  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.updateTrack !== this.props.updateTrack) {
      this.setState({ updateTrack: this.props.updateTrack });
    }
  };

   findByName = (e) => {
    let pharmacy_id = this.state.pharmacy_id;

    if (pharmacy_id) {
      this.setState({pharmacy_id : ''})
    }
    this.setState(
      { name: e.target.value, searchLocation: []},
      () => this.getName()
    );
  };

  getName = () => {
    var user_token = this.props.stateLoginValueAim.token;

    if (this.state.name && this.state.name !== "") {
      axios
        .get(
          sitedata.data.path +
            "/emergency_record/getPharmacy/search/" +
            this.state.name,
           commonHeader(user_token)
        )
        .then((response) => {
          this.setState({ searchName: response.data.data });
        })
        .catch((error) => {
          this.setState({ loaderImage: false });
        });
    } else {
      this.setState({ searchName: [] });
    }
  };

  SetIds = (item) => {
    this.props.updateEntryState1(item.profile_id, 'pharmacy_id');
    this.props.updateEntryState1(this.props.cur_one.profile_id, 'patient_profile_id');
    
    this.setState({
      searchLocation: [],
      searchName: [],
      pharmacy_id: item.profile_id,
      name: item.first_name
    });
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let { attachments, save_entry, search_pharmacy_by_name_id, Pharmacy } = translate;
    return (
      <div>
        {!this.props.visibility && (
          <Grid className="cnfrmDiaMain">
            {this.props.comesfrom === "doctor" && <Grid className="scanInputs">
              <Grid>
                <label>{Pharmacy}</label>
              </Grid>
              <Grid className="scanInputPhrm dropdown-main">
                <input
                  type="text"
                  placeholder={search_pharmacy_by_name_id}
                  onChange={this.findByName}
                  value={
                    this.state.pharmacy_id
                      ? this.state.name +
                      "- " +
                      this.state.pharmacy_id
                      : this.state.name
                  }
                />
                <img
                  src={require("../../../../assets/images/srchInputField.svg")}
                  alt=""
                  title=""
                />
                <div
                  className={
                    this.state.searchName && this.state.searchName.length > 0
                      ? "show-content dropdown-content"
                      : "dropdown-content"
                  }
                >
                    {this.state.searchName?.length>0 && this.state.searchName.map((data) => (
                  <a onClick={() => this.SetIds(data)}>
                    {data.first_name + " " + data.last_name}
                  </a>
                ))}
                </div>
              </Grid>
            </Grid>}
            <Grid className="attchForms attchImg">
              <Grid>
                <label>{attachments}</label>
              </Grid>
              <FileUploader
                cur_one={this.props.cur_one}
                attachfile={
                  this.state.updateTrack && this.state.updateTrack.attachfile
                    ? this.state.updateTrack.attachfile
                    : []
                }
                name="UploadTrackImageMulti"
                comesFrom="journal"
                isMulti="true"
                fileUpload={(event) => {
                  this.props.FileAttachMulti(event);
                }}
              />
            </Grid>
          </Grid>
        )}

        <Grid className="infoShwHidMain3upr">
          <ShowHide
            eventdate={true}
            date_format={this.state.date_format}
            value={this.state.updateTrack}
            onChange={(data) => this.props.GetHideShow(data)}
          />
          <Grid className="infoShwSave3">
            <input
              type="submit"
              value={save_entry}
              onClick={this.props.AddTrack}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  const {
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
  } = state.LoginReducerAim;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail
  };
};
export default pure(withRouter(
  connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer })(Index)
));
