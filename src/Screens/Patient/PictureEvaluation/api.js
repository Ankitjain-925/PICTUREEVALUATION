import axios from 'axios';
import sitedata from 'sitedata';
import { commonHeader, commonCometHeader } from 'component/CommonHeader/index';
import { getLanguage } from 'translations/index';

export const handleEvalSubmit = (value, current) => {
  let translate = getLanguage(current.props.stateLanguageType)
  let {
    please_select_gender, 
    valid_age_between,
    valid_date,
    atleast_one_picture
  } = translate;
  let data = {};
  data = current.state.updateEvaluate;
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
                          if (validateBpAndSugar(data.country, 'country', current)) {
                            if (validateBpAndSugar(data.residenceCountry, 'residenceCountry', current)) {
                              if (validateBpAndSugar(data.race, 'race', current)) {
                                if (validateBpAndSugar(data.history_month, 'history_month', current)) {
                                  if (validateBpAndSugar(data.medical_precondition, 'medical_precondition', current)) {
                                    if (validateBpAndSugar(data.premedication, 'premedication', current)) {
                                      current.setState({ mod1Open: true, picEval: true, error_section: 0, errorChrMsg: '' })
                                      axios.put(sitedata.data.path + '/UserProfile/Users/update', {
                                        birthday: data.dob,
                                        sex: data.sex,
                                        country: data.residenceCountry,
                                        citizen_country: data.country
                                      }, commonHeader(current.props.stateLoginValueAim.token)).then((res) => { })
                                        .catch((e) => { })
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
      } else {
        current.setState({ errorChrMsg: please_select_gender, error_section: 2 });
        MoveTop(0);
      }
    } else {
      current.setState({
        errorChrMsg: valid_age_between,error_section: 1 
      });
      MoveTop(0);
    }
  } else {
    //     current.setState({ mod1Open: false, show2: true, show1: false })

    if (current.state.fileattach && current.state.fileattach?.length > 0) {
      // if (data.hospital) {
      if (
        data.start_date &&
        new Date(new Date() - new Date(data.start_date)).getFullYear() - 1970 <=
        130
      ) {
        if (validateBpAndSugar1(data.warm, 'warm', current)) {
          if (
            validateBpAndSugar1(data.size_progress, 'size_progress', current)
          ) {
            if (validateBpAndSugar1(data.itch, 'itch', current)) {
              if (validateBpAndSugar1(data.pain, 'pain', current)) {
                if (validateBpAndSugar1(data.body_temp, 'body_temp', current)) {
                  if (
                    validateBpAndSugar1(
                      data.sexual_active,
                      'sexual_active',
                      current
                    )
                  ) {
                    current.setState({ errorChrMsg: '' });

                    if (data?._id) {
                      if(data.is_decline){
                        data.is_decline = false;
                        data.done_on = '';
                        data.priority = 0;
                        data.archived = false;
                        data.status = 'open';
                        data.created_at = new Date();
                        var due_on = data?.due_on || {};
                        due_on['date'] = new Date();
                        data.due_on = due_on;
                        due_on['time'] = new Date();
                        data.due_on = due_on;
                      }
                      axios
                        .put(
                          sitedata.data.path + '/vh/AddTask/' + data._id,
                          data,
                          commonHeader(current.props.stateLoginValueAim.token)
                        )
                        .then((responce) => {
                          if (responce.data.hassuccessed) {
                            current.setState({
                              updateEvaluate: data,
                            });
                          }
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                    } else {
                      var patient = {
                        first_name:
                          current.props.stateLoginValueAim.user.first_name,
                        last_name:
                          current.props.stateLoginValueAim.user.last_name,
                        alies_id:
                          current.props.stateLoginValueAim.user.alies_id,
                        profile_id:
                          current.props.stateLoginValueAim.user.profile_id,
                        user_id: current.props.stateLoginValueAim.user._id,
                        image: current.props.stateLoginValueAim.user.image,
                      };
                      data.patient = patient;
                      data.patient_id =
                        current.props.stateLoginValueAim.user._id;
                      data.fileattach = current.state.fileattach;
                      data.task_name = 'Picture evaluation from patient';
                      data.task_type = 'picture_evaluation';
                      data.is_payment = current.state.is_payment;
                      data.done_on = '';
                      data.priority = 0;
                      data.archived = false;
                      data.status = 'open';
                      data.house_id = '60fabfe5b3394533f7f9a6dc-1639551688707';
                      data.created_at = new Date();
                      if (!data?.due_on?.date) {
                        let due_on = data?.due_on || {};
                        due_on['date'] = new Date();
                        data.due_on = due_on;
                      }
                      if (!data?.due_on?.time) {
                        let due_on = data?.due_on || {};
                        due_on['time'] = new Date();
                        data.due_on = due_on;
                      }
                      axios
                        .post(
                          sitedata.data.path + '/vh/AddTask',
                          data,
                          commonHeader(current.props.stateLoginValueAim.token)
                        )
                        .then((responce) => {
                          if (responce.data.hassuccessed) {
                            current.setState({
                              updateEvaluate: responce.data.data,
                            });
                          }
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                    }
                    if (current.state.is_payment) {
                      current.setState({ mod1Open: false, show1: false });
                      current.props.history.push('/patient/evaluation-list');
                    } else {
                      current.setState({
                        mod1Open: false,
                        show2: true,
                        show1: false,
                      });
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        current.setState({ errorChrMsg: valid_date, error_section: 19 });
        MoveTop(0);
      }
      // }
      // else{
      //     current.setState({ errorChrMsg: "Please select hospital" })
      //     MoveTop(0);
      // }
    } else {
      current.setState({
        errorChrMsg: atleast_one_picture,  error_section: 18
      });
      MoveTop(0);
    }
  }
};

export const MoveTop = (top) => {
  window.scroll({
    top: top,
    behavior: 'smooth',
  });
};

export const validateBpAndSugar1 = (value, item, current) => {
  let translate = getLanguage(current.props.stateLanguageType);
  let {
    warm,
    size_progress,
    itch,
    pain,
    please_select,
    with_yes_no,
    enter_body_temp,
    valid_body_temp,
    enter_sexual_activities,
    Max_word_limit_exceeds,
  } = translate;
  if (
    item === 'warm' ||
    item === 'size_progress' ||
    item === 'itch' ||
    item === 'pain'
  ) {
    var currentItem =
      item === 'warm'
        ? warm
        : item === 'size_progress'
          ? size_progress
          : item === 'itch'
            ? itch
            : pain;
    if (!value) {
      current.setState({
        errorChrMsg: please_select + ' ' + currentItem + ' ' + with_yes_no, error_section: 20
      });
      MoveTop(200);
      return false;
    } else {
      return true;
    }
  } else if (item === 'body_temp') {
    if (!value) {
      current.setState({ errorChrMsg: enter_body_temp , error_section: 21});
      MoveTop(250);
      return false;
    } else if (value < 96 || value > 105) {
      current.setState({ errorChrMsg: valid_body_temp, error_section: 22 });
      MoveTop(250);
      return false;
    } else {
      return true;
    }
  } else if (item === 'sexual_active') {
    if (!value) {
      current.setState({ errorChrMsg: enter_sexual_activities , error_section: 23});
      MoveTop(400);
      return false;
    }
    if (value.length > 400) {
      current.setState({
        errorChrMsg: Max_word_limit_exceeds, error_section: 23
      });
      MoveTop(400);
      return false;
    } else {
      return true;
    }
  }
};

export const validateBpAndSugar = (value, item, current) => {
  let translate = getLanguage(current.props.stateLanguageType);
  let {
    enter_systolic_value,
    systolic_bp_in_number,
    systolic_value_between,
    enter_diastolic_value,
    diastolic_in_number,
    diastolic_value_between,
    enter_blood_sugar,
    blood_sugar_in_number,
    sugar_value_between,
    enter_hba1c,
    homoglobin_levels_between,
    enter_situation,
    enter_smoking_status,
    please_select,
    country_of_residence,
    country_of_birth,
    allergies,
    family_history,
    treatment_so_far,
    medical_preconditions,
    premedication,
    please_enter,
    max_Words_limit_exceeds_in,
    race,
    history_month,
  } = translate;
  var bpPattern = /^[0-9]+$/;
  var Valid = bpPattern.test(value);
  if (item === 'systolic') {
    if (!value) {
      current.setState({ errorChrMsg: enter_systolic_value, error_section: 3 });
      MoveTop(0);
      return false;
    } else if (!Valid) {
      current.setState({ errorChrMsg: systolic_bp_in_number, error_section: 3 });
      MoveTop(0);
      return false;
    } else if (value < 120) {
      current.setState({
        errorChrMsg: systolic_value_between, error_section: 3
      });
      MoveTop(0);
      return false;
    } else if (value > 140) {
      current.setState({
        errorChrMsg: systolic_value_between, error_section: 3
      });
      MoveTop(0);
      return false;
    } else {
      return true;
    }
  } else if (item === 'diastolic') {
    if (!value) {
      current.setState({ errorChrMsg: enter_diastolic_value, error_section: 4 });
      MoveTop(0);
      return false;
    } else if (!Valid) {
      current.setState({ errorChrMsg: diastolic_in_number, error_section: 4 });
      MoveTop(0);
      return false;
    } else if (value < 80) {
      current.setState({
        errorChrMsg: diastolic_value_between,error_section: 4
      });
      MoveTop(0);
      return false;
    } else if (value > 90) {
      current.setState({
        errorChrMsg: diastolic_value_between, error_section: 4
      });
      MoveTop(0);
      return false;
    } else {
      return true;
    }
  } else if (item === 'blood_sugar') {
    if (!value) {
      current.setState({ errorChrMsg: enter_blood_sugar, error_section: 5 });
      MoveTop(0);
      return false;
    } else if (!Valid) {
      current.setState({ errorChrMsg: blood_sugar_in_number, error_section: 5 });
      MoveTop(0);
      return false;
    } else if (value < 160) {
      current.setState({
        errorChrMsg: sugar_value_between, error_section: 5
      });
      MoveTop(0);
      return false;
    } else if (value > 240) {
      current.setState({
        errorChrMsg: sugar_value_between, error_section: 5
      });
      MoveTop(0);
      return false;
    } else {
      return true;
    }
  } else if (item === 'Hba1c') {
    let calHba1c = value && value / 10;
    if (!value) {
      current.setState({ errorChrMsg: enter_hba1c, error_section: 6 });
      MoveTop(0);
      return false;
    } else if (calHba1c < 57 / 10) {
      current.setState({
        errorChrMsg: homoglobin_levels_between, error_section: 6
      });
      MoveTop(0);
      return false;
    } else if (calHba1c > 64 / 10) {
      current.setState({
        errorChrMsg: homoglobin_levels_between, error_section: 6
      });
      MoveTop(0);
      return false;
    } else {
      return true;
    }
  } else if (item === 'situation') {
    if (!value) {
      current.setState({ errorChrMsg: enter_situation, error_section: 7 });
      MoveTop(0);
      return false;
    } else {
      return true;
    }
  } else if (item === 'smoking_status') {
    if (!value) {
      current.setState({ errorChrMsg: enter_smoking_status , error_section: 8});
      MoveTop(100);
      return false;
    } else {
      return true;
    }
  } else if (item === 'country' || item === 'residenceCountry') {
    var fillItem =
      item === 'residenceCountry' ? country_of_residence : country_of_birth;
    var section = item === 'residenceCountry' ? 13 : 12;
    if (!value) {
      current.setState({ errorChrMsg: please_select + ' ' + fillItem, error_section: section });
      MoveTop(650); 
      return false;
    } else {
      return true;
    }
  } else if (
    item === 'allergies' ||
    item === 'family_history' ||
    item === 'treatment_so_far' ||
    item === 'medical_precondition' ||
    item === 'premedication'
  ) {
    var section = item === 'allergies'
    ? 9
    : item === 'family_history'
      ? 10
      : item === 'treatment_so_far'
        ? 11
        : item === 'medical_precondition'
          ? 16
          : 17;
    var currentItem =
      item === 'allergies'
        ? allergies
        : item === 'family_history'
          ? family_history
          : item === 'treatment_so_far'
            ? treatment_so_far
            : item === 'medical_precondition'
              ? medical_preconditions
              : premedication;

    if (!value) {
      current.setState({ errorChrMsg: please_enter + ' ' + currentItem , error_section: section });
      if(item === 'treatment_so_far') { MoveTop(650); }
      else if(item === 'medical_precondition' || item === 'premedication'){
        MoveTop(850);
      }
      else{  MoveTop(300); }
      return false;
    }
    if (value.length > 400) {
      current.setState({
        errorChrMsg: max_Words_limit_exceeds_in + ' ' + currentItem, error_section: section 
      });
      if(item === 'treatment_so_far') { MoveTop(650); }
      else if(item === 'medical_precondition' || item === 'premedication'){
        MoveTop(850);
      }
      else{  MoveTop(300); }
      return false;
    } else {
      return true;
    }
  } else if (item === 'race' || item === 'history_month') {
    var section = item === 'race' ? 14 : 15;
    var currentItem = item === 'race' ? race : history_month;
    if (!value) {
      current.setState({ errorChrMsg: please_enter + ' ' + currentItem , error_section: section});
      MoveTop(600);
      return false;
    }
    if (value.length > 100) {
      current.setState({
        errorChrMsg: max_Words_limit_exceeds_in + ' ' + currentItem, error_section: section
      });
      MoveTop(600);
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export const FileAttachMulti = (Fileadd, current) => {
  current.setState({
    isfileuploadmulti: true,
    fileattach: Fileadd,
    fileupods: true,
  });
};

export const getAllPictureEval = (current) => {
  current.setState({ loaderImage: true });
  axios
    .post(
      sitedata.data.path + `/vh/trackrecordsforpatient`,
      {
        patient_id: current.props.stateLoginValueAim?.user?._id,
      },
      commonHeader(current.props.stateLoginValueAim.token)
    )
    .then((responce) => {
      if (responce.data.hassuccessed && responce.data.data) {
        var totalPage = Math.ceil(responce.data.data?.length / 20);
        current.setState(
          {
            AllData1: responce.data.data,
            loaderImage: false,
            totalPage: totalPage,
            currentPage: 1,
          },
          () => {
            if (totalPage > 1) {
              var pages = [];
              for (var i = 1; i <= current.state.totalPage; i++) {
                pages.push(i);
              }
              current.setState({
                AllData: current.state.AllData1.slice(0, 20),
                pages: pages,
              });
            } else {
              current.setState({ AllData: current.state.AllData1 });
            }
          }
        );
        // current.setState({ AllData: responce.data.data });
      }
      current.setState({ loaderImage: false });
    });
};

export const saveOnDB = (payment, current) => {
  current.setState({ loaderImage: true });
  if (current.state.updateEvaluate._id) {
    axios
      .put(
        sitedata.data.path + '/vh/AddTask/' + current.state.updateEvaluate._id,
        { payment_data: payment, is_payment: true },
        commonHeader(current.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        current.setState({ loaderImage: false });
        if (responce.data.hassuccessed) {
          current.props.history.push('/patient/evaluation-list');
        }
      });
  } else {
    current.setState({ loaderImage: false });
  }
};

// Open See Details Form
export const handleOpenDetail = (current, detail) => {
  current.setState({ openDetail: true, showDetails: detail }, () => {
    if( current.state.showDetails?.status === 'done' || current.state.showDetails?.comments?.length>0 || current.state.showDetails?.attachments?.length>0){
      axios
      .put(
        sitedata.data.path + '/vh/AddTask/' + current.state.showDetails?._id,
        {isviewed: true},
        commonHeader(current.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        var showDetails = current.state.showDetails;
        showDetails.isviewed = true;
        current.setState({showDetails: showDetails})
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  });
};
// Close See Details Form
export const handleCloseDetail = (current) => {
  current.setState({ openDetail: false });
};

// Open Feedback Form
export const handleOpFeedback = (current, openData) => {
  current.setState({ loaderImage: true, sendError: false, updateFeedback: {} });
  let user_token = current.props.stateLoginValueAim.token;
  axios
    .get(
      sitedata.data.path + '/vh/checkFeedBack/' + openData._id,
      commonHeader(user_token)
    )
    .then((responce) => {
      current.setState({ loaderImage: false });
      if (responce.data.hassuccessed) {
        current.setState({ openFeedback: true , forFeedback : openData, sendError: true, updateFeedback: responce.data.data});
      }
      else{
        current.setState({ openFeedback: true , forFeedback : openData, sendError: false});
      }
    });
  
};
// Close Feedback Form
export const handleCloseFeedback = (current) => {
  current.setState({ openFeedback: false, updateFeedback: {} , forFeedback : {}});
};

// Set state for feedback form
export const updateEntryState1 = (current, value, name) => {
  const state = current.state.updateFeedback;
  state[name] = value;
  current.setState({ updateFeedback: state });
  // current.props.updateEntryState1(value, name);
};

// For payment stripe
export const updateRequestBeforePayment = (current, data) => {
  current.props.history.push({
    pathname: '/patient/picture-evaluation',
    state: { data: data },
  });
};

// Api call for feedback form
export const handleSubmitFeed = (current) => {
  var data = current.state.updateFeedback;
  if(data.fast_service && data.doctor_explaination && data.satification){
    current.setState({ loaderImage: true, allcompulsary: false });
    data.patient = {
      first_name:
          current.props.stateLoginValueAim.user.first_name,
        last_name:
          current.props.stateLoginValueAim.user.last_name,
        alies_id:
          current.props.stateLoginValueAim.user.alies_id,
        profile_id:
          current.props.stateLoginValueAim.user.profile_id,
          patient_id: current.props.stateLoginValueAim.user._id,
          profile_image: current.props.stateLoginValueAim.user.image,
          birthday: current.props.stateLoginValueAim.user.birthday,
    }
    if(current.state?.forFeedback?.assinged_to?.length>0){
      data.doctor_id = current.state?.forFeedback?.assinged_to.map((item)=>{
        return item.user_id;
      })
      current.setState({sendError : false, sendSuccess: false})
      data.task_id = current.state?.forFeedback?._id
        axios
          .post(
            sitedata.data.path + '/vh/pictureevaluationfeedback',
            data,
            commonHeader(current.props.stateLoginValueAim.token)
          )
          .then((response) => {
            if (response.data.hassuccessed) {
              current.setState({ loaderImage: false, sendSuccess: true });
              setTimeout(() => {
                current.setState({sendSuccess : false})
                handleCloseFeedback(current);
              }, 3000);
            }
            else{
              current.setState({ loaderImage: false, sendError: true });
              setTimeout(() => {
                current.setState({sendError : false})
                handleCloseFeedback(current);
              }, 3000);
            }
            current.setState({ loaderImage: false });
          })
          .catch((err) => { });
    }
  }
  else{
    current.setState({allcompulsary: true})
  }
}  

export const getUserData = (current) => {
  current.setState({ loaderImage: true });
  let user_token = current.props.stateLoginValueAim.token;
  let user_id = current.props.stateLoginValueAim.user._id;
  axios
    .get(
      sitedata.data.path + '/UserProfile/Users/' + user_id,
      commonHeader(user_token)
    )
    .then((responce) => {
      current.setState({ loaderImage: false });
      if (responce.data.hassuccessed) {
        var State = current.state.updateEvaluate
        State['sex'] = responce.data.data?.sex
        State['dob'] = responce.data.data?.birthday
        State['country'] = responce.data.data?.citizen_country
        State['residenceCountry'] = responce.data.data?.country
        current.setState({ updateEvaluate: State });
      }
    });
};
