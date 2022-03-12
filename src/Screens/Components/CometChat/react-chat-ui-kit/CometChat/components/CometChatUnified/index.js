import React from "react";
import "./style.scss";
import "assets/css/style.css"
import { CometChat } from "@cometchat-pro/chat";
import { CometChatManager } from "../../util/controller";
import NavBar from "./NavBar";
import Loader from "Screens/Components/Loader/index";
import CometChatMessageListScreen from "../CometChatMessageListScreen";
import CometChatUserDetail from "../CometChatUserDetail";
import CometChatGroupDetail from "../CometChatGroupDetail";
import MessageThread from "../MessageThread";
import CallScreen from "../CallScreen";
import { getLanguage } from "translations/index"
class CometChatUnified extends React.Component {
  constructor(props) {
   super(props);
    this.leftPanelRef = React.createRef();
    this.rightPanelRef = React.createRef();
  }

  state = {
    darktheme: false,
    viewdetailscreen: false,
    item: {},
    type: "user",
    tab: "",
    groupToDelete: {},
    groupToLeave: {},
    groupToUpdate: {},
    groupUpdated: {},
    threadmessageview: false,
    threadmessagetype: null,
    threadmessageitem: {},
    threadmessageparent: {},
    composedthreadmessage: {},
    outgoingCall: null,
    loaderImage: false
  };

  componentDidMount() {
    //   CometChat.getUnreadMessageCountForUser(UID).then(array => {
    //     // console.log("Message count fetched", array);
    // }, error => {
    //     // console.log("Error in getting message count", error);
    // })
    this.setState({tab : "conversations"})
    if (!Object.keys(this.state.item).length) {
      this.toggleSideBar();
    }
  }

  // audioCall = () => {
  //   let receiverId, receiverType;
  //   if (this.props.type === "user") {
  //     receiverId = this.props.item.uid;
  //     receiverType = CometChat.RECEIVER_TYPE.USER;
  //   } else if (this.props.type === "group") {
  //     receiverId = this.props.item.guid;
  //     receiverType = CometChat.RECEIVER_TYPE.GROUP;
  //   }

  //   let callType = CometChat.CALL_TYPE.AUDIO;

  //   CometChatManager.audioCall(receiverId, receiverType, callType)
  //     .then((call) => {
  //       this.callScreenAction("callStarted", call);
  //       this.setState({ outgoingCall: call });
  //     })
  //     .catch((error) => {
  //       // console.log("Call initialization failed with exception:", error);
  //     });
  // };

  callScreenAction = (action, call) => {
    switch (action) {
      case "callStarted":
      case "callEnded":
        if (!call) return;
        // this.appendMessage(call);
        break;
      default:
        break;
    }
  };

  // videoCall = () => {
  //   let receiverId, receiverType;
  //   if (this.props.type === "user") {
  //     receiverId = this.props.item.uid;
  //     receiverType = CometChat.RECEIVER_TYPE.USER;
  //   } else if (this.props.type === "group") {
  //     receiverId = this.props.item.guid;
  //     receiverType = CometChat.RECEIVER_TYPE.GROUP;
  //   }

  //   let callType = CometChat.CALL_TYPE.VIDEO;

  //   CometChatManager.videoCall(receiverId, receiverType, callType)
  //     .then((call) => {
  //       this.callScreenAction("callStarted", call);
  //       this.setState({ outgoingCall: call });
  //     })
  //     .catch((error) => {
  //       // console.log("Call initialization failed with exception:", error);
  //     });
  // };

  changeTheme = (e) => {
    this.setState({
      darktheme: !this.state.darktheme,
    });
  };

  navBarAction = (action, type, item) => {
    switch (action) {
      case "itemClicked":
        this.itemClicked(item, type);
        break;
      case "tabChanged":
        this.tabChanged(type);
        break;
      case "userStatusChanged":
        this.updateSelectedUser(item);
        break;
      case "closeMenuClicked":
        this.toggleSideBar();
        break;
      default:
        break;
    }
  };

  updateSelectedUser = (item) => {
    this.setState({ item: { ...item } });
  };

  itemClicked = (item, type) => {
    this.toggleSideBar();
    this.setState({ item: { ...item }, type, viewdetailscreen: false });
  };

  tabChanged = (tab) => {
    this.setState({ tab });
    this.setState({ viewdetailscreen: false, loaderImage: true });
    setTimeout(()=>{
      this.setState({loaderImage: false})
    }, 5000)
  };

  actionHandler = (action, item, count, ...otherProps) => {
    switch (action) {
      case "blockUser":
        this.blockUser();
        break;
      case "unblockUser":
        this.unblockUser();
        break;
      case "viewDetail":
      case "closeDetailClicked":
        this.toggleDetailView();
        break;
      case "menuClicked":
        this.toggleSideBar();
        break;
      case "groupDeleted":
        this.deleteGroup(item);
        break;
      case "leftGroup":
        this.leaveGroup(item);
        break;
      case "membersUpdated":
        this.updateMembersCount(item, count);
        break;
      case "groupUpdated":
        this.groupUpdated(item, count, ...otherProps);
        break;
      case "viewMessageThread":
        this.viewMessageThread(item);
        break;
      case "closeThreadClicked":
        this.closeThreadMessages();
        break;
      case "threadMessageComposed":
        this.onThreadMessageComposed(item);
        break;
      default:
        break;
    }
  };

  blockUser = () => {
    let usersList = [this.state.item.uid];
    CometChatManager.blockUsers(usersList)
      .then((list) => {
        this.setState({ item: { ...this.state.item, blockedByMe: true } });
      })
      .catch((error) => {
        // console.log("Blocking user fails with error", error);
      });
  };

