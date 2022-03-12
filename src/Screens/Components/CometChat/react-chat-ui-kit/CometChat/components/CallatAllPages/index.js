import React from 'react';
import { connect } from 'react-redux';
import { CometChat } from "@cometchat-pro/chat";
import * as actions from '../../../../../../../store/action';
import { CometChatManager } from "../../util/controller";
import CallScreen from "../CallScreen";
import CancelIcon from '@material-ui/icons/Cancel';
import * as enums from '../../util/enums.js';
import { withRouter } from "react-router-dom";
// import { CometChatUnified } from '../react-chat-ui-kit/CometChat'; 
var NewM = false
class Notification extends React.Component {
    
    constructor(props) {
		super(props);
	}
  
  state = {
    item: {},
    type: "user",
    outgoingCall: null,
    ShowTime : false,
    Unread : 0,
    NewM : false,
    ShowTime1: false,
  }
    
    componentDidMount()
    {
        this.props.getLoggedinUser();
        new CometChatManager().getLoggedInUser().then((user) => {
            CometChat.getUnreadMessageCount().then((users)=>{
            var summed = this.sum( users.users );
            setTimeout(()=> { this.setState({Unread : summed, ShowTime : true},
                ()=>{
                    setTimeout(() => { this.setState({ ShowTime : false})  }, 8000);
                })}, 5000);
            })
          })
    }
    componentDidUpdate()
    {
      this.attachListeners(this.messageUpdated);
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

    removeListeners(){
      CometChat.removeMessageListener(this.msgListenerId);
    }
    
    componentWillUnmount() {
      this.removeListeners(); 
    }

    sum = ( obj ) => {
        var sum = 0;
        for( var el in obj ) {
          if( obj.hasOwnProperty( el ) ) {
            sum += parseFloat( obj[el] );
          }
        }
        return sum;
      }

    audioCall = () => {

        let receiverId, receiverType;
        if(this.props.type === "user") {
          receiverId = this.props.item.uid;
          receiverType = CometChat.RECEIVER_TYPE.USER;
        } else if(this.props.type === "group") {
          receiverId = this.props.item.guid;
          receiverType = CometChat.RECEIVER_TYPE.GROUP;
        }
    
        let callType = CometChat.CALL_TYPE.AUDIO;
        CometChatManager.audioCall(receiverId, receiverType, callType).then(call => {
    
          this.callScreenAction("callStarted", call);
          this.setState({ outgoingCall: call });
    
        }).catch(error => {
          // console.log("Call initialization failed with exception:", error);
        });
    
      }
    
      callScreenAction = (action, call) => {
    
        switch(action) {
          case "callStarted":
          case "callEnded":
            if(!call) return;
            // this.appendMessage(call);
          break;
          default:
          break;
        }
    
      }
    
    
      videoCall = () => {
    
        let receiverId, receiverType;
        if(this.props.type === "user") {
    
          receiverId = this.props.item.uid;
          receiverType = CometChat.RECEIVER_TYPE.USER;
    
        } else if(this.props.type === "group") {
          receiverId = this.props.item.guid;
          receiverType = CometChat.RECEIVER_TYPE.GROUP;
        }
       
        let callType = CometChat.CALL_TYPE.VIDEO;
    
        CometChatManager.videoCall(receiverId, receiverType, callType).then(call => {
    
          this.callScreenAction("callStarted", call);
          this.setState({ outgoingCall: call });
    
        }).catch(error => {
          // console.log("Call initialization failed with exception:", error);
        });
    
      }
      messageUpdated = (key, message, ...otherProps) => {

        switch(key) {
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
        this.setState({ NewM : true, ShowTime1: true })
        setTimeout(() => { this.setState({  NewM : false, ShowTime1 : false})  }, 8000);
      }
      
      CloseNotification1=(e)=>{
        e.preventDefault(); this.setState({ ShowTime : false})
      }
      CloseNotification=(e)=>{
        e.preventDefault(); this.setState({ ShowTime1 : false, NewM : false})
      }
      redirectPage=()=> {
        if(this.props.stateLoginValueAim.stateLoginValueAim?.user?.type === 'nurse' || this.props.stateLoginValueAim.stateLoginValueAim?.user?.type === 'pharmacy'){
            this.props.history.push(`/${this.props.stateLoginValueAim.stateLoginValueAim.user.type}`)
        }
        else{
            this.props.history.push(`/${this.props.stateLoginValueAim.stateLoginValueAim.user.type}/chats`)
        } 
    }
    render() {
        return (
            <div>
   
                <CallScreen className="callscreen"
                item={this.state.item} 
                type={this.state.type}
                lan={this.props.stateLanguageType.stateLanguageType}
                actionGenerated={this.callScreenAction} 
                outgoingCall={this.state.outgoingCall} 
                comeFrom="notify"/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        stateLanguageType : state.LanguageReducer,
        isLoggedIn: state.isLoggedIn,
        loading: state.loading,
        error: state.error,
        stateLoginValueAim: state.LoginReducerAim,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getLoggedinUser: () => dispatch( actions.authCheckState() )
    };
  };
  
export default withRouter(connect( mapStateToProps, mapDispatchToProps)(Notification));


