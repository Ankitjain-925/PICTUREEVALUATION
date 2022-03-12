import {
  GET_SETTING_REQUEST,
  GET_SETTING_SUCCESS,
  GET_SETTING_ERROR,
} from "../actiontypes";

const INITIAL_STATE = {
  settings: {
    setting: {
      language: "en",
      mode: "normal",
      date_format: "MM/DD/YYYY",
      time_format: "24",
    },
  },
};

const Settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SETTING_REQUEST:
      return {
        ...state,
        settings: {
          setting: {
            language: "en",
            mode: "normal",
            date_format: "MM/DD/YYYY",
            time_format: "24",
          },
        },
      };
    case GET_SETTING_SUCCESS:
      return { ...state, settings: action.payload };
    case GET_SETTING_ERROR:
      return {
        ...state,
        settings: {
          setting: {
            language: "en",
            mode: "normal",
            date_format: "MM/DD/YYYY",
            time_format: "24",
          },
        },
      };
    default:
      return state;
  }
};
export default Settings;
