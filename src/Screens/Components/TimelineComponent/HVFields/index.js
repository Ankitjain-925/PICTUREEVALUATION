import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import MMHG from "Screens/Components/mmHgField/index";
import DateFormat from "Screens/Components/DateFormat/index";
import SelectField from "Screens/Components/Select/index";
import FileUploader from "Screens/Components/JournalFileUploader/index";
import ShowHide from "Screens/Components/ShowHide/index";
import NotesEditor from "Screens/Components/Editor/index";
import { GetShowLabel1 } from "../../GetMetaData/index.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { getLanguage } from "translations/index"
import { pure } from "recompose";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateTrack: this.props.updateTrack,
      date_format: this.props.date_format,
      time_format: this.props.time_format,
      options: this.props.options,
    };
  }

  componentDidMount = () => {};

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

  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      hosp_name,
      hosp_id,
      speciality,
      doc_id,
      notes,
      save_entry,
      attachments,
      first_visit_day,
      last_visit_day,
    } = translate;

    return (
      <div>
        {!this.props.visibility && (
          <Grid className="cnfrmDiaMain">
            <Grid className="fillDia">
              <MMHG
                name="hospital_name"
                label={hosp_name}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.hospital_name}
              />
            </Grid>
            <Grid className="fillDia">
              <MMHG
                name="hospital_id"
                label={hosp_id}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.hospital_id}
              />
            </Grid>
            <Grid className="fillDia">
              <SelectField
              isSearchable={true}
                name="specialty"
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
              <MMHG
                name="doctor_id"
                label={doc_id}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.doctor_id}
              />
            </Grid>
            <Grid className="fillDia">
              <Grid className="rrSysto">
                <Grid>
                  <label>{first_visit_day}</label>
                </Grid>
                <DateFormat
                  name="first_visit_date"
                  value={
                    this.state.updateTrack.first_visit_date
                      ? new Date(this.state.updateTrack.first_visit_date)
                      : new Date()
                  }
                  date_format={this.state.date_format}
                  onChange={(e) =>
                    this.updateEntryState1(e, "first_visit_date")
                  }
                />
              </Grid>
            </Grid>
            <Grid className="fillDia">
              <Grid className="rrSysto">
                <Grid>
                  <label>{last_visit_day}</label>
                </Grid>
                <DateFormat
                  name="last_visit_date"
                  value={
                    this.state.updateTrack.last_visit_date
                      ? new Date(this.state.updateTrack.last_visit_date)
                      : new Date()
                  }
                  date_format={this.state.date_format}
                  onChange={(e) => this.updateEntryState1(e, "last_visit_date")}
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
  return {
    stateLanguageType,
  };
};
export default pure(withRouter(
  connect(mapStateToProps, { LanguageFetchReducer })(Index)
));
