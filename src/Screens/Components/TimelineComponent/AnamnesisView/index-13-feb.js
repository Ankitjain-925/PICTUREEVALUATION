import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Collapsible from "react-collapsible";
import FileViews from "./../FileViews/index";
import PainPoint from "Screens/Components/PointPain/index";
import ReactTooltip from "react-tooltip";
import { getDate, newdate, getTime, getImage } from "Screens/Components/BasicMethod/index";
import DownloadFullTrack from "Screens/Components/DownloadFullTrack/index.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { GetShowLabel1 } from "../../GetMetaData/index.js";
import { LanguageFetchReducer } from "Screens/actions";
import {
  translationAR,
  translationSW,
  translationSP,
  translationRS,
  translationEN,
  translationNL,
  translationDE,
  translationCH,
  translationPT,
  translationFR
} from "translations/index"
import { pure } from "recompose";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.data || {},
      date_format: this.props.date_format,
      time_foramt: this.props.time_format,
      archive: this.props.archive,
      loggedinUser: this.props.loggedinUser,
      images: this.props.images,
      gender: this.props.gender,
      TrackRecord: this.props.TrackRecord,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.data !== this.props.data ||
      prevProps.loggedinUser !== this.props.loggedinUser
    ) {
      this.setState({
        item: this.props.data,
        loggedinUser: this.props.loggedinUser,
      });
    }
    if (prevProps.images !== this.props.images) {
      this.setState({ images: this.props.images });
    }
    if (prevProps.TrackRecord !== this.props.TrackRecord) {
      this.setState({ TrackRecord: this.props.TrackRecord });
    }
  };

  render() {
    let translate = {};
    switch (this.props.stateLanguageType) {
      case "en":
        translate = translationEN.text;
        break;
      case "de":
        translate = translationDE.text;
        break;
      case "pt":
        translate = translationPT.text;
        break;
      case "sp":
        translate = translationSP.text;
        break;
      case "rs":
        translate = translationRS.text;
        break;
      case "nl":
        translate = translationNL.text;
        break;
      case "ch":
        translate = translationCH.text;
        break;
      case "sw":
        translate = translationSW.text;
        break;
      case "fr":
        translate = translationFR.text;
        break;
      case "ar":
        translate = translationAR.text;
        break;
      default:
        translate = translationEN.text;
    }
    let {
      anamnesis,
      always,
      Date_of_event,
      show,
      hide,
      until,
      Change,
      edit,
      Download,
      img_files,
      visibility,
      visible,
      archive,
      de_archive,
      Delete,
      pain_areas,
      BodySchemeNotes,
    } = translate;
    var item = this.state.item;
    return (
      <Grid container direction="row" className="descpCntnt">
        <Grid item xs={12} md={1} className="descpCntntLft">
          {newdate(item.datetime_on)}
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid className="descpInerRght descpInerPurple">
            <Grid container direction="row" className="addSpc">
              <Grid item xs={12} md={6}>
                <Grid className="blodPrsurImg purpleSpan">
                  <a className="diryNote">
                    <img
                      src={require("assets/images/doctor-appointments.svg")}
                      alt=""
                      title=""
                    />
                    <span>{anamnesis}</span>
                  </a>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid className="bp_vsblSec scndOptionIner1">
                  <a
                    onClick={() => this.props.EidtOption(item.type, item, true)}
                    className="bp_vsblEye"
                  >
                    <img
                      src={require("assets/images/eye2.png")}
                      alt=""
                      title=""
                    />{" "}
                    {item.visible === "show" ? (
                      <span>{visible}</span>
                    ) : item.visible === "hide" ? (
                      <span>{hide}</span>
                    ) : (
                      <span>Not mentioned</span>
                    )}{" "}
                  </a>
                  <a
                    className="vsblTime"
                    data-tip
                    data-for={item.track_id + "visibility"}
                  >
                    <img
                      src={require("assets/images/clock.svg")}
                      alt=""
                      title=""
                    />
                  </a>
                  <ReactTooltip
                    className="timeIconClas"
                    id={item.track_id + "visibility"}
                    place="top"
                    effect="solid"
                    backgroundColor="#ffffff"
                  >
                    {item.visible === "show" ? (
                      <label>
                        {show} {until}
                      </label>
                    ) : (
                      <label>
                        {hide} {until}
                      </label>
                    )}
                    {item.public === "always" ? (
                      <p> {always} </p>
                    ) : (
                      <p>{getDate(item.public, this.state.date_format)}</p>
                    )}
                  </ReactTooltip>
                  <a className="openScndhrf1">
                    <a className="vsblDots">
                      <img
                        src={require("assets/images/nav-more.svg")}
                        alt=""
                        title=""
                      />
                    </a>
                    {!this.props.Archive ? (
                      <ul>
                        <li>
                          <a onClick={(data) => this.props.ArchiveTrack(item)}>
                            <img
                              src={require("assets/images/archive-1.svg")}
                              alt=""
                              title=""
                            />
                            {archive}
                          </a>
                        </li>
                        {this.props.comesfrom === "patient" && (
                          <li>
                            {item.created_by === this.state.loggedinUser._id &&
                            (!item.updated_by || item.updated_by === "") ? (
                              <a
                                onClick={() =>
                                  this.props.EidtOption(item.type, item)
                                }
                              >
                                <img
                                  src={require("assets/images/edit-1.svg")}
                                  alt=""
                                  title=""
                                />
                                {edit}
                              </a>
                            ) : (
                              <a
                                onClick={() =>
                                  this.props.EidtOption(item.type, item, true)
                                }
                              >
                                <img
                                  src={require("assets/images/edit.svg")}
                                  alt=""
                                  title=""
                                />
                                {Change} {visibility}
                              </a>
                            )}
                          </li>
                        )}
                        {this.props.comesfrom !== "patient" && (
                          <li>
                            <a
                              onClick={() =>
                                this.props.EidtOption(item.type, item)
                              }
                            >
                              <img
                                src={require("assets/images/edit-1.svg")}
                                alt=""
                                title=""
                              />
                              {edit}
                            </a>
                          </li>
                        )}
                        <li>
                          <a onClick={() => this.props.downloadTrack(item)}>
                            <img
                              src={require("assets/images/download.svg")}
                              alt=""
                              title=""
                            />
                            {Download}
                          </a>
                        </li>
                        <li>
                          <DownloadFullTrack
                            TrackRecord={this.state.TrackRecord}
                          />
                        </li>
                        <li>
                          <a
                            onClick={(deleteKey) =>
                              this.props.DeleteTrack(item.track_id)
                            }
                          >
                            <img
                              src={require("assets/images/cancel-request.svg")}
                              alt=""
                              title=""
                            />
                            {Delete}
                          </a>
                        </li>
                      </ul>
                    ) : (
                      <ul>
                        <li>
                          <a onClick={(data) => this.props.ArchiveTrack(item)}>
                            <img
                              src={require("assets/images/archive-1.svg")}
                              alt=""
                              title=""
                            />
                            {de_archive}
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={(deleteKey) =>
                              this.props.DeleteTrack(item.track_id)
                            }
                          >
                            <img
                              src={require("assets/images/cancel-request.svg")}
                              alt=""
                              title=""
                            />
                            {Delete}
                          </a>
                        </li>
                      </ul>
                    )}
                  </a>
                </Grid>
              </Grid>
              <Grid className="clear"></Grid>
            </Grid>

            <Grid className="bp_hg addSpc">
              <label dangerouslySetInnerHTML={{ __html: item.remarks }} />
              {/* <p>Normal</p> */}
            </Grid>

            <Grid container direction="row" className="addSpc bpJohnMain">
              <Grid item xs={12} md={12}>
                <Grid className="bpJohnImg">
                  <a data-tip data-for={item.track_id + "created"}>
                    <img
                      src={getImage(item.created_by_image, this.state.images)}
                      alt=""
                      title=""
                    />
                    <span>{item.created_by_temp}</span>
                  </a>
                  <ReactTooltip
                    className="timeIconClas_crested"
                    id={item.track_id + "created"}
                    place="top"
                    effect="solid"
                    backgroundColor="#ffffff"
                  >
                    <p>{item.created_by_temp}</p>
                    <p>{item.created_by_profile}</p>
                    <p>
                      <img
                        src={getImage(item.created_by_image, this.state.images)}
                        alt=""
                        title=""
                      />
                    </p>
                  </ReactTooltip>
                </Grid>
              </Grid>
              <Grid className="clear"></Grid>
            </Grid>
            <Grid container direction="row" className="addSpc conPainGraph">
              <Grid item xs={12} md={5}>
                <Grid className="conPainLft">
                  <Grid className="conPainArea">
                    <label>{pain_areas}</label>
                  </Grid>
                  <PainPoint
                    id={item.track_id}
                    gender={this.state.gender}
                    painPoint={item.painPoint}
                    isView={true}
                  />
                </Grid>
              </Grid>
              <Grid item xs={7} md={7}>
                <Grid className="conPainArea">
                  <label>{BodySchemeNotes}</label>
                </Grid>
                <span dangerouslySetInnerHTML={{ __html: item.remarks }} />
                <Grid className="conPainArea">
                  <label>{Date_of_event}</label>
                </Grid>
                <span>
                  {item.event_date &&
                    getDate(item.event_date, this.state.date_format)}
                </span>
              </Grid>

              <Grid className="clear"></Grid>
            </Grid>

            {item.anamesis &&
              item.anamesis.length > 0 &&
              item.anamesis.map((data) => (
                <Grid className="addSpc detailMark">
                  <Collapsible
                    trigger={
                      data.title &&
                      GetShowLabel1(
                        this.props.list,
                        data && data.title && data.title.value,
                        this.props.stateLanguageType,
                        true,
                        "anamnesis"
                      )
                    }
                    open="true"
                  >
                    <Grid className="detailCntnt">
                      <p dangerouslySetInnerHTML={{ __html: data.notes }} />
                    </Grid>
                  </Collapsible>
                </Grid>
              ))}
            {/* <Grid container direction="row">
                                        <Grid item xs={12} md={6} className="painTypeBy">
                                            {item.anamesis && item.anamesis.length>0 && item.anamesis.map((data)=>(
                                                <Grid container direction="row">
                                                    <Grid item xs={5} md={5}><label>{data.title && data.title.label}</label></Grid>
                                                    <Grid item xs={7} md={7}><span dangerouslySetInnerHTML={{ __html: data.notes }}/></Grid>
                                                </Grid>
                                            ))}
                                        </Grid>
                                        <Grid className="clear"></Grid>
                                    </Grid> */}

            <Grid className="addSpc detailMark">
              <Collapsible trigger={img_files} open="true">
                <FileViews
                  images={this.state.images}
                  attachfile={item.attachfile}
                />
              </Collapsible>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
