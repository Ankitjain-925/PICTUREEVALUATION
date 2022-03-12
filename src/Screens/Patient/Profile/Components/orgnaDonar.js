import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Settings } from 'Screens/Login/setting';
import { LoginReducerAim } from 'Screens/Login/actions';
import { LanguageFetchReducer } from 'Screens/actions';
import Select from 'react-select';
import Loader from 'Screens/Components/Loader/index';
import Radio from '@material-ui/core/Radio';
import ReactFlagsSelect from 'react-flags-select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getLanguage } from "translations/index"
import {updateFLAG, getUserData , saveUserData, Upsaterhesus, handleOptionChange, updateMOBILE, updateEntryState, updateEntryState1, updateFlags, handleChange_multi} from './odapi';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tissue: this.props.tissue,
            loaderImage: false,
            selectedOption: "",
            UpDataDetails: [],
            DonorFamily: [],
            OptionData: {},
            flag_phone: 'DE',
            phone: '',
            include_some: [],
            exclude_some: [],
            PassDone: false,
        };
    }

    componentDidMount() {
        getUserData(this);
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.stateLanguageType !== this.props.stateLanguageType) {
            Upsaterhesus(this.state.exclude_some, 'exclude_some', this);
            Upsaterhesus(this.state.include_some, 'include_some', this);
        }
    }
   
    render() {

        let translate = getLanguage(this.props.stateLanguageType)
        let { free_text, format_updated, YesIherewithagreewitha, followingorgantissues, 
            save_change, first, last, name, street, add, city, postal_code, phone, country_code, 
            mobile_number, allowthisonlyforfollowing, yes_shall_not_decided_by_person, organ_transplant_declaration, blockchain_secure_organ_donar_Pass,
            easily_select_donar, organ_tissue, dont_allow_transplantation } = translate;

        return (
            <div>
                {this.state.loaderImage && <Loader />}
                <Grid>
                    {this.state.PassDone && <div className="success_message">{format_updated}</div>}
                    <Grid className="secureChain">
                        <h4>{blockchain_secure_organ_donar_Pass}</h4>
                        <p>{easily_select_donar}</p>
                    </Grid>

                    <Grid className="organDeclare">
                        <h5>{organ_transplant_declaration}</h5>
                        <Grid><FormControlLabel value="yes_to_all" name="my_choice" checked={this.state.selectedOption === 'yes_to_all'} onChange={(e)=> handleOptionChange(e, this)} control={<Radio />} label={YesIherewithagreewitha} /></Grid>
                        <Grid><FormControlLabel value="exclude_some" name="my_choice" checked={this.state.selectedOption === 'exclude_some'} onChange={(e)=> handleOptionChange(e, this)} control={<Radio />} label={followingorgantissues} /></Grid>
                        <Grid item xs={12} md={5} className="donarLang">
                            <label>{organ_tissue}</label>
                            <Grid>
                                <Select
                                    name="exclude_some"
                                    value={this.state.exclude_some}
                                    onChange={(e) =>handleChange_multi(e, 'exclude_some', this)}
                                    options={this.state.tissue}
                                    placeholder=""
                                    isSearchable={true}
                                    className="cstmSelect1"
                                    isMulti={true}
                                    closeMenuOnSelect={false}
                                />
                            </Grid>
                        </Grid>
                        <Grid><FormControlLabel value="yes" value="include_some" name="my_choice" checked={this.state.selectedOption === 'include_some'} onChange={(e)=>handleOptionChange(e, this)} control={<Radio />} label={allowthisonlyforfollowing} /></Grid>
                        <Grid item xs={12} md={5} className="donarLang">
                            <label>{organ_tissue}</label>
                            <Grid>
                                <Select
                                    name="include_some"
                                    value={this.state.include_some}
                                    onChange={(e) => handleChange_multi(e, 'include_some', this)}
                                    options={this.state.tissue}
                                    placeholder=""
                                    isSearchable={true}
                                    className="cstmSelect1"
                                    isMulti={true}
                                    closeMenuOnSelect={false}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid className="organDecide">
                        <Grid><FormControlLabel value="yes" value="not_allowed" name="my_choice" checked={this.state.selectedOption === 'not_allowed'} onChange={(e)=>handleOptionChange(e, this)} control={<Radio />} label={dont_allow_transplantation} /></Grid>
                        <Grid><FormControlLabel value="yes" value="decided_by_following" color="primary" name="my_choice" checked={this.state.selectedOption === 'decided_by_following'} onChange={(e)=>handleOptionChange(e, this)}  control={<Radio />} label={yes_shall_not_decided_by_person} /></Grid>
                    </Grid>

                    <Grid>
                        <Grid container direction="row" alignItems="center" spacing={2}>
                            <Grid item xs={12} md={this.props.comesFrom ? 12 : 6}>
                                <Grid container direction="row" alignItems="center" spacing={2} className="donarForm">
                                    <Grid item xs={12} md={this.props.comesFrom ? 12 : 6}>
                                        <Grid>
                                            <Grid><label>{first} {name}</label></Grid>
                                            <Grid><input type="text" name="first_name" onChange={(e)=>updateEntryState(e, this)} value={this.state.OptionData && this.state.OptionData.first_name} /></Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={this.props.comesFrom ? 12 : 6}>
                                        <Grid>
                                            <Grid><label>{last} {name}</label></Grid>
                                            <Grid><input type="text" name="last_name" onChange={(e)=>updateEntryState(e, this)} value={this.state.OptionData && this.state.OptionData.last_name} /></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" spacing={2} className="donarForm">
                                    <Grid item xs={12} md={12}>
                                        <Grid>
                                            <Grid><label>{street} {add} </label></Grid>
                                            <Grid><input type="text" name="address" onChange={(e)=>updateEntryState(e, this)} value={this.state.OptionData && this.state.OptionData.address} /></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" spacing={2} className="donarForm">
                                    <Grid item xs={12} md={this.props.comesFrom ? 12 : 7}>
                                        <Grid>
                                            <Grid><label>{city}</label></Grid>
                                            <Grid><input type="text" name="city" onChange={(e)=>updateEntryState(e, this)} value={this.state.OptionData && this.state.OptionData.city} /></Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={this.props.comesFrom ? 12 : 5}>
                                        <Grid>
                                            <Grid><label>{postal_code}</label></Grid>
                                            <Grid><input type="text" name="postal_code" onChange={(e)=>updateEntryState(e, this)} value={this.state.OptionData && this.state.OptionData.postal_code} /></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" spacing={2} className="donarForm">
                                    <Grid item xs={12} md={12}>
                                        <Grid className="OrganMobile">
                                            <Grid><label>{mobile_number}</label></Grid>
                                            <Grid>
                                                {updateFLAG(this.state.OptionData.phone, this) && updateFLAG(this.state.OptionData.phone, this) !== '' &&
                                                    <ReactFlagsSelect searchable={true} placeholder={country_code} onSelect={(e) => { updateFlags(e, 'flag_phone', this) }} name="flag_phone" showSelectedLabel={false} defaultCountry={updateFLAG(this.state.OptionData.phone, this)} />}
                                                <input type="text"
                                                    className="Mobile_extra"
                                                    placeholder={phone}
                                                    name="phone"
                                                    onChange={(e)=>updateEntryState1(e, this)}
                                                    value={this.state.OptionData.phone && updateMOBILE(this.state.OptionData.phone)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" spacing={2} className="donarForm">
                                    <Grid item xs={12} md={12}>
                                        <Grid>
                                            <Grid><label>{free_text}</label></Grid>
                                            <input type="text" name="free_remarks" onChange={(e)=>updateEntryState(e, this)} value={this.state.OptionData && this.state.OptionData.free_remarks} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" spacing={2} className="donarFormSubmit">
                                    <Grid item xs={12} md={12}>
                                        <Grid><input type="submit" onClick={()=>saveUserData(this)} value={save_change} /></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

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
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index));