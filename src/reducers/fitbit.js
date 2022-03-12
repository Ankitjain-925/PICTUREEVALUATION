import {
  GET_fitbit_REQUEST,
  GET_fitbit_SUCCESS,
  GET_fitbit_ERROR,
} from "../actiontypes";

const INITIAL_STATE = {
  fitbit: {
    lifetimeStats: {},
    device: [],
    distance: {},
    steps: {},
    user: {},
    badges: {},
  },
};
const Fitbit = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_fitbit_REQUEST:
      return { ...state, fitbit: { data: [] } };
    case GET_fitbit_SUCCESS:
      return { ...state, fitbit: action.payload };
    case GET_fitbit_ERROR:
      return { ...state, fitbit: { data: [] } };
    default:
      return state;
  }
};
export default Fitbit;
