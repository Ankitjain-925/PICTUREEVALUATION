import {
  GET_FILTER_REQUEST,
  GET_FILTER_FAIL,
  GET_FILTER_SUCCESS,
} from "../actiontypes";

const INITIAL_STATE = {
  catfil: { category: "all" },
};

const filterate = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_FILTER_REQUEST:
      return { catfil: { category: "all" } };
    case GET_FILTER_SUCCESS:
      return { catfil: { ...action.payload } };
    case GET_FILTER_FAIL:
      return { catfil: { categoty: "all" } };
    default:
      return state;
  }
};
export default filterate;
