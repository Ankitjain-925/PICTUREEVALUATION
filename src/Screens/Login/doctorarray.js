import {
  GET_DoctorArray_REQUEST,
  GET_DoctorArray_SUCCESS,
  GET_DoctorArray_ERROR,
} from "actiontypes";
import sitedata from "sitedata.js";
import axios from "axios";
import { commonHeader } from "component/CommonHeader/index";
const doctor8 = 'D_TZqvF67rO'.toLowerCase();

const PLATFORM_SPECIFIC_USER = [
  'd_4hdazbj2e',
  'd_67s6lwzgo',
  'd_oocuio4z4',
  'd_j1njxe1n7',
  'd_1q1j4sscm',
  'd_oas8yepbp',
  'd_dfwgv8zm5',
  'admin',
];
const getDoctorArray = async (doctorArray = new Set(), user_token) => {
  await axios
    .get(sitedata.data.path + "/UserProfile/DoctorUsersChat", commonHeader(user_token))
    .then((response) => {
      response.data.data &&
        response.data.data.length > 0 &&
        response.data.data.map((data, index) => {
          if (isInDoctorList(data)) {
            doctorArray.push(data.profile_id.toLowerCase());         
          }
        });
    });
  return doctorArray;
};
const isInDoctorList = (user = {}) => {
  if (user) {
    if (
      user.email === "doctor4@aimedis.com" ||
      user.email === "doctor5@aimedis.com" ||
      user.email === "doctor3@aimedis.com" ||
      user.email === "doctor6@aimedis.com" ||
      user.email === "doctor7@aimedis.com" ||
      user.email === "doctor9@aimedis.com" ||
      user.email === "doctor10@aimedis.com"
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
const getNusePharma = async (
  userInfo = {},
  doctorArray = new Set(),
  user_token
) => {
  if (isInDoctorList(userInfo)) {
    await axios
      .get(sitedata.data.path + "/UserProfile/NursePharmaChat", commonHeader(user_token))
      .then((response) => {
        response.data.data &&
          response.data.data.length > 0 &&
          response.data.data.map((data, index) => {
            doctorArray.push(data.profile_id.toLowerCase());
          });
      })
      .catch(() => { });
    return doctorArray;
  } else {
    return doctorArray;
  }
};

const getPatientUserChat = async (
  hasPaidservice,
  userInfo,
  doctorArray,
  user_token
) => {
  if (isInDoctorList(userInfo)) {
    await axios
      .get(sitedata.data.path + "/UserProfile/PatientUsersChat", commonHeader(user_token))
      .then((response) => {
        response.data.data &&
          response.data.data.length > 0 &&
          response.data.data.map((data, index) => {
            doctorArray.push(data.profile_id.toLowerCase());
          });
      });
    return doctorArray;
  } else {
    return doctorArray;
  }
};

const checkIfAllPatient = async (doctorArray, user_token) => {
  return new Promise((resolve, reject) => {
    getAllUserProfileId(user_token).then(res => {
      if (res.data && res.data.hassuccessed) {
        res.data.data.map(id => {
          doctorArray.push(id.toLowerCase());
        });
        resolve(doctorArray);
      } else {
        resolve(doctorArray);
      }
    }).catch(() => {
      resolve(doctorArray);
    });
  })
};
const getAllUserProfileId = async (user_token) => {
  return axios.get(sitedata.data.path + "/User/getAllUserProfileId", commonHeader(user_token))
};

export const Doctorarrays = (type, user, token, CB = () => { }) => {
  return async (dispatch) => {
    var doctorArray = ["admin"];
    let user_token = token;
    dispatch({ type: GET_DoctorArray_REQUEST });

    let c_user_profile = PLATFORM_SPECIFIC_USER.includes(user?.profile_id.toLowerCase())
    if (type === "patient") {
      axios
        .get(sitedata.data.path + "/UserProfile/DoctorUsersChat", commonHeader(user_token))
        .then((response) => {
          response.data.data &&
            response.data.data.length > 0 &&
            response.data.data.map((data, index) => {
              if (
                data.email === "doctor4@aimedis.com" ||
                data.email === "doctor5@aimedis.com" ||
                data.email === "doctor3@aimedis.com" ||
                data.email === "doctor6@aimedis.com" ||
                data.email === "doctor7@aimedis.com" ||
                data.email === "doctor9@aimedis.com" ||
                data.email === "doctor10@aimedis.com"
              ) {
                if (doctorArray.indexOf(data.profile_id.toLowerCase()) === -1) {
                  doctorArray.push(data.profile_id.toLowerCase());
                }
              } else if (data.paid_services && data.paid_services > 0) {
                if (doctorArray.indexOf(data.profile_id.toLowerCase()) === -1) {
                  doctorArray.push(data.profile_id.toLowerCase());
                }
              }
            });
        })
        .then(() => {
          let user_id = user._id;
          axios
            .get(sitedata.data.path + "/UserProfile/Users/" + user_id, commonHeader(user_token))
            .then((response) => {
              const hasDocAroundClock =
              response.data?.data?.paid_services?.filter(it => {
                return it.description == 'Doc Around The Clock';
              })?.length > 0;
              if (type === "patient") {
                if (hasDocAroundClock) {
                  doctorArray.push(doctor8.toLowerCase());
                }
              }
              response.data.data &&
                response.data.data.fav_doctor &&
                response.data.data.fav_doctor.map((value, i) => {
                  if (
                    doctorArray.indexOf(value.profile_id.toLowerCase()) === -1
                  ) {
                    doctorArray.push(value.profile_id.toLowerCase());
                  }
                });
              CB();
              let tmp = { doctorarray: [...new Set(doctorArray)] };
              dispatch({ type: GET_DoctorArray_SUCCESS, payload: tmp });
            });
        })
        .catch(() => {
          CB();
          let tmp = { doctorarray: [] };
          dispatch({ type: GET_DoctorArray_SUCCESS, payload: tmp });
        });
    } else if (c_user_profile) {
      checkIfAllPatient(doctorArray, user_token).then(res => {
        CB();
        let tmp = { doctorarray: [...new Set(res)] };
        dispatch({ type: GET_DoctorArray_SUCCESS, payload: tmp });
      })
    }
    else if (type === "doctor") {
      const hasPaidservice = user && user.paid_services && user.paid_services.length > 0;
      axios
        .get(sitedata.data.path + "/UserProfile/Mypatients", commonHeader(user_token))
        .then((response) => {
          response.data.data &&
            response.data.data.length > 0 &&
            response.data.data.map((data, index) => {
              doctorArray.push(data.profile_id.toLowerCase());
            });
        })
        .then(() => {
          getNusePharma(user, doctorArray, user_token).then((responce) => {
            doctorArray = responce;

            axios
              .get(sitedata.data.path + "/UserProfile/Users/" + user._id, commonHeader(user_token))
              .then((response3) => {
                response3.data.data &&
                  response3.data.data.fav_doctor &&
                  response3.data.data.fav_doctor.map((value, i) => {
                    doctorArray.push(value.profile_id.toLowerCase());
                  });
              })
              .then(() => {
                getDoctorArray(doctorArray, user_token).then((docArray) => {
                  doctorArray = docArray;
                  if (!hasPaidservice) {
                    let tmp = { doctorarray: doctorArray };
                    CB();
                    dispatch({ type: GET_DoctorArray_SUCCESS, payload: tmp });
                  }
                  if (hasPaidservice) {
                    getPatientUserChat(
                      hasPaidservice,
                      user,
                      doctorArray,
                      user_token
                    ).then((result) => {
                      CB();
                      let tmp = { doctorarray: [...new Set(result)] };
                      dispatch({ type: GET_DoctorArray_SUCCESS, payload: tmp });
                    });
                  }
                });
              });
          });
        })
        .catch(() => {
          CB();
          let tmp = { doctorarray: [] };
          dispatch({ type: GET_DoctorArray_SUCCESS, payload: tmp });
        });

    } else if (
      type === "paramedic" ||
      type === "insurance" ||
      type === "nurse" ||
      type === "therapist" ||
      type === "pharmacy"
    ) {
      axios
        .get(sitedata.data.path + "/UserProfile/DoctorUsersChat", commonHeader(user_token))
        .then((response) => {
          response.data.data &&
            response.data.data.length > 0 &&
            response.data.data.map((data, index) => {
              if (
                data.email === "doctor4@aimedis.com" ||
                data.email === "doctor5@aimedis.com" ||
                data.email === "doctor3@aimedis.com" ||
                data.email === "doctor6@aimedis.com" ||
                data.email === "doctor7@aimedis.com" ||
                data.email === "doctor9@aimedis.com" ||
                data.email === "doctor10@aimedis.com"
              ) {
                if (doctorArray.indexOf(data.profile_id.toLowerCase()) === -1) {
                  doctorArray.push(data.profile_id.toLowerCase());
                }
              }
              if (data.paid_services && data.paid_services > 0) {
                if (doctorArray.indexOf(data.profile_id.toLowerCase()) === -1) {
                  doctorArray.push(data.profile_id.toLowerCase());
                }
              }
            });
          CB();
          let tmp = { doctorarray: doctorArray };
          dispatch({ type: GET_DoctorArray_SUCCESS, payload: tmp });
        })
        .catch(() => {
          CB();
          let tmp = { doctorarray: [] };
          dispatch({ type: GET_DoctorArray_SUCCESS, payload: tmp });
        });
    }
    else if (type === "logout") {
      dispatch({ type: GET_DoctorArray_ERROR });
    } else {
      dispatch({ type: GET_DoctorArray_ERROR });
    }
  };
};


