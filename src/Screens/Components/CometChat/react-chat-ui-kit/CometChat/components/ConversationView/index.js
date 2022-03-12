import React from "react";
import "./style.scss";
import { CometChat } from "@cometchat-pro/chat";
import "./style.scss";
import sitedata from "sitedata";
import BadgeCount from "../BadgeCount";
import ReactTooltip from "react-tooltip";
import Avatar from "../Avatar";
import StatusIndicator from "../StatusIndicator";
import { SvgAvatar } from "../../util/svgavatar";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from "./../../../../../../actions";
import { ConversationListManager } from "../CometChatConversationList/controller";
class ConversationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _image: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {

    if(prevProps.Userlist !== this.props.Userlist || prevProps.conversation !== this.props.conversation ) {
      let user = this.props?.conversation?.conversationWith;
      if (user.avatar) {
        const uid = user.uid;
        var char = user.avatar;
        char = char.split(".com/")[1];
        axios
          .get(sitedata.data.path + "/aws/sign_s3?find=" + char)
          .then((response) => {
            if (response.data.hassuccessed) {
              this.setState({ _image: response.data.data });
            }
          });
      } 
      else {
        const uid = user.uid;
        const char = user.name.charAt(0).toUpperCase();
        if (uid && char) {
          this.setState({ _image: SvgAvatar.getAvatar(uid, char) });
        }
      }
    }
  }

  componentDidMount = () => {
    let user = this.props?.conversation?.conversationWith;
    if (user.avatar) {
      const uid = user.uid;
      var char = user.avatar;
      char = char.split(".com/")[1];
      axios
        .get(sitedata.data.path + "/aws/sign_s3?find=" + char)
        .then((response) => {
          if (response.data.hassuccessed) {
            this.setState({ _image: response.data.data });
          }
        });
    } else {
      const uid = user.uid;
      const char = user.name.charAt(0).toUpperCase();
      if (uid && char) {
        setTimeout(()=>{
          this.setState({ _image: SvgAvatar.getAvatar(uid, char) });
        }, 2000)
        
      }
    }
  };
  getMessage = () => {
    let message = "";
    const type = this.props.conversation.lastMessage.type;

    switch (type) {
      case CometChat.MESSAGE_TYPE.TEXT:
        message = this.props.conversation.lastMessage.text;
        break;
      case CometChat.MESSAGE_TYPE.MEDIA:
        message = "Media message";
        break;
      case CometChat.MESSAGE_TYPE.IMAGE:
        message = "Image message";
        break;
      case CometChat.MESSAGE_TYPE.FILE:
        message = "File message";
        break;
      case CometChat.MESSAGE_TYPE.VIDEO:
        message = "Video message";
        break;
      case CometChat.MESSAGE_TYPE.AUDIO:
        message = "Audio message";
        break;
      case CometChat.MESSAGE_TYPE.CUSTOM:
        message = "Custom message";
        break;
      default:
        break;
    }

    return message;
  };

  getCallMessage = () => {
    let message = "";
    const type = this.props.conversation.lastMessage.type;
    switch (type) {
      case CometChat.MESSAGE_TYPE.VIDEO:
        message = "Video call";
        break;
      case CometChat.MESSAGE_TYPE.AUDIO:
        message = "Audio call";
        break;
      default:
        break;
    }
    return message;
  };

  getActionMessage = () => {
    var message = this.props.conversation.lastMessage.message;
    //if action messages are set to hide in config
    if (this.props.config) {
      const found = this.props.config.find((cfg) => {
        return (
          cfg.action === message.action && cfg.category === message.category
        );
      });

      if (found && found.enabled === false) {
        message = "";
      }
    }

    return message;
  };

  getCustomMessage = () => {
    var message = "Some Custom Message";
    return message;
  };

  getLastMessage = () => {
    if (!this.props.conversation.lastMessage) return false;

    let message = "";

    switch (this.props.conversation.lastMessage.category) {
      case "message":
        message = this.getMessage();
        break;
      case "call":
        message = this.getCallMessage();
        break;
      case "action":
        message = this.getActionMessage();
        break;
      case "custom":
        message = this.getCustomMessage();
        break;
      default:
        break;
    }

    return message;
  };

  render() {
    let lastMessageTimeStamp = "";
    if (this.props.conversation.lastMessage) {
      lastMessageTimeStamp = (
        <span className="chat-listitem-time">
          {new Date(
            this.props.conversation.lastMessage.sentAt * 1000
          ).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </span>
      );
    }

    let presence;
    if (this.props.conversation.getConversationType() === "user") {
      const status = this.props.conversation.getConversationWith().getStatus();
      presence = (
        <StatusIndicator
          status={status}
          cornerRadius="50%"
          borderColor="rgb(238, 238, 238)"
          borderWidth="1px"
        />
      );
    }
    var showImage = this.state._image
    return (
      this.props.Userlist.includes(
        this.props.conversation.conversationWith.uid
      ) && (
        <div className="chat-listitem">
          {/* {console.log('_image', _image)} */}
          <div className="chat-thumbnail-wrap">
            <Avatar
              image={showImage}
              cornerRadius="18px"
              borderColor="#CCC"
              borderWidth="1px"
              name={this.props.conversation?.conversationWith?.name}
            />
            {presence}
          </div>
          <div className="chat-listitem-dtls">
          <div className="chat-listitem-name" data-tip data-for={this.props.conversation.conversationWith.name}>{this.props.conversation.conversationWith.name.includes('undefined') ? this.props.conversation.conversationWith.uid :this.props.conversation.conversationWith.name}</div>
              <ReactTooltip className="timeIconClas" id={this.props.conversation.conversationWith.name} place="top" effect="solid" backgroundColor="#ffffff">
                  {this.props.conversation.conversationWith.name?.includes('undefined') ? this.props.conversation.conversationWith.uid :this.props.conversation.conversationWith.name}
              </ReactTooltip>
        
            {/* <div className="chat-listitem-name">
              {this.props.conversation.conversationWith.name}
            </div> */}
            <p className="chat-listitem-txt">{this.getLastMessage()} </p>
          </div>
          {lastMessageTimeStamp}
          <BadgeCount
            count={this.props.conversation.unreadMessageCount}
          ></BadgeCount>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  return {
    stateLanguageType,
  };
};
export default withRouter(
  connect(mapStateToProps, { LanguageFetchReducer })(ConversationView)
);
// export default CometChatConversationList;
