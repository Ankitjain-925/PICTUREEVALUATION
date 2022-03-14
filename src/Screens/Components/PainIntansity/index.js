import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { pure } from "recompose";
import { LanguageFetchReducer } from "Screens/actions";
import { getLanguage } from "translations/index"
class Pain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || 0,
      Forview: this.props.Forview,
    };
  }

  //On {pain} Change Change
  onPainChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.onChange(e);
  };

  componentDidUpdate = (prevProps) => {
    if (
      this.props.value &&
      this.props.value !== "NaN" &&
      prevProps.value !== this.props.value &&
      this.props.Forview
    ) {
      this.setState({ value: this.props.value });
    }
  };
  shouldComponentUpdate(nextProps, nextState) {
    return (
      (nextState.value !== this.state.value && this.state.value !== "NaN") ||
      (nextProps.value !== this.props.value && this.props.value !== "NaN")
    );
  }

  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      very_severy,
      no_pain,
      pain_intensity,
      warst_p_p,
      pain,
      Mild,
      Moderate,
      Servere,
    } = translate;
    return (
      <div>
        <Grid className="painIntencty">
          {this.props.comesFrom === "Evalute" ? null :
            <Grid>
              <label>{pain_intensity}</label>
            </Grid>}
          {this.state.Forview && (
            <Grid>
              {this.state.value >= 0 && this.state.value <= 1 && (
                <a>
                  <img
                    src={require("assets/images/nopain.svg")}
                    alt=""
                    title=""
                  />
                  {no_pain} ({this.state.value})
                </a>
              )}
              {this.state.value > 1 && this.state.value <= 3 && (
                <a>
                  <img
                    src={require("assets/images/mild.svg")}
                    alt=""
                    title=""
                  />
                  {Mild} {pain} ({this.state.value})
                </a>
              )}
              {this.state.value > 3 && this.state.value <= 5 && (
                <a>
                  <img
                    src={require("assets/images/moderate.svg")}
                    alt=""
                    title=""
                  />
                  {Moderate} {pain} ({this.state.value})
                </a>
              )}
              {this.state.value > 5 && this.state.value <= 7 && (
                <a>
                  <img
                    src={require("assets/images/severe.svg")}
                    alt=""
                    title=""
                  />
                  {Servere} {pain} ({this.state.value})
                </a>
              )}
              {this.state.value > 7 && this.state.value <= 9 && (
                <a>
                  <img
                    src={require("assets/images/veryServere.svg")}
                    alt=""
                    title=""
                  />
                  {very_severy} {pain} ({this.state.value})
                </a>
              )}
              {this.state.value > 9 && this.state.value <= 10 && (
                <a>
                  <img
                    src={require("assets/images/worst.svg")}
                    alt=""
                    title=""
                  />
                  {warst_p_p} ({this.state.value})
                </a>
              )}
            </Grid>
          )}
          {this.state.Forview && (
            <Grid>
              {" "}
              <input
                disabled
                name={this.props.name}
                value={this.state.value}
                type="range"
                onChange={this.onPainChange}
                max="10"
              />
            </Grid>
          )}
          {!this.state.Forview && (
            <Grid>
              <a>{this.state.value}</a>
            </Grid>
          )}
          {!this.state.Forview && this.props.comesFrom === "Evalute" ? (<Grid>
            {" "}
            <input
              name={this.props.name}
              value={this.state.value}
              type="range"
              onChange={this.onPainChange}
              max="5"
            />
          </Grid>) : (
            <Grid>
              {" "}
              <input
                name={this.props.name}
                value={this.state.value}
                type="range"
                onChange={this.onPainChange}
                max="10"
              />
            </Grid>
          )}
          {!this.state.Forview && this.props.comesFrom === "Evalute" ? null : (
            <Grid className="painPointer">
              <a>{no_pain}</a> <a>{Mild}</a> <a>{Moderate}</a> <a>{Servere}</a>
              <a>{very_severy}</a> <a>{warst_p_p}</a>
            </Grid>
          )}
        </Grid>
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
export default pure(
  withRouter(connect(mapStateToProps, { LanguageFetchReducer })(Pain))
);
