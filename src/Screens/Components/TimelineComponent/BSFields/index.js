import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import MMHG from "Screens/Components/mmHgField/index";
import DateFormat from "Screens/Components/DateFormat/index";
import TimeFormat from "Screens/Components/TimeFormat/index";
import SelectByTwo from "Screens/Components/SelectbyTwo/index";
import FileUploader from "Screens/Components/JournalFileUploader/index";
import ShowHide from "Screens/Components/ShowHide/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { GetShowLabel1 } from "../../GetMetaData/index.js";
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
      blood_sugar,
      Hba1c,
      situation,
      attachments,
      time_measure,
      date_measure,
      save_entry,
    } = translate;

    return (
      <div>
        {!this.props.visibility && (
          <Grid className="cnfrmDiaMain">
            <Grid className="fillDia">
              <MMHG
                name="blood_sugar"
                Unit="mg/dl"
                label={blood_sugar}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.blood_sugar}
              />
            </Grid>
            <Grid className="fillDia">
              <MMHG
                name="Hba1c"
                Unit="%"
                label={Hba1c}
                onChange={(e) => this.props.updateEntryState(e)}
                value={this.state.updateTrack.Hba1c}
              />
            </Grid>
            <Grid className="fillDia">
              <Grid className="rrSysto">
                <Grid>
                  <label>{date_measure}</label>
                </Grid>
                <DateFormat
                  name="date_measured"
                  value={
                    this.state.updateTrack.date_measured
                      ? new Date(this.state.updateTrack.date_measured)
                      : new Date()
                  }
                  date_format={this.state.date_format}
                  onChange={(e) => this.updateEntryState1(e, "date_measured")}
                />
              </Grid>
            </Grid>
            <Grid className="fillDia">
              <Grid className="rrSysto">
                <Grid>
                  <label>{time_measure}</label>
                </Grid>
                <TimeFormat
                  name="time_measured"
                  value={
                    this.state.updateTrack.time_measured
                      ? new Date(this.state.updateTrack.time_measured)
                      : new Date()
                  }
                  time_format={this.state.time_format}
                  onChange={(e) => this.updateEntryState1(e, "time_measured")}
                />
              </Grid>
            </Grid>
            <Grid className="fillDia">
              <SelectByTwo
                name="situation"
                label={situation}
                options={this.state.options}
                onChange={(e) => this.updateEntryState1(e, "situation")}
                value={GetShowLabel1(
                  this.props.options,
                  this.state.updateTrack &&
                    this.state.updateTrack.situation &&
                    this.state.updateTrack.situation.value,
                  this.props.stateLanguageType
                )}
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
