import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import MMHG from "Screens/Components/mmHgField/index";
import SelectField from "Screens/Components/Select/index";
import FileUploader from "Screens/Components/JournalFileUploader/index";
import ShowHide from "Screens/Components/ShowHide/index";
import NotesEditor from "Screens/Components/Editor/index";
import PainPoint from "Screens/Components/PointPain/index";
import SelectByTwo from "Screens/Components/SelectbyTwo/index";
import { GetShowLabel1 } from "../../GetMetaData/index.js";
import PainIntensity from "Screens/Components/PainIntansity/index";
import Condition from "Screens/Components/Condition/index";
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
      gender: this.props.gender,
      options2: this.props.options2,
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
      attachments,
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
            <Grid className="fillDia painQualityDrop">
              <SelectField
              isSearchable={true}
                name="pain_quality"
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
