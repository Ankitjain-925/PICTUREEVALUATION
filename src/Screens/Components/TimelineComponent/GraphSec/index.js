import React, { Component } from "react";
import HC_more from "highcharts/highcharts-more"; //module3
// Import Highcharts
import Highcharts from "highcharts/highstock";
//import HighchartsReact from "./HighchartsReact.min.js";
import HighchartsReact from "highcharts-react-official";
HC_more(Highcharts); //init module

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var item = this.state.item;
    return (
      <div>
        <HighchartsReact
          constructorType={"chart"}
          ref={this.chartComponent}
          highcharts={Highcharts}
          options={this.props.options}
        />
      </div>
    );
  }
}

export default Index;
