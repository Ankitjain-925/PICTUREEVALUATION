/////////////////////////////////
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import allReducers from "../reducers/index";
import {
  createStateSyncMiddleware,
  initStateWithPrevTab,
} from "redux-state-sync";
import { save, load } from "redux-localstorage-simple";

const config = {
  // TOGGLE_TODO will not be triggered in other tabs
  blacklist: ["TOGGLE_TODO"],
};

const middlewares = [createStateSyncMiddleware(config)];

const createStoreWithMiddleware = applyMiddleware(
  save(),
  thunk,
  ...middlewares
)(createStore);
const store = createStoreWithMiddleware(
  compose()(allReducers),
  load() // Loading done here
);

initStateWithPrevTab(store);
export default store;
