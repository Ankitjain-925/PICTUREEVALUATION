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
import Checkbox from "@material-ui/core/Checkbox";
import Loader from 'Screens/Components/Loader/index';
import { Redirect, Route } from 'react-router-dom';
import { getLanguage } from 'translations/index';
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
import $ from "jquery"
import StripeCheckout from "react-stripe-checkout";
import { GetLanguageDropdown } from 'Screens/Components/GetMetaData/index.js';
const CURRENCY = 'EUR';
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
    this.StripeClick = React.createRef();
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
      error_section: 0,
      bp_avail: false,
      diab_avail: false
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

  componentDidUpdate = (prevProps, prevState)=>{
      if(prevProps.stateLanguageType !== this.props.stateLanguageType){
        this.GetLanguageMetadata();
      }
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
  fromEuroToCent = (amount) => {
    return parseInt(amount * 100);
  };

  updateEntryState2 = (event) => {
    var state = this.state.updateEvaluate;
    state[event.target.name] = event.target.value;
    this.setState({ updateEvaluate: state });
  };

  updateEntryState1 = (value, name) => {
    var state = this.state.updateEvaluate;
    if (name == 'house_id') {
      state[name] = value.value;
    } else {
      state[name] = value;
    }
    this.setState({ updateEvaluate: state });
  };

  onClosed = () => {
    $("body").css("overflow", "auto");
  }

  
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
      cancel,
      itch,
      pain,
      size_progress,
      warm,
      fever_body_temp,
      sun_before_how_long,
      how_cold_long,
      sexual_activities,
      select_status,
      pay_with_stripe,
      Payment,
      Submit,
    } = translate;
    //Success payment alert after payment is success

      //Success payment alert after payment is success
      const successPayment = (data) => {
        let translate = getLanguage(this.props.stateLanguageType)
        const { paymnt_processed, ok,} = translate;
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div
                className={
                 this.props.settings &&
                   this.props.settings.setting &&
                   this.props.settings.setting.mode === "dark"
                    ? "dark-confirm react-confirm-alert-body"
                    : "react-confirm-alert-body"
                }
              >
                {console.log('dsfsdfsdfsdf', data)}
                <h1>{paymnt_processed}</h1>
                <div className="react-confirm-alert-button-group">
                  <button
                    onClick={() => {
                      onClose();
                      saveOnDB(data, this)  
                    }}
                  >
                    {ok}
                  </button>
                </div>
              </div>
            );
          },
        });
      };
  
      //Alert of the Error payment
      const errorPayment = (data) => {
        let translate = getLanguage(this.props.stateLanguageType)
        let { ok,  paymnt_err,} = translate;
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div
                className={
                 this.props.setting &&
                   this.props.setting.setting &&
                   this.props.setting.setting.mode === "dark"
                    ? "dark-confirm react-confirm-alert-body"
                    : "react-confirm-alert-body"
                }
              >
                <h1>{paymnt_err}</h1>
                <div className="react-confirm-alert-button-group">
                  <button
                    onClick={() => {
                      onClose();
                    }}
                  >
                    {ok}
                  </button>
                </div>
              </div>
            );
          },
        });
      }

    const Checkout = ({
      name = "AIS",
      description = "Stripe Payment",
      amount = 25,
      email = this.props.stateLoginValueAim.user.email,
    }) => (
      <StripeCheckout
        ref={(ref) => {
          this.StripeClick = ref;
        }}
        name={name}
        image="https://sys.aimedis.io/static/media/LogoPNG.03ac2d92.png"
        description={description}
        amount={this.fromEuroToCent(amount)}
        token={onToken}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
        label={pay_with_stripe}
        className="CutomStripeButton"
        email = {email}
        closed={this.onClosed}
      />
    );

    //For payment
    const onToken = (token) =>
    axios
      .post(sitedata.data.path + "/lms_stripeCheckout/intent-pop", {
        source: token.id,
        currency: CURRENCY,
        amount: this.fromEuroToCent(25),
      })
      .then(successPayment, this.setState({ addtocart: [] }))
      .catch(errorPayment);

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
                    <Grid className={this.state.show2 ? "cnfrmDiaMain1 setPaymentBack" : "cnfrmDiaMain profilePkg cnfrmDiaMain1"}>
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
                                    // date_format={
                                    //   this.props.settings &&
                                    //   this.props.settings.setting &&
                                    //   this.props.settings.setting.date_format
                                    // }
                                    NotFutureDate={true}
                                  />
                                  {this.state.error_section == 1 && <div className="err_message2">
                                    {this.state.errorChrMsg}
                                  </div>}
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
                                    {this.state.error_section == 2 && <div className="err_message2">
                                    {this.state.errorChrMsg}
                                  </div>}
                                  </Grid>
                                </Grid>
                                <Grid className="bloodpreLb">
                                  <label>{blood_pressure}</label>
                                  <Checkbox
                                    value="checkedB"
                                    color="#00ABAF"
                                    checked={this.state.bp_avail === true && this.state.bp_avail}
                                    onChange={(e) => {
                                      this.setState({ bp_avail: e.target.checked});
                                    }}
                                    className="PIC_Condition"
                                  />
                                </Grid>
                                {this.state.bp_avail === true && (
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
                                       {this.state.error_section == 3 && <div className="err_message2">
                                    {this.state.errorChrMsg}
                                  </div>}
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
                                      {this.state.error_section == 4 && <div className="err_message2">
                                        {this.state.errorChrMsg}
                                    </div>}
                                    </Grid>
                                  </Grid>
                                </Grid>)}
                                <Grid className="bloodpreLb">
                                  <label>{diabetes}</label>
                                  <Checkbox
                                    value="checkedB"
                                    color="#00ABAF"
                                    checked={this.state.diab_avail === true && this.state.diab_avail}
                                    onChange={(e) => {
                                      this.setState({ diab_avail: e.target.checked});
                                    }}
                                    className="PIC_Condition"
                                  />
                                </Grid>
                                {this.state.diab_avail === true && (<>
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
                                      {this.state.error_section == 5 && <div className="err_message2">
                                        {this.state.errorChrMsg}
                                    </div>}
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
                                      {this.state.error_section == 6 && <div className="err_message2">
                                        {this.state.errorChrMsg}
                                    </div>}
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
                                      this.state.Allsituation,
                                      this.state.updateEvaluate &&
                                        this.state.updateEvaluate.situation &&
                                        this.state.updateEvaluate.situation
                                          .value,
                                      this.props.stateLanguageType
                                    )}
                                  />
                                  {this.state.error_section == 7 && <div className="err_message2">
                                        {this.state.errorChrMsg}
                                    </div>}
                                </Grid>
                                </>)}

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
                                      {this.state.error_section == 8 && <div className="err_message2">
                                        {this.state.errorChrMsg}
                                    </div>}
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
                                            NotFutureDate={true}
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
                                            NotFutureDate={true}
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
                                  {this.state.error_section == 9 && <div className="err_message2">
                                        {this.state.errorChrMsg}
                                    </div>}
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
                                  {this.state.error_section == 10 && <div className="err_message2">
                                        {this.state.errorChrMsg}
                                    </div>}
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
                                  {this.state.error_section == 11 && <div className="err_message2">
                                        {this.state.errorChrMsg}
                                    </div>}
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
                                      {this.state.error_section == 12 && <div className="err_message2">
                                        {this.state.errorChrMsg}
                                    </div>}
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
                                        {this.state.error_section == 13 && <div className="err_message2">
                                        {this.state.errorChrMsg}
                                    </div>}
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
                                  {this.state.error_section == 14 && <div className="err_message2">
                                        {this.state.errorChrMsg}
                                    </div>}
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
                                  {this.state.error_section == 15 && <div className="err_message2">
                                        {this.state.errorChrMsg}
                                    </div>}
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
                                  {this.state.error_section == 16 && <div className="err_message2">
                                        {this.state.errorChrMsg}
                                    </div>}
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
                                  {this.state.error_section == 17 && <div className="err_message2">
                                        {this.state.errorChrMsg}
                                    </div>}
                                </Grid>

                                <Grid className="infoShwSave3">
                                  <input
                                    type="submit"
                                    value={Submit}
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
                                  cur_one={this.props.stateLoginValueAim?.user}
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
                                 {this.state.error_section == 18 && <div className="err_message2">
                                        {this.state.errorChrMsg}
                                    </div>}
                              </Grid>
                              {/* <Grid item xs={12} md={12}>
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
                              </Grid> */}

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
                                    NotFutureDate={true}
                                  />
                                   {this.state.error_section == 19 && <div className="err_message2">
                                        {this.state.errorChrMsg}
                                    </div>}
                                </Grid>
                                <Grid>
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
                                 {this.state.error_section == 20 && <div className="err_message2">
                                        {this.state.errorChrMsg}
                                    </div>}
                                </Grid>
                                <Grid className="setDividerPic-eval">
                                  <label>{pain_level}</label>
                                  <PainIntensity
                                    name="pain_intensity"
                                    onChange={(e) => this.updateEntryState2(e)}
                                    value={Math.round(
                                      this.state.updateEvaluate?.pain_intensity
                                    )}
                                    comesFrom="Evalute"
                                    setting= {this.props.settings}
                                  />
                                  {this.state.error_section == 21 && <div className="err_message2">
                                        {this.state.errorChrMsg}
                                    </div>}
                                </Grid>
                                <Grid className="textFieldArea1">
                                  <label>{fever_body_temp}</label>
                                  <input
                                    type="number"
                                    placeholder="36.6"
                                    name="body_temp"
                                    onChange={(e) => this.updateEntryState2(e)}
                                    className={
                                      this.state.forError ? 'setRedColor' : ''
                                    }
                                    value={this.state.updateEvaluate?.body_temp}
                                  ></input>
                                    {this.state.error_section == 22 && <div className="err_message2">
                                      {this.state.errorChrMsg}
                                    </div>}
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
                                   {this.state.error_section == 23 && <div className="err_message2">
                                        {this.state.errorChrMsg}
                                    </div>}
                                </Grid>
                                <Grid className="infoShwSave3">
                                  <input
                                    type="submit"
                                    value={Submit}
                                    onClick={() => handleEvalSubmit(0, this)}
                                  ></input>
                                </Grid>
                              </Grid>
                              {/* </Grid> */}
                            </Grid>
                          )}
                        </Grid>
                      )}
                    
                      {(this.state.updateEvaluate?.is_payment === false && this.state.show2) && (
                        // <Elements stripe={stripePromise}>
                        //   <Payment
                        //     redirectTolist={() => {
                        //       this.redirectTolist();
                        //     }}
                        //     languageType={this.props.stateLanguageType}
                        //     show1={this.state.show1}
                        //     show2={this.state.show2}
                        //     CancelClick={this.CancelClick}
                        //     saveOnDB={(payment)=> saveOnDB(payment, this)}
                        //     settings={this.props.settings}
                        //   />
                        // </Elements>
                        <>
                        <div className="payment_sec_extra_ser1">
                          <div className="sbu_button">
                            <h2>{Payment}</h2>
                          <Grid container direction="row" spacing={2}>
                            <Grid item xs={12} md={6}>
                              <Checkout />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <button
                                onClick={() => {
                                  this.CancelClick()
                                }}
                                className="CutomStripeButton"
                              >
                                {cancel}
                              </button>
                            </Grid>
                          </Grid>
                          </div>
                        </div>
                        </>
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
