import { GET_LANGUAGE_TYPE, GET_LANGUAGE_TYPE_FAIL } from "../actiontypes";

const initial_state = {
  stateLanguageType: "en",
};
const LanguageReducer = (state = initial_state, action) => {
  switch (action.type) {
    case GET_LANGUAGE_TYPE:
      return { ...state, stateLanguageType: action.payload };
    case GET_LANGUAGE_TYPE_FAIL:
      return { ...state };
    default:
      return state;
  }
};
export default LanguageReducer;
