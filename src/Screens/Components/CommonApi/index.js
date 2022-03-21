import axios from "axios";
import sitedata from "sitedata";
import moment from "moment"
import { commonHeader } from "component/CommonHeader/index"

export const updateCometUser = async (data) => {
    let response = await axios.post(sitedata.data.path + "/cometUserList",
        data)
    if (response.data.hassuccessed) {
        return response
    } else {
        return false
    }
}

export const update_CometUser = async (uid, data) => {
    let response = await axios.put(sitedata.data.path + "/cometUserList/" + uid, data)
    if (response.data.hassuccessed) {
        return response
    } else {
        return false
    }
}

export const get_gender = async (user_token, user_id) => {
    let response = await axios.get(sitedata.data.path + "/User/Get_patient_gender/" + user_id,
        commonHeader(user_token))
    if (response.data.hassuccessed === true) {
        return response.data.data
    } else {
        return false
    }
}

export const get_cur_one = async (user_token, user_id) => {
    let response = await axios.get(sitedata.data.path + "/UserProfile/Users/" + user_id,
        commonHeader(user_token)
    )
    if (response.data.hassuccessed) {
        return response
    } else {
        return false
    }
}

export const get_personalized = async (user_token, user_id) => {
    let response = await axios.get(sitedata.data.path + "/UserProfile/updateSetting/" + user_id,
        commonHeader(user_token)
    )
    if (response.data.hassuccessed) {
        return response
    } else {
        return false
    }
}

export const get_track = async (user_token, user_id) => {
    let response = await axios.get(sitedata.data.path + "/User/AddTrack/" + user_id,
        commonHeader(user_token))
    if (response.data.hassuccessed) {
        return response
    } else {
        return false
    }
}

export const getPatientData = async (user_token, house_id, comesFrom) => {
    let response = await axios.get(sitedata.data.path + "/vh/getPatientFromVH/" + house_id,
        commonHeader(user_token))
    if (response.data.hassuccessed) {
        var patientArray = [], PatientList1 = [];
        for (let i = 0; i < response.data?.data?.length; i++) {
            // var find = response.data?.data[i].patient?.image;
            var name = '';
            if (response.data?.data[i]?.patient?.first_name && response.data?.data[i]?.patient?.last_name) {
                name = response.data?.data[i]?.patient?.first_name + ' ' + response.data?.data[i]?.patient?.last_name
            }
            else if (response.data?.data[i].patient?.first_name) {
                name = response.data?.data[i].patient?.first_name
            }
            comesFrom === 'arrangeappoint' ? patientArray.push({
                last_name: response.data?.data[i].patient?.last_name,
                first_name: response.data?.data[i].patient?.first_name,
                image: response.data?.data[i].patient?.image,
                profile_id: response.data?.data[i].patient?.profile_id,
                case_id: response.data?.data[i]._id,
                patient_id: response.data?.data[i].patient_id,
                speciality: response.data?.data[i]?.speciality,
                wards: response.data?.data[i]?.wards,
            }) :
            comesFrom === 'taskpage' ? patientArray.push({
                last_name: response.data?.data[i].patient?.last_name,
                first_name: response.data?.data[i].patient?.first_name,
                image: response.data?.data[i].patient?.image,
                profile_id: response.data?.data[i].patient?.profile_id,
                case_id: response.data?.data[i]._id,
                patient_id: response.data?.data[i].patient_id,
                speciality: response.data?.data[i]?.speciality,
            }) :
            patientArray.push({
                last_name: response.data?.data[i].patient?.last_name,
                first_name: response.data?.data[i].patient?.first_name,
                image: response.data?.data[i].patient?.image,
                profile_id: response.data?.data[i].patient?.profile_id,
                alies_id: response.data?.data[i].patient?.alies_id,
                case_id: response.data?.data[i]._id,
                patient_id: response.data?.data[i].patient_id
            })
            PatientList1.push({ profile_id: response.data?.data[i].patient?.profile_id, value: response.data?.data[i]?.patient_id, label: name })
        }
        return { isdata: true, PatientList1: PatientList1, patientArray: patientArray }
    } else {
        return false
    }
}

