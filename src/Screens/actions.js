import { GET_LANGUAGE_TYPE } from "../actiontypes";
// import { ToastActionsCreators } from 'react-native-redux-toast';
export const LanguageFetchReducer = (selectedLanguage) => {
  return (dispatch) => {
    dispatch({ type: GET_LANGUAGE_TYPE, payload: selectedLanguage });
  };
};
