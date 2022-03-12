import {
  GET_CODE_REQUEST,
  GET_CODE_FAIL,
  GET_CODE_SUCCESS,
} from "../actiontypes";

const data = {
  verifyCode: { code: false },
};

const authy = (state = data, action) => {
  switch (action.type) {
    case GET_CODE_REQUEST:
      return { verifyCode: { code: false } };
    case GET_CODE_SUCCESS:
      return { verifyCode: { ...action.payload } };
    case GET_CODE_FAIL:
      return { verifyCode: { code: false } };
    default:
      return state;
  }
};
export default authy;
