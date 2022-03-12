import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { pure } from "recompose";
class MMHG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || "",
      label: this.props.label,
      Unit: this.props.Unit,
      name: this.props.name,
    };
  }

  //On Field state Change
  onDataChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.onChange(e);
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.value !== this.props.value || prevProps.Unit !== this.props.Unit) {
      this.setState({ value: this.props.value, Unit : this.props.Unit });
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.value !== this.state.value || nextState.Unit !== this.state.Unit ||
      nextProps.value !== this.props.value || nextProps.Unit !== this.props.Unit
    );
  }

  componentDidMount = () => {};
  render() {
    return (
      <Grid className="rrSysto">
        <Grid>
          <label>{this.state.label}</label>
        </Grid>
        <Grid className="rrInput">
          <input
            type="text"
            onChange={this.onDataChange}
            name={this.state.name}
            value={this.state.value}
          />
          {this.state.Unit && <span>{this.state.Unit}</span>}
        </Grid>
      </Grid>
    );
  }
}

export default pure(MMHG);
