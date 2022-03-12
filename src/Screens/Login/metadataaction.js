import {
  GET_OptionList_REQUEST,
  GET_OptionList_SUCCESS,
  GET_OptionList_FAIL,
} from "actiontypes";
import sitedata from "sitedata.js";
import axios from "axios";
import { commonNoTokentHeader } from "component/CommonHeader/index";

export const OptionList = (getting, callBack= ()=>{}) => {
  return (dispatch) => {
      if(getting){
          dispatch({ type: GET_OptionList_REQUEST });
          axios
            .get(sitedata.data.path + "/UserProfile/Metadata", commonNoTokentHeader()
            )
            .then((responce) => {
              if (responce && responce.data && responce.data.length > 0) {
                dispatch({ type: GET_OptionList_SUCCESS, payload: responce.data[0] });
                callBack();
              }
            })
            .catch((error) => {
              dispatch({ type: GET_OptionList_FAIL });
              OptionList();  
            });
          }
          else{
              dispatch({ type: GET_OptionList_FAIL }); 
              callBack();
          }
      };
};
