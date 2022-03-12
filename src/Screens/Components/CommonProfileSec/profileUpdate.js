/*global google*/
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "react-select";
import ReactFlagsSelect from "react-flags-select";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Autocomplete from "./Autocomplete.js";
import npmCountryList from "react-select-country-list";
import FileUploader from "Screens/Components/FileUploader/index";
import { LanguageFetchReducer } from "Screens/actions";
import Modal from "@material-ui/core/Modal";
import Loader from "Screens/Components/Loader/index";
import QRCode from "qrcode.react";
import DateFormat from "Screens/Components/DateFormat/index";
import { GetUrlImage1, blobToFile, resizeFile } from "Screens/Components/BasicMethod/index";
import { OptionList } from "Screens/Login/metadataaction";
import { getLanguage } from "translations/index"
import _ from 'lodash';
import {
  GetLanguageMetadata, handleChange_multi, changePin, changeAlies, ChangeIDPIN, fileUpload,
  saveUserData, onChange, onSelectDegree, updateFlags, updateEntryState1, getUserData, copyText
} from "./profileapi";


var datas = [];

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
      age: "",
      name: "hai",
      labelWidth: 0,
      name_multi: [],
      age: "",
      name: "hai",
      labelWidth: "",
      gender: "",
      language: [],
      userDetails: [],
      weoffer: [],
      language: [],
      speciality: [],
      uploadedimage: "",
      file: "",
      imagePreviewUrl: "",
      genderdata: [],
      languageData: [],
      specialityData: [],
      addressDetails: [],
      title_degreeData: [],
      subspeciality: [],
      UpDataDetails: [],
      speciality_multi: [],
      UpDataDetailsdicard: [],
      speciality_multidiscard: [],
      name_multidiscard: [],
      passwordDetails: [],
      loaderImage: false,
      regisError1: "",
      regisError2: "",
      city: "",
      area: "",
      allDocData: {},
      moreone: false,
      profile_id: "",
      selectCountry: [],
      flag_fax: "DE",
      flag_phone: "DE",
      flag_mobile: "DE",
      flag_emergency_number: "DE",
      mobile: "",
      phone: "",
      fax: "",
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
      toSmall1: false,
      phonevalidate: false,
      image: false,
      UpDataDetails1: {}
    };
    // new Timer(this.logOutClick.bind(this))
  }

  fileUpload = async (event, filed_name) => {
    if (event[0].type === "image/jpeg" || event[0].type === "image/png") {
     fileUpload(event, this);
    } else {
      let translate = getLanguage(this.props.stateLanguageType)
      let { plz_upload_png_jpeg, ok } = translate;
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div
              className={
                this.props.settings.setting.mode === "dark"
                  ? "dark-confirm react-confirm-alert-body"
                  : "react-confirm-alert-body"
              }
            >
              <h1>{plz_upload_png_jpeg}</h1>
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
  };
  // On change the Birthday
  onChange = (date) => {
    const state = this.state.UpDataDetails;
    state["birthday"] = date;
    this.setState({ UpDataDetails: state });
  };

  componentDidMount() {
    this.getMetadata();
    getUserData(this);
    /*---location---*/
    this.city = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ["geocode"] }
    );
    this.city.addListener("place_changed", this.handlePlaceChanged);

    var npmCountry = npmCountryList().getData();
    this.setState({ selectCountry: npmCountry });
  }

  //For update the mobile number
  updateMOBILE = (str) => {
    if (!str || str === "undefined" || str === null || str === "") {
      return str;
    } else {
      var mob = str && str.split("-");
      return mob.pop();
    }
  };

  // fOR update the flag of mobile
  updateFLAG = (str) => {
    var mob = str && str.split("-");
    if (mob && mob.length > 0) {
      if (mob[0] && mob[0].length == 2) {
        return mob[0];
      } else {
        return "DE";
      }
    }
  };

  //Update the states
  updateEntryState1 = (e) => {
    updateEntryState1(e, this);
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
    this.setState({ city: place.formatted_address });
    this.setState({
      area: {
        type: "Point",
        coordinates: [
          place.geometry.location.lng(),
          place.geometry.location.lat(),
        ],
      },
    });
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.stateLanguageType !== this.props.stateLanguageType) {
      GetLanguageMetadata(this);
    }
  };

  //For getting the dropdowns from the database
  getMetadata() {
    this.setState({ allMetadata: this.props.metadata },
      () => {
        GetLanguageMetadata(this);
      })
  }

  //For open the Insurance Edit popup
  editKYCopen(event, i) {
    this.setState({
      editInsuranceOpen: true,
      insuranceDetails: event,
      editIndex: i,
    });
  }

  //Update the State
  updateEntryState = (e) => {
    const state = this.state.UpDataDetails;
    state[e.target.name] = e.target.value;
    this.setState({ UpDataDetails: state });
  };

  //For updating gender and country
  EntryValueName = (value, name) => {
    const state = this.state.UpDataDetails;
    state[name] = value;
    this.setState({ UpDataDetails: state });
  };

  //Calling when city is updated
  updateEntryCity = (place) => {
    this.setState({ city: place.formatted_address });
    this.setState({
      area: {
        type: "Point",
        coordinates: [
          place.geometry.location.lng(),
          place.geometry.location.lat(),
        ],
      },
    });
    const state = this.state.UpDataDetails;
    state["city"] = place.formatted_address;
    this.setState({ UpDataDetails: state });
  };


  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      Chan_Prof_img,
      profile_info,
      Citizenship,
      profile,
      information,
      ID,
      pin,
      QR_code,
      done,
      Change,
      edit_id_pin,
      edit,
      and,
      is,
      changed,
      profile_id_taken,
      profile_id_greater_then_5,
      other,
      male,
      female,
      save_change,
      email,
      title,
      degree,
      first,
      last,
      name,
      dob,
      gender,
      street,
      add,
      city,
      postal_code,
      country,
      home_telephone,
      phone,
      country_code,
      Delete,
      mobile_number,
      number,
      mobile,
      pin_greater_then_4,
      Languages,
      spoken,
      insurance,
      add_more,
      company,
      of,
      info_copied,
      profile_updated,
      profile_not_updated,
      mobile_number_not_valid,
      insurance_added,
    } = translate;

    return (
      <div>
        {this.state.loaderImage && <Loader />}

        <Grid className="profileMy">
          <Grid className="profileInfo">
            {this.state.copied && (
              <div className="success_message">{info_copied}</div>
            )}
            {this.state.succUpdate && (
              <div className="success_message">{profile_updated}</div>
            )}
            {this.state.error3 && (
              <div className="err_message">{profile_not_updated}</div>
            )}
            {this.state.ChangedPIN && (
              <div className="success_message">
                {profile} {ID} {and} {pin} {is} {changed}
              </div>
            )}
            {this.state.phonevalidate && (
              <div className="err_message">{mobile_number_not_valid}</div>
            )}
            <h1>
              {profile} {information}
            </h1>
            <p>{profile_info}</p>
          </Grid>
        </Grid>

        <Grid className="profileId">
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} md={8}>
              <Grid className="profileIdLft">
                <Grid container direction="row" alignItems="center" spacing={1}>
                  <Grid item xs={12} md={7}>
                    <label>
                      {profile} {ID}
                    </label>
                    <span id="profile_id">
                      {this.state.UpDataDetails.alies_id &&
                        this.state.UpDataDetails.alies_id}
                    </span>
                    <a>
                      <img
                        src={require("assets/images/copycopy.svg")}
                        onClick={() => copyText("profile_id", this)}
                        alt=""
                        title=""
                      />
                    </a>
                    <a>
                      <img
                        src={require("assets/images/qr-code.svg")}
                        onClick={this.handleQrOpen}
                        alt=""
                        title=""
                      />
                    </a>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <label>{pin}</label>
                    <span id="profile_pin">
                      {this.state.UpDataDetails.pin &&
                        this.state.UpDataDetails.pin}
                    </span>
                    <a>
                      <img
                        src={require("assets/images/copycopy.svg")}
                        onClick={() => copyText("profile_pin", this)}
                        alt=""
                        title=""
                      />
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* QR Model setup */}
            <Modal
              open={this.state.qrOpen}
              onClose={this.handleQrClose}
              className={
                this.props.settings &&
                  this.props.settings.setting &&
                  this.props.settings.setting.mode &&
                  this.props.settings.setting.mode === "dark"
                  ? "darkTheme qrBoxModel"
                  : "qrBoxModel"
              }
            >
              <Grid className="qrBoxCntnt">
                <Grid className="qrCourse">
                  <Grid className="qrCloseBtn">
                    <a onClick={this.handleQrClose}>
                      <img
                        src={require("assets/images/close-search.svg")}
                        alt=""
                        title=""
                      />
                    </a>
                  </Grid>
                  <Grid>
                    <label>
                      {profile} {QR_code}
                    </label>
                  </Grid>
                </Grid>
                <Grid className="qrCourseImg">
                  <Grid>
                    {" "}
                    <QRCode
                      value={
                        this.state.UpDataDetails &&
                        this.state.UpDataDetails.profile_id
                      }
                    />
                  </Grid>
                  <Grid>
                    <input
                      type="submit"
                      value={done}
                      onClick={this.handleQrClose}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Modal>
            {/* End of QR Model setup */}
            <Grid item xs={12} md={4}>
              <Grid className="profileIdRght">
                <a onClick={this.handlePinOpen}>
                  {Change} {ID} / {pin}
                </a>
              </Grid>
            </Grid>
            {/* Change ID and Pin */}
            <Modal
              open={this.state.chngPinOpen}
              onClose={() => this.handlePinClose("chngPinOpen")}
              className={
                this.props.settings &&
                  this.props.settings.setting &&
                  this.props.settings.setting.mode &&
                  this.props.settings.setting.mode === "dark"
                  ? "darkTheme editBoxModel"
                  : "editBoxModel"
              }
            >
              <Grid className="editBoxCntnt">
                <Grid className="editCourse">
                  <Grid className="editCloseBtn">
                    <a onClick={() => this.handlePinClose("chngPinOpen")}>
                      <img
                        src={require("assets/images/close-search.svg")}
                        alt=""
                        title=""
                      />
                    </a>
                  </Grid>
                  <Grid>
                    <label>
                      {edit} {ID} {and} {pin}
                    </label>
                  </Grid>
                  <p>{edit_id_pin}</p>
                </Grid>
                <Grid className="editPinform">
                  <Grid className="editField">
                    <label>
                      {profile} {ID}
                    </label>
                    <Grid>
                      <input
                        type="text"
                        name="alies_id"
                        onChange={(e) => changeAlies(e, this)}
                        value={this.state.UpDataDetails1.alies_id}
                      />
                    </Grid>
                    {this.state.DuplicateAlies && <p>{profile_id_taken}</p>}
                    {this.state.toSmall && <p>{profile_id_greater_then_5}</p>}
                  </Grid>
                  <Grid className="editField">
                    <label>{pin}</label>
                    <Grid>
                      <input
                        type="text"
                        name="pin"
                        onChange={(e) => changePin(e, this)}
                        value={this.state.UpDataDetails1.pin}
                      />
                    </Grid>
                    {this.state.toSmall1 && <p>{pin_greater_then_4}</p>}
                  </Grid>
                  <Grid>
                    <input
                      type="submit"
                      onClick={() => ChangeIDPIN(this)}
                      value={save_change}
                    />
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
                    <Grid>
                      <input
                        name="email"
                        type="text"
                        onChange={this.updateEntryState}
                        value={this.state.UpDataDetails.email}
                        disabled
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid className="profileInfoIner titleDegre">
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} md={3}>
                    <label>
                      {title} / {degree}
                    </label>
                    <Grid>
                      <Select
                        value={this.state.title}
                        onChange={(e) => onSelectDegree(e, this)}
                        options={this.state.title_degreeData}
                        placeholder="Mr."
                        name="title"
                        isSearchable={false}
                        className="mr_sel"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label>
                      {first} {name}
                    </label>
                    <Grid>
                      <input
                        type="text"
                        name="first_name"
                        value={this.state.UpDataDetails.first_name}
                        onChange={this.updateEntryState}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label>
                      {last} {name}
                    </label>
                    <Grid>
                      <input
                        type="text"
                        name="last_name"
                        onChange={this.updateEntryState}
                        value={this.state.UpDataDetails.last_name}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid className="profileInfoDate">
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} md={4}>
                    <label>{dob}</label>
                    <Grid>

                      <DateFormat
                        name="birthday"
                        value={
                          this.state.UpDataDetails.birthday
                            ? new Date(this.state.UpDataDetails.birthday)
                            : new Date()
                        }
                        date_format={
                          this.props.settings.setting &&
                          this.props.settings.setting.date_format
                        }
                        onChange={(e) => onChange(e, this)}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <label>{gender}</label>
                    <Grid>
                      <a
                        onClick={() => this.EntryValueName("male", "sex")}
                        className={
                          this.state.UpDataDetails.sex &&
                          this.state.UpDataDetails.sex === "male" &&
                          "SelectedGender"
                        }
                      >
                        {male}
                      </a>
                      <a
                        onClick={() => this.EntryValueName("female", "sex")}
                        className={
                          this.state.UpDataDetails.sex &&
                          this.state.UpDataDetails.sex === "female" &&
                          "SelectedGender"
                        }
                      >
                        {female}
                      </a>
                      <a
                        onClick={() => this.EntryValueName("other", "sex")}
                        className={
                          this.state.UpDataDetails.sex &&
                          this.state.UpDataDetails.sex === "other" &&
                          "SelectedGender"
                        }
                      >
                        {" "}
                        {other}
                      </a>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid className="profileInfoIner">
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} md={8}>
                    <label>
                      {street} {add}
                    </label>
                    <Grid>
                      <input
                        type="text"
                        name="address"
                        onChange={this.updateEntryState}
                        value={
                          this.state.UpDataDetails.address
                            ? this.state.UpDataDetails.address
                            : ""
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid className="profileInfoIner">
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} md={8}>
                    <label>{city}</label>
                    <Grid>
                      <Autocomplete
                        value={this.state.city}
                        stateLanguageType={this.props.stateLanguageType}
                        onPlaceChanged={this.updateEntryCity.bind(this)}
                      />{" "}
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label>{postal_code}</label>
                    <Grid>
                      <input
                        type="text"
                        name="pastal_code"
                        onChange={this.updateEntryState}
                        value={
                          this.state.UpDataDetails.pastal_code
                            ? this.state.UpDataDetails.pastal_code
                            : ""
                        }
                      />
                    </Grid>
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
                        onChange={(e) => this.EntryValueName(e, "country")}
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
                                  onChange={(e) => this.EntryValueName(e, 'citizen_country')}
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
                      {this.updateFLAG(this.state.UpDataDetails.phone) &&
                        this.updateFLAG(this.state.UpDataDetails.phone) !==
                        "" && (
                          <ReactFlagsSelect
                            searchable={true}
                            placeholder={country_code}
                            onSelect={(e) => {
                              updateFlags(e, "flag_phone", this);
                            }}
                            name="flag_phone"
                            showSelectedLabel={false}
                            defaultCountry={this.updateFLAG(
                              this.state.UpDataDetails.phone
                            )}
                          />
                        )}
                      <input
                        type="text"
                        className="Mobile_extra"
                        placeholder={phone}
                        name="phone"
                        onChange={this.updateEntryState1}
                        value={
                          this.state.UpDataDetails.phone &&
                          this.updateMOBILE(this.state.UpDataDetails.phone)
                        }
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
                      {this.updateFLAG(this.state.UpDataDetails.mobile) &&
                        this.updateFLAG(this.state.UpDataDetails.mobile) !==
                        "" && (
                          <ReactFlagsSelect
                            searchable={true}
                            placeholder="Country Code"
                            onSelect={(e) => {
                              updateFlags(e, "flag_mobile", this);
                            }}
                            name="flag_mobile"
                            showSelectedLabel={false}
                            defaultCountry={this.updateFLAG(
                              this.state.UpDataDetails.mobile
                            )}
                          />
                        )}
                      <input
                        type="text"
                        className="Mobile_extra"
                        placeholder={mobile}
                        name="mobile"
                        type="text"
                        onChange={this.updateEntryState1}
                        value={
                          this.state.UpDataDetails.mobile &&
                          this.updateMOBILE(this.state.UpDataDetails.mobile)
                        }
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
                    <label>
                      {Languages} {spoken}
                    </label>
                    <Grid >
                      <Select
                        value={this.state.name_multi}
                        name="languages"
                        closeMenuOnSelect={false}
                        onChange={(e) => {
                          handleChange_multi(e, "languages", this);
                        }}
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
            </Grid>
            <Grid className="kycForms sprtImg">
              <Grid item xs={12} md={11}>
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} md={6}>
                  <label>{Chan_Prof_img}</label>
                    <FileUploader
                      name="uploadImage"
                      fileUpload={(e)=>this.fileUpload(e)}
                      isMulti={false}
                      comesFrom="profile"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {this.state.image && this.state.image !== "" && (
                      <img
                        className="ProfileImage"
                        onClick={() => GetUrlImage1(this.state.image)}
                        src={this.state.image}
                        alt=""
                        title=""
                      />
                    )}
                  </Grid>
                </Grid>
                <Grid className="clear"></Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}></Grid>
          <Grid className="clear"></Grid>
        </Grid>

        <Grid className="infoSub">
          <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item xs={12} md={5}>
              <Grid>
                <input
                  type="submit"
                  onClick={() => saveUserData(this, datas)}
                  value={save_change}
                />
              </Grid>
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
  const {
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
  } = state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;
  const { metadata } = state.OptionList;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    metadata,
  };
};
export default withRouter(
  connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, OptionList })(
    Index
  )
);
