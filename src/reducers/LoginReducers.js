import {
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_ERROR,
} from "../actiontypes";

const INITIAL_STATE = {
  loadingaIndicatoranswerdetail: false,
  stateLoginValueAim: { token: 450, loadingaIndicatoranswerdetail: false },
};

const LoginReducerAim = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LOGIN_REQUEST:
      return { ...state, loadingaIndicatoranswerdetail: true };
    case GET_LOGIN_SUCCESS:
      return {
        ...state,
        loadingaIndicatoranswerdetail: false,
        stateLoginValueAim: action.payload,
      };
    case GET_LOGIN_ERROR:
      return { ...state, loadingaIndicatoranswerdetail: false };
    default:
      return state;
  }
};
export default LoginReducerAim;
