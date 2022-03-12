import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Currency } from "currency1"
import Loader from 'Screens/Components/Loader/index';
import Select from 'react-select';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import { LanguageFetchReducer } from 'Screens/actions';
import { getLanguage } from "translations/index";
import { getSetting, ChangeFormat, SetFormat } from "./datetimeapi";

var languages = [{ value: 'ar', label: 'Arabian' },
{ value: 'ch', label: 'Chinese' },
{ value: 'nl', label: 'Dutch' },
{ value: 'en', label: 'English' },
{ value: 'fr', label: 'French' },
{ value: 'de', label: 'German' },
{ value: 'pt', label: 'Portuguese' },
{ value: 'rs', label: 'Russian' },
{ value: 'sp', label: 'Spanish' },
{ value: 'sw', label: 'Swahili' },
{ value: 'tr', label: 'Turkish' }]

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Current_state: this.props.LoggedInUser,
            Format: {},
            currency: {},
            dates: this.props.dates,
            times: this.props.times,
            timezones: this.props.timezones,
            loaderImage: false,
            PassDone: false,
            dateF: {},
            timeF: {},
            timezone: {},
        };
    }

    componentDidMount = () => {
        getSetting(this)
    }

  

    render() {
        let { currency } = this.state
        let translate = getLanguage(this.props.stateLanguageType)

        let { date, choose_currency, time, currencyLang, format, SMSEmailLanguage, set_the_default, the, is, updated, save_change, Timezone, time_format, time_zone, date_format } = translate

        return (
            <div>
                {this.state.loaderImage && <Loader />}
                {this.state.PassDone && <div className="success_message">{the} {format} {is} {updated}</div>}
                <Grid>
                    <Grid className="datTimFrmt">
                        <h5>{date} & {time_format}</h5>
                        <p>{set_the_default} {date} & {time_format}</p>
                    </Grid>

                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={4}>
                            <Grid className="dateFormat">
                                <Grid><label>{date_format}</label></Grid>
                                <Grid>
                                    <Select
                                        value={this.state.dateF}
                                        onChange={(e) => ChangeFormat(e, 'date_format', this)}
                                        options={this.state.dates}
                                        placeholder={date_format}
                                        name="date_format"
                                        isSearchable={false}
                                        className="mr_sel"
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="timeFormat">
                                <Grid><label>{time} {format}</label></Grid>
                                <Grid>
                                    <Select
                                        value={this.state.timeF}
                                        onChange={(e) => ChangeFormat(e, 'time_format', this)}
                                        options={this.state.times}
                                        placeholder={time_format}
                                        name="time_format"
                                        isSearchable={false}
                                        className="mr_sel"
                                    />
                                </Grid>
                            </Grid>

                            <Grid className="timeFormat">
                                <Grid><label>{Timezone}</label></Grid>
                                <Grid>
                                    <Select
                                        value={this.state.timezone}
                                        onChange={(e) => ChangeFormat(e, 'timezone',  this)}
                                        options={this.state.timezones}
                                        placeholder={time_zone}
                                        name="timezone"
                                        isSearchable={true}
                                        className="mr_sel"
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="timeFormat">
                                <Grid><label>{SMSEmailLanguage}</label></Grid>
                                <Grid>
                                    <Select
                                        value={this.state.msg_language}
                                        onChange={(e) => ChangeFormat(e, 'msg_language', this)}
                                        options={languages}
                                        placeholder={SMSEmailLanguage}
                                        name="msg_language"
                                        isSearchable={true}
                                        className="mr_sel"
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="timeFormat">
                                <Grid><label>{currencyLang}</label></Grid>
                                <Grid>
                                    <Select
                                        value={currency}
                                        onChange={(e) => ChangeFormat(e, 'currency', this)}
                                        options={Currency}
                                        placeholder={choose_currency}
                                        name="currency"
                                        isSearchable={true}
                                        className="mr_sel"
                                    />
                                </Grid>
                            </Grid>

                            <Grid className="timDatSubmit">
                                <input type="submit" onClick={()=>SetFormat(this)} value={save_change} />
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