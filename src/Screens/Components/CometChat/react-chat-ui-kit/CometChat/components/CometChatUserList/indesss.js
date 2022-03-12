import React from "react";
import "./style.scss";
import { CometChat } from "@cometchat-pro/chat";
import { CometChatManager } from "../../util/controller";
import { SvgAvatar } from "../../util/svgavatar";
import { UserListManager } from "./controller";
import { sortCometUser, unreadAtLast } from "Screens/Components/BasicMethod/index"// "../../../../../BasicMethod/index"
import UserView from "../UserView";
import axios from "axios";
import * as enums from '../../util/enums.js';
import { connect } from "react-redux";
import sitedata from "sitedata";
import { LoginReducerAim } from "Screens/Login/actions";
import { getLanguage } from "translations/index";
import { commonHeader } from "component/CommonHeader/index";
class CometChatUserList extends React.PureComponent {
  timeout;
  friendsOnly = false;

  constructor(props) {
    super(props);
    this.state = {
      userlist: [],
      userlist1: [],
      preUserList: [],
      loading: false,
      Unread: 0,
      onSearh: false
    };
  }

  componentDidMount() {
    new CometChatManager().getLoggedInUser().then((user) => {
      CometChat.getUnreadMessageCount().then((users) => {
        this.setState({ Unread: users });
      });
    });
    if (this.props.friendsOnly) {
      this.friendsOnly = this.props.friendsOnly;
    }
    this.UserListManager = new UserListManager(this.friendsOnly);
    this.UserListManager.attachListeners(this.userUpdated);
  }

  messageUpdated = (key, message, ...otherProps) => {
    switch(key) {
      case enums.MESSAGE_READ:
      case enums.TEXT_MESSAGE_RECEIVED:
      case enums.MEDIA_MESSAGE_RECEIVED:
      case enums.CUSTOM_MESSAGE_RECEIVED:
        this.messageReceived(message);
        break;
      default:
        break;
    }
  }
  messageReceived=()=>
  {
    new CometChatManager().getLoggedInUser().then((user) => {
      CometChat.getUnreadMessageCount().then((users) => {
        this.setState({ Unread: users },
          ()=>{
            this.newAtTop(this.state.userlist1)
          });
      });
    });
  }
  removeListeners(){
    CometChat.removeMessageListener(this.msgListenerId);
  }

  attachListeners = (callback) => {
    CometChat.addMessageListener(
        this.msgListenerId,
        new CometChat.MessageListener({
            onTextMessageReceived: textMessage => {
                callback(enums.TEXT_MESSAGE_RECEIVED, textMessage);
            },
            onMediaMessageReceived: mediaMessage => {
                callback(enums.MEDIA_MESSAGE_RECEIVED, mediaMessage);
            },
            onCustomMessageReceived: customMessage => {
                callback(enums.CUSTOM_MESSAGE_RECEIVED, customMessage);
            },
            onMessagesDelivered: messageReceipt => {
                callback(enums.MESSAGE_DELIVERED, messageReceipt);
            },
            onMessagesRead: messageReceipt => {
                callback(enums.MESSAGE_READ, messageReceipt);
            },
            onMessageDeleted: deletedMessage => {
                callback(enums.MESSAGE_DELETED, deletedMessage);
            }
        })
    );
  }

  componentDidUpdate(prevProps, prevState) {
    this.attachListeners(this.messageUpdated);
    {
      this.state.Unread &&
        this.state.Unread.users &&
        Object.entries(this.state.Unread.users).map(([key, value]) => {
          if (key === this.props.item.uid) {
            new CometChatManager().getLoggedInUser().then((user) => {
              CometChat.getUnreadMessageCount().then((users) => {
                this.setState({ Unread: users });
              });
            });
          }
        });
    }
    if (prevProps.item.uid !== this.props.item.uid) {
      new CometChatManager().getLoggedInUser().then((user) => {
        CometChat.getUnreadMessageCount().then((users) => {
          this.setState({ Unread: users });
        });
      });
    }

    //if user is blocked/unblocked, update userlist in state
    if (
      prevProps.item &&
      Object.keys(prevProps.item).length &&
      prevProps.item.uid === this.props.item.uid &&
      prevProps.item.blockedByMe !== this.props.item.blockedByMe
    ) {
      let userlist = [...this.state.userlist];
      let userObj = userlist.find((u, k) => u.uid === this.props.item.uid);
      if (userObj) {
        userObj = Object.assign(userObj, {
          blockedByMe: this.props.item.blockedByMe,
        });
      }
      this.setState({ userlist });
    } else {
      if (this.state.preUserList.length != this.props.Userlist.length) {
        this.setState({ preUserList: this.props.Userlist });
        setTimeout(this.getUsers, 500);
      }
    }
  }

  componentWillUnmount() {
    this.UserListManager.removeListeners();
    this.UserListManager = null;
    this.removeListeners(); 
  }