export const update_entry_state = async (e, state, stateLoginValueAim) => {
    if (e.target.name === "review" || e.target.name === "emergency") {
        if (e.target.name === "review") {
            if (e.target.checked) {
                state["review_by"] =
                    stateLoginValueAim &&
                    stateLoginValueAim.user &&
                    stateLoginValueAim.user._id;
                state["review_on"] = new Date();
            } else {
                state["review_by"] = "";
                state["review_on"] = "";
            }
        } else {
            if (e.target.checked) {
                state["emergency_by"] =
                    stateLoginValueAim &&
                    stateLoginValueAim.user &&
                    stateLoginValueAim.user._id;
                state["emergency_on"] = new Date();
            } else {
                state["emergency_by"] = "";
                state["emergency_on"] = "";
            }
        }
        state[e.target.name] = e.target.checked;
    } else {
        state[e.target.name] = e.target.value;
    }
    return state
}

export const delete_click_track = async (user_token, user_id, deletekey) => {
    let response = await axios.delete(sitedata.data.path + "/User/AddTrack/" + user_id + "/" + deletekey,
        commonHeader(user_token))
    if (response) {
        return response
    } else {
        return false
    }
}

export const download_track = async (data, stateLoginValueAim) => {
    if (data.review_by_temp) {
        data["review_by"] = data.review_by_temp
    }
    if (data.emergency_by_temp) {
        data["emergency_by"] = data.emergency_by_temp;
    }
    if ((data?.type === "medication")) {
        let timeArray = [], timeArray1 = [];
        if (data?.reminder_time_taken && data?.reminder_time_taken.length > 0) {
            data.reminder_time_taken.map((time_taken, i) => {
                let dateTime = moment(time_taken.value)
                let time = dateTime.format("HH:MM")
                // let date = dateTime.format("DD-MM-YYYY")
                let data1 = `${time}`
                timeArray.push(data1)
            })
        }
        if (data?.time_taken && data?.time_taken.length > 0) {
            data.time_taken.map((time_taken, i) => {
                let dateTime = moment(time_taken.value)
                let time = dateTime.format("HH:MM")
                let data1 = `${time}`
                timeArray1.push(data1)
            })
        }

        let indexTime = '', indexTime1 = '';
        for (let i = 0; i < timeArray.length; i++) {
            indexTime += timeArray[i] + ", "
        }
        for (let i = 0; i < timeArray1.length; i++) {
            indexTime1 += timeArray[i] + ", "
        }
        data["reminder_time"] = indexTime
        data["consumed_at"] = indexTime1
    }
    if ((data?.type === "vaccination") && data?.reminder_time_taken && data?.reminder_time_taken.length > 0) {
        let timeArray = []
        data.reminder_time_taken.map((time_taken, i) => {
            let dateTime = moment(time_taken.value)
            let time = dateTime.format("HH:MM")
            let date = dateTime.format("DD-MM-YYYY")
            let data1 = `${date} (${time})`
            timeArray.push(data1)
        })
        let indexTime = ''
        for (let i = 0; i < timeArray.length; i++) {
            indexTime += timeArray[i] + ", "
        }
        data["reminder"] = indexTime
    }
    if (data?.data_of_vaccination) {
        data["date_of_vaccination"] = data.data_of_vaccination
    }
    if (data?.date_of_vaccination) {
        let dateOBJ = moment(data?.date_of_vaccination)
        let time = dateOBJ.format("HH:MM")
        let date = dateOBJ.format("DD-MM-YYYY")
        data["time_of_vaccination"] = time
        data["date_of_vaccination"] = date
    }
    axios
        .post(
            sitedata.data.path + "/UserProfile/downloadPdf",
            {
                Dieseases: data,
                patientData: {
                    name:
                        stateLoginValueAim.user.first_name +
                        " " +
                        stateLoginValueAim.user.last_name,
                    email: stateLoginValueAim.user.email,
                    DOB: stateLoginValueAim.user.birthday,
                    Mobile: stateLoginValueAim.user.mobile,
                },
            },
            { responseType: "blob" }
        )
        .then((res) => {
            var data = new Blob([res.data]);
            if (typeof window.navigator.msSaveBlob === "function") {
                // If it is IE that support download blob directly.
                window.navigator.msSaveBlob(data, "report.pdf");
            } else {
                var blob = data;
                var link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = "report.pdf";
                document.body.appendChild(link);
                link.click(); // create an <a> element and simulate the click operation.
            }
        })
        .catch((err) => { });
}