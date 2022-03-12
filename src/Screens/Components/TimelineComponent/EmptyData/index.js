import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Collapsible from "react-collapsible";
import ReactTooltip from "react-tooltip";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { pure } from "recompose";
import { getLanguage } from "translations/index"
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {};
  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      journal_entry,
      mild_depresive_episode,
      welcome,
      example,
      team,
      ur_helthcare_on_blockchain,
      we_hv_prpared_short_introductry,
      entry_example,
      u_get_from_AIS,
      example_entry_of_journal_timline_etc,
      to,
    } = translate;

    return (
      <div>
        <Grid container direction="row">
          <Grid item xs={11} md={11} className="descpCntntRght">
            <Grid className="welAimedis">
              <Grid>
                <h1>
                  {welcome} {to} AIS
                </h1>
                <p>{ur_helthcare_on_blockchain}</p>
                <h2>
                  {we_hv_prpared_short_introductry} <br />
                  {u_get_from_AIS}
                </h2>
              </Grid>
              <Grid className="welVideo">
                <video width="100%" className="VideoPlay" controls>
                    <source src={require("assets/video/demovideos.mp4")} type="video/mp4" />
                </video>
                {/* <img
                  src={require("assets/images/vdo.jpg")}
                  alt=""
                  title=""
                /> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction="row" className="descpCntnt2">
          <Grid item xs={1} md={1} className="descpCntntLft2">
            <a>
              21 <span>May</span>
            </a>
          </Grid>
          <Grid item xs={11} md={10} className="descpCntntRght2">
            <Grid className="descpInerRght2">
              <Grid container direction="row" className="addSpc2">
                <Grid item xs={12} md={6}>
                  <Grid className="diagnosImg2">
                    <a className="diagnosNote2">
                      <img
                        src={require("assets/images/entry.png")}
                        alt=""
                        title=""
                      />
                      <span>{entry_example}</span>{" "}
                    </a>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid className="vsblSec2">
                    <a className="vsblDots2">
                      <img
                        src={require("assets/images/nav-more.svg")}
                        alt=""
                        title=""
                      />
                    </a>
                  </Grid>
                </Grid>
                <Grid className="clear"></Grid>
              </Grid>

              <Grid className="icd_num2 addSpc2">
                <label>{journal_entry}</label>
                <a data-tip data-for="icdtxtTip">
                  {example}
                </a>
                <ReactTooltip
                  className="icdtxtClas"
                  id="icdtxtTip"
                  place="top"
                  effect="solid"
                  backgroundColor="#ffffff"
                >
                  <h4>{mild_depresive_episode}</h4>
                </ReactTooltip>
              </Grid>

              <Grid
                container
                direction="row"
                className="addSpc2 markCntntMain2"
              >
                <Grid item xs={12} md={12}>
                  <Grid className="markCntntImg2">
                    <a>
                      <img
                        src={require("assets/images/logo_new2.png")}
                        alt=""
                        title=""
                      />
                      <span>AIS {team}</span>
                    </a>
                  </Grid>
                </Grid>
                <Grid className="clear"></Grid>
              </Grid>

              <Grid className="addSpc2 detailMark2">
                <Collapsible trigger="Notes" open="true">
                  <Grid className="detailCntnt2">
                    <p>{example_entry_of_journal_timline_etc}</p>
                  </Grid>
                </Collapsible>
              </Grid>
            </Grid>
          </Grid>
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
  connect(mapStateToProps, { LanguageFetchReducer })(Index)
));
