import React, { Component } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { pure } from "recompose";
import { Settings } from "Screens/Login/setting";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
const dateFormatList = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY/DD/MM"];

class Date extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is24: this.props.date_format,
      value: this.props.value || new Date(),
      NotFutureDate: this.props.NotFutureDate || false
    };
  }

  //On Time Change s
  onDateChange = (date, i) => {
    this.setState({ value: date });
    this.props.onChange(date);
  };

  componentDidMount = () => {
    // this.props.onChange(this.props.value);
  };

  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.value !== this.props.value || prevProps.NotFutureDate !== this.props.NotFutureDate) {
      this.setState({ value: this.props.value, NotFutureDate: this.props.NotFutureDate ? true: false });
    }
  };
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.value !== this.state.value ||
      nextProps.value !== this.props.value
    );
  }

  render() {
    return (
      <div>
        {!this.state.is24 && (
          <DatePicker
            name={this.props.name}
            onChange={this.onDateChange}
            value={
              this.state.value
                ? moment(this.state.value, dateFormatList[0])
                : ""
            }
            disabled={this.props.disabled}
            format={dateFormatList[0]}
            disabledDate={(current) => {
              return (
                current &&
                (current > moment()) && this.state.NotFutureDate
                 
              );
            }}
             dropdownClassName = {this.props.settings &&
                    this.props.settings.setting &&
                    this.props.settings.setting.mode &&
                    this.props.settings.setting.mode === "dark"
                    ? "dropdown-class-name-3"
                    : ""}
          />
        )}
        {this.state.is24 === "DD/MM/YYYY" && (
          <DatePicker
            name={this.props.name}
            onChange={this.onDateChange}
            value={
              this.state.value
                ? moment(this.state.value, dateFormatList[0])
                : ""
            }
            disabled={this.props.disabled}
            disabledDate={(current) => {
              return (
                current &&
                (current > moment()) && this.state.NotFutureDate
                 
              );
            }}
            format={dateFormatList[0]}
             dropdownClassName = {this.props.settings &&
                    this.props.settings.setting &&
                    this.props.settings.setting.mode &&
                    this.props.settings.setting.mode === "dark"
                    ? "dropdown-class-name-3"
                    : ""}
          />
        )}
        {this.state.is24 === "YYYY/DD/MM" && (
          <DatePicker
            name={this.props.name}
            onChange={this.onDateChange}
            value={
              this.state.value
                ? moment(this.state.value, dateFormatList[2])
                : ""
            }
            disabledDate={(current) => {
              return (
                current &&
                (current > moment()) && this.state.NotFutureDate
                 
              );
            }}
            disabled={this.props.disabled}
            format={dateFormatList[2]}
             dropdownClassName = {this.props.settings &&
                    this.props.settings.setting &&
                    this.props.settings.setting.mode &&
                    this.props.settings.setting.mode === "dark"
                    ? "dropdown-class-name-3"
                    : ""}
          />
        )}
        {this.state.is24 === "MM/DD/YYYY" && (
          <DatePicker
            name={this.props.name}
            onChange={this.onDateChange}
            value={
              this.state.value
                ? moment(this.state.value, dateFormatList[1])
                : ""
            }
            disabledDate={(current) => {
              return (
                current &&
                (current > moment()) && this.state.NotFutureDate
                 
              );
            }}
            disabled={this.props.disabled}
            format={dateFormatList[1]}
             dropdownClassName = {this.props.settings &&
                    this.props.settings.setting &&
                    this.props.settings.setting.mode &&
                    this.props.settings.setting.mode === "dark"
                    ? "dropdown-class-name-3"
                    : ""}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { settings } = state.Settings;
  return {
      settings
  };
};
export default pure(withRouter(
  connect(mapStateToProps, {
      Settings

  })(Date))
);
