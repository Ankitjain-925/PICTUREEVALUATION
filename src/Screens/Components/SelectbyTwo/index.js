import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

class Date extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Options: this.props.options,
      name: this.props.name,
      label: this.props.label,
      value: this.props.value,
    };
  }

  componentDidUpdate =(prevProps, prevState)=>{
    if(prevProps.options !== this.props.options || prevProps.value !== this.props.value){
      this.setState({Options: this.props.options, value: this.props.value});
      console.log('this.props.value', this.props.value)
    }
  }
  //On Select Change
  onSelectChange = (value, name) => {
    this.setState({ value: value });
    if (name === "visible") {
      this.props.onChange(value.value);
    } else {
      this.props.onChange(value);
    }
  };

  componentDidMount = () => {};
  render() {
    return (
      <Grid xs={12} md={12}>
        <Grid className="rrSysto3">
          <Grid>
            <label>{this.state.label}</label>
          </Grid>
          <Grid className="relexStress">
            {this.state.Options &&
              this.state.Options.length > 0 &&
              this.state.Options.map((item) => (
                <Grid
                  className={
                    this.state.value &&
                    (this.state.value.value === item.value ||
                      this.state.value === item.value)
                      ? "relexStressLft"
                      : "relexStressRght"
                  }
                >
                  <a
                    onClick={() => {
                      this.onSelectChange(item, this.state.name);
                    }}
                  >
                    {item.label}
                  </a>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Date;
