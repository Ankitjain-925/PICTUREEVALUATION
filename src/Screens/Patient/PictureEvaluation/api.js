import axios from "axios";
import sitedata from "sitedata";
import { commonHeader, commonCometHeader } from "component/CommonHeader/index";

export const handleEvalSubmit = (value, current) => {
    if (value == 1) {
    // current.setState({ mod1Open: true, picEval: true })
    if (data.dob && new Date(new Date() - new Date(data.dob)).getFullYear() - 1970 <= 130) {
        if (data.sex) {
            if (validateBpAndSugar(data.rr_systolic, 'systolic', current)) {
                if (validateBpAndSugar(data.rr_diastolic, 'diastolic', current)) {
                    if (validateBpAndSugar(data.blood_sugar, 'blood_sugar', current)) {
                        if (validateBpAndSugar(data.Hba1c, 'Hba1c', current)) {
                            if (validateBpAndSugar(data.situation, 'situation', current)) {
                                if (validateBpAndSugar(data.smoking_status, 'smoking_status', current)) {
                                    if (validateBpAndSugar(data.allergies, 'allergies', current)) {
                                        if (validateBpAndSugar(data.family_history, 'family_history', current)) {
                                            if (validateBpAndSugar(data.treatment_so_far, 'treatment_so_far', current)) {
                                                if(validateBpAndSugar(data.country, 'country', current)) {
                                                    if(validateBpAndSugar(data.residenceCountry, 'residenceCountry', current)) {
                                                        if (validateBpAndSugar(data.race, 'race', current)) {
                                                            if (validateBpAndSugar(data.history_month, 'history_month', current)) {
                                                                if (validateBpAndSugar(data.medical_precondition, 'medical_precondition', current)) {
                                                                    if (validateBpAndSugar(data.premedication, 'premedication', current)) {
                                                                        current.setState({ mod1Open: true, picEval: true })
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            current.setState({ errorChrMsg: "Please select Gender" })
            MoveTop();

        }
    }
     else{
        current.setState({ errorChrMsg: "Please select valid age, Age must be between 0 to 130" })
        MoveTop();
    }

    } else {
    //     current.setState({ mod1Open: false, show2: true, show1: false })

    if (data.fileattach && data.fileattach.length > 0) {
        if (data.hospital) {
            if (data.start_date && new Date(new Date() - new Date(data.start_date)).getFullYear() - 1970 <= 130) {
                if (validateBpAndSugar1(data.warm, 'warm', current)) {
                    if (validateBpAndSugar1(data.size_progress, 'size_progress', current)) {
                        if (validateBpAndSugar1(data.itch, 'itch', current)) {
                            if (validateBpAndSugar1(data.pain, 'pain', current)) {
                                if (validateBpAndSugar1(data.body_temp, 'body_temp', current)) {
                                    if (validateBpAndSugar1(data.sexual_active, 'sexual_active', current)) {
                                        current.setState({ errorChrMsg: '' })
                                        let data = {};
                                        data = current.state.updateEvaluate;
                                        var patient = {
                                            'first_name': current.props.stateLoginValueAim.user.first_name,
                                            'last_name': current.props.stateLoginValueAim.user.last_name,
                                            'alies_id': current.props.stateLoginValueAim.user.alies_id,
                                            'profile_id': current.props.stateLoginValueAim.user.profile_id,
                                            'user_id': current.props.stateLoginValueAim.user._id,
                                            'image': current.props.stateLoginValueAim.user.image
                                        }
                                        data.patient = { patient }
                                        data.fileattach = current.state.fileattach
                                        data.task_name = "Picture evaluation from patient"
                                        data.task_type = "picture_evaluation"
                                        data.is_payment = "false"
                                        data.done_on = "";
                                        data.priority = 0;
                                        data.archived = false;
                                        data.status = "open";
                                        data.created_at = new Date();
                                        if (!data?.due_on?.date) {
                                            let due_on = data?.due_on || {};
                                            due_on['date'] = new Date()
                                            data.due_on = due_on;
                                        }
                                        if (!data?.due_on?.time) {
                                            let due_on = data?.due_on || {};
                                            due_on['time'] = new Date()
                                            data.due_on = due_on;
                                        }
                                        axios
                                        .post(
                                            sitedata.data.path + "/vh/AddTask",
                                            data,
                                            commonHeader(current.props.stateLoginValueAim.token)
                                        )
                                        .then((responce) => {
                                            current.setState({
                                        updateEvaluate:{}
                                            });
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                            // this.setState({  })
                                        });
                                        current.setState({ mod1Open: false, show2: true, show1: false })
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else{
                current.setState({ errorChrMsg: "Please select valid start date" })  
                MoveTop();
            }
        }
        else{
            current.setState({ errorChrMsg: "Please select hospital" }) 
            MoveTop();
        }
    } else {
        current.setState({ errorChrMsg: "Please upload atleast one Picture for evaluation" })
        MoveTop();
    }


    }
}

export const MoveTop = () => {
    window.scroll({
        top: 0,
        behavior: "smooth",
    })
}

export const validateBpAndSugar1 = (value, item, current) => {
    if (item === "warm" || item === "size_progress" || item === "itch" || item === "pain") {
        var currentItem = item === "warm" ? "Warm " : item === "size_progress" ? "Size Progress" : item === "itch" ? "Itch" : "Pain";
        if (!value) {
            current.setState({ errorChrMsg: "Please Select " + currentItem + "with YES / NO" })
            MoveTop();
            return false;
        } else {
            return true;
        }
    }
    else if (item === "body_temp") {
        if (!value) {
            current.setState({ errorChrMsg: "Please Enter body temprature" })
            MoveTop();
            return false;
        }
        else if(value > 96 && value < 105){
            current.setState({ errorChrMsg: "Please Enter valid body temprature" })
            MoveTop();
            return false;
        }
        else {
            return true;
        }
    }
    else if (item === 'sexual_active') {
        if (!value) {
            current.setState({ errorChrMsg: "Please Enter sexual activities" })
            MoveTop();
            return false;
        }
        if (value.length > 400) {
            current.setState({ errorChrMsg: "Max Words limit exceeds in sexual activities" })
            MoveTop();
            return false
        } else {
            return true
        }
    }

}
export const validateBpAndSugar = (value, item, current) => {
    var bpPattern = /^[0-9]+$/;
    var Valid = bpPattern.test(value)
    if (item === "systolic") {
        if (!value) {
            current.setState({ errorChrMsg: "Please enter Systolic value" })
            MoveTop();
            return false;
        } else if (!Valid) {
            current.setState({ errorChrMsg: "Systolic bp should be in number" })
            MoveTop();
            return false;
        } else if (value < 120) {
            current.setState({ errorChrMsg: "Please select systolic bp value between 120-140" })
            MoveTop();
            return false;
        } else if (value > 140) {
            current.setState({ errorChrMsg: "Please select systolic bp value between 120-140" })
            MoveTop();
            return false;
        } else {
            return true;
        }
    } else if (item === "diastolic") {
        if (!value) {
            current.setState({ errorChrMsg: "Please enter Diastolic value" })
            MoveTop();
            return false;
        }
        else if (!Valid) {
            current.setState({ errorChrMsg: "Diastolic bp should be in number" })
            MoveTop();
            return false;
        }
        else if (value < 80) {
            current.setState({ errorChrMsg: "Please select Diastolic bp value between 80-90" })
            MoveTop();
            return false;
        } else if (value > 90) {
            current.setState({ errorChrMsg: "Please select Diastolic bp value between 80-90" })
            MoveTop();
            return false;
        }
        else {
            return true;
        }
    } else if (item === "blood_sugar") {
        if (!value) {
            current.setState({ errorChrMsg: "Please enter Blood Sugar" })
            MoveTop();
            return false;
        }
        else if (!Valid) {
            current.setState({ errorChrMsg: "Blood Sugar should be in number" })
            MoveTop();
            return false;
        }
        else if (value < 160) {
            current.setState({ errorChrMsg: "Please select Sugar value between 160-240" })
            MoveTop();
            return false;
        } else if (value > 240) {
            current.setState({ errorChrMsg: "Please select Sugar value between 160-240" })
            MoveTop();
            return false;
        }
        else {
            return true;
        }

    } else if (item === "Hba1c") {
        let calHba1c = value && value / 10;
        if (!value) {
            current.setState({ errorChrMsg: "Please enter Hba1c" })
            MoveTop();
            return false;
        }
        else if (calHba1c < (57 / 10)) {
            current.setState({ errorChrMsg: "Hemoglobin A1c levels should be between 57 % and 64 %" })
            MoveTop();
            return false;
        } else if (calHba1c > (64 / 10)) {
            current.setState({ errorChrMsg: "Hemoglobin A1c levels should be between 57 % and 64 %" })
            MoveTop();
            return false;
        }
        else {
            return true;
        }

    } else if (item === "situation") {
        if (!value) {
            current.setState({ errorChrMsg: "Please enter Situation" })
            MoveTop();
            return false;
        }
        else {
            return true;
        }
    } else if (item === "smoking_status") {
        if (!value) {
            current.setState({ errorChrMsg: "Please enter Smoking status" })
            MoveTop();
            return false;
        }
        else {
            return true;
        }
    } else if (item === "country" || item === "residenceCountry") {
        var fillItem = item === 'residenceCountry' ? "Country of residence" : "Country of birth";
        if (!value) {
            current.setState({ errorChrMsg: "Please select " + fillItem })
            MoveTop();
            return false;
        }
        else {
            return true;
        }
    } else if (item === "allergies" || item === "family_history" || item === "treatment_so_far" || item === "medical_precondition" || item === "premedication") {
        var currentItem = item === "allergies" ? "Allergies " : item === "family_history" ? "Family History" : item === "treatment_so_far" ? "Treatment so far" :
            item === "medical_precondition" ? "Medical precondition" : "Premedication"
        if (!value) {
            current.setState({ errorChrMsg: "Please enter " + currentItem })
            MoveTop();
            return false;
        }
        if (value.length > 400) {
            current.setState({ errorChrMsg: "Max Words limit exceeds in " + currentItem })
            MoveTop();
            return false
        } else {
            return true
        }
    } else if (item === "race" || item === "history_month") {
        var currentItem = item === "race" ? "Race " : "History month";
        if (!value) {
            current.setState({ errorChrMsg: "Please enter " + currentItem })
            MoveTop();
            return false;
        }
        if (value.length > 100) {
            current.setState({ errorChrMsg: "Max Words limit exceeds in " + currentItem })
            MoveTop();
            return false
        } else {
            return true
        }
    } else {
        return false;
    }
}

//For validate the blood pressure is correct or not
export const validateBp = (elementValue, type) => {
    var bpPattern = /^[0-9]+$/;
    return bpPattern.test(elementValue);
};

export const FileAttachMulti = (Fileadd, current) => {
    current.setState({
        isfileuploadmulti: true,
        fileattach: Fileadd,
        fileupods: true,
    });
}

export const getallGroups = (current) => {
    current.setState({ loaderImage: true });
    axios
        .get(
            sitedata.data.path +
            `/admin/GetHintinstitute`,
            commonHeader(current.props.stateLoginValueAim.token)
        )
        .then((responce) => {
            if (responce.data.hassuccessed && responce.data.data) {
                var Housesoptions = [];
                responce.data.data.map((data) => {
                    if (data?.institute_groups && data?.institute_groups?.length > 0) {
                        data.institute_groups.map((data1) => {
                            data1.houses.map((data2) => {
                                Housesoptions.push({
                                    group_name: data2.house_name,
                                    label: data2.house_name,
                                    value: data2._id
                                })
                            })
                        })
                    }
                })
                current.setState({ Housesoptions: Housesoptions });
            }
            current.setState({ loaderImage: false });
        });
    MoveTop();
};