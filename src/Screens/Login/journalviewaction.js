import {
    GET_JOURNAL_REQUEST,
    GET_JOURNAL_SUCCESS,
  } from "actiontypes";
  
  export const overView = (data) => {
    return (dispatch) => {
      dispatch({ type: GET_JOURNAL_REQUEST });
      if (data === "loggedOut") {
        dispatch({ type: GET_JOURNAL_SUCCESS, payload: false });
      } else {
        dispatch({ type: GET_JOURNAL_SUCCESS, payload: data });
      }
    };
  };