  unblockUser = () => {
    let usersList = [this.state.item.uid];
    CometChatManager.unblockUsers(usersList)
      .then((list) => {
        this.setState({ item: { ...this.state.item, blockedByMe: false } });
      })
      .catch((error) => {
        // console.log("unblocking user fails with error", error);
      });
  };

  toggleDetailView = () => {
    let viewdetail = !this.state.viewdetailscreen;
    this.setState({ viewdetailscreen: viewdetail, threadmessageview: false });
  };

  toggleSideBar = () => {
    const elem = this.leftPanelRef.current;

    if (elem.classList.contains("active")) {
      elem.classList.remove("active");
    } else {
      elem.classList.add("active");
    }
  };

  closeThreadMessages = () => {
    this.setState({ viewdetailscreen: false, threadmessageview: false });
  };

  viewMessageThread = (parentMessage) => {
    const message = { ...parentMessage };
    const threaditem = { ...this.state.item };
    this.setState({
      threadmessageview: true,
      threadmessageparent: message,
      threadmessageitem: threaditem,
      threadmessagetype: this.state.type,
      viewdetailscreen: false,
    });
  };

  onThreadMessageComposed = (composedMessage) => {
    if (this.state.type !== this.state.threadmessagetype) {
      return false;
    }

    if (
      (this.state.threadmessagetype === "group" &&
        this.state.item.guid !== this.state.threadmessageitem.guid) ||
      (this.state.threadmessagetype === "user" &&
        this.state.item.uid !== this.state.threadmessageitem.uid)
    ) {
      return false;
    }

    const message = { ...composedMessage };
    this.setState({ composedthreadmessage: message });
  };

  deleteGroup = (group) => {
    this.setState({
      groupToDelete: group,
      item: {},
      type: "group",
      viewdetailscreen: false,
    });
  };

  leaveGroup = (group) => {
    this.setState({
      groupToLeave: group,
      item: {},
      type: "group",
      viewdetailscreen: false,
    });
  };

  updateMembersCount = (item, count) => {
    const group = Object.assign({}, this.state.item, {
      membersCount: count,
      scope: item.scope,
    });
    this.setState({ item: group, groupToUpdate: group });
  };

  groupUpdated = (message, key, ...otherProps) => {
    const groupUpdated = {};
    groupUpdated["action"] = key;
    groupUpdated["message"] = message;
    groupUpdated["messageId"] = message.id;
    groupUpdated["guid"] = message.receiver.guid;
    groupUpdated["props"] = { ...otherProps };

    this.setState({ groupUpdated: groupUpdated });
  };

  render() {

    let translate = getLanguage(this.props.lan)
    let { Select_chat } = translate
    let threadMessageView = null;
    if (this.state.threadmessageview) {
      threadMessageView = (
        <div className="ccl-right-panel" ref={this.rightPanelRef}>
          <MessageThread
            tab={this.state.tab}
            item={this.state.threadmessageitem}
            type={this.state.threadmessagetype}
            parentMessage={this.state.threadmessageparent}
            actionGenerated={this.actionHandler}
          />
        </div>
      );
    }

    let detailScreen = null;
    if (this.state.viewdetailscreen) {
      if (this.state.type === "user") {
        detailScreen = (
          <div className="ccl-right-panel" ref={this.rightPanelRef}>
            <CometChatUserDetail
              item={this.state.item}
              type={this.state.type}
              actionGenerated={this.actionHandler}
            />
          </div>
        );
      } else if (this.state.type === "group") {
        detailScreen = (
          <div className="ccl-right-panel" ref={this.rightPanelRef}>
            <CometChatGroupDetail
              item={this.state.item}
              type={this.state.type}
              groupUpdated={this.state.groupUpdated}
              actionGenerated={this.actionHandler}
            />
          </div>
        );
      }
    }

    let messageScreen = (
      <div className="outer CreatChatOuter">
        <div className="middle CreatChatMid">
          <div className="inner CreatChatInner">
            <img
              className='chatScreenImg'
              src={require("../../LogoPNG.png")}
              // src="https://aimedis.io/assets/images/LogoSymbolTransparentAimedis.png"
              alt="AIS Logo"
              title="AIS Logo"
            /><br/>

           
            <p className="chatScreenText">{Select_chat}</p>
           


            {/* <CallScreen
              className="callscreen"
              item={this.state.item}
              type={this.state.type}
              lan={this.props.lan}
              actionGenerated={this.callScreenAction}
              outgoingCall={this.state.outgoingCall}
            /> */}
            {/* <CallScreen className="callscreen"
          item={this.props.item} 
          type={this.props.type}
          actionGenerated={this.callScreenAction} 
          outgoingCall={this.state.outgoingCall} /> */}

          
          </div>
        </div>
      </div>
    );
    if (Object.keys(this.state.item).length) {
      messageScreen = (
        <CometChatMessageListScreen
          item={this.state.item}
          tab={this.state.tab}
          type={this.state.type}
          lan={this.props.lan}
          composedthreadmessage={this.state.composedthreadmessage}
          actionGenerated={this.actionHandler}
        />
      );
    }

    return (
      <div className="unified">
        {this.state.loaderImage && <Loader />}
        <div className="ccl-left-panel" ref={this.leftPanelRef}>
          <NavBar
            Userlist={this.props.Userlist}
            lan={this.props.lan}
            item={this.state.item}
            tab={this.state.tab}
            groupToDelete={this.state.groupToDelete}
            groupToLeave={this.state.groupToLeave}
            groupToUpdate={this.state.groupToUpdate}
            actionGenerated={this.navBarAction}
          />
        </div>
        <div className="ccl-center-panel ccl-chat-center-panel">
          {messageScreen}
        </div>
        {detailScreen}
        {threadMessageView}
      </div>
    );
  }
}

export default CometChatUnified;
