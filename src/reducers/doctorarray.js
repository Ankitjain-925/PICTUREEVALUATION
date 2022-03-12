import {
  GET_DoctorArray_REQUEST,
  GET_DoctorArray_SUCCESS,
  GET_DoctorArray_ERROR,
} from "../actiontypes";

const INITIAL_STATE = {
  doctorarrays: { doctorarray: [] },
};

const Doctorarrays = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DoctorArray_REQUEST:
      return { ...state, doctorarrays: { doctorarray: [] } };
    case GET_DoctorArray_SUCCESS:
      return { ...state, doctorarrays: action.payload };
    case GET_DoctorArray_ERROR:
      return { ...state, doctorarrays: { doctorarray: [] } };
    default:
      return state;
  }
};
export default Doctorarrays;
