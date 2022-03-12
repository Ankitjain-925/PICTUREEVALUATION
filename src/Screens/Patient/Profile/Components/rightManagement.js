import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import { LanguageFetchReducer } from 'Screens/actions';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Loader from 'Screens/Components/Loader/index';
import DateFormat from 'Screens/Components/DateFormat/index'
import { getLanguage } from "translations/index"
import {updateDatetime, optSettting, getUserData} from './rmapi';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
            Language: [],
            loaderImage: false,
            selectedOption: "",
            emergency_access: '',
            exclude_doctors: '',
            StandardSetting: {},
            newStandardSetting: {},
            opt: '',
            opt_set: '',
            opt_until: '',
            iserr: false,
        };
    }

    componentDidMount() {
        getUserData(this);
    }

    //Set the emergency access state
    handleemergency_access(changeEvent) {
        this.setState({ emergency_access: changeEvent.target.value });
    }

    // On change the Date
    onChange = (date) => {
        this.setState({ opt_until: date })
    }

    render() {
        let translate = getLanguage(this.props.stateLanguageType)
        let { right_management, setup_who_can_see_upload_data, emergancy_access_for_hospital_doc, specify_kind_of_right_management,
            automatically_visible_content, automatically_hidden_content, Opt_In, Opt_Out, apply_right_management_for_all_items,
            Yes, No, plz_mention_date_time, make_all_item_visible_now_untill, make_all_item_hide_now_untill, make_all_item_hide_untill, make_all_item_visible_untill, save_change } = translate

        return (
            <div>
                {this.state.loaderImage && <Loader />}
                <Grid container direction="row" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Grid className="rghtMgnt">
                            <h5>{right_management}</h5>
                            <p>{setup_who_can_see_upload_data}</p>
                        </Grid>

                        <Grid className="emrgncyAccess">
                            <p>{emergancy_access_for_hospital_doc}</p>
                            <Grid>
                                <FormControlLabel value="yes" name="emergency_access" checked={this.state.emergency_access === 'yes'} onChange={this.handleemergency_access.bind(this)} control={<Radio />} label={Yes} />
                                <FormControlLabel value="no" name="emergency_access" checked={this.state.emergency_access === 'no'} onChange={this.handleemergency_access.bind(this)} control={<Radio />} label={No} />
                            </Grid>
                        </Grid>

                        <Grid className="otpAccess">
                            <h5>{specify_kind_of_right_management}</h5>
                            <Grid>
                                <FormControlLabel checked={this.state.opt === 'in'} value='in' onChange={(e) => { this.setState({ opt: e.target.value }) }} name="opt" control={<Radio />} label={Opt_In} />
                                <p>{automatically_hidden_content}</p>
                                <FormControlLabel checked={this.state.opt === 'out'} value='out' onChange={(e) => { this.setState({ opt: e.target.value }) }} name="opt" control={<Radio />} label={Opt_Out} />
                                <p>{automatically_visible_content}</p>
                            </Grid>
                        </Grid>

                        <Grid className="spcifyKind">
                            <h5>{apply_right_management_for_all_items}</h5>
                            {this.state.iserr && <div className="err_message">{plz_mention_date_time}</div>}
                            <Grid><FormControlLabel onChange={(e) => { this.setState({ opt_set: e.target.value }) }}
                                value='always' checked={this.state.opt_set === 'always'} control={<Radio />} label={this.state.opt === 'out' ? make_all_item_visible_now_untill : make_all_item_hide_now_untill} /></Grid>
                            <Grid>
                                <FormControlLabel onChange={(e) => { this.setState({ opt_set: e.target.value }) }}
                                    value='until' checked={this.state.opt_set === 'until'} control={<Radio />} label={this.state.opt === 'out' ? make_all_item_visible_untill : make_all_item_hide_untill} />
                                <Grid className="vsblAllTim">
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item xs={12} md={8}>
                                            <DateFormat name="opt_until" value={this.state.opt_until ? new Date(this.state.opt_until) : new Date()} onChange={this.onChange} date_format={this.props.settings.setting && this.props.settings.setting.date_format} onChange={this.onChange} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={12} md={8} className="rghtMgntBtn">
                                <input type="submit" onClick={()=>optSettting(this)} value={save_change} />
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