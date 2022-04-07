/*global google*/
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import ReactFlagsSelect from 'react-flags-select';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { OptionList } from "Screens/Login/metadataaction";
import QRCode from 'qrcode.react';
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import npmCountryList from 'react-select-country-list'
import { Table } from 'reactstrap';
import Autocomplete from 'Screens/Components/Autocomplete/index';
import { LanguageFetchReducer } from 'Screens/actions';
import Modal from '@material-ui/core/Modal';
import Loader from 'Screens/Components/Loader/index';
import { GetShowLabel1 } from 'Screens/Components/GetMetaData/index.js';
import DateFormat from 'Screens/Components/DateFormat/index'
import { getLanguage } from "translations/index";
import _ from 'lodash';
import { updateFLAG, updateMOBILE, getUserData, contact_partnerState, getMetadata, handleChange_multi, saveUserData1, saveUserData, firstLoginUpdate, onChange, updateEntryState1, updateEntryState11, copyText, updateflags,
    handleMaritalStatus, updateEntryState, Upsaterhesus, EntryValueName , GetLanguageMetadata, filterCountry, filterCountry1, toggle, filterList, updatesinsurances, changeAlies, changePin, ChangeIDPIN, updatesinsurancesCountry ,removeInsurance,  } from './puapi';

class Index extends Component {
    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.city = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
        this.state = {
            selectedOption: null,
            openDash: false,
            date: new Date(),
            age: '',
            name: 'hai',
            labelWidth: 0,
            name_multi: [],
            age: '',
            name: 'hai',
            labelWidth: '',
            gender: '',
            language: [],
            userDetails: [],
            weoffer: [],
            language: [],
            speciality: [],
            uploadedimage: '',
            file: '',
            imagePreviewUrl: '',
            genderdata: [],
            languageData: [],
            specialityData: [],
            addressDetails: [],
            title_degreeData: [],
            subspeciality: [],
            UpDataDetails: [],
            speciality_multi: [],
            insurance_count: 1,
            insuranceDetails: {},
            insurancefull: [],
            UpDataDetailsdicard: [],
            speciality_multidiscard: [],
            name_multidiscard: [],
            passwordDetails: [],
            loaderImage: false,
            regisError1: '',
            regisError2: "",
            city: '',
            area: '',
            allDocData: {},
            insuranceArray: {},
            moreone: false,
            profile_id: '',
            selectCountry: [],
            flag_fax: 'DE',
            flag_phone: 'DE',
            flag_mobile: 'DE',
            flag_emergency_number: 'DE',
            mobile: '',
            phone: '',
            fax: '',
            emergency_number: '',
            updateIns: -1,
            error3: false,
            succUpdate: false,
            copied: false,
            value: 0,
            qrOpen: false,
            chngPinOpen: false,
            ChangedPIN: false,
            DuplicateAlies: false,
            toSmall: false,
            phonevalidate: false,
            addInsuranceOpen: false,
            editInsuranceOpen: false,
            editInsuData: {},
            insurnanceAdded: false,
            selectedCountry: {},
            q: '',
            filteredCompany: [],
            editIndex: null,
            bloodgroup: [],
            rhesusgroup: [],
            bloods: {},
            title:{},
            rhesus: {},
            insu1: false,
            contact_partner: {},
            UpDataDetails1: {}
        };
       
    }

    componentDidMount() {
        getMetadata(this);
        getUserData(this);
        firstLoginUpdate(this);
        var npmCountry = npmCountryList().getData()
        this.setState({ selectCountry: npmCountry })
        /*---location---*/
        this.city = new google.maps.places.Autocomplete(
            this.autocompleteInput.current,
            { types: ["geocode"] }
        );
        this.city.addListener("place_changed", this.handlePlaceChanged);
    }

      //To add Insurance
    insuranceForm = (e) => {
        const state = this.state.insuranceDetails;
        if (e.target.name == "insurance") {
        const q = e.target.value.toLowerCase();
        this.setState({ q }, () =>
            filterList(this.state.insuranceDetails.insurance_country, this)
        );
        }
        state[e.target.name] = e.target.value;
        this.setState({ insuranceDetails: state });
    };

    selectCountry = (event) => {
        const state = this.state.insuranceDetails;
        state["insurance_country"] = event.value;
        this.setState({ insuranceDetails: state });
        this.setState({ selectedCountry: event });
    };
  
      // For Add more insurance model
    handleAddInsurance = () => {
        this.setState({ addInsuranceOpen: true });
    };
    //For open QR code
    handleQrOpen = () => {
        this.setState({ qrOpen: true });
    };
    handleQrClose = () => {
        this.setState({ qrOpen: false });
    };

    //for open the Change profile Dialog
    handlePinOpen = () => {
        this.setState({ chngPinOpen: true, UpDataDetails1:  _.cloneDeep(this.state.UpDataDetails) });
      };
    handlePinClose = (key) => {
        this.setState({ [key]: false });
    };

    //For chnaging the Place of city.
    handlePlaceChanged() {
        const place = this.city.getPlace();
        this.setState({ city: place.formatted_address })
        this.setState({
            area: {
                type: "Point",
                coordinates: [place.geometry.location.lng(), place.geometry.location.lat()]
            }
        })
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.stateLanguageType !== this.props.stateLanguageType) {
            GetLanguageMetadata(this);
            if (this.state.rhesus && this.state.rhesus.value) {
                Upsaterhesus(this, this.state.rhesus);
            }
        }
    }

    //For open the Insurance Edit popup
    editKYCopen(event, i) {
        this.setState({ editInsuranceOpen: true, insuranceDetails: event, editIndex: i })
    }

    //Calling when city is updated
    updateEntryCity = (place) => {
        this.setState({ city: place.formatted_address })
        this.setState({
            area: {
                type: "Point",
                coordinates: [place.geometry.location.lng(), place.geometry.location.lat()]
            }
        })
        const state = this.state.UpDataDetails;
        state["city"] = place.formatted_address;
        this.setState({ UpDataDetails: state });
    }

    render() {
        const { value, editInsuData, insurancefull, editIndex, insuranceDetails, } = this.state;
        const companyList = this.state.filteredCompany && this.state.filteredCompany.map(company => {
            return (
                <li className="list-group-item" value={company}
                    onClick={() => { this.setState({ q: company }); toggle(company, this); this.setState({ filteredCompany: [] }) }}
                >{company}</li>
            )
        });

        let translate = getLanguage(this.props.stateLanguageType)
        let { Contact, Citizenship, Register_Name, relation, phone, select_marital_status, organ_donar_status, not_an_organ, emergency, telephone_nmbr, marital_status,
            Rhesus, InsurancecompanyError, Addcompany, Blood, profile_info, profile, information, ID, pin, QR_code, done, Change, edit_id_pin, edit, and, is, changed, profile_id_taken, profile_id_greater_then_5,
            save_change, email, title, degree, first, last, name, dob, gender, street, add, city, postal_code, country, home_telephone, country_code, Delete, male, female, other,
            mobile_number, number, mobile, Languages, spoken, pin_greater_then_4, insurance, add_more, company, of, info_copied, profile_updated, profile_not_updated, mobile_number_not_valid, insurance_added } = translate;


        return (
            <div>
                {this.state.loaderImage && <Loader />}
                <Grid className="profileMy">
                    <Grid className="profileInfo">
                        {this.state.copied && <div className="success_message">{info_copied}</div>}
                        {this.state.succUpdate && <div className="success_message">{profile_updated}</div>}
                        {this.state.error3 && <div className="err_message">{profile_not_updated}</div>}
                        {this.state.phonevalidate && <div className="err_message">{mobile_number_not_valid}</div>}
                        {this.state.ChangedPIN && <div className="success_message">{profile} {ID} {and} {pin} {is} {changed}</div>}
                        <h1>{profile} {information}</h1>
                        <p>{profile_info}</p>
                    </Grid>
                </Grid>
                <Grid className="profileId">
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Grid className="profileIdLft">
                                <Grid container direction="row" alignItems="center" spacing={1}>
                                    <Grid item xs={12} md={7}>
                                        <label>{profile} {ID}</label><span id="profile_id">{this.state.UpDataDetails.alies_id && this.state.UpDataDetails.alies_id}</span>
                                        <a><img src={require('assets/images/copycopy.svg')} onClick={() => copyText('profile_id', this)} alt="" title="" /></a>
                                        <a><img src={require('assets/images/qr-code.svg')} onClick={this.handleQrOpen} alt="" title="" /></a>
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <label>{pin}</label><span id="profile_pin">{this.state.UpDataDetails.pin && this.state.UpDataDetails.pin}</span>
                                        <a><img src={require('assets/images/copycopy.svg')} onClick={() => copyText('profile_pin', this)} alt="" title="" /></a>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* QR Model setup */}
                        <Modal
                            open={this.state.qrOpen}
                            onClose={this.handleQrClose}
                            className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "darkTheme qrBoxModel" : "qrBoxModel"}>
                            <Grid className="qrBoxCntnt">
                                <Grid className="qrCourse">
                                    <Grid className="qrCloseBtn">
                                        <a onClick={this.handleQrClose}>
                                            <img src={require('assets/images/close-search.svg')} alt="" title="" />
                                        </a>
                                    </Grid>
                                    <Grid><label>{profile} {QR_code}</label></Grid>
                                </Grid>
                                <Grid className="qrCourseImg">
                                    <Grid> <QRCode value={this.state.UpDataDetails && this.state.UpDataDetails.profile_id} /></Grid>
                                    <Grid><input type="submit" value={done} onClick={this.handleQrClose} /></Grid>
                                </Grid>
                            </Grid>
                        </Modal>
                        {/* End of QR Model setup */}
                        <Grid item xs={12} md={4}>
                            <Grid className="profileIdRght">
                                <a onClick={this.handlePinOpen}>{Change} {ID} / {pin}</a>
                            </Grid>
                        </Grid>
                        {/* Change ID and Pin */}
                        <Modal
                            open={this.state.chngPinOpen}
                            onClose={() => this.handlePinClose("chngPinOpen")}
                            className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "darkTheme editBoxModel" : "editBoxModel"}>

                            <Grid className="editBoxCntnt">
                                <Grid className="editCourse">
                                    <Grid className="editCloseBtn">
                                        <a onClick={() => this.handlePinClose("chngPinOpen")}>
                                            <img src={require('assets/images/close-search.svg')} alt="" title="" />
                                        </a>
                                    </Grid>
                                    <Grid><label>{edit} {ID} {and} {pin}</label></Grid>
                                    <p>{edit_id_pin}</p>
                                </Grid>
                                <Grid className="editPinform">
                                    <Grid className="editField">
                                        <label>{profile} {ID}</label>
                                        <Grid><input type="text" name="alies_id" onChange={(e)=> changeAlies(e, this)} value={this.state.UpDataDetails1.alies_id} /></Grid>
                                        {this.state.DuplicateAlies && <p>{profile_id_taken}</p>}
                                        {this.state.toSmall && <p>{profile_id_greater_then_5}</p>}
                                    </Grid>
                                    <Grid className="editField">
                                        <label>{pin}</label>
                                        <Grid><input type="text" name="pin" onChange={(e)=> changePin(e, this)} value={this.state.UpDataDetails1.pin} /></Grid>
                                        {this.state.toSmall1 && <p>{pin_greater_then_4}</p>}
                                    </Grid>
                                    <Grid>
                                        <input type="submit" onClick={()=> ChangeIDPIN(this)} value={save_change} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Modal>
                        {/* End of Change ID and Pin */}
                    </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center">
                    <Grid item xs={12} md={8}>
                        <Grid className="profileInfo">

                            <Grid className="profileInfoIner">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <label>{email}</label>
                                        <Grid><input name="email" type="text" onChange={(e)=>updateEntryState(e, this)} value={this.state.UpDataDetails.email} disabled /></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid className="profileInfoIner titleDegre">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <label>{title} / {degree}</label>
                                        <Grid>
                                            <Select
                                                value={this.state.title}
                                                onChange={(e) => EntryValueName(e, 'title', this)}
                                                options={this.state.title_degreeData}
                                                placeholder="Mr."
                                                name="title"
                                                isSearchable={false}
                                                className="mr_sel"

                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <label>{first} {name}</label>
                                        <Grid><input type="text" name="first_name" value={this.state.UpDataDetails.first_name} onChange={(e)=>updateEntryState(e, this)} /></Grid>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <label>{last} {name}</label>
                                        <Grid><input type="text" name="last_name" onChange={(e)=>updateEntryState(e, this)} value={this.state.UpDataDetails.last_name} /></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid className="profileInfoDate">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <label>{dob}</label>
                                        <Grid>
                                            <DateFormat name="birthday" value={this.state.UpDataDetails.birthday ? new Date(this.state.UpDataDetails.birthday) : new Date()} onChange={(e)=> onChange(e, this)} date_format={this.props.settings.setting && this.props.settings.setting.date_format}  />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <label>{gender}</label>
                                        <Grid>
                                            <a onClick={() => EntryValueName('male', 'sex', this)} className={this.state.UpDataDetails.sex && this.state.UpDataDetails.sex === 'male' && "SelectedGender"}>{male}</a>
                                            <a onClick={() => EntryValueName('female', 'sex', this)} className={this.state.UpDataDetails.sex && this.state.UpDataDetails.sex === 'female' && "SelectedGender"}>{female}</a>
                                            <a onClick={() => EntryValueName('other', 'sex', this)} className={this.state.UpDataDetails.sex && this.state.UpDataDetails.sex === 'other' && "SelectedGender"}> {other}</a>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid className="profileInfoIner">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <label>{marital_status}</label>
                                        <Grid className="cntryDropTop">
                                            <Select
                                                placeholder={select_marital_status}
                                                options={this.state.AllMaritalOption}
                                                value={this.state.UpDataDetails && this.state.UpDataDetails.marital_status && GetShowLabel1(
                                                    this.state.handleMaritalStatus,
                                                    this.state.UpDataDetails.marital_status.value,
                                                    this.props.stateLanguageType
                                                )}
                                                // value ={this.state.UpDataDetails && this.state.UpDataDetails.marital_status && GetShowLabel(this.state.UpDataDetails.marital_status, this.props.stateLanguageType)}
                                                onChange={(e) => handleMaritalStatus(e, this)} 
                                                className="cntryDrop"/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid className="profileInfoIner">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <label>{street} {add}</label>
                                        <Grid><input type="text" name="address" onChange={(e)=>updateEntryState(e, this)} value={this.state.UpDataDetails.address ? this.state.UpDataDetails.address : ''} /></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid className="profileInfoIner">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <label>{city}</label>
                                        <Grid>

                                            <Autocomplete value={this.state.city} stateLanguageType={this.props.stateLanguageType} onPlaceChanged={this.updateEntryCity.bind(this)} />                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <label>{postal_code}</label>
                                        <Grid><input type="text" name="pastal_code" onChange={(e)=>updateEntryState(e, this)} value={this.state.UpDataDetails.pastal_code ? this.state.UpDataDetails.pastal_code : ''} /></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid className="profileInfoIner">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <label>{country}</label>
                                        <Grid className="cntryDropTop">
                                            <Select
                                                value={this.state.UpDataDetails.country}
                                                onChange={(e) => EntryValueName(e, 'country', this)}
                                                options={this.state.selectCountry}
                                                placeholder=""
                                                isSearchable={true}
                                                name="country"
                                                className="cntryDrop"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={4}></Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>
                            </Grid>

                            <Grid className="profileInfoIner">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <label>{Citizenship} {country}</label>
                                        <Grid className="cntryDropTop">
                                            <Select
                                                value={this.state.UpDataDetails.citizen_country || ''}
                                                onChange={(e) => EntryValueName(e, 'citizen_country', this)}
                                                options={this.state.selectCountry}
                                                placeholder=""
                                                isSearchable={true}
                                                name="country"
                                                className="cntryDrop"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={4}></Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>
                            </Grid>

                            <Grid className="profileInfoIner">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <label>{home_telephone}</label>
                                        <Grid>
                                            {updateFLAG(this.state.UpDataDetails.phone) && updateFLAG(this.state.UpDataDetails.phone) !== '' &&
                                                <ReactFlagsSelect searchable={true} placeholder={country_code} onSelect={(e) => { updateflags(e, 'flag_phone', this) }} name="flag_phone" showSelectedLabel={false} defaultCountry={updateFLAG(this.state.UpDataDetails.phone)} />}
                                            <input type="text"
                                                className="Mobile_extra"
                                                placeholder={phone}
                                                name="phone"
                                                onChange={(e)=> updateEntryState1(e, this)}
                                                value={this.state.UpDataDetails.phone && updateMOBILE(this.state.UpDataDetails.phone)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={4}></Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>
                            </Grid>

                            <Grid className="profileInfoIner">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <label>{mobile_number}</label>
                                        <Grid>
                                            {updateFLAG(this.state.UpDataDetails.mobile) && updateFLAG(this.state.UpDataDetails.mobile) !== '' &&
                                                <ReactFlagsSelect searchable={true} placeholder="Country Code" onSelect={(e) => { updateflags(e, 'flag_mobile', this) }} name="flag_mobile" showSelectedLabel={false} defaultCountry={updateFLAG(this.state.UpDataDetails.mobile)} />}
                                            <input type="text"
                                                className="Mobile_extra"
                                                placeholder={mobile}
                                                name="mobile"
                                                onChange={(e)=> updateEntryState1(e, this)}
                                                value={this.state.UpDataDetails.mobile && updateMOBILE(this.state.UpDataDetails.mobile)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={4}></Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>
                            </Grid>

                            <Grid className="profileInfoIner">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <label>{Languages} {spoken}</label>
                                        <Grid>
                                            <Select
                                                value={this.state.name_multi}
                                                name="languages"
                                                closeMenuOnSelect={false}
                                                onChange={(e) => { handleChange_multi(e, 'languages', this) }}
                                                options={this.state.languageData}
                                                placeholder=""
                                                isSearchable={true}
                                                className="profile-language"
                                                isMulti={true}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={4}></Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>
                            </Grid>
                            <Grid className="profileInfoIner">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <label>{Blood}</label>
                                        <Grid>
                                            <Select
                                                value={this.state.bloods}
                                                name="bloodgroup"
                                                onChange={(e) => { EntryValueName(e, 'blood_group', this) }}
                                                options={this.state.bloodgroup}
                                                placeholder=""
                                                isSearchable={false}
                                                className="profile-language"
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <label>{Rhesus}</label>
                                        <Grid>
                                            <Select
                                                value={this.state.rhesus}
                                                name="rhesus"
                                                onChange={(e) => {EntryValueName(e, 'rhesus', this) }}
                                                options={this.state.rhesusgroup}
                                                placeholder=""
                                                isSearchable={false}
                                                className="profile-language"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={4}></Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}></Grid>
                    <Grid className="clear"></Grid>
                </Grid>
                
                <Grid className="infoSub">
                    <Grid container direction="row" alignItems="center" spacing={2}>
                        <Grid item xs={12} md={5}>
                            <Grid><input type="submit" onClick={()=> saveUserData(this)} value={save_change} /></Grid>
                        </Grid>
                        <Grid item xs={12} md={7}></Grid>
                        <Grid className="clear"></Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    const { metadata } = state.OptionList;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        metadata,
    }
};
export default withRouter(connect(mapStateToProps, { OptionList, LoginReducerAim, LanguageFetchReducer, Settings })(Index));