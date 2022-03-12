import React, { Component } from "react";
import { getLanguage } from "translations/index"
export default class FloatArrowUp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let { goto_top } = translate;
    return (
      <a
        title={goto_top}
        onClick={() =>
          window.scroll({
            top: 0,
            behavior: "smooth",
          })
        }
        className="floatArrowUp"
      >
        <img
          className="arrowIcon"
          src={require("assets/images/scrollUp.png")}
        />
      </a>
    );
  }
}
