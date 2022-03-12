import React, { Component } from "react";
import Routermain from "./routes/routermain";
class App extends Component {
  constructor(props) {
    let tempname = window.location.search;
    super(props);
    this.state = {
      load: false,
      tempname: tempname,
      redirection: false,
    };
  }
  render() {
    return (
      <div className="root_main newcalsss">
        <Routermain />
      </div>
    );
  }
}
export default App;
