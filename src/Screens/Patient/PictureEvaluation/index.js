import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import sitedata from 'sitedata';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authy } from 'Screens/Login/authy.js';
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import LeftMenu from 'Screens/Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/PatientLeftMenu/mobile';
import { LanguageFetchReducer } from 'Screens/actions';
import Loader from 'Screens/Components/Loader/index';
import { Redirect, Route } from 'react-router-dom';
import { getLanguage } from "translations/index"
import { commonHeader } from 'component/CommonHeader/index';
import PainIntensity from "Screens/Components/PainIntansity/index";
import NotesEditor from "../../Components/Editor/index";
import FatiqueQuestion from "../../Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions";
import DateFormat from "Screens/Components/DateFormat/index";
import MMHG from "Screens/Components/mmHgField/index";
import npmCountryList from "react-select-country-list";
import FileUploader from "Screens/Components/JournalFileUploader/index";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { getPublishableKey } from "Screens/Components/CardInput/getPriceId"
import HomePage from 'Screens/Components/CardInput/PayforSubscription';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { GetShowLabel1 } from "Screens/Components/GetMetaData/index.js";
import SelectByTwo from "Screens/Components/SelectbyTwo/index";
import SelectField from "Screens/Components/Select/index";
import { handleEvalSubmit, FileAttachMulti, getallGroups} from "./api"

const STRIPE_PUBLISHABLE = getPublishableKey()
const stripePromise = loadStripe(STRIPE_PUBLISHABLE);

const options = [{ label: "POSTPRANDIAL", value: "stress" },
{ label: "EMPTY STOMACH", value: "relaxed" }];

const options1 = [{ label: "Chews tobacco", value: "Chews_tobacco" },
{ label: "Cigar smoker", value: "Cigar_smoker" },
{ label: "Former smoker", value: "Former_smoker" },
{ label: "Never smoked", value: "Never_smoked" },
{ label: "Passive smoker", value: "Passive_smoker" },
{ label: "Smoker, current status unknown", value: "unknown" },
{ label: "Smoking daily", value: "Smoking_daily" },
{ label: "Snuff user", value: "Snuff_user" },
{ label: "Unknown if ever smoked", value: "Unknown_if_ever_smoked" }];

