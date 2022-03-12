import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Collapsible from "react-collapsible";
import ReactTooltip from "react-tooltip";
import FatiqueQuestion from "../CovidSymptomsField/FatiqueQuestions";
import SymptomQuestions from "../CovidSymptomsField/SymptomQuestions";
import {
  getDate,
  newdate,
  getImage,
} from "Screens/Components/BasicMethod/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CreatedBySec from "Screens/Components/TimelineComponent/CreatedBysec";
import DownloadFullTrack from "Screens/Components/DownloadFullTrack/index.js";
import { LanguageFetchReducer } from "Screens/actions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { getLanguage } from "translations/index";
import { pure } from "recompose";
import PainIntensity from "Screens/Components/PainIntansity/index";
import Condition from "Screens/Components/Condition/index";
import PainPoint from "Screens/Components/PointPain/index";
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
      onlyOverview: this.props.onlyOverview,
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
    if (prevProps.onlyOverview !== this.props.onlyOverview) {
      this.setState({ onlyOverview: this.props.onlyOverview });
    }
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      Diaryentry,
      visible,
      ChatwithCovidconsultant,
      Exercise,
      CovidElearning,
      EnergyManagement,
      show,
      pain_areas,
      hide,
      until,
      archive,
      edit,
      Delete,
      always,
      Change,
      Location,
      visibility,
      de_archive,
      not_mentioned,
      long_covid,
      Symptoms,
      starting_things,
      energy_lavel_determine,
      how_memory,
      difficulties_concentrating,
      tongue_when_speaking,
      lack_energy,
      your_muscles,
      feel_week,
      Fatique,
      Headache,
      Shortness_of_breath,
      loss_smell,
      Diarrhea,
      Better_experience,
      Persistent_cough,
      Sore_throat,
      Fever,
      muscle_pain,
      Skipped_meals,
      Chest_pain,
      Fatique_questions,
      Hoarse_voice,
      Abdominal_pain,
      Delirium,
      Oxygen_therapy,
      ECMOtherapy,
      Sepsis,
      Multiorgan_failure,
      problem_with_tiredness,
      rest_more,
      save_entry,
      Tachykardia,
      sleepy_drowsy,
      Currentpaincondition, 
      past_date,
      right_word,
    } = translate;
    var item = this.state.item;
    return (
      <Grid container direction="row" className={(new Date(item.past_date) <= new Date()) ? "descpCntnt disavleViewLong" : "descpCntnt"}>
        <Grid item xs={12} md={1} className="descpCntntLft">
          {newdate(item.datetime_on)}     
        </Grid>
        <Grid item xs={12} md={10} className="descpCntntRght">
          <Grid className="descpInerRght">
            <Grid container direction="row" className="addSpc">
              <Grid item xs={12} md={6}>
                <Grid className="conPainImg">
                  <a className="conPainNote">
                    <img
                      src={require("assets/images/covid-19.svg")}
                      alt=""
                      title=""
                    />
                    <span>{long_covid}</span>{" "}
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
                      <span>{not_mentioned}</span>
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

            <Grid className="conPain_num addSpc">
              <Grid className="">
                <Grid>
                  <Grid className="">
                    <Grid className="covidviewsec">
                      <Grid>
                        <label>{past_date}</label>
                      </Grid>
                      <span>{item.past_date && getDate(item.past_date, this.state.date_format)}</span>
                    </Grid>
                  </Grid>
                  <Grid className="enrgyLbl view_labelBottom">
                    <Grid>
                      <label>{energy_lavel_determine}</label>
                    </Grid>
                    <Grid>
                      <a
                        className={
                          item?.energy_lavel == 0 &&
                          "activeButton"
                        }
                      >
                        <img
                          src={require("assets/images/battery1.png")}
                          alt=""
                          title=""
                          className="enrgyGry"
                        />
                        <img
                          src={require("assets/images/battery1wht.png")}
                          alt=""
                          title=""
                          className="enrgyWht"
                        />
                      </a>
                      <a
                        className={
                          item?.energy_lavel == 1 &&
                          "activeButton"
                        }
                      >
                        <img
                          src={require("assets/images/battery2.png")}
                          alt=""
                          title=""
                          className="enrgyGry"
                        />
                        <img
                          src={require("assets/images/battery2wht.png")}
                          alt=""
                          title=""
                          className="enrgyWht"
                        />
                      </a>
                      <a
                        className={
                          item?.energy_lavel == 2 &&
                          "activeButton"
                        }
                      >
                        <img
                          src={require("assets/images/battery3.png")}
                          alt=""
                          title=""
                          className="enrgyGry"
                        />
                        <img
                          src={require("assets/images/battery3wht.png")}
                          alt=""
                          title=""
                          className="enrgyWht"
                        />
                      </a>
                      <a
                        className={
                          item?.energy_lavel == 3 &&
                          "activeButton"
                        }
                      >
                        <img
                          src={require("assets/images/battery4.png")}
                          alt=""
                          title=""
                          className="enrgyGry"
                        />
                        <img
                          src={require("assets/images/battery4wht.png")}
                          alt=""
                          title=""
                          className="enrgyWht"
                        />
                      </a>
                      <a
                        className={
                          item?.energy_lavel == 4 &&
                          "activeButton"
                        }
                      >
                        <img
                          src={require("assets/images/battery5.png")}
                          alt=""
                          title=""
                          className="enrgyGry"
                        />
                        <img
                          src={require("assets/images/battery5wht.png")}
                          alt=""
                          title=""
                          className="enrgyWht"
                        />
                      </a>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Collapsible
              trigger={<ExpandMoreIcon />}
              triggerWhenOpen={<ExpandLessIcon />}
              open={!this.state.onlyOverview}
            >
              {
                <Grid>
                  <Grid
                    container
                    direction="row"
                    className="addSpc conPain_Cntnt"
                  >
                    <Grid item xs={12} md={5}>
                      <CreatedBySec data={item} />
                    </Grid>
                    <Grid item xs={12} md={7}></Grid>
                    <Grid className="clear"></Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    className="addSpc conPainGraph"
                  >
                    <Grid className="fatiqueQues maxWidthSet">
                      <h2>{Fatique_questions}</h2>
                      <FatiqueQuestion
                        notchangeble={true}
                        label={problem_with_tiredness}
                        value={item?.tiredness}
                      />
                      <FatiqueQuestion
                        notchangeble={true}
                        label={rest_more}
                        value={item?.rest_more}
                      />
                      <FatiqueQuestion
                        notchangeble={true}
                        label={sleepy_drowsy}
                        value={item?.sleepy_drowsy}
                      />
                      <FatiqueQuestion
                        notchangeble={true}
                        label={starting_things}
                        value={item?.problem_starting}
                      />
                      <FatiqueQuestion
                        notchangeble={true}
                        label={lack_energy}
                        value={item?.lack_energy}
                      />
                      <FatiqueQuestion
                        notchangeble={true}
                        label={your_muscles}
                        value={item?.less_strength}
                      />
                      <FatiqueQuestion
                        notchangeble={true}
                        label={feel_week}
                        value={item?.feel_weak}
                      />
                      <FatiqueQuestion
                        notchangeble={true}
                        label={difficulties_concentrating}
                        value={item?.concentrating}
                      />
                      <FatiqueQuestion
                        notchangeble={true}
                        label={tongue_when_speaking}
                        value={item?.slips_tongue}
                      />
                      <FatiqueQuestion
                        notchangeble={true}
                        label={right_word}
                        value={item?.right_word}
                      />
                      <FatiqueQuestion
                        notchangeble={true}
                        label={how_memory}
                        value={item?.how_memory}
                      />
                      <FatiqueQuestion
                          notchangeble={true}
                          label={Delirium}
                          value={item?.delirium}
                        />
                        <FatiqueQuestion
                          notchangeble={true}
                          label={Oxygen_therapy}
                          value={item?.oxygen_therapy}
                        />
                        <FatiqueQuestion
                          notchangeble={true}
                          label={ECMOtherapy}
                          value={item?.ecmo_therapy}
                        />
                        <FatiqueQuestion
                          notchangeble={true}
                          label={Sepsis}
                          value={item?.sepsis}
                        />
                        <FatiqueQuestion
                          notchangeble={true}
                          label={Multiorgan_failure}
                          value={item?.multiorgan_failure}
                        />
                    </Grid>
                    <Grid className="symptomSec">
                      <h3>{Currentpaincondition}</h3>
                    </Grid>
                    <Grid container direction="row" className="conPainGraph">
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
                      <Grid item xs={12} md={7}>
                        <Grid className="conPainRght">
                          <Grid className="painIntencty">
                            <PainIntensity
                              name="pain_intensity"
                              Forview={true}
                              onChange={(e) => this.props.updateEntryState(e)}
                              value={Math.round(item.pain_intensity)}
                            />
                          </Grid>

                          <Grid className="condIntencty">
                            <Condition
                              name="feeling"
                              Forview={true}
                              onChange={(e) => this.props.updateEntryState(e)}
                              value={Math.round(item.feeling)}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid className="clear"></Grid>
                    </Grid>

                    {/* <Grid className="detailMark">
                        <Collapsible trigger={Diaryentry} open="true">
                          <Grid className="detailCntnt">
                            <p dangerouslySetInnerHTML={{ __html: item.memory_txt }} />
                          </Grid>
                        </Collapsible>
                      </Grid> */}
                  <Grid className="symptomSec maxWidthSet">
                      
                    <h3>{Diaryentry}</h3>
                  
                    <Grid className="detailCntnt">
                            <p dangerouslySetInnerHTML={{ __html: item.memory_txt }} />
                          </Grid>
                          </Grid>
                    <Grid className="symptomSec maxWidthSet">
                      <h3>{Symptoms}</h3>
                      <SymptomQuestions
                        notchangeble={true}
                        label={Fatique}
                        value={item?.fatique}
                      />
                      <SymptomQuestions
                        notchangeble={true}
                        label={Headache}
                        value={item?.headache}
                      />
                      <SymptomQuestions
                        notchangeble={true}
                        label={Shortness_of_breath}
                        value={item?.shortness_of_breath}
                      />
                      <SymptomQuestions
                        notchangeble={true}
                        label={loss_smell}
                        value={item?.loss_of_smell}
                      />
                      <SymptomQuestions
                        notchangeble={true}
                        label={Persistent_cough}
                        value={item?.persistent_cough}
                      />
                      <SymptomQuestions
                        notchangeble={true}
                        label={Sore_throat}
                        value={item?.sore_throat}
                      />
                      <SymptomQuestions
                        notchangeble={true}
                        label={Fever}
                        value={item?.fever}
                      />
                      <SymptomQuestions
                        notchangeble={true}
                        label={muscle_pain}
                        value={item?.unusual_muscle_pain}
                      />
                      <SymptomQuestions
                        notchangeble={true}
                        label={Skipped_meals}
                        value={item?.skipped_meals}
                      />
                      <SymptomQuestions
                        notchangeble={true}
                        label={Chest_pain}
                        value={item?.chest_pain}
                      />
                      <SymptomQuestions
                        notchangeble={true}
                        label={Diarrhea}
                        value={item?.diarrhea}
                      />
                      <SymptomQuestions
                        notchangeble={true}
                        label={Hoarse_voice}
                        value={item?.hoarse_voice}
                      />
                      <SymptomQuestions
                        notchangeble={true}
                        label={Abdominal_pain}
                        value={item?.abdominal_pain}
                      />
                       <SymptomQuestions
                        notchangeble={true}
                        label={Tachykardia}
                        value={item?.tachykardia}
                      />
                    </Grid>
                    <Grid className="clear"></Grid>
                  </Grid>
                  {this.props.comesfrom === "patient" && (
                  <Grid className="covidIcons">
                    <Grid container direction="row" alignItems="center">
                      <Grid item xs={12} md={5}>
                        <label onClick={()=>{this.props.history.push('/patient/chats')}}>
                          <span>
                            <img
                              src={require("assets/images/chatnw.png")}
                              alt=""
                              title=""
                            />
                          </span>
                          {ChatwithCovidconsultant}
                        </label>
                      </Grid>
                      <Grid item xs={12} md={7}>
                        <label>
                          <span>
                            <img
                              src={require("assets/images/cap.png")}
                              alt=""
                              title=""
                            />
                          </span>
                          {CovidElearning}
                        </label>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center">
                      <Grid item xs={12} md={5}>
                        <label>
                          <span>
                            <img
                              src={require("assets/images/energy.png")}
                              alt=""
                              title=""
                            />
                          </span>
                          {EnergyManagement}
                        </label>
                      </Grid>
                      <Grid item xs={12} md={7}>
                        <label>
                          <span>
                            <img
                              src={require("assets/images/playnw.png")}
                              alt=""
                              title=""
                            />
                          </span>
                          {Exercise}
                        </label>
                      </Grid>
                    </Grid>
                  </Grid>
                  )}
               </Grid>
              }
            </Collapsible>
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
export default pure(
  withRouter(connect(mapStateToProps, { LanguageFetchReducer })(Index))
);
