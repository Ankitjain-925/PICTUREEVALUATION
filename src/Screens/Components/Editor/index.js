import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import Grid from "@material-ui/core/Grid";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : "",
      name: this.props.name,
      label: this.props.label,
    }; // You can also pass a Quill Delta here
  }

  handleChange = (value) => {
    this.setState({ value: value });
    this.props.onChange(value);
  };

  componentDidUpdate=(prevProps, prevState)=>{
    if(prevProps.value !== this.props.value || prevProps.name !== this.props.name || prevProps.label !== this.props.label){
      this.setState({value: this.props.value, name: this.props.name, label: this.props.label});
    }
  }

  render() {
    return (
      <Grid className="rrSysto">
        {this.props.comesFrom !== "long_covid" &&<Grid>
          <label>{this.state.label}</label>
        </Grid>}
        <ReactQuill
          name={this.state.name}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </Grid>
    );
  }
}

export default Editor;
