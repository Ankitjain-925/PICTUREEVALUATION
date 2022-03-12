import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "react-select";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { getLanguage } from "translations/index"
class SelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || "",
      label: this.props.label,
      name: this.props.name,
      option: this.props.option,
      isMulti: this.props.isMulti,
      isSearchable: this.props.isSearchable,
      closeMenuOnSelect: this.props.closeMenuOnSelect,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.option !== this.props.option || prevProps.value !== this.props.value || prevProps.name !== this.props.name || prevProps.isMulti !== this.props.isMulti
      || prevProps.isSearchable !== this.props.isSearchable || prevProps.closeMenuOnSelect !== this.props.closeMenuOnSelect || prevProps.label !== this.props.label) {
      this.setState({ value: this.props.value || "",
      label: this.props.label,
      name: this.props.name,
      option: this.props.option,
      isMulti: this.props.isMulti,
      isSearchable: this.props.isSearchable,
      closeMenuOnSelect: this.props.closeMenuOnSelect, });
    }
  };
  //On Select Change
  onSelectChange = (e, name) => {
    this.setState({ value: e });
    this.props.onChange(e, name);
  };
  componentDidMount = () => {};
  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let { select } = translate;
    return (
      <Grid className="rrSysto">
        <Grid>
          <label>{this.state.label}</label>
        </Grid>
        <Select
          value={this.state.value}
          name={this.state.name}
          options={this.state.option}
          placeholder={select}
          onChange={(e) => this.onSelectChange(e, this.state.name)}
          isSearchable={this.state.isSearchable ? true : false}
          isMulti={this.state.isMulti}
          closeMenuOnSelect={this.state.closeMenuOnSelect}
          maxMenuHeight={155}
        />
      </Grid>
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
  connect(mapStateToProps, { LanguageFetchReducer })(SelectField)
);
