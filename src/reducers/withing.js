import {
  GET_Withing_REQUEST,
  GET_Withing_SUCCESS,
  GET_Withing_ERROR,
} from "../actiontypes";

const INITIAL_STATE = {
  withing: { data: [] },
};

const Withings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_Withing_REQUEST:
      return { ...state, withing: { data: [] } };
    case GET_Withing_SUCCESS:
      return { ...state, withing: action.payload };
    case GET_Withing_ERROR:
      return { ...state, withing: { data: [] } };
    default:
      return state;
  }
};
export default Withings;
