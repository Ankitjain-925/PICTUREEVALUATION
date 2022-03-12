import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class CheckBoxField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || "",
      label: this.props.label,
      name: this.props.name,
    };
  }

  //On Check box Change
  onCheckedChange = (e) => {
    this.setState({ value: e.target.checked });
    this.props.onChange(e.target.checked);
  };

  componentDidMount = () => {};
  render() {
    return (
      <Grid container direction="row">
        <Grid
          item
          xs={12}
          md={
            this.state.name === "emergency" || this.state.name === "review"
              ? 8
              : 12
          }
          className="cnfrmDiaLft"
        >
          <FormControlLabel
            control={
              <Checkbox
                value="checkedB"
                color="#00ABAF"
                name={this.state.name}
                checked={this.state.value}
                onChange={this.onCheckedChange}
              />
            }
            label={this.state.label}
          />
        </Grid>
        {(this.state.name === "emergency" || this.state.name === "review") && (
          <Grid item xs={12} md={4} className="cnfrmDiaRght">
            {this.state.name === "emergency" && (
              <img
                src={require("assets/images/plusvan.jpg")}
                alt=""
                title=""
              />
            )}
            {this.state.name === "review" && (
              <img
                src={require("assets/images/plusgreen.jpg")}
                alt=""
                title=""
              />
            )}
          </Grid>
        )}
      </Grid>
    );
  }
}

export default CheckBoxField;
