import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import AnamnesisFinding from "./../../AnamnesisFinding/index";
import FileUploader from "./../../JournalFileUploader/index";
import ShowHide from "./../../ShowHide/index";
import NotesEditor from "./../../Editor/index";
import PainPoint from "../../PointPain/index";
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
    };
  }

  componentDidMount = () => {};

  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.updateTrack !== this.props.updateTrack) {
      this.setState({ updateTrack: this.props.updateTrack });
    }
    if (prevProps.options !== this.props.options) {
      this.setState({ options: this.props.options });
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
      SelectPainArea,
      attachments,
      Fieldtitle,
      BodySchemeNotes,
    } = translate;
    return (
      <div>
        {!this.props.visibility && (
          <Grid className="cnfrmDiaMain">
            <Grid className="fillDia">
              <AnamnesisFinding
                options={this.state.options}
                name="anamesis"
                label={Fieldtitle}
                onChange={(e) => this.updateEntryState1(e, "anamesis")}
                findingArr={this.state.updateTrack.anamesis}
              />
            </Grid>
            <Grid className="fillDia">
              <Grid>
                <label>{SelectPainArea}</label>
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
              <NotesEditor
                name="remarks"
                label={BodySchemeNotes}
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
              value="Save entry"
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
