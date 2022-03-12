import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import MMHG from "Screens/Components/mmHgField/index";
import SelectField from "Screens/Components/Select/index";
import FileUploader from "Screens/Components/JournalFileUploader/index";
import ShowHide from "Screens/Components/ShowHide/index";
import NotesEditor from "Screens/Components/Editor/index";
import Temprature from "Screens/Components/Temprature";
import PainPoint from "Screens/Components/PointPain/index";
import TimeFormat from "Screens/Components/TimeFormat/index";
import DateFormat from "Screens/Components/DateFormat/index";
import DaysAddField from "./../DaysAddField/index.js";
import SelectByTwo from "Screens/Components/SelectbyTwo/index";
import { GetShowLabel1 } from "Screens/Components/GetMetaData/index.js";
import PainIntensity from "Screens/Components/PainIntansity/index";
import Condition from "Screens/Components/Condition/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { getLanguage } from "translations/index"
// import { pure } from "recompose";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateTrack: this.props.updateTrack,
      date_format: this.props.date_format,
      time_format: this.props.time_format,
      options: this.props.options,
      gender: this.props.gender,
      options2: this.props.options2,
      option3: this.props.options3,
      option4: this.props.option4,
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
      selct_pain_area,
      vaccination,
      Newdiagnoses,
      Newmedication,
      Newallergies,
      Newinfections,
      Digestion,
      Diaryentry,
      Newdoctorvisits,
      Newhospitalizations,
      attachments,
      Daydate,
      DocAuthName,
      VaccinationCharge,
      PositiveSARS,
      Chargenumberpicture,
      date_of_vaccination,
      time_of_vaccination,
      SARSCoV_2_TEST,
      Problem,
      notes,
      pain_type,
      save_entry,
      pain_quality,
    } = translate;

    return (
      <div>
        {!this.props.visibility && (
          <Grid className="cnfrmDiaMain">
            <Grid className="fillDia">
              <MMHG
                name="doctor_name"
                label={DocAuthName}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.doctor_name}
              />
            </Grid>
            <Grid className="fillDia">
              <SelectField
              isSearchable={true}
                name="vaccination"
                label={vaccination}
                option={this.state.option4}
                onChange={(e) => this.updateEntryState1(e, "vaccination")}
                value={GetShowLabel1(
                  this.props.option4,
                  this.state.updateTrack &&
                    this.state.updateTrack.vaccination &&
                    this.state.updateTrack.vaccination.value,
                  this.props.stateLanguageType,
                  false,
                  "organ"
                )}
              />
            </Grid>
            <Grid className="fillDia">
              <DaysAddField
                name="day_after"
                label={Daydate}
                onChange={(e) => this.props.updateEntryState1(e, "day_after")}
                findingArr={this.state.updateTrack.day_after}
              />
            </Grid>
            <Grid className="fillDia">
              <MMHG
                name="vaccination_charge"
                label={VaccinationCharge}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.vaccination_charge}
              />
            </Grid>
            <Grid className="attchForms attchImg">
              <Grid>
                <label>{Chargenumberpicture}</label>
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
            <Grid className="fillDia">
              <Grid className="rrSysto">
                <Grid>
                  <label>{date_of_vaccination}</label>
                </Grid>
                <DateFormat
                  name="date_of_vaccination"
                  value={
                    this.state.updateTrack.date_of_vaccination
                      ? new Date(this.state.updateTrack.date_of_vaccination)
                      : new Date()
                  }
                  date_format={this.state.date_format}
                  onChange={(e) =>
                    this.updateEntryState1(e, "date_of_vaccination")
                  }
                />
              </Grid>
            </Grid>
            <Grid className="fillDia">
              <Grid className="rrSysto">
                <Grid>
                  <label>{time_of_vaccination}</label>
                </Grid>
                <TimeFormat
                  name="time_of_vaccination"
                  value={
                    this.state.updateTrack.time_of_vaccination
                      ? new Date(this.state.updateTrack.time_of_vaccination)
                      : new Date()
                  }
                  time_format={this.state.time_format}
                  onChange={(e) =>
                    this.updateEntryState1(e, "time_of_vaccination")
                  }
                />
              </Grid>
            </Grid>
            <Grid className="fillDia">
              <Temprature
                name="temprature"
                name="temprature"
                valueType={this.state.updateTrack.temprature_type}
                value={this.state.updateTrack.temprature}
                Options={this.state.option3}
                onChange={(e) => this.props.updateEntryState(e)}
                onChangeType={(e) =>
                  this.updateEntryState1(e, "temprature_type")
                }
              />
            </Grid>
            <Grid className="fillDia">
              <MMHG
                name="problem"
                label={Problem}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.problem}
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
            <Grid className="fillDia">
              <Grid>
                <label>{selct_pain_area}</label>
              </Grid>
              <PainPoint
                id="New_id1"
                gender={this.state.gender}
                painPoint={
                  this.state.updateTrack && this.state.updateTrack.painPoint
                    ? this.state.updateTrack.painPoint
                    : []
                }
                onChange={(e) => this.updateEntryState1(e, "painPoint")}
              />
            </Grid>
            <Grid className="fillDia">
              <PainIntensity
                name="pain_intensity"
                onChange={(e) => this.props.updateEntryState(e)}
                value={Math.round(this.state.updateTrack.pain_intensity)}
              />
            </Grid>
            <Grid className="fillDia">
              <Condition
                name="feeling"
                onChange={(e) => this.props.updateEntryState(e)}
                value={Math.round(this.state.updateTrack.feeling)}
              />
            </Grid>

            <Grid className="fillDia">
              <SelectByTwo
                name="pain_type"
                label={pain_type}
                options={this.state.options2}
                onChange={(e) => this.updateEntryState1(e, "pain_type")}
                value={GetShowLabel1(
                  this.props.options2,
                  this.state.updateTrack &&
                    this.state.updateTrack.pain_type &&
                    this.state.updateTrack.pain_type.value,
                  this.props.stateLanguageType
                )}
              />
            </Grid>
            <Grid className="fillDia">
              <SelectField
                name="pain_quality"
                isSearchable={true}
                label={pain_quality}
                option={this.state.options}
                onChange={(e) => this.updateEntryState1(e, "pain_quality")}
                value={GetShowLabel1(
                  this.props.options,
                  this.state.updateTrack &&
                    this.state.updateTrack.pain_quality &&
                    this.state.updateTrack.pain_quality.value,
                  this.props.stateLanguageType
                )}
              />
            </Grid>
            <Grid className="fillDia">
              <MMHG
                name="new_diagnoses"
                label={Newdiagnoses}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.new_diagnoses}
              />
            </Grid>
            <Grid className="fillDia">
              <MMHG
                name="new_medication"
                label={Newmedication}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.new_medication}
              />
            </Grid>
            <Grid className="fillDia">
              <MMHG
                name="new_allergies"
                label={Newallergies}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.new_allergies}
              />
            </Grid>
            <Grid className="fillDia">
              <MMHG
                name="digestion"
                label={Digestion}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.digestion}
              />
            </Grid>
            <Grid className="fillDia">
              <MMHG
                name="diary_entry"
                label={Diaryentry}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.diary_entry}
              />
            </Grid>
            <Grid className="fillDia">
              <MMHG
                name="new_doctor_visits"
                label={Newdoctorvisits}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.new_doctor_visits}
              />
            </Grid>
            <Grid className="fillDia">
              <MMHG
                name="new_hospitalizations"
                label={Newhospitalizations}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.new_hospitalizations}
              />
            </Grid>
            <Grid className="fillDia">
              <MMHG
                name="new_infections"
                label={Newinfections}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.new_infections}
              />
            </Grid>
            <Grid className="attchForms attchImg">
              <Grid>
                <label>{PositiveSARS}</label>
              </Grid>
              <FileUploader
                cur_one={this.props.cur_one}
                attachfile={
                  this.state.updateTrack && this.state.updateTrack.Positive_SARS
                    ? this.state.updateTrack.Positive_SARS
                    : []
                }
                name="Positive_SARS"
                comesFrom="journal"
                isMulti={true}
                fileUpload={this.props.FileAttachMultiVaccination}
              />
            </Grid>
            <Grid className="attchForms attchImg">
              <Grid>
                <label>{SARSCoV_2_TEST}</label>
              </Grid>
              <FileUploader
                cur_one={this.props.cur_one}
                attachfile={
                  this.state.updateTrack && this.state.updateTrack.SARS
                    ? this.state.updateTrack.SARS
                    : []
                }
                name="SARS"
                comesFrom="journal"
                isMulti={true}
                fileUpload={this.props.FileAttachMultiVaccination}
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
export default withRouter(
  connect(mapStateToProps, { LanguageFetchReducer })(Index)
);
