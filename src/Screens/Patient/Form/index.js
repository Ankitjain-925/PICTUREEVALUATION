import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Settings } from "Screens/Login/setting";
import Loader from "Screens/Components/Loader/index";
import { LanguageFetchReducer } from "Screens/actions";
import { withRouter } from "react-router-dom";
import sitedata from "sitedata";
import axios from "axios";
import { getLanguage } from "translations/index"
import { connect } from "react-redux";
import { authy } from "Screens/Login/authy.js";
import { LoginReducerAim } from "Screens/Login/actions";
import LeftMenu from "Screens/Components/Menus/PatientLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/PatientLeftMenu/mobile";
import FatiqueQuestion from "../../Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions";
import DateFormat from "Screens/Components/DateFormat/index";
import Modal from '@material-ui/core/Modal';
import FileUploader from "Screens/Components/JournalFileUploader/index";
import PainIntensity from "Screens/Components/PainIntansity/index";
import NotesEditor from "../../Components/Editor/index";
import npmCountryList from "react-select-country-list";
import Select from "react-select";
import MMHG from "Screens/Components/mmHgField/index";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setValue: {},
            newEntry: false,
            updateEvaluate: {},
            fileattach: {},
            forError: {},
            mod1Open: false,
            selectCountry: [],
            errorChrMsg: ''
        };
    }

    componentDidMount() {
        var npmCountry = npmCountryList().getData();
        this.setState({ selectCountry: npmCountry });
    }

    handleOpenNewEn = () => {
        this.setState({ newEntry: true });
    }

    handleCloseNewEn = () => {
        this.setState({ newEntry: false, updateEvaluate: {} });
    }

    FileAttachMulti = (Fileadd) => {
        this.setState({
            isfileuploadmulti: true,
            fileattach: Fileadd,
            fileupods: true,
        });
    }

    validateChar = (event, value) => {
        console.log("event", event, event.length)
        if (event.length > 40) {
            this.setState({ errorChrMsg: "Max Words limit exceeds", value: value })
            return false
        } else {
            this.setState({ errorChrMsg: '' })
            return event
        }
    }

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

    handleEvalSubmit = (value) => {
        let data = {};
        data = this.state.updateEvaluate;
        if (value == 1) {
            console.log("this.state.updateEvaluate", data)
            this.setState({ mod1Open: true })
        } else {
            data.fileattach = this.state.fileattach
            console.log("this.state.updateEvaluate", data)
            this.setState({ mod1Open: false })
        }
        this.setState({ updateEvaluate: {} })
    }

    render() {
        let translate = getLanguage(this.props.stateLanguageType)
        let { attachments, rr_systolic, RR_diastolic } = translate;
        const { forError } = this.state;
        return (
            <Grid
                className={
                    this.props.settings &&
                        this.props.settings.setting &&
                        this.props.settings.setting.mode &&
                        this.props.settings.setting.mode === "dark"
                        ? "homeBg homeBgDrk"
                        : "homeBg"
                }
            >
                <Grid className="homeBgIner">
                    {this.state.loaderImage && <Loader />}
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">
                                {/* Website Menu */}
                                <LeftMenu isNotShow={true} currentPage="emergency" />
                                <LeftMenuMobile isNotShow={true} currentPage="emergency" />
                                <Grid className="journalAdd">
                                    <Grid container direction="row">
                                        <Grid item xs={12} md={11}>
                                            <Grid container direction="row">
                                                <Grid item xs={12} md={6} sm={6}></Grid>
                                                <Grid item xs={12} md={6} sm={6}>
                                                    <Grid className="AddEntrynw"><a onClick={this.handleOpenNewEn}>+ Add Picture Evaluation</a></Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Modal
                                    open={this.state.newEntry}
                                    onClose={this.handleCloseNewEn}
                                    className={
                                        this.props.settings &&
                                            this.props.settings.setting &&
                                            this.props.settings.setting.mode &&
                                            this.props.settings.setting.mode === "dark"
                                            ? "darkTheme nwDiaModel"
                                            : "nwDiaModel"
                                    }
                                >
                                    <Grid className="nwDiaCntnt">
                                        <Grid className="nwDiaCntntIner">
                                            <Grid className="nwDiaCourse">
                                                <Grid className="nwDiaCloseBtn">
                                                    <a onClick={this.handleCloseNewEn}>
                                                        <img
                                                            src={require("assets/images/close-search.svg")}
                                                            alt=""
                                                            title=""
                                                        />
                                                    </a>
                                                </Grid>
                                                <div>
                                                    <p>Picture Evaluation</p>
                                                </div>
                                            </Grid>

                                            {this.state.mod1Open === true ? (
                                                <Grid>
                                                    <Grid className="cnfrmDiaMain">
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
                                                            <Grid className="fatiqueQues fatiqueQuess1">
                                                                <Grid className="dateSet">
                                                                    <label>1. When did it start?</label>
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
                                                                <FatiqueQuestion updateEntryState1={(e) => this.updateEntryState1(e, 'warm')} label="2. Warm?" value={this.state.updateEvaluate?.warm} />
                                                                <FatiqueQuestion updateEntryState1={(e) => this.updateEntryState1(e, 'size_progress')} label="3. Size progress? " value={this.state.updateEvaluate?.size_progress} />
                                                                <FatiqueQuestion updateEntryState1={(e) => this.updateEntryState1(e, 'itch')} label="4. Itch?" value={this.state.updateEvaluate?.itch} />
                                                                <FatiqueQuestion updateEntryState1={(e) => this.updateEntryState1(e, 'pain')} label="5. pain?" value={this.state.updateEvaluate?.pain} />
                                                                <Grid>
                                                                    <label>6. Pain level?</label>
                                                                    <PainIntensity
                                                                        name="pain_intensity"
                                                                        onChange={(e) => this.updateEntryState2(e)}
                                                                        value={Math.round(this.state.updateEvaluate?.pain_intensity)}
                                                                        comesFrom="Evalute"
                                                                    />
                                                                </Grid>
                                                                <Grid className="textFieldArea1">
                                                                    <label>7. If you have Fever what is your Body Temp?</label>
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
                                                                    <label>8. Have you been in the sun before, How long </label>
                                                                    <input type="number"
                                                                        placeholder="0"
                                                                        name="sun_before"
                                                                        onChange={(e) => this.updateEntryState2(e)}
                                                                    >
                                                                    </input>
                                                                </Grid>
                                                                <Grid className="textFieldArea1">
                                                                    <label>9. Have you been in the Cold (lower then -5C), how long?</label>
                                                                    <input type="number"
                                                                        placeholder="0"
                                                                        name="cold"
                                                                        onChange={(e) => this.updateEntryState2(e)}
                                                                    >
                                                                    </input>
                                                                </Grid>
                                                                <Grid className="fillDia">
                                                                    <label>10. Did you had Sexual Activities before?</label>
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
                                                                        onClick={() => this.handleEvalSubmit(2)}
                                                                    >
                                                                    </input>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            ) : (


                                                <Grid>
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
                                                                        male
                                                                    </a>
                                                                    <a
                                                                        onClick={() => this.updateEntryState1("female", "sex")}
                                                                        className={
                                                                            this.state.updateEvaluate.sex &&
                                                                            this.state.updateEvaluate.sex === "female" &&
                                                                            "SelectedGender"
                                                                        }
                                                                    >
                                                                        female
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
                                                                        other
                                                                    </a>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid>
                                                                <label>Blood Pressure</label>
                                                            </Grid>
                                                            <Grid className="fillDia">
                                                                <MMHG
                                                                    name="rr_systolic"
                                                                    Unit="mmHg"
                                                                    label={rr_systolic}
                                                                    onChange={(e) => this.updateEntryState1(e)}
                                                                    value={this.state.updateEvaluate?.rr_systolic}
                                                                />
                                                            </Grid>
                                                            <Grid className="fillDia">
                                                                <MMHG
                                                                    name="rr_diastolic"
                                                                    Unit="mmHg"
                                                                    label={RR_diastolic}
                                                                    onChange={(e) => this.updateEntryState1(e)}
                                                                    value={this.state.updateEvaluate?.rr_diastolic}
                                                                />
                                                            </Grid>

                                                            <Grid className="fatiqueQues fatiqueQuess1">
                                                                <FatiqueQuestion updateEntryState1={(e) => this.updateEntryState1(e, 'diabetes')} label="Diabetes" value={this.state.updateEvaluate?.diabetes} />
                                                                <FatiqueQuestion updateEntryState1={(e) => this.updateEntryState1(e, 'smoking_status')} label="Smoking Status" value={this.state.updateEvaluate?.smoking_status} />
                                                            </Grid>
                                                            <Grid className="fillDia">
                                                                <label>Allergies</label>
                                                                <NotesEditor
                                                                    name="allergies"
                                                                    onChange={(e) => this.updateEntryState1(this.validateChar(e, 1), "allergies")}
                                                                    value={this.state.updateEvaluate?.allergies}
                                                                />
                                                                {this.state.value == 1 && (<div className="errChrMsg">{this.state.errorChrMsg}</div>)}
                                                            </Grid>
                                                            <Grid className="fillDia">
                                                                <label>Family History</label>
                                                                <NotesEditor
                                                                    name="family_history"
                                                                    onChange={(e) => this.updateEntryState1(this.validateChar(e, 2), "family_history")}
                                                                    value={this.state.updateEvaluate?.family_history}
                                                                />
                                                                {this.state.value == 2 && (<div className="errChrMsg">{this.state.errorChrMsg}</div>)}
                                                            </Grid>
                                                            <Grid className="fillDia">
                                                                <label>Treatment so far</label>
                                                                <NotesEditor
                                                                    name="treatment_so_far"
                                                                    onChange={(e) => this.updateEntryState1(this.validateChar(e, 3), "treatment_so_far")}
                                                                    value={this.state.updateEvaluate?.treatment_so_far}
                                                                />
                                                                {this.state.value == 3 && (<div className="errChrMsg">{this.state.errorChrMsg}</div>)}
                                                            </Grid>

                                                            <Grid item xs={12} md={8}>
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
                                                            <Grid item xs={12} md={8}>
                                                                <label>place of residence</label>
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
                                                            <Grid className="fillDia">
                                                                <label>Phenotyp / Race</label>
                                                                <NotesEditor
                                                                    name="race"
                                                                    onChange={(e) => this.updateEntryState1(e, "race")}
                                                                    value={this.state.updateEvaluate?.race}
                                                                />
                                                            </Grid>
                                                            <Grid className="fillDia">
                                                                <label>Travel history last 6 month</label>
                                                                <NotesEditor
                                                                    name="history_month"
                                                                    onChange={(e) => this.updateEntryState1(e, "history_month")}
                                                                    value={this.state.updateEvaluate?.history_month}
                                                                />
                                                            </Grid>
                                                            <Grid className="fillDia">
                                                                <label>Medical preconditions and prediagnosis</label>
                                                                <NotesEditor
                                                                    name="medical_precondition"
                                                                    onChange={(e) => this.updateEntryState1(this.validateChar(e, 4), "medical_precondition")}
                                                                    value={this.state.updateEvaluate?.medical_precondition}
                                                                />
                                                                {this.state.value == 4 && (<div className="errChrMsg">{this.state.errorChrMsg}</div>)}
                                                            </Grid>
                                                            <Grid className="fillDia">
                                                                <label>Premedication</label>
                                                                <NotesEditor
                                                                    name="premedication"
                                                                    onChange={(e) => this.updateEntryState1(this.validateChar(e, 5), " premedication")}
                                                                    value={this.state.updateEvaluate?.premedication}
                                                                />
                                                                {this.state.value == 5 && (<div className="errChrMsg">{this.state.errorChrMsg}</div>)}
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
                                                </Grid>
                                            )}





                                        </Grid>
                                    </Grid>
                                </Modal>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid >
        );
    }
}
const mapStateToProps = (state) => {
    const {
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
    } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    const { verifyCode } = state.authy;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        verifyCode,
    };
};
export default withRouter(
    connect(mapStateToProps, {
        LoginReducerAim,
        LanguageFetchReducer,
        Settings,
        authy,
    })(Index)
);
