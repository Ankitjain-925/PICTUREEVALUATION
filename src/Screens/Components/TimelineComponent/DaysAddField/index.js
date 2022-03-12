import React, { Component } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import MMHG from "Screens/Components/mmHgField/index";
import { getLanguage } from "translations/index"

import { pure } from "recompose";
class AnamnesisFinding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findingArr: this.props.findingArr || [],
      label: this.props.label,
      gender: this.props.gender,
      name: this.props.name,
      options: this.props.options,
    };
  }

  // On change the Fields of any index
  onFieldChange = (e, i) => {
    let tArray = this.state.findingArr;
    if (tArray && tArray.length == 0) {
      tArray.push(e.target.value);
    } else {
      tArray[i] = e.target.value;
    }

    this.setState({ findingArr: tArray });
    this.props.onChange(tArray);
  };

  //On delete the time
  deleteField = (index) => {
    let tArray = this.state.findingArr;
    tArray.splice(index, 1);
    this.setState({ findingArr: tArray });
    this.props.onChange(tArray);
  };

  //On add the new Time
  onAddFiled = () => {
    let tArray = this.state.findingArr;
    if (tArray && tArray.length > 0) {
      tArray.push("");
    } else {
      tArray.push("", "");
    }
    this.setState({ findingArr: tArray });
  };

  componentDidMount = () => {};
  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let { addtextentry, BodySchemeNotes, rmv_entry } = translate;
    return (
      <div>
        <Grid className="rrSysto">
          <Grid>
            <label>{this.state.label}</label>
          </Grid>
          {this.state.findingArr && this.state.findingArr.length == 0 && (
            <Grid>
              <MMHG
                name="day_after"
                onChange={(e) => this.onFieldChange(e, 0)}
              />
              <Grid className="consumeAt">
                <p onClick={this.onAddFiled}>+ {addtextentry}</p>
              </Grid>
            </Grid>
          )}

          {this.state.findingArr &&
            this.state.findingArr.length > 0 &&
            this.state.findingArr.map((itm, index) =>
              index == 0 ? (
                <Grid>
                  <MMHG
                    name="day_after"
                    onChange={(e) => this.onFieldChange(e, 0)}
                    value={itm && itm}
                  />
                  <Grid className="consumeAt">
                    <p onClick={this.onAddFiled}>+ {addtextentry}</p>
                  </Grid>
                </Grid>
              ) : (
                <Grid>
                  <MMHG
                    name="day_after"
                    onChange={(e) => this.onFieldChange(e, index)}
                    value={itm && itm}
                  />
                  <Grid className="consumeAt">
                    <p
                      onClick={() => {
                        this.deleteField(index);
                      }}
                      className="minus_span_medication"
                    >
                      - {rmv_entry}
                    </p>
                  </Grid>
                </Grid>
              )
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
export default pure(withRouter(
  connect(mapStateToProps, { LanguageFetchReducer })(AnamnesisFinding)
));
