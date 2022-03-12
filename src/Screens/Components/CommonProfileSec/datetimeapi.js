import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index"
import { Currency } from "currency1"

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

 //For getting the existing settings
 export const getSetting = (current) => {
    current.setState({ loaderImage: true })
    axios.get(sitedata.data.path + '/UserProfile/updateSetting',
        commonHeader(current.props.stateLoginValueAim.token))
        .then((responce) => {
            if (responce.data.hassuccessed && responce.data.data) {
                if (responce.data?.data?.msg_language) {
                    let msg_language = responce.data.data.msg_language;
                    let filterData = languages && languages.length > 0 && languages.filter((data) => data.value === msg_language)
                    if (filterData && filterData.length > 0) {
                        current.setState({ msg_language: filterData[0] })
                    }
                }
                if (responce.data?.data?.currency) {
                    let currency = responce.data.data.currency;
                    let filterData = Currency && Currency.length > 0 && Currency.filter((data) => data.value === currency.country)
                    if (filterData && filterData.length > 0) {
                        current.setState({ currency: filterData[0] })
                    }
                }
                current.setState({ timezone: responce.data.data.timezone, timeF: { label: responce.data.data.time_format, value: responce.data.data.time_format }, dateF: { label: responce.data.data.date_format, value: responce.data.data.date_format }, })
                current.props.Settings(responce.data.data);
            }
            else {
                current.props.Settings({ user_id: current.props.stateLoginValueAim.user._id });
            }
            current.setState({ loaderImage: false })
        })
}

//For Change Format State
export const ChangeFormat = (event, name, current) => {
    if (name === 'date_format') { current.setState({ dateF: event }) }
    else if (name === 'timezone') { current.setState({ timezone: event }) }
    else if (name === 'msg_language') { current.setState({ msg_language: event }) }
    else if (name === 'currency') {
        current.setState({ currency: event })
    }
    else { current.setState({ timeF: event }) }
    const state = current.state.Format;
    if (name === 'timezone') { state[name] = event }
    else { state[name] = event && event.value; }
    current.setState({ Format: state })
}

//For Set Format
export const SetFormat = (current) => {
    current.setState({ loaderImage: true })
    let { currency } = current.state
    let data = {
        country: currency.value,
        currency: currency.label
    }
    axios.put(sitedata.data.path + '/UserProfile/updateSetting', {
        date_format: current.state.Format.date_format,
        time_format: current.state.Format.time_format,
        timezone: current.state.Format.timezone,
        msg_language: current.state.Format.msg_language,
        user_id: current.props.LoggedInUser._id,
        user_profile_id: current.props.LoggedInUser.profile_id,
        currency: data
    }, commonHeader(current.props.stateLoginValueAim.token)
    ).then((responce) => {
        current.setState({ PassDone: true, loaderImage: false })
        getSetting(current);
        setTimeout(() => { current.setState({ PassDone: false }) }, 5000)
    })
}