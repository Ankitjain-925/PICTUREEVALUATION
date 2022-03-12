import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index"

//For save the opt setting
export const SaveOptSetting = (current) => {
    current.setState({ loaderImage: true });
    const user_token = current.props.stateLoginValueAim.token;
    axios.put(sitedata.data.path + '/UserProfile/Rigt_management', {
        emergency_access: current.state.emergency_access,
        opt: current.state.opt,
        opt_set: current.state.opt_set,
        opt_until: current.state.opt_until
    }, commonHeader(user_token))
        .then((responce) => {
            current.setState({ loaderImage: false });
        })
}
//Get the right Management information from the DB
export const getUserData = (current) => {
    current.setState({ loaderImage: true });
    let user_token = current.props.stateLoginValueAim.token
    let user_id = current.props.stateLoginValueAim.user._id
    axios.get(sitedata.data.path + '/UserProfile/Users/' + user_id, commonHeader(user_token)).then((response) => {
        current.setState({ loaderImage: false });
        if (response) {
            if (response.data.data.Rigt_management[0].activated_general_right) {
                current.setState({ selectedOption: response.data.data.Rigt_management[0].activated_general_right })
            }
            if (response.data.data.Rigt_management[0].emergency_access) {
                current.setState({ emergency_access: response.data.data.Rigt_management[0].emergency_access })
            }
            if (response.data.data.Rigt_management[0].exclude_all_doctors) {
                current.setState({ exclude_doctors: response.data.data.Rigt_management[0].exclude_all_doctors })
            }
            if (response.data.data.Rigt_management[0].who_else_other_than_me) {
                current.setState({ StandardSetting: response.data.data.Rigt_management[0].who_else_other_than_me })
            }
            if (response.data.data.Rigt_management[0].who_else_other_than_me_newEntries) {
                current.setState({ newStandardSetting: response.data.data.Rigt_management[0].who_else_other_than_me_newEntries })
            }
            if (response.data.data.Rigt_management[0].opt) {
                current.setState({ opt: response.data.data.Rigt_management[0].opt })
            }
            if (response.data.data.Rigt_management[0].opt_set) {
                current.setState({ opt_set: response.data.data.Rigt_management[0].opt_set })
            }
            if (response.data.data.Rigt_management[0].opt_until) {
                current.setState({ opt_until: response.data.data.Rigt_management[0].opt_until })
            }
        }
    }).catch((error) => {
        current.setState({ loaderImage: false });
    });
}
//Check all valiedation for the Opt
export const optSettting = (current) => {
    if (current.state.opt_set === 'until') {
        if (current.state.opt_until && current.state.opt_until !== '') {
            SaveOptSetting(current);

        }
        else {
            current.setState({ iserr: true })
        }
    }
    else {
        SaveOptSetting(current);
    }
}

//For update the Date Time when using Until
export const updateDatetime = (str, current) => {
    if (!str || str === 'undefined' || str === null || str === '') {
        return str;
    }
    else {
        var n = str.includes("Z");
        if (n) {
            var t = str.split(":")
            t.pop()
            var re = t.join(":")
            return re;
        }
        else { return str }
    }
}