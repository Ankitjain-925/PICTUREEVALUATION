import {
  GET_SPECIALITY_REQUEST,
  GET_SPECIALITY_SUCCESS,
  GET_SPECIALITY_FAIL,
} from "actiontypes";
import sitedata from "sitedata.js";
import axios from "axios";
import { commonHeader } from "component/CommonHeader/index";

export const Speciality = (getting, house_id, user_token, callBack = () => { }) => {
  return (dispatch) => {
    if (getting && house_id) {
      dispatch({ type: GET_SPECIALITY_REQUEST });
      axios
        .get(sitedata.data.path + "/vh/AddSpecialty/" + house_id,
          commonHeader(user_token))
        .then((responce) => {
          if (responce && responce?.data?.data && responce?.data?.data?.length > 0) {
            dispatch({ type: GET_SPECIALITY_SUCCESS, payload: responce.data.data });
            callBack();
          }
        })
        .catch((error) => {
          dispatch({ type: GET_SPECIALITY_FAIL });
          Speciality();
        });
    }
    else {
      dispatch({ type: GET_SPECIALITY_FAIL });
      callBack();
    }
  };
};