import React, { Component } from "react";
import ReactStars from "react-rating-stars-component";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating,
    };
  }
  //on getting filter and filter Accordingly
  componentDidUpdate = (prevProps) => {
    if (prevProps.rating !== this.props.rating) {
      this.setState({ rating: this.props.rating });
    }
  };
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.rating !== this.props.rating ||
      nextState.rating !== this.state.rating
    );
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <ReactStars
        count={5}
        onChange={this.props.ratingChange}
        size={this.props.size}
        isHalf={true}
        value={this.state.rating}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
    );
  }
}
export default Index;
