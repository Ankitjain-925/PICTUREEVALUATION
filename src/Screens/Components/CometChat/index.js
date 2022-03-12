
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';

import PrivateRoute from './PrivateRoute';

import * as actions from './store/action';
import { COMETCHAT_CONSTANTS } from './consts';
import { CometChatUnified } from './react-chat-ui-kit/CometChat';
import { CometChat } from '@cometchat-pro/chat'; 

const history = createBrowserHistory();

class App extends React.Component {
  state = {
    isLoggedin: false
  }

  componentDidMount() {
    CometChat.getLoggedinUser().then(user => {
      if(user) {
        this.setState({isLoggedin : true})
        this.props.getLoggedinUser();
      } else {
        setTimeout(()=>{this.setState({isLoggedin : true})},3000)
        this.props.onLogin(this.props.Uid, COMETCHAT_CONSTANTS.AUTH_KEY);
      }
  }).catch(error => {
    this.props.onLogin(this.props.Uid, COMETCHAT_CONSTANTS.AUTH_KEY);
  });
    
  }

  render() {
    
    return (
      <div>
        {this.state.isLoggedin &&
        <PrivateRoute Userlist={this.props.Userlist} Uid={this.props.Uid} lan={this.props.lan} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: ( uid, authKey ) => dispatch( actions.auth( uid, authKey ) ),
    getLoggedinUser: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);