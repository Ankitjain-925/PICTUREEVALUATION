import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { connect } from "react-redux";
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from 'Screens/actions';
import { getDate, getImage, GetUrlImage } from '../BasicMethod/index'
import sitedata from 'sitedata';
import axios from "axios"
import { getLanguage } from "Screens/hospital_Admin/translations/index";
import { commonHeader } from "component/CommonHeader/index"

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patient_info: this.props.patient_info,
            openDetial: this.props.openDetial,
            KYC_ID: '',
            KYC_LICENSE: '',
            kycs: []
        };
    }

    //For close the pop up
    handleCloseCreate = () => {
        this.setState({ KYC_ID: '', KYC_LICENSE: '', kycs: [] })
        this.props.CloseDetail();
    }

    //on adding new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.openDetial !== this.props.openDetial) {
            this.setState({ openDetial: this.props.openDetial })
        }
        if (prevProps.patient_info !== this.props.patient_info) {
            this.setState({ patient_info: this.props.patient_info }, () => { this.getKyc() })

        }
    }

    getKyc = () => {
        var user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/User/getKyc/' + this.props.patient_info._id,
            commonHeader(user_token)).then((response) => {
                if (response.data.data) {
                    this.setState({ kycs: response.data.fulldata, loaderImage: false }, () => {

                        this.setState({ KYC_ID: '', KYC_LICENSE: '' })
                        if (this.state.kycs.attachment && this.state.kycs.attachment.length > 0) {
                            var KYC_ID = this.state.kycs.attachment && this.state.kycs.attachment.length > 0 && this.state.kycs.attachment[0] && this.state.kycs.attachment[0].file && this.state.kycs.attachment[0].file
                            if (KYC_ID) {
                                this.setState({ KYC_ID: KYC_ID })
                            }
                            var KYC_LICENSE = this.state.kycs.attachment && this.state.kycs.attachment.length > 0 && this.state.kycs.attachment[1] && this.state.kycs.attachment[1].file && this.state.kycs.attachment[1].file
                            if (KYC_LICENSE) {
                                this.setState({ KYC_LICENSE: KYC_LICENSE })
                            }
                        }
                    })
                }
            }).catch(err => { })
    }

    //For cancel the User
    CreateUserCancel() {
        this.setState({ CreateUsers: {} });
        this.props.handleCloseCreate();
    }

    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let { user_info, Liscence, personal_info, profile_id, add, customer_since, type, email, kyc, details, terms_Country, number, authority } = translate
        var { patient_info, kycs, KYC_LICENSE, KYC_ID } = this.state;
        return (
            <div>
                {/* Model setup */}
                <Modal
                    open={this.state.openDetial}
                    onClose={this.handleCloseCreate}
                    className={
                        this.props.settings &&
                            this.props.settings.setting &&
                            this.props.settings.setting.mode &&
                            this.props.settings.setting.mode === "dark"
                            ? "prespBoxModel darkTheme"
                            : "prespBoxModel"
                    }>
                    <Grid className="prespBoxCntnt">
                        <Grid className="prespCourse">
                            <Grid className="prespCloseBtn nwEntrCloseBtnAdd">
                                <a onClick={this.handleCloseCreate}>
                                    <img src={require('assets/images/close-search.svg')} alt="" title="" />
                                </a>
                            </Grid>
                            <p>{user_info}</p>
                            <Grid><label>{patient_info && patient_info.first_name && patient_info.first_name} {patient_info && patient_info.last_name && patient_info.last_name}</label></Grid>
                        </Grid>
                        <Grid className="detailPrescp">
                            <Grid className="stndQues">
                                <Grid><span>{personal_info}</span></Grid>
                                <Grid>
                                    <Grid><label>{profile_id}</label></Grid>
                                    <p>{patient_info && patient_info.alies_id && patient_info.alies_id}</p>
                                    <Grid><label>{add}</label></Grid>
                                    <p>{patient_info && patient_info.address && patient_info.address} {patient_info && patient_info.city && patient_info.city} {"-"} {patient_info.pastal_code}</p>
                                    <Grid><label>{customer_since}</label></Grid>
                                    <p>{patient_info && patient_info.createdate && patient_info.createdate}</p>
                                    <Grid><label>{type}</label></Grid>
                                    <p>{patient_info && patient_info.type && patient_info.type}</p>
                                    <Grid><label>{email}</label></Grid>
                                    <p>{patient_info && patient_info.email && patient_info.email}</p>
                                    {patient_info && patient_info?.type === "patient" ? null : <><Grid><label>Assigned hospital</label></Grid>
                                        <p>{patient_info &&
                                            patient_info?.houses &&
                                            patient_info?.houses?.length > 0 &&
                                            patient_info?.houses.map((items) =>
                                                <div className="assiHospDet">{items?.label}</div>)}</p>
                                    </>}
                                </Grid>
                            </Grid>
                            {patient_info && patient_info.type && patient_info.type === 'doctor' && <Grid className="stndQues">
                                <Grid><span>{Liscence}</span></Grid>
                                <Grid className="pointThis" onClick={() => GetUrlImage(patient_info.licence && patient_info.licence && patient_info.licence.length > 0 && patient_info.licence[0].url && patient_info.licence[0].url)}>{patient_info.licence && patient_info.licence.length > 0 && patient_info.licence[0].url && (patient_info.licence[0].url.split('registration/')[1]).split("&bucket=")[0]}</Grid>
                            </Grid>}
                            <Grid className="stndQues">
                                <Grid><span>{kyc}</span></Grid>
                                <Grid className="pointThis" onClick={() => GetUrlImage(KYC_LICENSE)}>{KYC_LICENSE && (KYC_LICENSE.split('KYC/')[1]).split("&bucket=")[0]}</Grid>
                                <Grid className="pointThis" onClick={() => GetUrlImage(KYC_ID)}>{KYC_ID && (KYC_ID.split('KYC/')[1]).split("&bucket=")[0]}</Grid>
                            </Grid>


                            <Grid className="stndQues">
                                <Grid><span>{details}</span></Grid>
                                <Grid>
                                    <Grid><label>{terms_Country}</label></Grid>
                                    <p>{kycs && kycs.country && kycs.country}</p>
                                    <Grid><label>{number}</label></Grid>
                                    <p>{kycs && kycs.number && kycs.number}</p>
                                    <Grid><label>{authority}</label></Grid>
                                    <p>{kycs && kycs.authority && kycs.authority}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>
                {/* End of Model setup */}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim ? state.LoginReducerAim : {};
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    // const {Doctorsetget} = state.Doctorset;
    // const {catfil} = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index));


