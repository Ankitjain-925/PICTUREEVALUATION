import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ShowHide from "Screens/Components/ShowHide/index";
import NotesEditor from "Screens/Components/Editor/index";
import FatiqueQuestion from "./FatiqueQuestions";
import DateFormat from "Screens/Components/DateFormat/index";
import SymptomQuestions from "./SymptomQuestions";
import Button from "@material-ui/core/Button";
import PainPoint from "Screens/Components/PointPain/index";
import { pure } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { getLanguage } from "translations/index";
import PainIntensity from "Screens/Components/PainIntansity/index";
import Condition from "Screens/Components/Condition/index";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateTrack: this.props.updateTrack,
      date_format: this.props.date_format,
      gender: this.props.gender,
  }
  }
  componentDidMount = () => {};

  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.updateTrack !== this.props.updateTrack || prevProps.date_format !== this.props.date_format) {
      this.setState({ updateTrack: this.props.updateTrack, date_format: this.props.date_format });
    }
  };

  updateEntryState1 = (value, name) => {
    var state = this.state.updateTrack;
    state[name] = value;
    this.setState({ updateTrack: state });
    this.props.updateEntryState1(value, name);
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
        Symptoms, Diaryentry, starting_things, energy_lavel_determine, how_memory, difficulties_concentrating, tongue_when_speaking,
        lack_energy, your_muscles, feel_week, Fatique, Headache, Shortness_of_breath, loss_smell, Diarrhea,
        Better_experience, Persistent_cough,Sore_throat, Fever, muscle_pain, Skipped_meals, Chest_pain,
        Fatique_questions, Hoarse_voice, Abdominal_pain, Delirium, Oxygen_therapy, ECMOtherapy, Sepsis, 
        Multiorgan_failure, Tachykardia, Currentpaincondition, problem_with_tiredness,selct_pain_area, rest_more, save_entry, sleepy_drowsy, past_date, right_word  } = translate;

    return (
      <div>
        <Grid className="">
          <Grid className="">
            <Grid className="cnfrmDiaMain">
              <Grid className="covidSys">
                <p>
                {Better_experience}
                </p>
              </Grid>
              <Grid>
              </Grid>
            </Grid>
            <Grid className="enrgySection1">
              <Grid className="enrgyLbl">
                <Grid>
                  <label>{past_date}</label>
                </Grid>
                <DateFormat
                    name="past_date"
                    value={
                    this.state.updateTrack.past_date
                        ? new Date(this.state.updateTrack.past_date)
                        : new Date()
                    }
                    date_format={this.state.date_format}
                    onChange={(e) => this.updateEntryState1(e, "past_date")}
                />
                </Grid>
                </Grid>
            <Grid className="enrgySection">
              <Grid className="enrgyLbl">
                <Grid>
                  <label>{energy_lavel_determine}</label>
                </Grid>
                <Grid>
                  <a className={this.state.updateTrack?.energy_lavel == 0 && "activeButton"} onClick={()=>{this.updateEntryState1(0, 'energy_lavel')}}>
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
                  <a className={this.state.updateTrack?.energy_lavel == 1 && "activeButton"} onClick={()=>{this.updateEntryState1(1, 'energy_lavel')}}> 
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
                  <a className={this.state.updateTrack?.energy_lavel == 2 && "activeButton"} onClick={()=>{this.updateEntryState1(2, 'energy_lavel')}}>
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
                  <a className={this.state.updateTrack?.energy_lavel == 3 && "activeButton"} onClick={()=>{this.updateEntryState1(3, 'energy_lavel')}}>
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
                  <a className={this.state.updateTrack?.energy_lavel == 4 && "activeButton"} onClick={()=>{this.updateEntryState1(4, 'energy_lavel')}}>
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
              <Grid className="fatiqueQues">
                <h2>{Fatique_questions}</h2>
                <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'tiredness')} label={problem_with_tiredness} value={this.state.updateTrack?.tiredness} />
                <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'rest_more')} label={rest_more} value={this.state.updateTrack?.rest_more} />
                <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'sleepy_drowsy')} label={sleepy_drowsy} value={this.state.updateTrack?.sleepy_drowsy}/>
                <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'problem_starting')} label={starting_things} value={this.state.updateTrack?.problem_starting} />
                <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'lack_energy')} label={lack_energy} value={this.state.updateTrack?.lack_energy}/>
                <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'less_strength')} label={your_muscles} value={this.state.updateTrack?.less_strength}/>
                <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'feel_weak')} label={feel_week} value={this.state.updateTrack?.feel_weak}/>
                <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'concentrating')} label={difficulties_concentrating} value={this.state.updateTrack?.concentrating}/>
                <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'slips_tongue')} label={tongue_when_speaking} value={this.state.updateTrack?.slips_tongue}/>
                <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'right_word')} label={right_word} value={this.state.updateTrack?.right_word}/>
                <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'how_memory')} label={how_memory} value={this.state.updateTrack?.how_memory}/>
                <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'delirium')} label={Delirium} value={this.state.updateTrack?.delirium}/>
                <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'oxygen_therapy')} label={Oxygen_therapy} value={this.state.updateTrack?.oxygen_therapy}/>
                <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'ecmo_therapy')} label={ECMOtherapy} value={this.state.updateTrack?.ecmo_therapy}/>
                <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'sepsis')} label={Sepsis} value={this.state.updateTrack?.sepsis}/>
                <FatiqueQuestion updateEntryState1={(e)=>this.updateEntryState1(e, 'multiorgan_failure')} label={Multiorgan_failure} value={this.state.updateTrack?.multiorgan_failure}/>               
            </Grid>
            <Grid className="symptomSec">
                <h3>{Currentpaincondition}</h3>
            </Grid>
            <Grid className="fillDia">
                    <Grid>
                      <label>{selct_pain_area}</label>
                    </Grid>
                    <PainPoint
                      id="New_id1"
                      gender={this.state.gender}
                      painPoint={
                        this.state.updateTrack && this.state.updateTrack.painPoint
                          ? this.state.updateTrack.painPoint
                          : []
                      }
                      onChange={(e) => this.updateEntryState1(e, "painPoint")}
                    />
                  </Grid>
                  <Grid className="fillDia">
                    <PainIntensity
                      name="pain_intensity"
                      onChange={(e) => this.props.updateEntryState(e)}
                      value={Math.round(this.state.updateTrack.pain_intensity)}
                    />
                  </Grid>
                  <Grid className="fillDia">
                    <Condition
                      name="feeling"
                      onChange={(e) => this.props.updateEntryState(e)}
                      value={Math.round(this.state.updateTrack.feeling)}
                    />
                </Grid>

                <Grid className="symptomSec">
                  <h3>{Diaryentry}</h3>
                </Grid>
                <Grid className="fillDia">
                    <NotesEditor
                        name="memory_txt"
                        label={""}
                        comesFrom="long_covid"
                        onChange={(e) => this.updateEntryState1(e, "memory_txt")}
                        value={this.state.updateTrack.memory_txt}
                    />
                </Grid>
              <Grid className="symptomSec">
                <h3>{Symptoms}</h3>
                <SymptomQuestions  updateEntryState1={(e)=>this.updateEntryState1(e, 'fatique')} label={Fatique} value={this.state.updateTrack?.fatique}/>
                <SymptomQuestions  updateEntryState1={(e)=>this.updateEntryState1(e, 'headache')} label={Headache} value={this.state.updateTrack?.headache}/>
                <SymptomQuestions  updateEntryState1={(e)=>this.updateEntryState1(e, 'shortness_of_breath')} label={Shortness_of_breath} value={this.state.updateTrack?.shortness_of_breath}/>
                <SymptomQuestions  updateEntryState1={(e)=>this.updateEntryState1(e, 'loss_of_smell')} label={loss_smell} value={this.state.updateTrack?.loss_of_smell}/>
                <SymptomQuestions  updateEntryState1={(e)=>this.updateEntryState1(e, 'persistent_cough')} label={Persistent_cough} value={this.state.updateTrack?.persistent_cough}/>
                <SymptomQuestions  updateEntryState1={(e)=>this.updateEntryState1(e, 'sore_throat')} label={Sore_throat} value={this.state.updateTrack?.sore_throat}/>
                <SymptomQuestions  updateEntryState1={(e)=>this.updateEntryState1(e, 'fever')} label={Fever} value={this.state.updateTrack?.fever}/>
                <SymptomQuestions  updateEntryState1={(e)=>this.updateEntryState1(e, 'unusual_muscle_pain')}label={muscle_pain} value={this.state.updateTrack?.unusual_muscle_pain}/>
                <SymptomQuestions  updateEntryState1={(e)=>this.updateEntryState1(e, 'skipped_meals')} label={Skipped_meals} value={this.state.updateTrack?.skipped_meals}/>
                <SymptomQuestions  updateEntryState1={(e)=>this.updateEntryState1(e, 'chest_pain')} label={Chest_pain} value={this.state.updateTrack?.chest_pain}/>
                <SymptomQuestions  updateEntryState1={(e)=>this.updateEntryState1(e, 'diarrhea')} label={Diarrhea} value={this.state.updateTrack?.diarrhea}/>
                <SymptomQuestions  updateEntryState1={(e)=>this.updateEntryState1(e, 'hoarse_voice')} label={Hoarse_voice} value={this.state.updateTrack?.hoarse_voice}/>
                <SymptomQuestions  updateEntryState1={(e)=>this.updateEntryState1(e, 'abdominal_pain')} label={Abdominal_pain} value={this.state.updateTrack?.abdominal_pain}/>
                <SymptomQuestions  updateEntryState1={(e)=>this.updateEntryState1(e, 'tachykardia')} label={Tachykardia} value={this.state.updateTrack?.tachykardia}/>
              </Grid>
             
            </Grid>
            <Grid className="infoShwHidMain3upr">
                    <ShowHide
                        eventdate={true}
                        date_format={this.state.date_format}
                        value={this.state.updateTrack}
                        onChange={(data) => this.props.GetHideShow(data)}
                    />
                    <Grid className="infoShwSave3">
                        <input
                        type="submit"
                        value={save_entry}
                        onClick={this.props.AddTrack}
                        />
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
export default pure(
  withRouter(connect(mapStateToProps, { LanguageFetchReducer })(Index))
);
