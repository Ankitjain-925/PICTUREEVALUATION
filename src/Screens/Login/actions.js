import {
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_ERROR,
} from "actiontypes";
import sitedata from "sitedata.js";
import axios from "axios";
import { CometChat } from "@cometchat-pro/chat";
import { COMETCHAT_CONSTANTS } from "../Components//CometChat/consts";
import * as Docarray from "./doctorarray";
import { commonNoTokentHeader } from "component/CommonHeader/index";
const path = sitedata.data.path + "/UserProfile";

export const createUser = ({ uid, name }) => {
  let user = new CometChat.User(uid);
  user.setName(name);
  return CometChat.createUser(user, COMETCHAT_CONSTANTS.AUTH_KEY);
};
//login user
export const cometLogin = async (uid) => {
  return CometChat.login(uid, COMETCHAT_CONSTANTS.AUTH_KEY);
};
export const updateCometUser = async (data)=>{
  axios
  .post(sitedata.data.path + "/cometUserList",
  {
    "uid": data.uid,
    "name": data.name,
    "avatar": data.avatar,
    "status": data.status,
    "role": data.role,
    "lastActiveAt": data.lastActiveAt,
    "conversationId": data.conversationId
   })
  .then((response) => {})
  .catch((err)=>{})
}

export const LoginReducerAim = (email, password, logintoken, SendCallback = () => {}) => {
  return (dispatch) => {
    dispatch({ type: GET_LOGIN_REQUEST });
    axios
      .post(path + "/UserLogin", { email, password, logintoken },
      commonNoTokentHeader()
      )
      .then((response) => {
        let tmp;
        if (response.data.hassuccessed === false) {
          let tmp = {
            token: response.data.status,
            message: response.data.message,
            isVerified: response.data.isVerified,
            isBlocked: response.data.isBlocked,
            type: response.data.type,
          };
          dispatch({ type: GET_LOGIN_SUCCESS, payload: tmp });
          SendCallback();
        } else if (response.data.status === 450) {
          tmp = {
            token: response.data.status,
            user_type: "",
          };
          dispatch({ type: GET_LOGIN_SUCCESS, payload: tmp });
          SendCallback();
        } else if(response.data?.user?.type !=='patient'){
          let tmp = {
            token: response.data.token,
            permission : false
          };
          dispatch({ type: GET_LOGIN_SUCCESS, payload: tmp });
          SendCallback();
          
        } 
        else {
          tmp = {
            token: response.data.token,
            user: response.data.user,
          };
          dispatch(
            Docarray.Doctorarrays(
              response.data.user.type,
              response.data.user,
              response.data.token
            )
          );
          // dispatch({ type: GET_LOGIN_SUCCESS, payload: tmp });
          // SendCallback();
          CometChat.login(
            response.data.user.profile_id,
            COMETCHAT_CONSTANTS.AUTH_KEY
          )
            .then(
              (user) => {
                updateCometUser(user);
                dispatch({ type: GET_LOGIN_SUCCESS, payload: tmp });
                SendCallback();
              },
              (error) => {
                if (error && error.code === "ERR_UID_NOT_FOUND") {
                  createUser({
                    uid: response.data.user.profile_id,
                    name: `${response.data.user.first_name} ${response.data.user.last_name}`,
                  }).then(
                    (user) => {
                      CometChat.login(
                        response.data.user.profile_id,
                        COMETCHAT_CONSTANTS.AUTH_KEY
                      ).then(
                        (user) => {
                          updateCometUser(user);
                          dispatch({ type: GET_LOGIN_SUCCESS, payload: tmp });
                          SendCallback();
                        },
                        (error) => {
                          let tmp = "error";
                          dispatch({ type: GET_LOGIN_ERROR, payload: tmp });
                          SendCallback();
                        }
                      );
                    },
                    (error) => {
                      let tmp = "error";
                      dispatch({ type: GET_LOGIN_ERROR, payload: tmp });
                      SendCallback();
                    }
                  );
                } else {
                  let tmp = "error";
                  dispatch({ type: GET_LOGIN_ERROR, payload: tmp });
                  SendCallback();
                }
              }
            )
            .catch((error) => {
              let tmp = "error";
              dispatch({ type: GET_LOGIN_ERROR, payload: tmp });
              SendCallback();
            });
        }
      })
      .catch((error) => {
        let tmp = "error";
        dispatch({ type: GET_LOGIN_ERROR, payload: tmp });
        SendCallback();
      });
  };
};
