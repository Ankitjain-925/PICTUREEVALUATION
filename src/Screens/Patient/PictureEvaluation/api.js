import axios from 'axios';
import sitedata from 'sitedata';
import { commonHeader, commonCometHeader } from 'component/CommonHeader/index';
import { getLanguage } from 'translations/index';

export const handleEvalSubmit = (value, current) => {
  let translate = getLanguage(current.props.stateLanguageType);
  let {
    please_select_gender,
    valid_age_between,
    valid_date,
    select_hospital,
    atleast_one_picture,
  } = translate;
  let data = {};
  data = current.state.updateEvaluate;
  if (value == 1) {
    // current.setState({ mod1Open: true, picEval: true })
    if (
      data.date &&
      new Date(new Date() - new Date(data.date)).getFullYear() - 1970 <= 130
    ) {
      if (data.sex) {
        if (validateBpAndSugar(data.rr_systolic, 'systolic', current)) {
          if (validateBpAndSugar(data.rr_diastolic, 'diastolic', current)) {
            if (validateBpAndSugar(data.blood_sugar, 'blood_sugar', current)) {
              if (validateBpAndSugar(data.Hba1c, 'Hba1c', current)) {
                if (validateBpAndSugar(data.situation, 'situation', current)) {
                  if (
                    validateBpAndSugar(
                      data.select_status,
                      'smoking_status',
                      current
                    )
                  ) {
                    if (
                      validateBpAndSugar(data.allergies, 'allergies', current)
                    ) {
                      if (
                        validateBpAndSugar(
                          data.family_history,
                          'family_history',
                          current
                        )
                      ) {
                        if (
                          validateBpAndSugar(
                            data.treatment_so_far,
                            'treatment_so_far',
                            current
                          )
                        ) {
                          if (
                            validateBpAndSugar(data.birth, 'country', current)
                          ) {
                            if (
                              validateBpAndSugar(
                                data.residence,
                                'residenceCountry',
                                current
                              )
                            ) {
                              if (
                                validateBpAndSugar(data.race, 'race', current)
                              ) {
                                if (
                                  validateBpAndSugar(
                                    data.history_month,
                                    'history_month',
                                    current
                                  )
                                ) {
                                  if (
                                    validateBpAndSugar(
                                      data.medical_precondition,
                                      'medical_precondition',
                                      current
                                    )
                                  ) {
                                    if (
                                      validateBpAndSugar(
                                        data.premedication,
                                        'premedication',
                                        current
                                      )
                                    ) {
                                      current.setState({
                                        mod1Open: true,
                                        picEval: true,
                                      });
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
        current.setState({ errorChrMsg: please_select_gender });
        MoveTop();
      }
    } else {
      current.setState({
        errorChrMsg: valid_age_between,
      });
      MoveTop();
    }
  } else {
    //     current.setState({ mod1Open: false, show2: true, show1: false })

    if (data.fileattach && data.fileattach.length > 0) {
      if (data.hospital) {
        if (
          data.start_date &&
          new Date(new Date() - new Date(data.start_date)).getFullYear() -
            1970 <=
            130
        ) {
          if (validateBpAndSugar1(data.warm, 'warm', current)) {
            if (
              validateBpAndSugar1(data.size_progress, 'size_progress', current)
            ) {
              if (validateBpAndSugar1(data.itch, 'itch', current)) {
                if (validateBpAndSugar1(data.pain, 'pain', current)) {
                  if (
                    validateBpAndSugar1(data.body_temp, 'body_temp', current)
                  ) {
                    if (
                      validateBpAndSugar1(
                        data.sexual_active,
                        'sexual_active',
                        current
                      )
                    ) {
                      current.setState({ errorChrMsg: '' });
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
                      data.patient = { patient };
                      data.fileattach = current.state.fileattach;
                      data.task_name = 'Picture evaluation from patient';
                      data.task_type = 'picture_evaluation';
                      data.is_payment = 'false';
                      data.done_on = '';
                      data.priority = 0;
                      data.archived = false;
                      data.status = 'open';
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
                          current.setState({
                            updateEvaluate: {},
                          });
                        })
                        .catch(function (error) {
                          console.log(error);
                          // this.setState({  })
                        });
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
        } else {
          current.setState({ errorChrMsg: valid_date });
          MoveTop();
        }
      } else {
        current.setState({ errorChrMsg: select_hospital });
        MoveTop();
      }
    } else {
      current.setState({
        errorChrMsg: atleast_one_picture,
      });
      MoveTop();
    }
  }
};

export const MoveTop = () => {
  window.scroll({
    top: 0,
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
        ? { warm }
        : item === 'size_progress'
        ? { size_progress }
        : item === 'itch'
        ? { itch }
        : { pain };
    if (!value) {
      current.setState({
        errorChrMsg: please_select + ' ' + currentItem + ' ' + with_yes_no,
      });
      MoveTop();
      return false;
    } else {
      return true;
    }
  } else if (item === 'body_temp') {
    if (!value) {
      current.setState({ errorChrMsg: enter_body_temp });
      MoveTop();
      return false;
    } else if (value > 96 && value < 105) {
      current.setState({ errorChrMsg: valid_body_temp });
      MoveTop();
      return false;
    } else {
      return true;
    }
  } else if (item === 'sexual_active') {
    if (!value) {
      current.setState({ errorChrMsg: enter_sexual_activities });
      MoveTop();
      return false;
    }
    if (value.length > 400) {
      current.setState({
        errorChrMsg: Max_word_limit_exceeds,
      });
      MoveTop();
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
      current.setState({ errorChrMsg: enter_systolic_value });
      MoveTop();
      return false;
    } else if (!Valid) {
      current.setState({ errorChrMsg: systolic_bp_in_number });
      MoveTop();
      return false;
    } else if (value < 120) {
      current.setState({
        errorChrMsg: systolic_value_between,
      });
      MoveTop();
      return false;
    } else if (value > 140) {
      current.setState({
        errorChrMsg: systolic_value_between,
      });
      MoveTop();
      return false;
    } else {
      return true;
    }
  } else if (item === 'diastolic') {
    if (!value) {
      current.setState({ errorChrMsg: enter_diastolic_value });
      MoveTop();
      return false;
    } else if (!Valid) {
      current.setState({ errorChrMsg: diastolic_in_number });
      MoveTop();
      return false;
    } else if (value < 80) {
      current.setState({
        errorChrMsg: diastolic_value_between,
      });
      MoveTop();
      return false;
    } else if (value > 90) {
      current.setState({
        errorChrMsg: diastolic_value_between,
      });
      MoveTop();
      return false;
    } else {
      return true;
    }
  } else if (item === 'blood_sugar') {
    if (!value) {
      current.setState({ errorChrMsg: enter_blood_sugar });
      MoveTop();
      return false;
    } else if (!Valid) {
      current.setState({ errorChrMsg: blood_sugar_in_number });
      MoveTop();
      return false;
    } else if (value < 160) {
      current.setState({
        errorChrMsg: sugar_value_between,
      });
      MoveTop();
      return false;
    } else if (value > 240) {
      current.setState({
        errorChrMsg: sugar_value_between,
      });
      MoveTop();
      return false;
    } else {
      return true;
    }
  } else if (item === 'Hba1c') {
    let calHba1c = value && value / 10;
    if (!value) {
      current.setState({ errorChrMsg: enter_hba1c });
      MoveTop();
      return false;
    } else if (calHba1c < 57 / 10) {
      current.setState({
        errorChrMsg: homoglobin_levels_between,
      });
      MoveTop();
      return false;
    } else if (calHba1c > 64 / 10) {
      current.setState({
        errorChrMsg: homoglobin_levels_between,
      });
      MoveTop();
      return false;
    } else {
      return true;
    }
  } else if (item === 'situation') {
    if (!value) {
      current.setState({ errorChrMsg: enter_situation });
      MoveTop();
      return false;
    } else {
      return true;
    }
  } else if (item === 'smoking_status') {
    if (!value) {
      current.setState({ errorChrMsg: enter_smoking_status });
      MoveTop();
      return false;
    } else {
      return true;
    }
  } else if (item === 'country' || item === 'residenceCountry') {
    console.log('item', item, value);
    var fillItem =
      item === 'residenceCountry' ? country_of_residence : country_of_birth;
    if (!value) {
      current.setState({ errorChrMsg: please_select + ' ' + fillItem });
      MoveTop();
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
      current.setState({ errorChrMsg: please_enter + ' ' + currentItem });
      MoveTop();
      return false;
    }
    if (value.length > 400) {
      current.setState({
        errorChrMsg: max_Words_limit_exceeds_in + ' ' + currentItem,
      });
      MoveTop();
      return false;
    } else {
      return true;
    }
  } else if (item === 'race' || item === 'history_month') {
    var currentItem = item === 'race' ? race : history_month;
    if (!value) {
      current.setState({ errorChrMsg: please_enter + ' ' + currentItem });
      MoveTop();
      return false;
    }
    if (value.length > 100) {
      current.setState({
        errorChrMsg: max_Words_limit_exceeds_in + ' ' + currentItem,
      });
      MoveTop();
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

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
};

export const getallGroups = (current) => {
  current.setState({ loaderImage: true });
  axios
    .get(
      sitedata.data.path + `/admin/GetHintinstitute`,
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
                  value: data2._id,
                });
              });
            });
          }
        });
        current.setState({ Housesoptions: Housesoptions });
      }
      current.setState({ loaderImage: false });
    });
  MoveTop();
};
