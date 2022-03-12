import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';

import PrivateRoute from './PrivateRoute';

import KitchenSinkApp from './defaultPages/KitchenSinkApp';
import HomePage from './defaultPages/HomePage';
import AllComponents from './defaultPages/AllComponents';

import * as actions from './store/action';

import {
  CometChatConversationList,
  CometChatUserList,
  CometChatUnified,
  CometChatGroupList,
  CometChatUserListScreen,
  CometChatConversationListScreen,
  CometChatGroupListScreen 
} from './react-chat-ui-kit/CometChat';

const history = createBrowserHistory();

class App extends React.Component {
  state = {
    isLoggedin: false
  }

  componentDidMount() {
    this.props.getLoggedinUser();
  }

  render() {
    
    return (
      <div>
        <Router history={history}>
          <div>
          <Switch>
            <PrivateRoute path="/" component={CometChatUnified} />
          </Switch>  
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLoggedinUser: () => dispatch( actions.authCheckState() )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);