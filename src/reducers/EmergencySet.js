import {
  GET_EMERGENCY_REQUEST,
  GET_EMERGENCY_FAIL,
  GET_EMERGENCY_SUCCESS,
} from "../actiontypes";

const INITIAL_STATE = {
  Emergencysetget: { p_id: null },
};

const EmergencySet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMERGENCY_REQUEST:
      return { Emergencysetget: { p_id: null } };
    case GET_EMERGENCY_SUCCESS:
      return { Emergencysetget: { ...action.payload } };
    case GET_EMERGENCY_FAIL:
      return { Emergencysetget: { p_id: null } };
    default:
      return state;
  }
};
export default EmergencySet;
