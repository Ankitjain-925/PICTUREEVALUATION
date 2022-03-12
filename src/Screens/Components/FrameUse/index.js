import React, { Component } from "react";

class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.type === "mp4" ? (
          <video
            className="VideoPlay"
            width={this.props && this.props.comesFrom === "LMS" ? 700 : 100}
            height={this.props && this.props.comesFrom === "LMS" ? 300 : 100}
            controls
          >
            <source src={this.props.new_image} type="video/mp4" />
          </video>
        ) : (
          <iframe
            width={this.props && this.props.comesFrom === "LMS" ? 700 : 100}
            height={this.props && this.props.comesFrom === "LMS" ? 500 : 100}
            src={this.props.new_image}
            frameborder="0"
            allowtransparency="true"
            allowfullscreen
          ></iframe>
        )}
      </div>
    );
  }
}
export default Index;
