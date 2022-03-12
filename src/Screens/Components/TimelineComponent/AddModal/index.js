import React, { Component } from "react";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateTrack: this.props.updateTrack,
      addInqryNw: this.props.addInqryNw,
    };
  }

  componentDidMount = () => {};

  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.updateTrack !== this.props.updateTrack) {
      this.setState({ updateTrack: this.props.updateTrack });
    }
    if (prevProps.addInqryNw !== this.props.addInqryNw) {
      this.setState({ addInqryNw: this.props.addInqryNw });
    }
  };

  render() {
    return <div> Hiiii {this.state.addInqryNw}</div>;
  }
}

export default Index;
