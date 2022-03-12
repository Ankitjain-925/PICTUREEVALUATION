import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ReactTooltip from "react-tooltip";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { S3Image } from "Screens/Components/GetS3Images/index";

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
      () => {
        // this.GetAttachfiles();
      })
  }

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.data !== this.props.data
    ) {
      this.setState({
        item: this.props.data
      }, () => {
        // this.GetAttachfiles();
      })
    }
  }

  // GetAttachfiles = () => {
  //   var find = this.state?.item?.created_by_image;
  //   if (find) {
  //     var find1 = find.split(".com/")[1];
  //     axios
  //       .get(sitedata.data.path + "/aws/sign_s3?find=" + find1)
  //       .then((response2) => {
  //         if (response2.data.hassuccessed) {
  //           this.setState({ new_image: response2.data.data });
  //         }
  //       });
  //   }
  // }
  render() {
    var item = this.state.item;
    return (
      <Grid className="bpJohnImg">
        <a data-tip data-for={this.props.callFrom === 'assignedTo' ? this.props.track_id+ this.props.index + "assinged" : item.track_id + "created"}>
          {this.props.callFrom === 'assignedTo' ?
           <S3Image imgUrl={item.image} />
          :
          <S3Image imgUrl={item.created_by_image} />}
          {this.props.callFrom === 'assignedTo' ? <span>{item.first_name} {item.last_name} {item.title}({item.type})</span> : <span>{item.created_by_temp}</span>}
        </a>
        <ReactTooltip
          className="timeIconClas_crested"
          id={this.props.callFrom === 'assignedTo' ? this.props.track_id +this.props.index+ "assinged" : item.track_id + "created"}
          place="top"
          effect="solid"
          backgroundColor="#ffffff"
        >
          {this.props.callFrom == 'assignedTo' ?
            <p>{item.first_name} {item.last_name} {item.title}({item.type})</p>
            :
            <p>{item.created_by_temp}</p>
          }
          {this.props.callFrom == 'assignedTo' ?
            <p>{item.profile_id}</p>
            :
            <p>{item.created_by_profile}</p>
          }
          <p>
          {this.props.callFrom === 'assignedTo' ?
           <S3Image imgUrl={item.image} />
          :
          <S3Image imgUrl={item.created_by_image} />}
          </p>
        </ReactTooltip>
      </Grid>
    );
  }
}

export default Index;