  userUpdated = (user) => {
    let userlist = [...this.state.userlist];

    //search for user
    let index = userlist.findIndex((u, k) => u.uid === user.uid);
    let userObj = userlist.find((u, k) => u.uid === user.uid);

    //if found in the list, update user object
    if (userObj) {
      userObj = Object.assign(userObj, user);
      userlist.splice(index, 1, userObj);
      this.setState({ userlist: userlist });
      if (this.props.userStatusChanged && this.props.item.uid === user.uid) {
        this.props.userStatusChanged(userObj);
      }
    }
  };

  handleScroll = (e) => {
    const bottom =
      Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
      Math.round(e.currentTarget.clientHeight);
    if (bottom) this.onScroll(this.state.userlist1);
  };

  handleClick = (user) => {
    this.setState({ selectedUser: user.uid })
    if (!this.props.onItemClick) return;
    this.props.onItemClick(user, "user");
  };

  handleMenuClose = () => {
    if (!this.props.actionGenerated) {
      return false;
    }

    this.props.actionGenerated("closeMenuClicked");
  };

  isThisAvilabel = (object, text) => {
    if (object && typeof object == 'object') {
      if (object.uid && object.uid.toLowerCase().includes(text) || object.name && object.name.toLowerCase().includes(text)) {
        return true;
      }
      else {
        return false;
      }
    } else {
      return false;
    }
  };


  searchUsers = (e) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    let val = e.target.value;
  
    if (val.length<=3) 
    {
      this.setState({ onSearh: false, userlist: [] },
      ()=>{this.onScroll(this.state.userlist1, 'first')})
    }
    else {
        if (this.state.userlist1 && this.state.userlist1.length > 0) {
          let FilterFromSearch = this.state.userlist1 && this.state.userlist1.length > 0 && this.state.userlist1.filter((data) => {
            return this.isThisAvilabel(data, val && val.toLowerCase());
          });
          this.setState({ userlist: FilterFromSearch, onSearh : true })
      }
    }

