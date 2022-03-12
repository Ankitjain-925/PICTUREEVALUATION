/* global google */
import React from "react";
import { LanguageFetchReducer } from "Screens/actions";
import { getLanguage } from "translations/index"

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.searchCity = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    this.state = {
      city: this.props.value,
    };
  }

  componentDidMount() {
    this.searchCity = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ["geocode"] }
    );
    this.searchCity.addListener("place_changed", this.handlePlaceChanged);
  }

  handlePlaceChanged() {
    const place = this.searchCity.getPlace();
    this.props.onPlaceChanged(place);
  }

  Onchange = (e) => {
    this.setState({ city: e.target.value });
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.value !== this.props.value) {
      this.setState({ city: this.props.value });
    }
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      search_city
    } = translate;
    return (
      <div>
        <input
          ref={this.autocompleteInput}
          id="searchCity"
          name="searchCity"
          className="admin_textbox2"
          placeholder={search_city}
          value={this.state.city}
          type="text"
          onChange={this.Onchange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  return {
    stateLanguageType,
  };
};
export default withRouter(
  connect(mapStateToProps, { LanguageFetchReducer })(Autocomplete)
);
