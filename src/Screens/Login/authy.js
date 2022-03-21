import {
  GET_CODE_SUCCESS,
} from "../../actiontypes";

export const authy = (data) => {
  return (dispatch) => {
    let tmp = { code: data };
    dispatch({ type: GET_CODE_SUCCESS, payload: tmp });
  };
};
