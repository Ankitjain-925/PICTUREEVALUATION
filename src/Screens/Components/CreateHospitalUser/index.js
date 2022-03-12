import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Select from 'react-select';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import 'react-flags-select/scss/react-flags-select.scss';
import { connect } from "react-redux";
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from 'Screens/actions';
import Checkbox from '@material-ui/core/Checkbox';
import sitedata from 'sitedata';
import axios from "axios"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import contry from '../countryBucket/countries.json';
import Loader from '../Loader/index';
import {updateCometUser} from "Screens/Components/CommonApi/index";
import { commonHeader, commonCometHeader } from "component/CommonHeader/index"
import { getLanguage } from "../../hospital_Admin/translations/index";
// import * as translationEN from '../../hospital_Admin/translations/en_json.json';
// import * as translationDE from "../../hospital_Admin/translations/de.json"

const specialistOptions = [
    {label : 'Patient', value : 'patient'},
    {label : 'Doctor', value : 'doctor'},
    {label : 'Nurse', value : 'nurse'},
    {label : 'Admin staff', value : 'adminstaff'},
]
const specialistOptionsGerman = [
    {label : 'Geduldig', value : 'patient'},
    {label : 'Ärztin', value : 'doctor'},
    {label : 'Krankenschwester', value : 'nurse'},
    {label : 'Verwaltungspersonal', value : 'adminstaff'},
]
//Values for the validate Password
var letter = /([a-zA-Z])+([ -~])*/, number = /\d+/, specialchar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addCreate: this.props.addCreate,
            openBy : this.props.openBy,
            specialistOption: {},
            CreateUsers: {}, 
            confirmPass : '',
            hidden: true,
            hidden_confirm: true,
            SelectHospital : {},
            getHintInstitute: [],
            getHintInstitute1: [],
            error_msg : '',
            regisError0 : ''
        };
    }

    getAllinst=()=>{
        var user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/admin/GetHintinstitute',
        commonHeader(user_token))
        .then((response) => {
            this.setState({getHintInstitute: response.data.data, getHintInstitute1 : response.data.data})
        }).catch((error) => {});
    }
    //For close the pop up
    handleCloseCreate=()=>{
        this.setState({ CreateUsers: {} });
        this.props.handleCloseCreate();
    }
    // For set the value for the new entry
    handleChangeEntry=(value)=>{
        this.props.onChange(value);   
    }
    //For show or hide the Password
    toggleShow=()=> {
        this.setState({ hidden: !this.state.hidden });
    }
    toggleShow1=()=> {
        this.setState({ hidden_confirm: !this.state.hidden_confirm });
    }

    //on adding new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.addCreate !== this.props.addCreate) {
           this.setState({addCreate : this.props.addCreate})
        }
        if(prevProps.openBy !== this.props.openBy){
            this.setState({openBy : this.props.openBy})
        }
    }

    //Manage the state of the User
    CreateUserState = (e) => {
        if(e.target.name === 'confirm_password'){
            this.setState({confirmPass : e.target.value})
        }
        const state = this.state.CreateUsers
        if (e.target.name === 'is2fa') {
            state[e.target.name] = e.target.checked;
        }
        else{
            state[e.target.name] = e.target.value;
        }
        this.setState({ CreateUsers: state });
    }
    //Manage the state of the User
    CreateUserState1 = (type) => {
        const state = this.state.CreateUsers
        state['type'] = type.value;
        this.setState({ CreateUsers: state, specialistOption : type });
    }
    

    componentDidMount = () => {
        if(this.props.openBy ==='patient')
        {
            this.setState({specialistOption :  {label :  this.props.stateLanguageType==='en' ?'Patient': 'Geduldig', value : 'patient'}, CreateUsers : {type: 'patient'}})
        }
        if(this.props.openBy ==='doctor')
        {
            this.setState({specialistOption :  {label :  this.props.stateLanguageType==='en' ?'Doctor': 'Ärztin', value : 'doctor'}, CreateUsers : {type: 'doctor'}})
        }
        if(this.props.openBy ==='nurse')
        {
            this.setState({specialistOption :  {label : this.props.stateLanguageType==='en' ?'Nurse':'Krankenschwester', value : 'nurse'}, CreateUsers : {type: 'nurse'}})
        }
        if(this.props.openBy ==='adminstaff')
        {
            this.setState({specialistOption :  {label : this.props.stateLanguageType==='en' ?'Admin staff':'Verwaltungspersonal', value : 'adminstaff'}, CreateUsers : {type: 'adminstaff'}})
        }
        this.getAllinst();
    }


     //For validate the email is correct or not
     validateEmail = (elementValue) => {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue);
    }

     //For save data of user
     saveUserData=()=> {
        var UserType = this.state.CreateUsers.type;
        var user_token = this.props.stateLoginValueAim.token;
        this.setState({ regisError0: '', error_msg: '' })
        if (this.state.CreateUsers.first_name && this.state.CreateUsers.last_name && this.state.CreateUsers.first_name !== '' && this.state.CreateUsers.last_name !== '') {
            if (this.validateEmail(this.state.CreateUsers.email)) {
                if (this.state.CreateUsers && this.state.CreateUsers.password && this.state.CreateUsers.password.match(letter) && this.state.CreateUsers.password.match(number) && this.state.CreateUsers.password.match(specialchar)) {
                   if(this.state.CreateUsers && this.state.CreateUsers.password && this.state.CreateUsers.password === this.state.confirmPass){
                    if (this.state.CreateUsers.mobile && this.state.CreateUsers.mobile !== '') {
                        if (this.state.CreateUsers.type && this.state.CreateUsers.type !=='') {
                            var datas = this.state.getHintInstitute && this.state.getHintInstitute.length>0 && this.state.getHintInstitute.filter((value, key) =>
                            value.created_by === this.props.stateLoginValueAim.user._id);
                            if(datas && datas.length>0)
                            {
                                var institute_id = datas[0]._id;
                                var institute_name = datas[0].institute_name;
                            } 
                            var parent_id =  this.props.stateLoginValueAim.user._id
                            if (this.state.CreateUsers.country_code) {
                                var country_code = this.state.CreateUsers.country_code
                            }
                            else {
                                var country_code = 'de'
                            }
                            var getBucket = contry && contry.length > 0 && contry.filter((value, key) =>
                                value.code === country_code.toUpperCase());
                          
                                this.setState({loaderImage: true})
                                axios.post(sitedata.data.path + '/admin/Addadminuser',
                                {
                                    type: this.state.CreateUsers.type,
                                    email: this.state.CreateUsers.email,
                                    password: this.state.CreateUsers.password,
                                    country_code: country_code,
                                    mobile: this.state.CreateUsers.mobile,
                                    is2fa: this.state.CreateUsers.is2fa,
                                    lan: this.props.stateLanguageType,
                                    first_name: this.state.CreateUsers.first_name,
                                    last_name: this.state.CreateUsers.last_name,
                                    bucket: getBucket[0].bucket,
                                    parent_id : parent_id,  
                                    institute_name : institute_name, 
                                    department : this.state.CreateUsers.department, 
                                    institute_id : institute_id
                                }
                                ,  commonHeader(user_token))
                                .then((response) => {
                                    if (response.data.hassuccessed) {
                                            axios.post('https://api-eu.cometchat.io/v2.0/users',{
                                                uid        :   response.data.data.profile_id,
                                                name       :   response.data.data.first_name+' '+response.data.data.last_name
                                            },
                                            commonCometHeader())
                                            .then((res)=>{
                                                updateCometUser({
                                                    uid        :   response.data.data.profile_id.toLowerCase(),
                                                    name       :   response.data.data.first_name+' '+response.data.data.last_name,
                                                    role: "default"
                                                  })
                                            })
                                            setTimeout(
                                                 () =>{
                                                    this.setState({ loaderImage: false });
                                                    this.setState({ CreateUsers: {} });
                                                    this.props.handleCloseCreate();
                                                    if(UserType ==='patient'){this.props.history.push("/h-patients")}
                                                    else if(UserType ==='doctor'){this.props.history.push("/h-doctors")}
                                                    else if(UserType ==='nurse'){this.props.history.push("/h-nurses")}
                                                    else if(UserType ==='adminstaff'){this.props.history.push("/h-staff")}
                                                },2000
                                            )
                                        }
                                        else{
                                            this.setState({ loaderImage: false, regisError0: response.data.msg }) 
                                        }
                                    })
                        }
                        else { this.setState({ regisError0: "Please select user type" }) }
                    }
                    else { this.setState({ regisError0: "Please fill mobile number" }) }

                   }
                   else{ this.setState({ regisError0: "Password and confirm password is not matching"  })}
                }
                else { this.setState({ regisError0: "Password is not valid" }) }
            }
            else { this.setState({ regisError0: "E-mail is not valid" }) }
        }
        else { this.setState({ regisError0: 'Please fill the full name of user' }) }
    }


    //For select the country code Flag
    onSelectFlag = (countryCode) => {
        const state = this.state.CreateUsers
        state['country_code'] = countryCode.toLowerCase();
        this.setState({ CreateUsers: state });
    }

    //For cancel the User
    CreateUserCancel=() =>{
        this.setState({ CreateUsers: {} });
        this.props.handleCloseCreate();
    }

    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let { mobile_number, New, entry, select, two_fac_auth_enable, recEmp_Email, create, user, type, email, current_pass, Register_characters,Register_Passwordshould, Register_letter,
             Register_number, Register_special, confirm_pass, recEmp_FirstName, recEmp_LastName, we_use_authy, two_fac_auth, cancel, Institute_name, hospital  }= translate
        return (
            <div>
            {this.state.loaderImage && <Loader />}
            <Modal
            open={this.state.addCreate}
            onClose={this.handleCloseCreate}>
                 <Grid  className={
        this.props.settings &&
        this.props.settings.setting &&
        this.props.settings.setting.mode &&
        this.props.settings.setting.mode === "dark"
          ? "nwEntrCntnt HospitalAdd darkTheme"
          : "nwEntrCntnt HospitalAdd"
      }
      >

                <Grid className="nwEntrCntntIner ">
                    <Grid className="nwEntrCourse">
                        <Grid className="nwEntrCloseBtn nwEntrCloseBtnAdd">
                            <a onClick={this.handleCloseCreate}>
                                <img src={require('assets/images/close-search.svg')} alt="" title="" />
                            </a>
                        </Grid>
                        <p>{New} {entry}</p>
                        <Grid><label>{create} {New} {user}</label></Grid>
                    </Grid>
                    <div className="err_message">
                        {this.state.regisError0}
                        {this.state.error_msg}
                    </div>
                    <div className="success_message">
                        {this.state.registerMessage}
                    </div>
                    <Grid className="docHlthMain  ">
                    <Grid className="spclQues">
                        <Grid className="spclQuesIner ">
                            <Grid><label>{user} {type}</label></Grid>
                            <Grid  className="spclQuesIner darkTh addStafSelect div darkTh2">
                                <Select
                                    value={this.state.specialistOption}
                                    onChange={this.CreateUserState1}
                                    options={this.props.stateLanguageType === 'en' ? specialistOptions: specialistOptionsGerman}
                                    placeholder={select}
                                    isSearchable={false}
                                    isMulti={false}
                                    name="type"
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid className="emlCreatSub">
                        <Grid><label>{email}</label></Grid>
                        <Grid><input type="text" name="email" placeholder={recEmp_Email} value={this.state.CreateUsers.email} onChange={this.CreateUserState} /></Grid>
                    </Grid>
                    <Grid className="emlCreatSub">
                        <Grid><label>{current_pass}</label></Grid>
                        <Grid className="registerPass">
                                    <input
                                        type={this.state.hidden ? "password" : "text"}
                                        name="password"
                                        value={this.state.CreateUsers.password} onChange={this.CreateUserState}
                                    />
                                    {this.state.hidden &&
                                        <a onClick={this.toggleShow}>
                                            <img src={require('assets/images/showeye.svg')} alt="" title="" />
                                        </a>
                                    }
                                    {!(this.state.hidden) &&
                                        <a onClick={this.toggleShow}>
                                            <img src={require('assets/images/hide.svg')} alt="" title="" />
                                        </a>
                                    }
                                </Grid>
                    </Grid>
                    {this.state.CreateUsers && this.state.CreateUsers.password ?
                    <div className="passInst">
                        <div className="passInstIner">
                            <p>{Register_Passwordshould}</p>
                            <ul>
                                <li>{this.state.CreateUsers && this.state.CreateUsers.password && this.state.CreateUsers.password.length > 8 && <a><img src={require('assets/images/CheckCircle.svg')} alt="" title="" />{Register_characters}</a>}
                                    {this.state.CreateUsers && this.state.CreateUsers.password && this.state.CreateUsers.password.length <= 8 && <a><img src={require('assets/images/CloseCircle.svg')} alt="" title="" />{Register_Passwordshould}</a>}
                                </li>
                                <li>{this.state.CreateUsers && this.state.CreateUsers.password && !this.state.CreateUsers.password.match(letter) && <a><img src={require('assets/images/CloseCircle.svg')} alt="" title="" />{Register_letter}</a>}
                                    {this.state.CreateUsers && this.state.CreateUsers.password && this.state.CreateUsers.password.match(letter) && <a><img src={require('assets/images/CheckCircle.svg')} alt="" title="" />{Register_letter}</a>}
                                </li>
                                <li>{this.state.CreateUsers && this.state.CreateUsers.password && !this.state.CreateUsers.password.match(number) && <a><img src={require('assets/images/CloseCircle.svg')} alt="" title="" />{Register_number}</a>}
                                    {this.state.CreateUsers && this.state.CreateUsers.password && this.state.CreateUsers.password.match(number) && <a><img src={require('assets/images/CheckCircle.svg')} alt="" title="" />{Register_number}</a>}
                                </li>
                                <li>
                                    {this.state.CreateUsers && this.state.CreateUsers.password && !this.state.CreateUsers.password.match(specialchar) && <a><img src={require('assets/images/CloseCircle.svg')} alt="" title="" />{Register_special}</a>}
                                    {this.state.CreateUsers && this.state.CreateUsers.password && this.state.CreateUsers.password.match(specialchar) && <a><img src={require('assets/images/CheckCircle.svg')} alt="" title="" />{Register_special}</a>}
                                </li>
                            </ul>
                        </div>
                    </div>
                    : <div className="passInst">
                        <div className="passInstIner">
                            <p>{Register_Passwordshould}</p>
                            <ul>
                                <li><a><img src={require('assets/images/CloseCircle.svg')} alt="" title="" />{Register_characters}</a></li>
                                <li><a><img src={require('assets/images/CloseCircle.svg')} alt="" title="" />{Register_letter}</a></li>
                                <li><a><img src={require('assets/images/CloseCircle.svg')} alt="" title="" />{Register_number}</a></li>
                                <li><a><img src={require('assets/images/CloseCircle.svg')} alt="" title="" />{Register_special}</a></li>
                            </ul>
                        </div>
                    </div>}
                    <Grid className="emlCreatSub">
                        <Grid><label>{confirm_pass}</label></Grid>
                        <Grid className="registerPass">
                            <input
                                type={this.state.hidden_confirm ? "password" : "text"}
                                name="confirm_password"
                                value={this.state.confirmPass} onChange={this.CreateUserState}
                            />
                            {this.state.hidden_confirm &&
                                <a onClick={this.toggleShow1}>
                                    <img src={require('assets/images/showeye.svg')} alt="" title="" />
                                </a>
                            }
                            {!(this.state.hidden_confirm) &&
                                <a onClick={this.toggleShow1}>
                                    <img src={require('assets/images/hide.svg')} alt="" title="" />
                                </a>
                            }
                        </Grid>
                    </Grid>
                    <Grid className="emlCreatSub">
                        <Grid><label>{recEmp_FirstName}</label></Grid>
                        <Grid><input type="text" name="first_name" value={this.state.CreateUsers.first_name} onChange={this.CreateUserState} /></Grid>
                    </Grid>

                    <Grid className="emlCreatSub">
                        <Grid><label>{recEmp_LastName}</label></Grid>
                        <Grid><input type="text" name="last_name" value={this.state.CreateUsers.last_name} onChange={this.CreateUserState} /></Grid>
                    </Grid>
                    <Grid className="twoWayAuth">
                        <h2>{two_fac_auth}</h2>
                        <p>{we_use_authy}</p>
                        <Grid className="twoWayAuthChk">
                            <FormControlLabel
                                    control={<Checkbox value="checkedA" onChange={this.handleChange}
                                    name="is2fa" />}
                                label={two_fac_auth_enable}
                            />
                        </Grid>
                    </Grid>
                    <Grid className="emlCreatSub">
                        <label>{mobile_number}</label>
                        <Grid className="showflags">
                            <ReactFlagsSelect  searchable={true} name="country_code" onSelect={this.onSelectFlag} showSelectedLabel={false} defaultCountry="DE" />
                            <input type="text" className="mobileReg" name="mobile" value={this.state.CreateUsers.mobile} onChange={this.CreateUserState} />
                        </Grid>
                    </Grid>
                   
                    </Grid>
                    <Grid className="infoShwHidIner21">
                        <Grid className="creatInfo">
                            <Grid container direction="row" justify="center" alignItems="center">
                                <Grid item xs={6} md={6} className="creatInfoLft">
                                    <a onClick={this.saveUserData}>{create}</a>
                                </Grid>
                                <Grid item xs={6} md={6} className="creatInfoRght">
                                    <a onClick={this.CreateUserCancel}>{cancel}</a>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
             </Grid>
        </Modal>
        </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim ? state.LoginReducerAim : {};
    const { stateLanguageType } = state.LanguageReducer;
     const { settings } = state.Settings;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index));