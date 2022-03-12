import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import sitedata from "sitedata";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.data || {},
      new_image: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.item !== this.state.item ||
      nextProps.data !== this.props.data ||
      nextState.new_image !== this.state.new_image
    );
  }

  componentDidMount() {
    this.setState({ item: this.props.data },
      ()=>{
        this.GetAttachfiles();
      })
  }

  componentDidUpdate= (prevProps) => {
    if (
        prevProps.data !== this.props.data 
      ) {
        this.setState({
          item: this.props.data
        }, ()=>{
            this.GetAttachfiles();
          })
      }  
  }

  GetAttachfiles = ()=>{
    var find = this.state?.item;
    if (find) {
        var find1 = find.split(".com/")[1];
        axios
        .get(sitedata.data.path + "/aws/sign_s3?find=" + find1)
        .then((response2) => {
            if (response2.data.hassuccessed) {
            this.setState({ new_image: response2.data.data });
            }
        });
    }
  }

  render() {
    var item = this.state.item;
    return (
          <img
            src={this.state.new_image}
            alt=""
            title=""
          />
        );
    }
}

export default Index;