function TabContainer(props) {
    return (
        <Typography component="div" className="tabsCntnts">
            {props.children}
        </Typography>
    );
}
TabContainer.propTypes = { children: PropTypes.node.isRequired, };
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
            options: options,
            options1: options1
        };
    }

    componentDidMount() {
        var npmCountry = npmCountryList().getData();
        this.setState({ selectCountry: npmCountry });
        getallGroups(this);
    }

    CancelClick = () => {
        this.setState({ show1: false, show2: false })
    }

    // Open picture evluation form
    handlePicEval = () => {
        this.setState({ addEval: true });
    }

    // Close picture evluation form
    handleClosePicEval = () => {
        this.setState({ addEval: false });
    }

    //Other API with no payment setting for Activate services
    onToken = (description, subscription) => {
        this.setState({ loaderImage: true, activated: false, deactivated: false });
        const user_token = this.props.stateLoginValueAim.token;
        var payment_info = subscription;
        var sb = subscription?.created ? subscription?.created : new Date();
        var subscription_info = {
            subscribed_on: new Date(sb),
            subscribed_from: 'web',
        }
        // axios
        //   .put(
        //     sitedata.data.path + "/UserProfile/Bookservice",
        //     {
        //       description,
        //       payment_info,
        //       subscription_info,
        //     },
        //     commonHeader(user_token)
        //   )
        //   .then(this.successPayment)
        //   .catch(this.errorPayment);
    };

    //Not need yet this for the payment
    fromDollarToCent = (amount) => {
        return parseInt(amount * 100);
    };
    fromEuroToCent = (amount) => {
        return parseInt(amount * 100);
    };
    successPayment = (data) => {
        this.setState({ activated: true, show1: false, show2: false });
        setTimeout(() => {
            this.setState({ activated: false });
        }, 5000);
        this.getUserData();
    };

    //If error comes from the API
    errorPayment = (data) => {
        this.setState({ error3: true, show1: false, show2: false });
        setTimeout(() => {
            this.setState({ error3: false });
        }, 5000);
        this.getUserData();
    };

    updateEntryState2 = (event) => {
        var state = this.state.updateEvaluate;
        state[event.target.name] = event.target.value;
        this.setState({ updateEvaluate: state });
    };

    updateEntryState1 = (value, name) => {
        var state = this.state.updateEvaluate;
        state[name] = value;
        this.setState({ updateEvaluate: state });
    };

    render() {
        const { value } = this.state;
        const { stateLoginValueAim } = this.props;
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'patient' || !this.props.verifyCode || !this.props.verifyCode.code) {
            return (<Redirect to={'/'} />);
        }
        let translate = getLanguage(this.props.stateLanguageType)
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
        } = translate;
        return (
            <Grid   className={
                this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode &&
                this.props.settings.setting.mode === "dark"
                  ? "homeBg darkTheme homeBgDrk"
                  : "homeBg"
              } >
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
                                            <Grid item xs={12} md={6}><label>{"Picture Evaluation"}</label></Grid>
                                            {/* <Grid item xs={12} md={6} className="docsOpinRght">
                                                <a onClick={this.handlePicEval}>+ {New} {"Picture Evaluation"}</a>
                                            </Grid> */}
                                        </Grid>
                                    </Grid>
                                        <Grid item xs={12} sm={12} md={8}>
                                            <Grid className="cnfrmDiaMain profilePkg cnfrmDiaMain1">
                                                <div className="err_message">{this.state.errorChrMsg}</div>
                                                {!this.state.show2 && (<Grid >
                                                    {!this.state.picEval === true ? (
                                                        <Grid className="cnfrmDiaMain">
                                                            <Grid className="attchForms1">
                                                                <Grid>
                                                                    <label>Age</label>
                                                                </Grid>
                                                                <Grid>
                                                                    <DateFormat
                                                                        name="date"
                                                                        value={this.state.updateEvaluate?.dob ?
                                                                            new Date(this.state.updateEvaluate?.dob) :
                                                                            new Date()
                                                                        }
                                                                        NotFutureDate={true}
                                                                        onChange={(e) => this.updateEntryState1(e, "dob")}
                                                                        date_format={this.props.settings &&
                                                                            this.props.settings.setting &&
                                                                            this.props.settings.setting.date_format}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12} md={8}>
                                                                    <Grid>
                                                                        <label>Gender</label>
                                                                    </Grid>
                                                                    <Grid className="profileInfoDate">
                                                                        <a
                                                                            onClick={() => this.updateEntryState1("male", "sex")}
                                                                            className={
                                                                                this.state.updateEvaluate.sex &&
                                                                                this.state.updateEvaluate.sex === "male" &&
                                                                                "SelectedGender"
                                                                            }
                                                                        >
                                                                            {male}
                                                                        </a>
                                                                        <a
                                                                            onClick={() => this.updateEntryState1("female", "sex")}
                                                                            className={
                                                                                this.state.updateEvaluate.sex &&
                                                                                this.state.updateEvaluate.sex === "female" &&
                                                                                "SelectedGender"
                                                                            }
                                                                        >
                                                                            {female}
                                                                        </a>
                                                                        <a
                                                                            onClick={() => this.updateEntryState1("other", "sex")}
                                                                            className={
                                                                                this.state.updateEvaluate.sex &&
                                                                                this.state.updateEvaluate.sex === "other" &&
                                                                                "SelectedGender"
                                                                            }
                                                                        >
                                                                            {" "}
                                                                            {other}
                                                                        </a>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="bloodpreLb">
                                                                    <label>Blood Pressure</label>
                                                                </Grid>
                                                                <Grid className="fillDia">
                                                                    <MMHG
                                                                        name="rr_systolic"
                                                                        Unit="mmHg"
                                                                        label={rr_systolic}
                                                                        onChange={(e) => this.updateEntryState2(e)}
                                                                        value={this.state.updateEvaluate?.rr_systolic}
                                                                    />
                                                                </Grid>
                                                                <Grid className="fillDia">
                                                                    <MMHG
                                                                        name="rr_diastolic"
                                                                        Unit="mmHg"
                                                                        label={RR_diastolic}
                                                                        onChange={(e) => this.updateEntryState2(e)}
                                                                        value={this.state.updateEvaluate?.rr_diastolic}
                                                                    />
                                                                </Grid>
                                                                <Grid className="bloodpreLb">
                                                                    <label>Diabetes</label>
                                                                </Grid>
                                                                <Grid className="fillDia">
                                                                    <MMHG
                                                                        name="blood_sugar"
                                                                        Unit="mg/dl"
                                                                        label="Blood Sugar"
                                                                        onChange={(e) => this.updateEntryState2(e)}
                                                                        value={this.state.updateEvaluate?.blood_sugar}
                                                                    />
                                                                </Grid>
                                                                <Grid className="fillDia">
                                                                    <MMHG
                                                                        name="Hba1c"
                                                                        Unit="%"
                                                                        label={Hba1c}
                                                                        onChange={(e) => this.updateEntryState2(e)}
                                                                        value={this.state.updateEvaluate?.Hba1c}
                                                                    />
                                                                </Grid>
                                                                {/* <Grid className="fillDia">
                                                                    <Grid className="rrSysto">
                                                                        <Grid>
                                                                            <label>{date_measure}</label>
                                                                        </Grid>
                                                                        <DateFormat
                                                                            name="date_measured"
                                                                            value={
                                                                                this.state.updateEvaluate?.date_measured
                                                                                    ? new Date(this.state.updateEvaluate?.date_measured)
                                                                                    : new Date()
                                                                            }
                                                                            date_format={this.props.settings &&
                                                                                this.props.settings.setting &&
                                                                                this.props.settings.setting.date_format}
                                                                            onChange={(e) => this.updateEntryState2(e, "date_measured")}
                                                                        />
                                                                    </Grid> 
                                                                </Grid>*/}
                                                                {/* <Grid className="fillDia">
                                                                    <Grid className="rrSysto">
                                                                        <Grid>
                                                                            <label>{time_measure}</label>
                                                                        </Grid>
                                                                        <TimeFormat
                                                                            name="time_measured"
                                                                            value={
                                                                                this.state.updateEvaluate?.time_measured
                                                                                    ? new Date(this.state.updateEvaluate?.time_measured)
                                                                                    : new Date()
                                                                            }
                                                                            time_format={this.props.settings &&
                                                                                this.props.settings.setting &&
                                                                                this.props.settings.setting.time_format}
                                                                            onChange={(e) => this.updateEntryState1(e, "time_measured")}
                                                                        />
                                                                    </Grid>
                                                                </Grid> */}
                                                                <Grid className="fillDia">
                                                                    <SelectByTwo
                                                                        name="situation"
                                                                        label={situation}
                                                                        options={this.state.options}
                                                                        onChange={(e) => this.updateEntryState1(e, "situation")}
                                                                        value={GetShowLabel1(
                                                                            this.state.options,
                                                                            this.state.updateEvaluate &&
                                                                            this.state.updateEvaluate?.situation &&
                                                                            this.state.updateEvaluate?.situation?.value,
                                                                            this.props.stateLanguageType
                                                                        )}
                                                                    />
                                                                </Grid>

                                                                <Grid className="bloodpreLb">
                                                                    <label>{smoking_status}</label>
                                                                </Grid>
                                                                <Grid className="fillDia">
                                                                    <SelectField
                                                                        isSearchable={true}
                                                                        name="select_status"
                                                                        label="Select Status"
                                                                        option={this.state.options1}
                                                                        onChange={(e) => this.updateEntryState1(e, "smoking_status")}
                                                                        value={GetShowLabel1(
                                                                            this.state.options1,
                                                                            this.state.updateEvaluate &&
                                                                            this.state.updateEvaluate?.smoking_status &&
                                                                            this.state.updateEvaluate?.smoking_status?.value,
                                                                            this.props.stateLanguageType,
                                                                            false,
                                                                            "anamnesis"
                                                                        )}
                                                                    />
                                                                </Grid>
                                                                {(!this.state.updateEvaluate?.smoking_status ||
                                                                    (this.state.updateEvaluate?.smoking_status &&
                                                                        this.state.updateEvaluate?.smoking_status?.value !==
                                                                        "Never_smoked")) && (
                                                                        <div>
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
                                                                                            this.state.updateEvaluate?.from_when
                                                                                                ? new Date(this.state.updateEvaluate?.from_when)
                                                                                                : new Date()
                                                                                        }
                                                                                        NotFutureDate={true}
                                                                                        date_format={this.props.settings &&
                                                                                            this.props.settings.setting &&
                                                                                            this.props.settings.setting.date_format}
                                                                                        onChange={(e) => this.updateEntryState1(e, "from_when")}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid className="rrSysto">
                                                                                    <Grid>
                                                                                        <label>
                                                                                            {until} {when}
                                                                                        </label>
                                                                                    </Grid>
                                                                                    <DateFormat
                                                                                        name="until_when"
                                                                                        value={
                                                                                            this.state.updateEvaluate?.until_when
                                                                                                ? new Date(this.state.updateEvaluate?.until_when)
                                                                                                : new Date()
                                                                                        }
                                                                                        date_format={this.props.settings &&
                                                                                            this.props.settings.setting &&
                                                                                            this.props.settings.setting.date_format}
                                                                                        onChange={(e) => this.updateEntryState1(e, "until_when")}
                                                                                    />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </div>
                                                                    )}

                                                                <Grid className="fillDiaAll">
                                                                    <label>Allergies</label>
                                                                    <NotesEditor
                                                                        name="allergies"
                                                                        onChange={(e) => this.updateEntryState1(e, "allergies")}
                                                                        value={this.state.updateEvaluate?.allergies}
                                                                    />
                                                                </Grid>
                                                                <Grid className="fillDiaAll">
                                                                    <label>Family History</label>
                                                                    <NotesEditor
                                                                        name="family_history"
                                                                        onChange={(e) => this.updateEntryState1(e, "family_history")}
                                                                        value={this.state.updateEvaluate?.family_history}
                                                                    />
                                                                </Grid>
                                                                <Grid className="fillDiaAll">
                                                                    <label>Treatment so far</label>
                                                                    <NotesEditor
                                                                        name="treatment_so_far"
                                                                        onChange={(e) => this.updateEntryState1(e, "treatment_so_far")}
                                                                        value={this.state.updateEvaluate?.treatment_so_far}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={12} md={12}>
                                                                    <label>Place of Birth</label>
                                                                    <Grid className="cntryDropTop">
                                                                        <Select
                                                                            value={this.state.updateEvaluate?.country}
                                                                            onChange={(e) => this.updateEntryState1(e, "country")}
                                                                            options={this.state.selectCountry}
                                                                            placeholder=""
                                                                            isSearchable={true}
                                                                            name="country"
                                                                            className="cntryDrop"
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={12} md={12} >
                                                                    <Grid className="fillDiaSection">
                                                                        <label>Place of residence</label>
                                                                        <Grid className="cntryDropTop">
                                                                            <Select
                                                                                value={this.state.updateEvaluate?.residenceCountry}
                                                                                onChange={(e) => this.updateEntryState1(e, "residenceCountry")}
                                                                                options={this.state.selectCountry}
                                                                                placeholder=""
                                                                                isSearchable={true}
                                                                                name="residenceCountry"
                                                                                className="cntryDrop"
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="fillDiaAll fillDiaSection">
                                                                    <label>Phenotyp / Race</label>
                                                                    <NotesEditor
                                                                        name="race"
                                                                        onChange={(e) => this.updateEntryState1(e, "race")}
                                                                        value={this.state.updateEvaluate?.race}
                                                                    />
                                                                </Grid>
                                                                <Grid className="fillDiaAll">
                                                                    <label>Travel history last 6 month</label>
                                                                    <NotesEditor
                                                                        name="history_month"
                                                                        onChange={(e) => this.updateEntryState1(e, "history_month")}
                                                                        value={this.state.updateEvaluate?.history_month}
                                                                    />
                                                                </Grid>
                                                                <Grid className="fillDiaAll">
                                                                    <label>Medical preconditions and prediagnosis</label>
                                                                    <NotesEditor
                                                                        name="medical_precondition"
                                                                        onChange={(e) => this.updateEntryState1(e, "medical_precondition")}
                                                                        value={this.state.updateEvaluate?.medical_precondition}
                                                                    />
                                                                </Grid>
                                                                <Grid className="fillDiaAll">
                                                                    <label>Premedication</label>
                                                                    <NotesEditor
                                                                        name="premedication"
                                                                        onChange={(e) => this.updateEntryState1(e, "premedication")}
                                                                        value={this.state.updateEvaluate?.premedication}
                                                                    />
                                                                </Grid>


                                                                <Grid className="infoShwSave3">
                                                                    <input
                                                                        type="submit"
                                                                        value="Submit"
                                                                        onClick={() => handleEvalSubmit(1, this)}
                                                                    >
                                                                    </input>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    ) : (

                                                        <Grid className="attchForms1">
                                                            <Grid>
                                                                <label>Image Evaluation</label>
                                                            </Grid>
                                                            <Grid>
                                                                <FileUploader
                                                                    // cur_one={this.props.cur_one}
                                                                    attachfile={
                                                                        this.state.updateEvaluate && this.state.updateEvaluate?.attachfile
                                                                            ? this.state.updateEvaluate?.attachfile
                                                                            : []
                                                                    }
                                                                    name="UploadTrackImageMulti"
                                                                    comesFrom="journal"
                                                                    isMulti={true}
                                                                    fileUpload={(data)=>FileAttachMulti(data, this)}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} md={12}>
                                                                <label>Hospital</label>
                                                                <Grid className="cntryDropTop">

                                                                    <Select
                                                                        value={this.state.updateEvaluate?.hospital}
                                                                        onChange={(e) => this.updateEntryState1(e, "hospital")}
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
                                                                    <label>When did it start?</label>
                                                                    <DateFormat
                                                                        name="date"
                                                                        value={this.state.updateEvaluate?.start_date ?
                                                                            new Date(this.state.updateEvaluate?.start_date) :
                                                                            new Date()
                                                                        }
                                                                        onChange={(e) => this.updateEntryState1(e, "start_date")}
                                                                        date_format={this.props.settings &&
                                                                            this.props.settings.setting &&
                                                                            this.props.settings.setting.date_format}
                                                                            
                                                                    />
                                                                </Grid>
                                                                <FatiqueQuestion updateEntryState1={(e) => this.updateEntryState1(e, 'warm')} label="Warm?" value={this.state.updateEvaluate?.warm} />
                                                                <FatiqueQuestion updateEntryState1={(e) => this.updateEntryState1(e, 'size_progress')} label="Size progress? " value={this.state.updateEvaluate?.size_progress} />
                                                                <FatiqueQuestion updateEntryState1={(e) => this.updateEntryState1(e, 'itch')} label="Itch?" value={this.state.updateEvaluate?.itch} />
                                                                <FatiqueQuestion updateEntryState1={(e) => this.updateEntryState1(e, 'pain')} label="Pain?" value={this.state.updateEvaluate?.pain} />
                                                                <Grid>
                                                                    <label>Pain level?</label>
                                                                    <PainIntensity
                                                                        name="pain_intensity"
                                                                        onChange={(e) => this.updateEntryState2(e)}
                                                                        value={Math.round(this.state.updateEvaluate?.pain_intensity)}
                                                                        comesFrom="Evalute"
                                                                    />
                                                                </Grid>
                                                                <Grid className="textFieldArea1">
                                                                    <label>If you have Fever what is your Body Temp?</label>
                                                                    <input type="number"
                                                                        placeholder="35"
                                                                        name="body_temp"
                                                                        min="35" max="42"
                                                                        onChange={(e) => this.updateEntryState2(e)}
                                                                        className={this.state.forError ? "setRedColor" : ""}
                                                                    >
                                                                    </input>
                                                                </Grid>
                                                                <Grid className="textFieldArea1">
                                                                    <label>Have you been in the sun before, How long </label>
                                                                    <input type="number"
                                                                        placeholder="0"
                                                                        name="sun_before"
                                                                        onChange={(e) => this.updateEntryState2(e)}
                                                                    >
                                                                    </input>
                                                                </Grid>
                                                                <Grid className="textFieldArea1">
                                                                    <label>Have you been in the Cold (lower then -5C), how long?</label>
                                                                    <input type="number"
                                                                        placeholder="0"
                                                                        name="cold"
                                                                        onChange={(e) => this.updateEntryState2(e)}
                                                                    >
                                                                    </input>
                                                                </Grid>
                                                                <Grid className="fillDiaAll">
                                                                    <label>Did you had Sexual Activities before?</label>
                                                                    <NotesEditor
                                                                        name="sexual_active"
                                                                        onChange={(e) => this.updateEntryState1(e, "sexual_active")}
                                                                        value={this.state.updateEvaluate.sexual_active}
                                                                    />
                                                                </Grid>
                                                                <Grid className="infoShwSave3">
                                                                    <input
                                                                        type="submit"
                                                                        value="Submit"
                                                                        onClick={() =>
                                                                            handleEvalSubmit(0, this)}
                                                                    >
                                                                    </input>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    )}
                                                </Grid>)}
                                                <Elements stripe={stripePromise}>
                                                    <HomePage languageType={this.props.stateLanguageType} show1={this.state.show1} show2={this.state.show2} CancelClick={this.CancelClick} onToken={this.onToken} />
                                                </Elements>
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
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    const { verifyCode } = state.authy;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        verifyCode,
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, authy })(Index));