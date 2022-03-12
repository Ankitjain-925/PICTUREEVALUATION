import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import sitedata from "sitedata";
import axios from "axios";
import MMHG from "Screens/Components/mmHgField/index";
import DateFormat from "Screens/Components/DateFormat/index";
import TimeTaken from "Screens/Components/TimeTaken/vaccinationTimeTaken";
import NotesEditor from "Screens/Components/Editor/index";
import FileUploader from "Screens/Components/JournalFileUploader/index";
import ShowHide from "Screens/Components/ShowHide/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { LanguageFetchReducer } from "Screens/actions";
import { getLanguage } from "translations/index"
import { pure } from "recompose";
import { commonHeader } from "component/CommonHeader/index"

var doctorArray = [];
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateTrack: this.props.updateTrack,
      date_format: this.props.date_format,
      time_format: this.props.time_format,
      options: this.props.options,
      DocSug: [],
      hint: [],
      shown: true,
    };
  }

  componentDidMount = () => {
    this.alldoctor();
  };

  //User list will be show/hide
  toggle = () => {
    this.setState({
      shown: !this.state.shown,
      
    });
  };

  alldoctor = () => {
    var FamilyList = [];
    doctorArray = [];
    const user_token = this.props.stateLoginValueAim.token;
    axios
      .get(sitedata.data.path + "/UserProfile/DoctorUsers", commonHeader(user_token))
      .then((response) => {
        this.setState({ allDocData: response.data.data }, () => {
          for (let i = 0; i < this.state.allDocData.length; i++) {
            var name = "";
            if (
              this.state.allDocData[i].first_name &&
              this.state.allDocData[i].last_name
            ) {
              name =
                this.state.allDocData[i].first_name +
                " " +
                this.state.allDocData[i].last_name;
            } else if (this.state.allDocData[i].first_name) {
              name = this.state.allDocData[i].first_name;
            }
            doctorArray.push({
              label: name,
            });
          }
          this.setState({ DocSug: doctorArray });
        });
      });
  };

  filterDoc = (name) => {
    var filterDta =
      this.state.DocSug &&
      this.state.DocSug.length > 0 &&
      this.state.DocSug.filter((data) =>
        data.label.toLowerCase().includes(name.toLowerCase())
      );

    this.setState({ hint: filterDta });
  };
  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.updateTrack !== this.props.updateTrack) {
      this.setState({ updateTrack: this.props.updateTrack });
    }
  };
  updateEntryState1 = (value, name) => {
    var state = this.state.updateTrack;
    state[name] = value;
    this.setState({ updateTrack: state });
    this.props.updateEntryState1(value, name);
  };

  render() {
    const userList =
      this.state.hint &&
      this.state.hint.length > 0 &&
      this.state.hint.map((user) => {
        return (
          <li
            key={user.alies_id}
            value={user.label}
            onClick={() => {
              this.updateEntryState1(user.label, "vaccinated_by");
              this.toggle();
              this.setState({ hint: [] });
            }}
          >
            {user.label}
          </li>
        );
      });
    var shown = {
      display: this.state.shown ? "none" : "block",
      width: "100%",
    };

    let translate = getLanguage(this.props.stateLanguageType)
    let {
      vaccinated_by,
      vaccination,
      reminder_time_taken,
      change_num,
      save_entry,
      attachments,
      date_of_vaccination,
      trade_name,
      smoking_status,
      notes,
      visible,
      Change,
      archive,
      de_archive,
      visibility,
      edit,
      Delete,
      show,
      hide,
      always,
    } = translate;
    return (
      <div>
        {!this.props.visibility && (
          <Grid className="cnfrmDiaMain">
            <Grid className="fillDia">
              <MMHG
                name="vaccination"
                label={vaccination}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.vaccination}
              />
            </Grid>
            <Grid className="fillDia">
              <MMHG
                name="trade_name"
                label={trade_name}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.trade_name}
              />
            </Grid>
            <Grid className="fillDia">
              <MMHG
                name="charge_number"
                label={change_num}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.charge_number}
              />
            </Grid>
            <Grid className="fillDia">
              <MMHG
                name="vaccinated_by"
                label={vaccinated_by}
                onChange={(e) => {
                  this.filterDoc(e.target.value);
                  this.props.updateEntryState(e);
                }}
                value={this.state.updateTrack.vaccinated_by}
              />

              <ul
                className="insuranceHint3"
                style={{ height: userList != "" ? "150px" : "" }}
              >
                {userList}
              </ul>
            </Grid>
            <Grid className="fillDia">
              <Grid className="rrSysto">
                <Grid>
                  <label>{date_of_vaccination}</label>
                </Grid>
                <DateFormat
                  name="data_of_vaccination"
                  value={
                    this.state.updateTrack.data_of_vaccination
                      ? new Date(this.state.updateTrack.data_of_vaccination)
                      : new Date()
                  }
                  date_format={this.state.date_format}
                  onChange={(e) => this.updateEntryState1(e, "data_of_vaccination")}
                />
              </Grid>
            </Grid>
            <Grid className="fillDia">
              <TimeTaken
                name="reminder_time_taken"
                label={reminder_time_taken}
                date_format={this.state.date_format}
                time_format={this.state.time_format}
                onChange={(e, savedata) => this.updateEntryState1(e, savedata)}
                timeArray={this.state.updateTrack.reminder_time_taken}
                dateArray={this.state.updateTrack.reminder_date_taken}
              />
            </Grid>
            <Grid className="fillDia">
              <NotesEditor
                name="remarks"
                label={notes}
                onChange={(e) => this.updateEntryState1(e, "remarks")}
                value={this.state.updateTrack.remarks}
              />
            </Grid>
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
                isMulti={true}
                fileUpload={this.props.FileAttachMulti}
              />
            </Grid>
          </Grid>
        )}
        <Grid className="infoShwHidMain3upr">
          <ShowHide
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
  const { stateLoginValueAim } = state.LoginReducerAim;
  return {
    stateLanguageType,
    stateLoginValueAim,
  };
};
export default pure(withRouter(
  connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer })(Index)
));
