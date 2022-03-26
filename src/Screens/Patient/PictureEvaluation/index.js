import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import sitedata from 'sitedata';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authy } from 'Screens/Login/authy.js';
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import LeftMenu from 'Screens/Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/PatientLeftMenu/mobile';
import { LanguageFetchReducer } from 'Screens/actions';
import Loader from 'Screens/Components/Loader/index';
import { Redirect, Route } from 'react-router-dom';
import { getLanguage } from 'translations/index';
import { commonHeader } from 'component/CommonHeader/index';
import PainIntensity from 'Screens/Components/PainIntansity/index';
import NotesEditor from '../../Components/Editor/index';
import FatiqueQuestion from '../../Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions';
import DateFormat from 'Screens/Components/DateFormat/index';
import MMHG from 'Screens/Components/mmHgField/index';
import npmCountryList from 'react-select-country-list';
import FileUploader from 'Screens/Components/JournalFileUploader/index';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { getPublishableKey } from 'Screens/Components/CardInput/getPriceId';
import Payment from 'Screens/Patient/PictureEvaluation/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { GetShowLabel1 } from 'Screens/Components/GetMetaData/index.js';
import SelectByTwo from 'Screens/Components/SelectbyTwo/index';
import SelectField from 'Screens/Components/Select/index';
import {
  handleEvalSubmit,
  FileAttachMulti,
  getallGroups,
  saveOnDB,
  getUserData,
} from './api';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { OptionList } from 'Screens/Login/metadataaction';
import { GetLanguageDropdown } from 'Screens/Components/GetMetaData/index.js';
const CURRENCY = 'USD';
const STRIPE_PUBLISHABLE = getPublishableKey();
const stripePromise = loadStripe(STRIPE_PUBLISHABLE);
function TabContainer(props) {
  return (
    <Typography component="div" className="tabsCntnts">
      {props.children}
    </Typography>
  );
}
TabContainer.propTypes = { children: PropTypes.node.isRequired };
class Index extends Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    // this.StripeClick = React.createRef();
    this.country = null;
    this.state = {
      addEval: false,
      setValue: {},
      newEntry: false,
      updateEvaluate: {},
      fileattach: {},
      forError: {},
      mod1Open: false,
      selectCountry: [],
      errorChrMsg: '',
      picEval: false,
      show2: false,
      show1: false,
      Housesoptions: {},
      Allsituation: [],
      Allsmoking_status: [],
      activated: false,
      deactivated: false,
      is_payment: false,
    };
  }

  componentDidMount() {
    var npmCountry = npmCountryList().getData();
    this.setState({ selectCountry: npmCountry });
    // getallGroups(this);
    this.getMetadata();
    if (this.props.location?.state?.data) {
      this.setState({
        updateEvaluate: this.props.location?.state?.data,
        fileattach: this.props.location?.state?.data?.fileattach,
        is_payment: this.props.location?.state?.data?.is_payment,
      });
    }
    getUserData(this);
  }

  //Get All information Related to Metadata
  getMetadata() {
    this.setState({ allMetadata: this.props.metadata }, () => {
      this.GetLanguageMetadata();
    });
  }

  GetLanguageMetadata = () => {
    if (this.state.allMetadata) {
      var Allsituation = GetLanguageDropdown(
        this.state.allMetadata &&
          this.state.allMetadata.situation &&
          this.state.allMetadata.situation,
        this.props.stateLanguageType
      );
      var Allsmoking_status = GetLanguageDropdown(
        this.state.allMetadata &&
          this.state.allMetadata.smoking_status &&
          this.state.allMetadata.smoking_status,
        this.props.stateLanguageType
      );

      this.setState({
        Allsituation: Allsituation,
        Allsmoking_status: Allsmoking_status,
      });
    }
  };

  redirectTolist = () => {
    this.props.history.push('/patient/evaluation-list');
  };

  CancelClick = () => {
    this.setState({ show1: false, show2: false });
  };

  // Open picture evluation form
  handlePicEval = () => {
    this.setState({ addEval: true });
  };

  // Close picture evluation form
  handleClosePicEval = () => {
    this.setState({ addEval: false });
  };

  //Not need yet this for the payment
  fromDollarToCent = (amount) => {
    return parseInt(amount * 100);
  };

  updateEntryState2 = (event) => {
    var state = this.state.updateEvaluate;
    state[event.target.name] = event.target.value;
    this.setState({ updateEvaluate: state });
  };

  updateEntryState1 = (value, name) => {
    console.log('value', value);
    var state = this.state.updateEvaluate;
    if (name == 'house_id') {
      state[name] = value.value;
    } else {
      state[name] = value;
    }
    this.setState({ updateEvaluate: state });
  };

  render() {
    const { value } = this.state;
    const { stateLoginValueAim } = this.props;
    if (
      stateLoginValueAim.user === 'undefined' ||
      stateLoginValueAim.token === 450 ||
      stateLoginValueAim.token === 'undefined' ||
      stateLoginValueAim.user.type !== 'patient' ||
      !this.props.verifyCode ||
      !this.props.verifyCode.code
    ) {
      return <Redirect to={'/'} />;
    }
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      rr_systolic,
      RR_diastolic,
      male,
      female,
      other,
      Hba1c,
      situation,
      smoking_status,
      from,
      when,
      until,
      age,
      gender,
      diabetes,
      blood_pressure,
      blood_sugar,
      picture_evaluation,
      place_of_residence,
      treatment_so_far,
      family_history,
      allergies,
      place_of_birth,
      phenotyp_race,
      medical_preconditions,
      premedication,
      travel_history_last_month,
      image_evaluation,
      when_did_it_start,
      hospital,
      pain_level,
      itch,
      pain,
      size_progress,
      warm,
      fever_body_temp,
      sun_before_how_long,
      how_cold_long,
      sexual_activities,
      select_status,
      submit,
    } = translate;
    //Success payment alert after payment is success

    return (
      <Grid
        className={
          this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === 'dark'
            ? 'homeBg darkTheme homeBgDrk'
            : 'homeBg'
        }
      >
        {this.state.loaderImage && <Loader />}
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              <Grid container direction="row">
                {/* Website Menu */}
                <LeftMenu isNotShow={true} currentPage="picture" />
                <LeftMenuMobile isNotShow={true} currentPage="picture" />
                <Grid item xs={12} md={11} lg={10}>
                  <Grid className="docsOpinion">
                    <Grid container direction="row" className="docsOpinLbl">
                      <Grid item xs={12} md={6}>
                        <label>{picture_evaluation}</label>
                      </Grid>
                      {/* <Grid item xs={12} md={6} className="docsOpinRght">
                                                <a onClick={this.handlePicEval}>+ {New} {"Picture Evaluation"}</a>
                                            </Grid> */}
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <Grid className="cnfrmDiaMain profilePkg cnfrmDiaMain1">
                      <div className="err_message">
                        {this.state.errorChrMsg}
                      </div>
                      {!this.state.show2 && (
                        <Grid>
                          {!this.state.picEval === true ? (
                            <Grid className="cnfrmDiaMain">
                              <Grid className="attchForms1">
                                <Grid>
                                  <label>{age}</label>
                                </Grid>
                                <Grid>
                                  <DateFormat
                                    name="dob"
                                    value={
                                      this.state.updateEvaluate?.dob
                                        ? new Date(
                                            this.state.updateEvaluate?.dob
                                          )
                                        : new Date()
                                    }
                                    max={new Date()}
                                    onChange={(e) =>
                                      this.updateEntryState1(e, 'dob')
                                    }
                                    date_format={
                                      this.props.settings &&
                                      this.props.settings.setting &&
                                      this.props.settings.setting.date_format
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                  <Grid>
                                    <label>{gender}</label>
                                  </Grid>
                                  <Grid className="profileInfoDate">
                                    <a
                                      onClick={() =>
                                        this.updateEntryState1('male', 'sex')
                                      }
                                      className={
                                        this.state.updateEvaluate.sex &&
                                        this.state.updateEvaluate.sex ===
                                          'male' &&
                                        'SelectedGender'
                                      }
                                    >
                                      {male}
                                    </a>
                                    <a
                                      onClick={() =>
                                        this.updateEntryState1('female', 'sex')
                                      }
                                      className={
                                        this.state.updateEvaluate.sex &&
                                        this.state.updateEvaluate.sex ===
                                          'female' &&
                                        'SelectedGender'
                                      }
                                    >
                                      {female}
                                    </a>
                                    <a
                                      onClick={() =>
                                        this.updateEntryState1('other', 'sex')
                                      }
                                      className={
                                        this.state.updateEvaluate.sex &&
                                        this.state.updateEvaluate.sex ===
                                          'other' &&
                                        'SelectedGender'
                                      }
                                    >
                                      {' '}
                                      {other}
                                    </a>
                                  </Grid>
                                </Grid>
                                <Grid className="bloodpreLb">
                                  <label>{blood_pressure}</label>
                                </Grid>
                                <Grid container direction="row" spacing="1">
                                  <Grid item md={6} sm={6}>
                                    <Grid className="fillDia">
                                      <MMHG
                                        name="rr_systolic"
                                        Unit="mmHg"
                                        label={rr_systolic}
                                        onChange={(e) =>
                                          this.updateEntryState2(e)
                                        }
                                        value={
                                          this.state.updateEvaluate?.rr_systolic
                                        }
                                      />
                                    </Grid>
                                  </Grid>

                                  <Grid item md={6} sm={6}>
                                    <Grid className="fillDia">
                                      <MMHG
                                        name="rr_diastolic"
                                        Unit="mmHg"
                                        label={RR_diastolic}
                                        onChange={(e) =>
                                          this.updateEntryState2(e)
                                        }
                                        value={
                                          this.state.updateEvaluate
                                            ?.rr_diastolic
                                        }
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid className="bloodpreLb">
                                  <label>{diabetes}</label>
                                </Grid>
                                <Grid container direction="row" spacing="1">
                                  <Grid item md={6} sm={6}>
                                    <Grid className="fillDia">
                                      <MMHG
                                        name="blood_sugar"
                                        Unit="mg/dl"
                                        label={blood_sugar}
                                        onChange={(e) =>
                                          this.updateEntryState2(e)
                                        }
                                        value={
                                          this.state.updateEvaluate?.blood_sugar
                                        }
                                      />
                                    </Grid>
                                  </Grid>
                                  <Grid item md={6} sm={6}>
                                    <Grid className="fillDia">
                                      <MMHG
                                        name="Hba1c"
                                        Unit="%"
                                        label={Hba1c}
                                        onChange={(e) =>
                                          this.updateEntryState2(e)
                                        }
                                        value={this.state.updateEvaluate?.Hba1c}
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid className="fillDia">
                                  <SelectByTwo
                                    name="situation"
                                    label={situation}
                                    options={this.state.Allsituation}
                                    onChange={(e) =>
                                      this.updateEntryState1(e, 'situation')
                                    }
                                    value={GetShowLabel1(
                                      this.state.options,
                                      this.state.updateEvaluate &&
                                        this.state.updateEvaluate.situation &&
                                        this.state.updateEvaluate.situation
                                          .value,
                                      this.props.stateLanguageType
                                    )}
                                  />
                                </Grid>

                                <Grid className="bloodpreLb">
                                  <label>{smoking_status}</label>
                                </Grid>
                                <Grid container direction="row" spacing="1">
                                  <Grid item md={4} sm={4}>
                                    <Grid className="fillDia">
                                      <SelectField
                                        isSearchable={true}
                                        name="smoking_status"
                                        label={smoking_status}
                                        option={this.state.Allsmoking_status}
                                        onChange={(e) =>
                                          this.updateEntryState1(
                                            e,
                                            'smoking_status'
                                          )
                                        }
                                        value={GetShowLabel1(
                                          this.state.Allsmoking_status,
                                          this.state.updateEvaluate &&
                                            this.state.updateEvaluate
                                              ?.smoking_status &&
                                            this.state.updateEvaluate
                                              ?.smoking_status?.value,
                                          this.props.stateLanguageType,
                                          false,
                                          'anamnesis'
                                        )}
                                      />
                                    </Grid>
                                  </Grid>
                                  <Grid item md={4} sm={4}>
                                    {(!this.state.updateEvaluate
                                      ?.smoking_status ||
                                      (this.state.updateEvaluate
                                        ?.smoking_status &&
                                        this.state.updateEvaluate
                                          ?.smoking_status?.value !==
                                          'Never_smoked')) && (
                                      <Grid className="fillDia">
                                        <Grid className="rrSysto">
                                          <Grid>
                                            <label>
                                              {from} {when}
                                            </label>
                                          </Grid>
                                          <DateFormat
                                            name="from_when"
                                            value={
                                              this.state.updateEvaluate
                                                ?.from_when
                                                ? new Date(
                                                    this.state.updateEvaluate?.from_when
                                                  )
                                                : new Date()
                                            }
                                            date_format={
                                              this.props.settings &&
                                              this.props.settings.setting &&
                                              this.props.settings.setting
                                                .date_format
                                            }
                                            onChange={(e) =>
                                              this.updateEntryState1(
                                                e,
                                                'from_when'
                                              )
                                            }
                                          />
                                        </Grid>
                                      </Grid>
                                    )}
                                  </Grid>
                                  <Grid item md={4} sm={4}>
                                    {(!this.state.updateEvaluate
                                      ?.smoking_status ||
                                      (this.state.updateEvaluate
                                        ?.smoking_status &&
                                        this.state.updateEvaluate
                                          ?.smoking_status?.value !==
                                          'Never_smoked')) && (
                                      <Grid className="fillDia">
                                        <Grid className="rrSysto">
                                          <Grid>
                                            <label>
                                              {until} {when}
                                            </label>
                                          </Grid>
                                          <DateFormat
                                            name="until_when"
                                            value={
                                              this.state.updateEvaluate
                                                ?.until_when
                                                ? new Date(
                                                    this.state.updateEvaluate?.until_when
                                                  )
                                                : new Date()
                                            }
                                            date_format={
                                              this.props.settings &&
                                              this.props.settings.setting &&
                                              this.props.settings.setting
                                                .date_format
                                            }
                                            onChange={(e) =>
                                              this.updateEntryState1(
                                                e,
                                                'until_when'
                                              )
                                            }
                                          />
                                        </Grid>
                                      </Grid>
                                    )}
                                  </Grid>
                                </Grid>
                                <Grid className="fillDiaAll">
                                  <label>{allergies}</label>
                                  <NotesEditor
                                    name="allergies"
                                    onChange={(e) =>
                                      this.updateEntryState1(e, 'allergies')
                                    }
                                    value={this.state.updateEvaluate?.allergies}
                                  />
                                </Grid>
                                <Grid className="fillDiaAll">
                                  <label>{family_history}</label>
                                  <NotesEditor
                                    name="family_history"
                                    onChange={(e) =>
                                      this.updateEntryState1(
                                        e,
                                        'family_history'
                                      )
                                    }
                                    value={
                                      this.state.updateEvaluate?.family_history
                                    }
                                  />
                                </Grid>
                                <Grid className="fillDiaAll">
                                  <label>{treatment_so_far}</label>
                                  <NotesEditor
                                    name="treatment_so_far"
                                    onChange={(e) =>
                                      this.updateEntryState1(
                                        e,
                                        'treatment_so_far'
                                      )
                                    }
                                    value={
                                      this.state.updateEvaluate
                                        ?.treatment_so_far
                                    }
                                  />
                                </Grid>
                                <Grid container direction="row" spacing="1">
                                  <Grid item xs={6} md={6}>
                                    <label>{place_of_birth}</label>
                                    <Grid className="cntryDropTop">
                                      <Select
                                        value={
                                          this.state.updateEvaluate?.country
                                        }
                                        onChange={(e) =>
                                          this.updateEntryState1(e, 'country')
                                        }
                                        options={this.state.selectCountry}
                                        placeholder=""
                                        isSearchable={true}
                                        name="country"
                                        className="cntryDrop"
                                      />
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={6} md={6}>
                                    <Grid>
                                      <label>{place_of_residence}</label>
                                      <Grid className="cntryDropTop">
                                        <Select
                                          value={
                                            this.state.updateEvaluate
                                              ?.residenceCountry
                                          }
                                          onChange={(e) =>
                                            this.updateEntryState1(
                                              e,
                                              'residenceCountry'
                                            )
                                          }
                                          options={this.state.selectCountry}
                                          placeholder=""
                                          isSearchable={true}
                                          name="residenceCountry"
                                          className="cntryDrop"
                                        />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid className="fillDiaAll fillDiaSection">
                                  <label>{phenotyp_race}</label>
                                  <NotesEditor
                                    name="race"
                                    onChange={(e) =>
                                      this.updateEntryState1(e, 'race')
                                    }
                                    value={this.state.updateEvaluate?.race}
                                  />
                                </Grid>
                                <Grid className="fillDiaAll">
                                  <label>{travel_history_last_month}</label>
                                  <NotesEditor
                                    name="history_month"
                                    onChange={(e) =>
                                      this.updateEntryState1(e, 'history_month')
                                    }
                                    value={
                                      this.state.updateEvaluate?.history_month
                                    }
                                  />
                                </Grid>
                                <Grid className="fillDiaAll">
                                  <label>{medical_preconditions}</label>
                                  <NotesEditor
                                    name="medical_precondition"
                                    onChange={(e) =>
                                      this.updateEntryState1(
                                        e,
                                        'medical_precondition'
                                      )
                                    }
                                    value={
                                      this.state.updateEvaluate
                                        ?.medical_precondition
                                    }
                                  />
                                </Grid>
                                <Grid className="fillDiaAll">
                                  <label>{premedication}</label>
                                  <NotesEditor
                                    name="premedication"
                                    onChange={(e) =>
                                      this.updateEntryState1(e, 'premedication')
                                    }
                                    value={
                                      this.state.updateEvaluate?.premedication
                                    }
                                  />
                                </Grid>

                                <Grid className="infoShwSave3">
                                  <input
                                    type="submit"
                                    value={submit}
                                    onClick={() => handleEvalSubmit(1, this)}
                                  ></input>
                                </Grid>
                              </Grid>
                            </Grid>
                          ) : (
                            <Grid className="attchForms1">
                              <Grid>
                                <label>{image_evaluation}</label>
                              </Grid>
                              <Grid>
                                <FileUploader
                                  // cur_one={this.props.cur_one}
                                  attachfile={
                                    this.state.updateEvaluate &&
                                    this.state.updateEvaluate?.fileattach
                                      ? this.state.updateEvaluate?.fileattach
                                      : []
                                  }
                                  name="UploadTrackImageMulti"
                                  comesFrom="journal"
                                  isMulti={true}
                                  fileUpload={(e) => FileAttachMulti(e, this)}
                                />
                              </Grid>
                              <Grid item xs={12} md={12}>
                                <label>{hospital}</label>
                                <Grid className="cntryDropTop">
                                  <Select
                                    value={this.state.updateEvaluate?.hospital}
                                    onChange={(e) =>
                                      this.updateEntryState1(e, 'hospital')
                                    }
                                    options={this.state.Housesoptions}
                                    placeholder=""
                                    isSearchable={true}
                                    name="hospital"
                                    className="cntryDrop"
                                  />
                                </Grid>
                              </Grid>

                              <Grid className="fatiqueQues fatiqueQuess1">
                                <Grid className="dateSet">
                                  <label>{when_did_it_start}</label>
                                  <DateFormat
                                    name="date"
                                    value={
                                      this.state.updateEvaluate?.start_date
                                        ? new Date(
                                            this.state.updateEvaluate?.start_date
                                          )
                                        : new Date()
                                    }
                                    onChange={(e) =>
                                      this.updateEntryState1(e, 'start_date')
                                    }
                                    date_format={
                                      this.props.settings &&
                                      this.props.settings.setting &&
                                      this.props.settings.setting.date_format
                                    }
                                  />
                                </Grid>
                                <FatiqueQuestion
                                  updateEntryState1={(e) =>
                                    this.updateEntryState1(e, 'warm')
                                  }
                                  label={warm}
                                  value={this.state.updateEvaluate?.warm}
                                />
                                <FatiqueQuestion
                                  updateEntryState1={(e) =>
                                    this.updateEntryState1(e, 'size_progress')
                                  }
                                  label={size_progress}
                                  value={
                                    this.state.updateEvaluate?.size_progress
                                  }
                                />
                                <FatiqueQuestion
                                  updateEntryState1={(e) =>
                                    this.updateEntryState1(e, 'itch')
                                  }
                                  label={itch}
                                  value={this.state.updateEvaluate?.itch}
                                />
                                <FatiqueQuestion
                                  updateEntryState1={(e) =>
                                    this.updateEntryState1(e, 'pain')
                                  }
                                  label={pain}
                                  value={this.state.updateEvaluate?.pain}
                                />
                                <Grid className="setDividerPic-eval">
                                  <label>{pain_level}</label>
                                  <PainIntensity
                                    name="pain_intensity"
                                    onChange={(e) => this.updateEntryState2(e)}
                                    value={Math.round(
                                      this.state.updateEvaluate?.pain_intensity
                                    )}
                                    comesFrom="Evalute"
                                  />
                                </Grid>
                                <Grid className="textFieldArea1">
                                  <label>{fever_body_temp}</label>
                                  <input
                                    type="number"
                                    placeholder="97"
                                    name="body_temp"
                                    onChange={(e) => this.updateEntryState2(e)}
                                    className={
                                      this.state.forError ? 'setRedColor' : ''
                                    }
                                    value={this.state.updateEvaluate?.body_temp}
                                  ></input>
                                </Grid>
                                <Grid className="textFieldArea1">
                                  <label>{sun_before_how_long} </label>
                                  <input
                                    type="number"
                                    placeholder="0"
                                    name="sun_before"
                                    onChange={(e) => this.updateEntryState2(e)}
                                    value={
                                      this.state.updateEvaluate?.sun_before
                                    }
                                  ></input>
                                </Grid>
                                <Grid className="textFieldArea1">
                                  <label>{how_cold_long}</label>
                                  <input
                                    type="number"
                                    placeholder="0"
                                    name="cold"
                                    onChange={(e) => this.updateEntryState2(e)}
                                    value={this.state.updateEvaluate?.cold}
                                  ></input>
                                </Grid>
                                <Grid className="fillDiaAll">
                                  <label>{sexual_activities}</label>
                                  <NotesEditor
                                    name="sexual_active"
                                    onChange={(e) =>
                                      this.updateEntryState1(e, 'sexual_active')
                                    }
                                    value={
                                      this.state.updateEvaluate.sexual_active
                                    }
                                  />
                                </Grid>
                                <Grid className="infoShwSave3">
                                  <input
                                    type="submit"
                                    value={submit}
                                    onClick={() => handleEvalSubmit(0, this)}
                                  ></input>
                                </Grid>
                              </Grid>
                              {/* </Grid> */}
                            </Grid>
                          )}
                        </Grid>
                      )}
                      {this.state.updateEvaluate?.is_payment === false && (
                        <Elements stripe={stripePromise}>
                          <Payment
                            redirectTolist={() => {
                              this.redirectTolist();
                            }}
                            languageType={this.props.stateLanguageType}
                            show1={this.state.show1}
                            show2={this.state.show2}
                            CancelClick={this.CancelClick}
                          />
                        </Elements>
                      )}
                    </Grid>
                  </Grid>

                  {/* <Grid className="stripePromiseClss"> */}

                  {/* </Grid> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
    state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;
  const { verifyCode } = state.authy;
  const { metadata } = state.OptionList;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    metadata,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
    OptionList,
  })(Index)
);
