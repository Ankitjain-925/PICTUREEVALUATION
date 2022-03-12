import React from "react";
import { connect } from "react-redux";
import { CometChat } from "@cometchat-pro/chat";
import { COMETCHAT_CONSTANTS } from "../consts";
import { Route, Redirect } from "react-router-dom";
import * as actions from "../../../../store/action";
import { CometChatUnified } from "../react-chat-ui-kit/CometChat";

class PrivateRoute extends React.Component {
  componentDidMount() {
    // this.props.getLoggedinUser();
    let arr = this.props.Userlist;
  }
  render() {
    return (
      <CometChatUnified
        Userlist={this.props.Userlist}
        Uid={this.props.Uid}
        lan={this.props.lan}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    loading: state.loading,
    error: state.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getLoggedinUser: () => dispatch(actions.authCheckState()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);
