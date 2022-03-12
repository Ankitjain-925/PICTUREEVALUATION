import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import sitedata from "sitedata";
import axios from "axios";
import MMHG from "Screens/Components/mmHgField/index";
import DateFormat from "Screens/Components/DateFormat/index";
import SelectField from "Screens/Components/Select/index";
import FileUploader from "Screens/Components/JournalFileUploader/index";
import NotesEditor from "Screens/Components/Editor/index";
import ShowHide from "Screens/Components/ShowHide/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { GetShowLabel1 } from "Screens/Components/GetMetaData/index.js";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { getLanguage } from "translations/index";
import { commonHeader } from "component/CommonHeader/index";
import { pure } from "recompose";

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

  updateEntryState1 = (value, name) => {
    var state = this.state.updateTrack;
    state[name] = value;
    this.setState({ updateTrack: state });
    this.props.updateEntryState1(value, name);
  };
  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.updateTrack !== this.props.updateTrack) {
      this.setState({ updateTrack: this.props.updateTrack });
    }
  };

  
  //User list will be show/hide
  toggle = () => {
    this.setState({
      shown: !this.state.shown,
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
  alldoctor = () => {
    var FamilyList = [];
    doctorArray = [];
    const user_token = this.props.stateLoginValueAim.token;
    axios
      .get(sitedata.data.path + "/UserProfile/DoctorUsers",commonHeader(user_token))
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
              alies_id :  this.state.allDocData[i].alies_id 
            });
          }
          this.setState({ DocSug: doctorArray });
        });
      });
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
            this.updateEntryState1(user.label, "doctor_name");
            this.updateEntryState1(user.alies_id, "doctor_id");
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
      date_doc_visit,
      attachments,
      doc_name,
      doc_id,
      speciality,
      notes,
      save_entry,
    } = translate;

    return (
      <div>
        {!this.props.visibility && (
          <Grid className="cnfrmDiaMain">
            <Grid className="fillDia">
              <MMHG
                name="doctor_name"
                label={doc_name}
                onChange={(e) => {
                  this.filterDoc(e.target.value);
                  this.props.updateEntryState(e);
                }}
                value={this.state.updateTrack.doctor_name}
              />
                <ul
                className="insuranceHint3"
                style={{ height: userList != "" ? "150px" : "" }}
              >
                {userList}
              </ul>
            </Grid>
            <Grid className="fillDia">
              <MMHG
                name="doctor_id"
                label={doc_id}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.doctor_id}
              />
            </Grid>
            <Grid className="fillDia">
              <SelectField
                name="specialty"
                isSearchable={true}
                label={speciality}
                option={this.state.options}
                onChange={(e) => this.updateEntryState1(e, "specialty")}
                value={GetShowLabel1(
                  this.props.options,
                  this.state.updateTrack &&
                    this.state.updateTrack.specialty &&
                    this.state.updateTrack.specialty.value,
                  this.props.stateLanguageType,
                  false,
                  "specialty"
                )}
              />
            </Grid>

            <Grid className="fillDia">
              <Grid className="rrSysto">
                <Grid> 
                  <label>{date_doc_visit}</label>
                </Grid>
                <DateFormat
                  name="date_doctor_visit"
                  value={
                    this.state.updateTrack.date_doctor_visit
                      ? new Date(this.state.updateTrack.date_doctor_visit)
                      : new Date()
                  }
                  date_format={this.state.date_format}
                  onChange={(e) =>
                    this.updateEntryState1(e, "date_doctor_visit")
                  }
                />
              </Grid>
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
