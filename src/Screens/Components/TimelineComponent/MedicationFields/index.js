import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import MMHG from "Screens/Components/mmHgField/index";
import DateFormat from "Screens/Components/DateFormat/index";
import TimeTaken from "Screens/Components/TimeTaken/index";
import NotesEditor from "Screens/Components/Editor/index";
import FileUploader from "Screens/Components/JournalFileUploader/index";
import ShowHide from "Screens/Components/ShowHide/index";
import SelectField from "Screens/Components/Select/index";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { GetShowLabel12 } from "Screens/Components/GetMetaData/index.js";
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
      reminder: this.props.reminders,
      lrpUnit: this.props.lrpUnit,
    };
  }

  componentDidMount = () => { };

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
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      specific_date,
      interval,
      reminder,
      reminder_time_taken,
      notes,
      atc_code,
      lab_result,
      upr_limit,
      unit,
      lwr_limit,
      on,
      prescribed,
      save_entry,
      to_be_consume,
      pain_areas,
      Change,
      show,
      hide,
      until,
      archive,
      rr_systolic,
      attachments,
      time_measure,
      date_measure,
      enter_dosage,
      edit,
      Delete,
      enter_a_sbstnce,
      lifelong,
      on_demand,
      pain_type,
      de_archive,
      ur_trade_name,
      always,
      feeling,
      date,
      time,
    } = translate;

    return (
      <div>
        {!this.props.visibility && (
          <Grid className="cnfrmDiaMain">
            <Grid className="fillDia">
              <MMHG
                name="substance"
                label={enter_a_sbstnce}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.substance}
              />
            </Grid>
            <Grid className="fillDia">
              <SelectField
                isSearchable={true}
                name="ATC_code"
                label={atc_code}
                option={this.state.options}
                onChange={(e) => this.updateEntryState1(e, "ATC_code")}
                value={this.state.updateTrack.ATC_code}
              />
            </Grid>
            <Grid className="fillDia">
              <MMHG
                name="trade_name"
                label={ur_trade_name}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.trade_name}
              />
            </Grid>
            <Grid className="fillDia">
              <MMHG
                name="dosage"
                label={enter_dosage}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.dosage}
              />
            </Grid>
            <Grid className="fillDia">
              <SelectField
                isSearchable={true}
                name="unit"
                label={unit}
                option={this.state.lrpUnit}
                onChange={(e) => this.updateEntryState1(e, "unit")}
                value={this.state.updateTrack.unit}
              />
            </Grid>
            <Grid className="fillDia">
              <Grid className="rrSysto">
                <Grid>
                  <label>
                    {prescribed} {on}{" "}
                  </label>
                </Grid>
                <DateFormat
                  name="prescribed_on"
                  value={
                    this.state.updateTrack.prescribed_on
                      ? new Date(this.state.updateTrack.prescribed_on)
                      : new Date()
                  }
                  date_format={this.state.date_format}
                  onChange={(e) => this.updateEntryState1(e, "prescribed_on")}
                />
              </Grid>
            </Grid>

            {!this.state.updateTrack.lifelong && (
              <Grid className="fillDia">
                <Grid className="rrSysto">
                  <Grid>
                    <label>{specific_date}</label>
                  </Grid>
                  <DateFormat
                    name="until"
                    value={
                      this.state.updateTrack.until
                        ? new Date(this.state.updateTrack.until)
                        : new Date()
                    }
                    date_format={this.state.date_format}
                    onChange={(e) => this.updateEntryState1(e, "until")}
                  />
                </Grid>
              </Grid>
            )}

            <Grid className="fillDia">
              <FormControlLabel
                control={
                  <Checkbox
                    value={true}
                    color="#00ABAF"
                    name="lifelong"
                    checked={this.state.updateTrack.lifelong === true}
                    onChange={(e) =>
                      this.updateEntryState1(e.target.checked, "lifelong")
                    }
                  />
                }
                label={lifelong}
              />
            </Grid>

            <Grid className="fillDia">
              <FormControlLabel
                control={
                  <Checkbox
                    value={true}
                    color="#00ABAF"
                    name="lifelong"
                    checked={this.state.updateTrack.ondemand === true}
                    onChange={(e) =>
                      this.updateEntryState1(e.target.checked, "ondemand")
                    }
                  />
                }
                label={on_demand}
              />
            </Grid>

            <Grid className="fillDia">
              <SelectField
                isSearchable={true}
                name="interval"
                isMulti={true}
                closeMenuOnSelect={false}
                label={interval}
                option={this.state.reminder}
                onChange={(e) => this.updateEntryState1(e, "interval")}
                value={GetShowLabel12(
                  this.state.reminder,
                  this.state.updateTrack && this.state.updateTrack.interval,
                  this.props.stateLanguageType
                )}
              />
            </Grid>
            <Grid className="fillDia">
              <TimeTaken
                name="time_taken"
                label={to_be_consume}
                time_format={this.state.time_format}
                onChange={(e) => this.updateEntryState1(e, "time_taken")}
                timeArray={this.state.updateTrack.time_taken}
              />
            </Grid>

            <Grid className="fillDia">
              <SelectField
                isSearchable={true}
                name="reminders"
                isMulti={true}
                closeMenuOnSelect={false}
                label={reminder}
                option={this.state.reminder}
                onChange={(e) => this.updateEntryState1(e, "reminders")}
                value={GetShowLabel12(
                  this.state.reminder,
                  this.state.updateTrack && this.state.updateTrack.reminders,
                  this.props.stateLanguageType
                )}
              />
            </Grid>
            <Grid className="fillDia">
              <TimeTaken
                name="reminder_time_taken"
                label={reminder_time_taken}
                time_format={this.state.time_format}
                onChange={(e) =>
                  this.updateEntryState1(e, "reminder_time_taken")
                }
                timeArray={this.state.updateTrack.reminder_time_taken}
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
  return {
    stateLanguageType,
  };
};
export default pure(withRouter(
  connect(mapStateToProps, { LanguageFetchReducer })(Index)
));
