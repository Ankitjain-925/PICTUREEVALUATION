import { combineReducers } from "redux";
// import signupReducer from './signupReducers';
import LanguageReducer from "./languageReducers";
import LoginReducerAim from "./LoginReducers";
import Doctorset from "./Doctorset";
import filterate from "./Filterthis";
import authy from "./auth";
import EmergencySet from "./EmergencySet";
import cometreducer from "./cometreducer";
import Settings from "./setting";
import Fitbit from "./fitbit";
import Withings from "./withing";
import Doctorarrays from "./doctorarray";
import OptionList from "./optionList";
import overView from "./journalView";
import houseSelect from "./house";
import speciality from "./speciality";
import invoices from "./invoices";



const allReducers = combineReducers({
  //signupReducer: signupReducer,
  // XTesting: XTesting,
  // placeReducer: placeReducer,
  LanguageReducer: LanguageReducer,
  LoginReducerAim: LoginReducerAim,
  Doctorset: Doctorset,
  filterate: filterate,
  authy: authy,
  cometreducer: cometreducer,
  EmergencySet: EmergencySet,
  Settings: Settings,
  Doctorarrays: Doctorarrays,
  Fitbit: Fitbit,
  Withings: Withings,
  OptionList: OptionList,
  overView:overView,
  houseSelect: houseSelect,
  Speciality: speciality,
  Invoices: invoices
  
});

export default allReducers;