    // this.timeout = setTimeout(() => {
    //   this.UserListManager = new UserListManager(this.friendsOnly, val);
    //   this.setState({ userlist: [] }, () => this.getUsers());
    // }, 500);
  };

  onScroll=(users , calling ='')=>{
    var count =  calling ==='first'? 20 : this.state.userlist?.length + 20;
    var newlist = [];
    if(this.state.userlist?.length < users.length){
      newlist = users.slice(this.state.userlist?.length, count)
    }
      this.setState({userlist: [...this.state.userlist, ...newlist]})
      // this.setState({userlist: users})
  }

  newAtTop=(userList1)=>{
    var TopUsers = [];
    userList1 = sortCometUser(userList1)
    if(this.state.Unread)
    {
      TopUsers = userList1 && userList1.filter((data)=>this.state.Unread.users.hasOwnProperty(data.uid))
    }
    userList1 = unreadAtLast(userList1, this.state.Unread)
    var userList = [...TopUsers, ...userList1];

    this.setState({ userlist1: userList,  userlist: [] },
      ()=>{
        this.onScroll(this.state.userlist1, 'first')
      })
  }

  resolveUserList = (ccuser = [])=> {
    let usersRequest = [];
    let listlength = ccuser.length;
    let numberOfTimes = 0,
      remainLimit = 0;
    if (listlength > 25) {
      numberOfTimes = listlength / 25;
      remainLimit = listlength % 25;
    } else {
      remainLimit = listlength;
    }
    if (numberOfTimes > 0) {
      for (var i = 0; i <= numberOfTimes; i++) {
          let lowerLimit = i * 25;
          let userItem = ccuser.slice(lowerLimit, lowerLimit + 25);
          usersRequest.push(
            new CometChat.UsersRequestBuilder()
              .setLimit(25)
              .setUIDs(userItem)
              .build(),
          );
      }
      if (remainLimit > 0) {
        let lowerLimit = 25 * numberOfTimes;
        let userItem = ccuser.slice(lowerLimit, lowerLimit + remainLimit);
        usersRequest.push(
          new CometChat.UsersRequestBuilder()
            .setLimit(25)
            .setUIDs(userItem)
            .build(),
        );
      }
    } else {
      usersRequest.push(
        new CometChat.UsersRequestBuilder().setLimit(25).setUIDs(ccuser).build(),
      );
    }
    return Promise.all(
      usersRequest.map(async req => {
        return new Promise((resolve, reject) => {
          req.fetchNext().then(_u => {
            resolve(_u);
          });
        }).catch(() => {
          // resolve();
        });
      }),
    );
  } 

  getUsers = () => {
    let users = [];
    let er = 0;
    this.setState({ loading: true });
    new CometChatManager()
      .getLoggedInUser()
      .then((user) => {
        let u = this.state.preUserList;
       //  console.log('u', u)
        const isIncluded = [];
        var userForlist = [];
        if (u && u.length > 0) {
          let u1 =  u.filter((data,index)=> index<=50);
          let u2 =  u.filter((data,index)=> index>50);
         //  console.log('u1', u1) 
         //  console.log('u2', u2)
          this.resolveUserList(u1)
            .then(result => {
              result.map(item => {
                item.map(_itm => {
                  if (isIncluded.includes(_itm.uid)) {
                    return;
                  } else {
                    userForlist.push(_itm);
                    isIncluded.push(_itm.uid);
                  }
                });
              });
             //  console.log('Its first', userForlist)
              this.newAtTop(userForlist)
            })
          
          if(u2 && u2.length>0){
            this.resolveUserList(u2)
            .then(result => {
              result.map(item => {
                item.map(_itm => {
                  if (isIncluded.includes(_itm.uid)) {
                    return;
                  } else {
                    userForlist.push(_itm);
                    isIncluded.push(_itm.uid);
                  }
                });
              });
             //  console.log('Its last',userForlist )
              this.newAtTop(userForlist)
            })
          }
        }
        
        // axios
        // .post(
        //   sitedata.data.path + "/cometUserList/GetAllUser",
        //   {list : u},
        //   commonHeader(this.props.stateLoginValueAim.token))
        // .then((response) => {
        //   // change when add scrolling
        //   let userList1 = response.data.data
        //   this.newAtTop(userList1)
        // })
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
        // u.map((id, index) => {
        //   CometChat.getUser(id)
        //     .then(
        //       (us) => {
        //         users.push(us);
        //       },
        //       (error) => {
        //         er++;
        //         ////  console.log("User details fetching failed with error:", error);
        //       })
        //     .then(() => {
        //       if (users.length + er == u.length) {
        //         this.setState({ userlist1: users, userlist: users }
        //         );
        //       }
        //     });
        // });


        // this.UserListManager.fetchNextUsers()
        //   .then((userList) => {
        //     userList.forEach((user) => (user = this.setAvatar(user)));
        //     this.setState({
        //       userlist: [...this.state.userlist, ...userList],
        //       loading: false,
        //     });
        //   })
        //   .catch((error) => {
        //     console.error(
        //       "[CometChatUserList] getUsers fetchNext error",
        //       error
        //     );
        //     this.setState({ loading: false });
        //   });
    
  };

  setAvatar(user) {
    if (!user.getAvatar()) {
      const uid = user.getUid();
      const char = user
        .getName()
        .charAt(0)
        .toUpperCase();
      user.setAvatar(SvgAvatar.getAvatar(uid, char));
    }
  }

  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let { Search, Loading } = translate;
    let loading = null;
    if (this.state.loading) {
      loading = <div className="lo8ading-text">{Loading}</div>;
    }
////  console.log('this.state.userlist1', this.state.userlist1)
    let userList1 = this.state.userlist;
    // userList1 = sortCometUser(userList1)
    // if(this.state.Unread)
    // {
    //   TopUsers = userList1 && userList1.filter((data)=>this.state.Unread.users.hasOwnProperty(data.uid))
    // }
    // userList1 = unreadAtLast(userList1, this.state.Unread)
    // let userList = [...TopUsers, ...userList1];
    
    let currentLetter = "";
    const users = userList1?.length>0 && userList1.map((user, key) => {
      const chr = user.name[0].toUpperCase();
      if (chr !== currentLetter) {
        currentLetter = chr;
        return (
          <div style={{ background: this.state.selectedUser == user.uid ? "#F2F2F2" : "#fff" }} id={key} onClick={() => this.handleClick(user)} key={key}>
            <UserView
              Userlist={this.props.Userlist}
              key={user.uid}
              UnreadCount={this.state.Unread.users}
              user={user}
            />
          </div>
        );
      } else {
        return (
          <div style={{ background: this.state.selectedUser == user.uid ? "#F2F2F2" : "#fff" }} id={key} onClick={() => this.handleClick(user)} key={key}>
            <UserView
              Userlist={this.props.Userlist}
              key={user.uid}
              UnreadCount={this.state.Unread.users}
              user={user}
            />
          </div>
        );
      }
    });

    return (
      <React.Fragment>
        <div className="ccl-left-panel-head-wrap">
          <div
            className="cc1-left-panel-close"
            onClick={this.handleMenuClose}
          />
          {/* <h4 className="ccl-left-panel-head-ttl">Contacts</h4> */}
        </div>
        <div className="ccl-left-panel-srch-wrap">
          <div className="ccl-left-panel-srch-inpt-wrap ">

            <input
              type="text"
              autoComplete="off"
              className="ccl-left-panel-srch"
              id="chatSearch"
              placeholder={Search}
              onChange={this.searchUsers}
            />
            <input id="searchButton" type="button" className="search-btn " />
          </div>
        </div>
        <div
          className="chat-contact-list-ext-wrap"
          onScroll={this.handleScroll}
        >
          {users}
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
  } = state.LoginReducerAim;
  return {
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
  };
};

export default connect(mapStateToProps, {
  LoginReducerAim,
})(CometChatUserList);

