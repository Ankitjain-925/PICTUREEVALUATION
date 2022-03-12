import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import MMHG from "Screens/Components/mmHgField/index";
import Temprature from "Screens/Components/Temprature";
import SelectField from "Screens/Components/Select/index";
import FileUploader from "Screens/Components/JournalFileUploader/index";
import ShowHide from "Screens/Components/ShowHide/index";
import NotesEditor from "Screens/Components/Editor/index";
import PainPoint from "Screens/Components/PointPain/index";
import PainIntensity from "Screens/Components/PainIntansity/index";
import Condition from "Screens/Components/Condition/index";
import { pure } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { getLanguage } from "translations/index"
import FatiqueQuestion from "../CovidSymptomsField/FatiqueQuestions";

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
    };
  }

  componentDidMount = () => {};

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
      selct_pain_area,
      attachments,
      O2Saturation,
      Whereyouarelocated,
      symp_notes,
      save_entry,
      Delirium,
      Oxygen_therapy,
      ECMOtherapy,
      Sepsis,
      Multiorgan_failure,
      Fatique_questions
    } = translate;

    return (
      <div>
        {!this.props.visibility && (
          <Grid className="cnfrmDiaMain">
            <Grid className="fillDia">
              <Temprature
                name="temprature"
                name="temprature"
                valueType={this.state.updateTrack.temprature_type}
                value={this.state.updateTrack.temprature}
                Options={this.state.options2}
                onChange={(e) => this.props.updateEntryState(e)}
                onChangeType={(e) =>
                  this.updateEntryState1(e, "temprature_type")
                }
              />
            </Grid>
            <Grid className="fillDia">
              <MMHG
                name="saturaion"
                Unit="%"
                label={O2Saturation}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.saturaion}
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
                name="pains"
                onChange={(e) => this.props.updateEntryState(e)}
                value={Math.round(this.state.updateTrack.pains)}
              />
            </Grid>
            <Grid className="fillDia">
              <Condition
                name="conditions"
                onChange={(e) => this.props.updateEntryState(e)}
                value={Math.round(this.state.updateTrack.conditions)}
              />
            </Grid>
            <Grid className="fillDia">
              <SelectField
                isSearchable={true}
                name="country"
                label={Whereyouarelocated}
                option={this.state.options}
                onChange={(e) => this.updateEntryState1(e, "country")}
                value={this.state.updateTrack.country}
              />
            </Grid>
            <Grid className="fillDia">
              <NotesEditor
                name="symptoms"
                label={symp_notes}
                onChange={(e) => this.updateEntryState1(e, "symptoms")}
                value={this.state.updateTrack.symptoms}
              />
            </Grid>

            <Grid className="fatiqueQues">
                <h2>{Fatique_questions}</h2>
                    <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'delirium')} label={Delirium} value={this.state.updateTrack?.delirium}/>
                    <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'oxygen_therapy')} label={Oxygen_therapy} value={this.state.updateTrack?.oxygen_therapy}/>
                    <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'ecmo_therapy')} label={ECMOtherapy} value={this.state.updateTrack?.ecmo_therapy}/>
                    <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'sepsis')} label={Sepsis} value={this.state.updateTrack?.sepsis}/>
                    <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'multiorgan_failure')} label={Multiorgan_failure} value={this.state.updateTrack?.multiorgan_failure}/>
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
