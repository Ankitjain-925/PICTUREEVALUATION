
import {GET_LOGIN_REQUEST, GET_LOGIN_SUCCESS, GET_LOGIN_ERROR } from '../../actiontypes';
import sitedata from '../../sitedata.js';
import axios from "axios";
import { CometChat } from '@cometchat-pro/chat';
import { COMETCHAT_CONSTANTS } from '../Components//CometChat/consts';
import * as actions from '../Components/CometChat/store/action';
const path = sitedata.data.path + '/UserProfile';
const path1 = sitedata.data.path + '/User';


export const createUser = ({uid, name}) => {
  // console.log('create user')
  let user = new CometChat.User(uid);
  user.setName(name);
  return CometChat.createUser(user, COMETCHAT_CONSTANTS.AUTH_KEY);
};
//login user
export const cometLogin = async (uid) => {
  // console.log(uid, 'uid');
  return CometChat.login(uid, COMETCHAT_CONSTANTS.AUTH_KEY);
};

export const LoginReducerAim = (email, password, SendCallback = () => {}) => {
    return (dispatch) => {
        dispatch({ type: GET_LOGIN_REQUEST });
        axios.post(path+'/UserLogin',{ email, password})
        .then((response) =>{
          let tmp;
          if(response.data.hassuccessed === false){
            let tmp = {
              token : response.data.status,
              message: response.data.message
            }
            dispatch({ type: GET_LOGIN_SUCCESS, payload :tmp});
            SendCallback();
          }
          else if(response.data.status === 450){
            tmp = {
              token : response.data.status,
              user_type:'',
              
            }
            dispatch({ type: GET_LOGIN_SUCCESS, payload :tmp});
            SendCallback();
          }
          else{
            // console.log('Here');
            tmp = {
              token:response.data.token,
              user:response.data.user,
            }
            CometChat.login(response.data.user.profile_id, COMETCHAT_CONSTANTS.AUTH_KEY)
            .then(
              (user) => {
                // console.log('heres1', user);
                dispatch({ type: GET_LOGIN_SUCCESS, payload :tmp});
                SendCallback();
              },
              (error) => {
                // console.log(error, 'error in login');
                if (error && error.code == 'ERR_UID_NOT_FOUND') {
                  createUser({
                    uid: response.data.user.profile_id,
                    name: `${response.data.user.first_name} ${response.data.user.last_name}`,
                  }).then(
                    (user) => {
                      CometChat.login(response.data.user.profile_id, COMETCHAT_CONSTANTS.AUTH_KEY)
                      .then(
                        (user) => {
                          // console.log('heres2', user);
                          dispatch({ type: GET_LOGIN_SUCCESS, payload :tmp});
                          SendCallback();
                        },
                        (error) => {
                          // console.log('after create login error')
                          let tmp = 'error';
                          dispatch({ type: GET_LOGIN_ERROR , payload :tmp});
                          SendCallback();
                        })
                     },
                    (error) => {
                      let tmp = 'error';
                      dispatch({ type: GET_LOGIN_ERROR , payload :tmp});
                      SendCallback();
                    },
                  );
                }
                else{ 
                  let tmp = 'error';
                  dispatch({ type: GET_LOGIN_ERROR , payload :tmp});
                  SendCallback();
                }
              }).catch(error=>{
                let tmp = 'error';
                dispatch({ type: GET_LOGIN_ERROR , payload :tmp});
                SendCallback();
              })
              
        }
        }).catch((error) => {
            let tmp = 'error';
           dispatch({ type: GET_LOGIN_ERROR , payload :tmp});
           SendCallback();
      });
    }      
};