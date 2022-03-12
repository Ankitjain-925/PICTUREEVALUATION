import React, { Component } from "react";
import { TimePicker } from "antd";
import moment from "moment";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Settings } from "Screens/Login/setting";
import { LanguageFetchReducer } from "Screens/actions";
import { getLanguage } from "translations/index"
import { pure } from "recompose";
class TimeTaken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeArr: this.props.timeArray || [],
      is24: this.props.time_format,
      label: this.props.label,
      name: this.props.name,
    };
  }
  // On change the time of any index
  onTimeChange = (time, i) => {
    let tArray = this.state.timeArr;
    tArray[i] = { label: time, value: time, title: time };
    this.setState({ timeArr: tArray });
    this.props.onChange(tArray);
  };

  //On delete the time
  deleteTimes = (index) => {
    let tArray = this.state.timeArr;
    tArray.splice(index, 1);
    this.setState({ timeArr: tArray });
  };

  //On add the new Time
  onAddFiled = () => {
    let tArray = this.state.timeArr;
    if (tArray && tArray.length > 0) {
      tArray.push({ label: "", value: "", title: "" });
    } else {
      tArray.push(
        { label: "", value: "", title: "" },
        { label: "", value: "", title: "" }
      );
    }
    this.setState({ timeArr: tArray });
  };

  componentDidMount = () => {};
  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let { addentry, profilesettings, rmv_entry, select_time } = translate;
    return (
      <div>
        <Grid className="rrSysto consumeAt">
          <Grid>
            <label>{this.state.label}</label>
          </Grid>
          {this.state.timeArr && this.state.timeArr.length == 0 && (
            <div>
              {" "}
              <Grid>
                {this.state.is24 === "24" ? (
                  <TimePicker
                    placeholder={select_time}
                    className="Medicationtime"
                    onChange={(e) => {
                      this.onTimeChange(e, 0);
                    }}
                    format="HH:mm"
                    popupClassName = {this.props.settings &&
                      this.props.settings.setting &&
                      this.props.settings.setting.mode &&
                      this.props.settings.setting.mode === "dark"
                      ? "timePickerOpt"
                      : ""}
                  />
                ) : (
                  <TimePicker
                    placeholder={select_time}
                    className="Medicationtime"
                    use12Hours
                    onChange={(e) => {
                      this.onTimeChange(e, 0);
                    }}
                    format="h:mm a"
                    popupClassName = {this.props.settings &&
                      this.props.settings.setting &&
                      this.props.settings.setting.mode &&
                      this.props.settings.setting.mode === "dark"
                      ? "timePickerOpt"
                      : ""}
                  />
                )}
              </Grid>
              <p onClick={this.onAddFiled}>+ {addentry}</p>
            </div>
          )}

          {this.state.timeArr &&
            this.state.timeArr.length > 0 &&
            this.state.timeArr.map((itm, index) =>
              index == 0 ? (
                <div>
                  {this.state.is24 === "24" ? (
                    <TimePicker
                      placeholder={select_time}
                      className="Medicationtime"
                      onChange={(e) => {
                        this.onTimeChange(e, 0);
                      }}
                      value={
                        itm.value ? moment(new Date(itm.value), "HH:mm") : ""
                      }
                      format="HH:mm"
                      popupClassName = {this.props.settings &&
                        this.props.settings.setting &&
                        this.props.settings.setting.mode &&
                        this.props.settings.setting.mode === "dark"
                        ? "timePickerOpt"
                        : ""}
                    />
                  ) : (
                    <TimePicker
                      placeholder={select_time}
                      className="Medicationtime"
                      use12Hours
                      onChange={(e) => {
                        this.onTimeChange(e, 0);
                      }}
                      format="h:mm a"
                      value={
                        itm.value ? moment(new Date(itm.value), "h:mm a") : ""
                      }
                      popupClassName = {this.props.settings &&
                        this.props.settings.setting &&
                        this.props.settings.setting.mode &&
                        this.props.settings.setting.mode === "dark"
                        ? "timePickerOpt"
                        : ""}
                    />
                  )}
                  <p onClick={this.onAddFiled}>+ {addentry}</p>
                </div>
              ) : (
                <div>
                  {this.state.is24 === "24" ? (
                    <TimePicker
                      placeholder={select_time}
                      className="Medicationtime"
                      onChange={(e) => {
                        this.onTimeChange(e, index);
                      }}
                      value={
                        itm.value ? moment(new Date(itm.value), "HH:mm") : ""
                      }
                      format="HH:mm"
                      popupClassName = {this.props.settings &&
                        this.props.settings.setting &&
                        this.props.settings.setting.mode &&
                        this.props.settings.setting.mode === "dark"
                        ? "timePickerOpt"
                        : ""}
                    />
                  ) : (
                    <TimePicker
                      placeholder={select_time}
                      className="Medicationtime"
                      use12Hours
                      onChange={(e) => {
                        this.onTimeChange(e, index);
                      }}
                      format="h:mm a"
                      value={
                        itm.value ? moment(new Date(itm.value), "h:mm a") : ""
                      }
                      popupClassName = {this.props.settings &&
                        this.props.settings.setting &&
                        this.props.settings.setting.mode &&
                        this.props.settings.setting.mode === "dark"
                        ? "timePickerOpt"
                        : ""}
                    />
                  )}
                  <p
                    onClick={() => {
                      this.deleteTimes(index);
                    }}
                    className="minus_span_medication"
                  >
                    - {rmv_entry}
                  </p>
                </div>
              )
            )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;
  return {
    stateLanguageType,
    settings
  };
};
export default withRouter(
  connect(mapStateToProps, { LanguageFetchReducer, Settings })(TimeTaken)
);
