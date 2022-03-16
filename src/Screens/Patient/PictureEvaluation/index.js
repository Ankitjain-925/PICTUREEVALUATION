import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Modal from '@material-ui/core/Modal';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from 'react-select';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import ReactTooltip from "react-tooltip";
import sitedata, { data } from 'sitedata';
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

const STRIPE_PUBLISHABLE = getPublishableKey()
const stripePromise = loadStripe(STRIPE_PUBLISHABLE);

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
            Housesoptions: {}
        };
    }


    componentDidMount() {
        var npmCountry = npmCountryList().getData();
        this.setState({ selectCountry: npmCountry });
        this.getallGroups();
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

    // For upload images
    FileAttachMulti = (Fileadd) => {
        this.setState({
            isfileuploadmulti: true,
            fileattach: Fileadd,
            fileupods: true,
        });
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


    //For validate the character length is correct or not
    validateChar = (event, value) => {
        var a = event && event?.length
        if (value === "allergies" || value === "family_history" || value === "treatment_so_far" || value === "medical_precondition" || value === "premedication") {
            if (a > 11) {
                return false
            } else {
                this.setState({ errorChrMsg: '' })
                return true
            }
        }
        else {
            if (a > 20) {
                return false
            } else {
                this.setState({ errorChrMsg: '' })
                return true
            }
        }
    }

    //For validate the blood pressure is correct or not
    validateBp = (elementValue) => {
        var bpPattern = /^[0-9]+$/;
        return bpPattern.test(elementValue);
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

    // Submit form data
    handleEvalSubmit = (value) => {
        this.setState({ errorChrMsg: '' })
        let data = {};
        data = this.state.updateEvaluate;
        if (value == 1) {
            if (this.validateBp(data.rr_systolic)) {
                if (this.validateBp(data.rr_diastolic)) {

                    if (this.validateChar(data.allergies, "allergies")) {

                        if (this.validateChar(data.family_history, "family_history")) {

                            if (this.validateChar(data.treatment_so_far, "treatment_so_far")) {

                                if (this.validateChar(data.race, "race")) {

                                    if (this.validateChar(data.history_month, "history_month")) {

                                        if (this.validateChar(data.medical_precondition, "medical_precondition")) {

                                            if (this.validateChar(data.premedication, "premedication")) {
                                                console.log("this.state.updateEvaluate", data)
                                                this.setState({ mod1Open: true, picEval: true })
                                            } else {
                                                this.setState({ errorChrMsg: "Max Words limit exceeds in Premedication" })
                                            }
                                        } else {
                                            this.setState({ errorChrMsg: "Max Words limit exceeds in Medical precondition" })
                                        }
                                    } else {
                                        this.setState({ errorChrMsg: "Max Words limit exceeds in History month" })
                                    }
                                } else {
                                    this.setState({ errorChrMsg: "Max Words limit exceeds in Race" })
                                }
                            } else {
                                this.setState({ errorChrMsg: "Max Words limit exceeds in Treatment so far" })
                            }
                        } else {
                            this.setState({ errorChrMsg: "Max Words limit exceeds in family history" })
                        }
                    } else {
                        this.setState({ errorChrMsg: "Max Words limit exceeds in allergies" })
                    }
                } else {
                    this.setState({ errorChrMsg: "Diastolic bp should be in number" })
                }
            } else {
                this.setState({ errorChrMsg: "Systolic bp should be in number" })
            }
        } else {
            data.fileattach = this.state.fileattach
            console.log("this.state.updateEvaluate", data)
            this.setState({ mod1Open: false })
        }
    }

    getallGroups = () => {
        this.setState({ loaderImage: true });
        axios
            .get(
                sitedata.data.path +
                `/admin/GetHintinstitute`,
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((responce) => {
                if (responce.data.hassuccessed && responce.data.data) {
                    var Housesoptions = [];
                    responce.data.data.map((data) => {
                        if (data?.institute_groups && data?.institute_groups?.length > 0) {
                            data.institute_groups.map((data1) => {
                                data1.houses.map((data2) => {
                                    Housesoptions.push({
                                        group_name: data2.house_name,
                                        label: data2.house_name,
                                        value: data2._id
                                    })
                                })
                            })
                        }
                    })
                    this.setState({ Housesoptions: Housesoptions });
                }
                this.setState({ loaderImage: false });
            });
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
                                                                        value={this.state.updateEvaluate?.date ?
                                                                            new Date(this.state.updateEvaluate?.date) :
                                                                            new Date()
                                                                        }
                                                                        onChange={(e) => this.updateEntryState1(e, "date")}
                                                                        date_format="DD/MM/YYYY"
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

                                                                <Grid className="fatiqueQues fatiqueQuess1">
                                                                    <FatiqueQuestion updateEntryState1={(e) => this.updateEntryState1(e, 'diabetes')} label="Diabetes" value={this.state.updateEvaluate?.diabetes} />
                                                                    <FatiqueQuestion updateEntryState1={(e) => this.updateEntryState1(e, 'smoking_status')} label="Smoking Status" value={this.state.updateEvaluate?.smoking_status} />
                                                                </Grid>
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
                                                                                value={this.state.updateEvaluate?.residence}
                                                                                onChange={(e) => this.updateEntryState1(e, "residence")}
                                                                                options={this.state.selectCountry}
                                                                                placeholder=""
                                                                                isSearchable={true}
                                                                                name="residence"
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
                                                                        onClick={() => this.handleEvalSubmit(1)}
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
                                                                    fileUpload={this.FileAttachMulti}
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
                                                                        value={this.state.updateEvaluate?.date ?
                                                                            new Date(this.state.updateEvaluate?.date) :
                                                                            new Date()
                                                                        }
                                                                        onChange={(e) => this.updateEntryState1(e, "date")}
                                                                        date_format="DD/MM/YYYY"
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
                                                                        onClick={() => {
                                                                            this.setState({ show2: true, show1: false })
                                                                        }}
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