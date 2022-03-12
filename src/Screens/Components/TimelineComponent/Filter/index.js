import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "react-select";
import { DatePicker } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { Settings } from "Screens/Login/setting";
import sitedata from "sitedata";
import { LoginReducerAim } from "Screens/Login/actions";
import { overView } from "Screens/Login/journalviewaction";
import { LanguageFetchReducer } from "Screens/actions";
import Loader from "Screens/Components/Loader/index.js";
import { getLanguage } from "translations/index"
import Toggle from "react-toggle";
import { commonHeader } from "component/CommonHeader/index"
const { RangePicker } = DatePicker;

class FilterSec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      sortBy: this.props.sortBy,
      selectUser: [],
      selectType: [],
      selectFacility: [],
      time_range: [],
      isTest: false,
      onlyOverview: this.props.Overview,
      loaderImage: false
    };
  }

  //Call filter props
  OnChangeFilter = () => {
    this.props.FilterData(
      this.state.time_range,
      this.state.selectUser,
      this.state.selectType,
      this.state.selectFacility
    );
  };

  handleChange = (search) => {
    this.setState({ searchText: search }, () => {
      if (this.state.searchText === "") {
        this.props.ClearData();
      } else {
        this.props.FilterText(this.state.searchText);
      }
    });
  };
  //Change the state in change the data
  FilterAccordigly = (name, value) => {
    if (name === "time_range") {
      this.setState({ time_range: value }, () => {
        this.OnChangeFilter();
      });
    }
    if (name === "selectUser") {
      this.setState({ selectUser: value }, () => {
        this.OnChangeFilter();
      });
    }
    if (name === "selectType") {
      this.setState({ selectType: value }, () => {
        this.OnChangeFilter();
      });
    }
    if (name === "selectFacility") {
      this.setState({ selectFacility: value }, () => {
        this.OnChangeFilter();
      });
    }
  };
  //For clear Filter
  ClearData = () => {
    this.setState({
      selectUser: [],
      selectType: [],
      selectFacility: [],
      time_range: [],
    });
    this.props.ClearData();
  };

   //For getting the existing settings
   getSetting =()=>{
    this.setState({ loaderImage : true})
    axios.get(sitedata.data.path + '/UserProfile/updateSetting',
    commonHeader(this.props.stateLoginValueAim.token)   
    ).then((responce) => {
        if(responce.data.hassuccessed && responce.data.data)
        {
            this.setState({onlyOverview : responce.data.data.onlyOverview})
            if(responce?.data?.data?.onlyOverview){
              this.props.overView(responce?.data?.data?.onlyOverview);
            }
            else{
              this.props.overView(false);
            }
        }
        else{
            this.props.Settings({user_id : this.props.stateLoginValueAim.user._id}); 
        }
        this.setState({ loaderImage : false})  
    })   
}

  //For set the Overview Mode
  SetonlyOverview = () => {
    let onlyOverview = this.state.onlyOverview ? false : true;
    this.setState({ loaderImage: true, onlyOverview: onlyOverview }, () => {
      axios
        .put(
          sitedata.data.path + "/UserProfile/updateSetting",
          {
            onlyOverview: this.state.onlyOverview,
            user_id: this.props.stateLoginValueAim.user._id,
            user_profile_id: this.props.stateLoginValueAim.user.profile_id,
          },
          commonHeader(this.props.stateLoginValueAim.token)
        )
        .then((responce) => {
          setTimeout(()=>{this.setState({ loaderImage: false });}, 3000) 
          this.getSetting();
        });
    });
  };
  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.sortBy !== this.props.sortBy) {
      this.setState({ sortBy: this.props.sortBy });
    }
    if (prevProps.stateLanguageType !== this.props.stateLanguageType) {
      this.languageChangeState();
    }
  };
  componentDidMount = () => {
    this.languageChangeState();
  };

  languageChangeState() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      diary,
      diagnosis,
      VaccinationTrial,
      family_anmnies,
      covid_diary,
      secnd_openion,
      sick_cert,
      smoking_status,
      weight_bmi,
      vaccination,
      doc_visit,
      marcumar_pass,
      medication,
      prescription,
      file_uplod,
      hosp_visit,
      lab_result,
      capab_Doctors1,
      capab_Patients1,
      Nurse1,
      anamnesis,
      blood_pressure,
      blood_sugar,
      condition_pain,
      respiration,
      long_covid,
      Admin_staff
    } = translate;

    const Useroptions = [
      { value: "Doctor", label: capab_Doctors1 },
      { value: "Patient", label: capab_Patients1 },
      { value: "Nurse", label: Nurse1 },
      { value: "Adminstaff", label: Admin_staff },
    ];
   
    const Typeoptions = [
     
      { value: "anamnesis", label: anamnesis },
      { value: "blood_pressure", label: blood_pressure },
      { value: "blood_sugar", label: blood_sugar },
      { value: "condition_pain", label: condition_pain },
      { value: "covid_19", label: covid_diary },
      { value: "vaccination_trial", label: VaccinationTrial },
      { value: "diagnosis", label: diagnosis },
      { value: "diary", label: diary },
      { value: "doctor_visit", label: doc_visit },
      { value: "family_anamnesis", label: family_anmnies },
      { value: "file_upload", label: file_uplod },
      { value: "hospitalization", label: hosp_visit },
      { value: "laboratory_result", label: lab_result },
      { value: "long_covid", label: long_covid },
      { value: "marcumar_pass", label: marcumar_pass },
      { value: "medication", label: medication },
      { value: "prescription", label: prescription },
      { value: "respiration", label: respiration },
      { value: "second_opinion", label: secnd_openion },
      { value: "sick_certificate", label: sick_cert },
      { value: "smoking_status", label: smoking_status },
      { value: "vaccination", label: vaccination },
      { value: "weight_bmi", label: weight_bmi },
      
    ];
    
    this.setState({ Useroptions: Useroptions, Typeoptions: Typeoptions });
  }


  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      type,
      user_type_all,
      clear_filter,
      StartDate,
      EndDate,
      search_timeline,
      sort_by,
      showOnlyOverview,
      dig_time,
      entry_time,
    } = translate;

    return (
      <Grid container direction="row">
           {this.state.loaderImage && <Loader />}
        <Grid item xs={12} md={11}>
          <Grid className="srchFilter 22 ">
        
            {!this.state.isTest && (
              <Grid container direction="row">
                <Grid item xs={12} md={6} lg={4}>
                  <RangePicker
                    placeholder={[StartDate, EndDate]}
                    className={
                      this.state.time_range && this.state.time_range.length > 0
                        ? "typeSel1 comonSel "
                        : "allTimeSel1 comonSel"
                    }
                    onChange={(value) =>
                      this.FilterAccordigly("time_range", value)
                    }
                    value={this.state.time_range}
                     dropdownClassName = {this.props.settings &&
                    this.props.settings.setting &&
                    this.props.settings.setting.mode &&
                    this.props.settings.setting.mode === "dark"
                    ? "dropdown-class-name-3"
                    : ""}
                  />
                  {/* <Select
                          value={this.state.selectedOption}
                          onChange={this.handleChange}
                          options={options}
                          placeholder="All time"
                          className="allTimeSel comonSel"
                          isMulti= {true}
                          isSearchable={false}
                          closeMenuOnSelect={false}
                      /> */}
                </Grid>
                
                <Grid item xs={12} md={6} lg={3}>
                 
                  <Select
                    value={this.state.selectType}
                    onChange={(value) => this.FilterAccordigly("selectType", value) }
                    options={this.state.Typeoptions}
                    placeholder={type}
                    name=""
                    className={
                      this.state.selectType && this.state.selectType.length > 0
                        ? "typeSel comonSel"
                        : " comonSel"
                    }
                    isMulti={true}
                    closeMenuOnSelect={false}
                     dropdownClassName = {this.props.settings &&
                    this.props.settings.setting &&
                    this.props.settings.setting.mode &&
                    this.props.settings.setting.mode === "dark"
                    ? "dropdown-class-name-3"
                    : ""}
                  />
               
                </Grid>
              
                <Grid item xs={12} md={6} lg={3} >
                  <Select
                    value={this.state.selectUser}
                    onChange={(value) =>
                      this.FilterAccordigly("selectUser", value)
                    }
                    options={this.state.Useroptions}
                    placeholder={user_type_all}
                    className={
                      this.state.selectUser && this.state.selectUser.length > 0
                        ? "typeSel comonSel"
                        : " comonSel"
                    }
                    isMulti={true}
                    closeMenuOnSelect={false}
                    //isSearchable = {false}
                  />
                </Grid>
                {/* <Grid item xs={12} md={1}
                    // className="faclity_all"
                    >
                        <Select
                            value={this.state.selectFacility}
                              onChange={(value)=>this.FilterAccordigly("selectFacility", value)}
                            options={options}
                            placeholder="Facility: All"
                            className="allTimeSel comonSel"
                            isMulti= {true}
                            closeMenuOnSelect={false}
                            // isSearchable = {false}
                        />
                    </Grid> */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={2}
                  // className="clear_filter"
                >
                  <Grid className="clear_filterUpr ">
                    <Grid className="clear_filterLft ">
                      <a onClick={this.ClearData}>{clear_filter}</a>
                    </Grid>
                    <Grid
                      className="clear_filterRght "
                      onClick={() => {
                        this.setState({ isTest: true });
                      }}
                    >
                      <a>
                        <img
                          src={require("assets/images/search-entries.svg")}
                          alt=""
                          title=""
                        />
                      </a>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className="clear"></Grid>
              </Grid>
            )}
            {this.state.isTest && (
              <Grid container direction="row">
                <Grid item xs={12} md={11}>
                  <input
                    type="text"
                    className="searchbyText"
                    placeholder={search_timeline}
                    value={this.state.searchText}
                    onChange={(e) => this.handleChange(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <Grid className="clear_filterUpr">
                    <Grid
                      className="trstCloseBtn"
                      onClick={() => { this.setState({ isTest: false }); this.props.ClearData(); }}>
                      <a><img src={require("assets/images/close-search.svg")} alt="" title="" /></a>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className="clear"></Grid>
              </Grid>
            )}
            <Grid className="sortBySec acvtTogle">
              <label>{showOnlyOverview} :</label>
              <label>
                <Toggle
                  icons={false}
                  checked={this.state.onlyOverview === true}
                  name="onlyOverview"
                  onClick={(e) => this.SetonlyOverview(e)}
                />
              </label>
              <label>{sort_by} :</label>
              <input
                type="button"
                value={entry_time}
                onClick={() => {
                  this.props.SortData("entry_time");
                }}
                className={
                  this.state.sortBy === "entry_time"
                    ? "entrTimeBY"
                    : "diagTimeBY"
                }
              />
              <input
                type="button"
                value={dig_time}
                onClick={() => {
                  this.props.SortData("diagnosed_time");
                }}
                className={
                  this.state.sortBy === "diagnosed_time"
                    ? "entrTimeBY"
                    : "diagTimeBY"
                }
              />
            </Grid>
          </Grid>
        </Grid>
        </Grid>
   
    );
  }
}

const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  const {
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
  } = state.LoginReducerAim;
  const { Overview } = state.overView;
  const { settings } = state.Settings;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    Overview,
    settings
  };
};
export default withRouter(
  connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, overView, Settings })(
    FilterSec
  )
);
// export default FilterSec;
