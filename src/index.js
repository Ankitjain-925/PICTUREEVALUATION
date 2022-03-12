import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./component/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store/index";
import "assets/css/style.css";
import "assets/css/virtual_hospital.css";
import { CometChat } from "@cometchat-pro/chat";
import { COMETCHAT_CONSTANTS } from "Screens/Components/CometChat/consts";

// const rootReducers = combineReducers(reducers);
// const store1 = createStore(rootReducers,applyMiddleware(thunk)

var appID = COMETCHAT_CONSTANTS.APP_ID;
var region = COMETCHAT_CONSTANTS.REGION;

var appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();
CometChat.init(appID, appSetting).then(() => {
  if (CometChat.setSource) {
    CometChat.setSource("ui-kit", "web", "reactjs");
  }
});

render(
  <BrowserRouter basename="/">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();
