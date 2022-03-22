import React from "react";
import "./style.scss";
import "assets/css/style.css"
import { CometChat } from "@cometchat-pro/chat";
import Draggable from "react-draggable";
import { CometChatManager } from "../../util/controller";
import { ResizableBox } from 'react-resizable';
import "react-resizable/css/styles.css";
import { getLanguage } from "translations/index"
import { CallScreenManager } from "./controller";
import * as enums from "../../util/enums.js";
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { SvgAvatar } from "../../util/svgavatar";

import Avatar from "../Avatar";
import Grid from "@material-ui/core/Grid";

class CallScreen extends React.PureComponent {
  constructor(props) {
   super(props);

    this.state = {
      showCallScreen: false,
      showIncomingScreen: false,
      showOutgoingScreen: false,
      showIframeScreen: false,
      myWidth: 400,
      myHeight: 400,
      isFull: false
    };
  }

  componentDidMount() {
    this.CallScreenManager = new CallScreenManager();
    this.CallScreenManager.attachListeners(this.callScreenUpdated);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.outgoingCall !== this.props.outgoingCall) {
      this.CallScreenManager.removeListeners();
      this.CallScreenManager = new CallScreenManager();
      this.CallScreenManager.attachListeners(this.callScreenUpdated);

      this.setState({
        showCallScreen: true,
        showIncomingScreen: false,
        showOutgoingScreen: true,
        showIframeScreen: false,
        callIProgress: this.props.outgoingCall,
      });
    }
  }

  componentWillUnmount() {
    this.CallScreenManager.removeListeners();
    this.CallScreenManager = null;
  }

  callScreenUpdated = (key, call) => {
    switch (key) {
      case enums.INCOMING_CALL_RECEIVED: //occurs at the callee end
        if (!this.state.callIProgress) {
          this.setState({
            showCallScreen: true,
            showIncomingScreen: true,
            callIProgress: call,
          });
        }
        this.props.actionGenerated("callStarted", call);
        break;
      case enums.OUTGOING_CALL_ACCEPTED: //occurs at the caller end
        this.onCallAccepted(call);
        break;
      case enums.OUTGOING_CALL_REJECTED: //occurs at the caller end, callee rejects the call
        this.onCallDismiss(call);
        break;
      case enums.INCOMING_CALL_CANCELLED: //occurs(call dismissed) at the callee end, caller cancels the call
        this.onCallDismiss(call);
        break;
      case enums.CALL_ENDED:
        break;
      default:
        break;
    }
  };

  onCallDismiss = (call) => {
    this.setState({
      showCallScreen: false,
      showIncomingScreen: false,
      showOutgoingScreen: false,
      showIframeScreen: false,
      callIProgress: undefined,
    });
    this.props.actionGenerated("callEnded", call);
  };

  onCallAccepted = (call)  => {
    if(this.props.comeFrom==='notify'){
        this.setState({
            showCallScreen: true,
            showIncomingScreen: false,
            showOutgoingScreen: false,
            showIframeScreen: true,
            callIProgress: call,
          }); 
          const el = document.getElementById("cp-call-screen-container");
          CometChat.startCall(
            call.getSessionId(),
            el,
            new CometChat.OngoingCallListener({
              onUserJoined: (user) => {
                const el1 = document.getElementsByClassName("react-resizable");
                el1[1].parentNode.removeChild(el1[1]);
                // el2.src=require('assets/images/LogoPNG.png')
                // el1[1].style.display= "none";
                /* Notification received here if another user joins the call. */
                //// console.log("[CallScreen] onCallAccepted User joined call:", user);
                /* this method can be use to display message or perform any actions if someone joining the call */
              },
              onUserLeft: (user) => {
                /* Notification received here if another user left the call. */
                //// console.log("[CallScreen] onCallAccepted User left call:", user);
                /* this method can be use to display message or perform any actions if someone leaving the call */
              },
              onCallEnded: (call) => {
                /* Notification received here if current ongoing call is ended. */
                //// console.log("[CallScreen] onCallAccepted call ended:", call);
                this.setState({
                  showCallScreen: false,
                  showIncomingScreen: false,
                  showOutgoingScreen: false,
                  showIframeScreen: false,
                  callIProgress: undefined,
                });
                this.props.actionGenerated("callEnded", call);
                /* hiding/closing the call screen can be done here. */
              },
            })
          );
    }
    else{
      this.setState({
        showCallScreen: true,
        showIncomingScreen: false,
        showOutgoingScreen: false,
      }); 
    }
  };

  //answering incoming call, occurs at the callee end
  acceptCall = (notify) => {
    if(notify){
        CometChatManager.acceptCall(this.state.callIProgress.sessionId)
      .then((call) => {
        this.setState({
          showCallScreen: true,
          showIncomingScreen: false,
          showOutgoingScreen: false,
          showIframeScreen: true,
        });

        const el = document.getElementById("cp-call-screen-container");
        CometChat.startCall(
          call.getSessionId(),
          el,
          new CometChat.OngoingCallListener({
            onUserJoined: (user) => {
              const el1 = document.getElementsByClassName("react-resizable");
              el1[1].parentNode.removeChild(el1[1]);
              console.log(el1[0].getElementsByClassName("aspect-ratio-1"));
              // const el2 = document.getElementsByClassName("main-video-avatar");
              // console.log('sdf33', el2)
              // el2.src=require('assets/images/LogoPNG.png')
              
              // el1[1].style.display= "none";
              /* Notification received here if another user joins the call. */
              //// console.log("User joined call:", enums.USER_JOINED, user);
              /* this method can be use to display message or perform any actions if someone joining the call */
            },
            onUserLeft: (user) => {
              /* Notification received here if another user left the call. */
              //// console.log("User left call:", enums.USER_LEFT, user);
              /* this method can be use to display message or perform any actions if someone leaving the call */
            },
            onCallEnded: (call) => {
              /* Notification received here if current ongoing call is ended. */
              //// console.log("call ended:", enums.CALL_ENDED, call);
              this.setState({
                showCallScreen: false,
                showIncomingScreen: false,
                showOutgoingScreen: false,
                showIframeScreen: false,
                callIProgress: undefined,
              });
              this.props.actionGenerated("callEnded", call);
              /* hiding/closing the call screen can be done here. */
            },
          })
        );
      })
      .catch((error) => {
        console.log("[CallScreen] acceptCall -- error", error);
      });
    }  
  };

  //rejecting/cancelling an incoming call, occurs at the callee end
  rejectCall = (callStatus) => {
    CometChatManager.rejectCall(this.state.callIProgress.sessionId, callStatus)
      .then((call) => {
        this.setState({
          showCallScreen: false,
                showIncomingScreen: false,
                showOutgoingScreen: false,
                showIframeScreen: false,
                callIProgress: undefined,
        });

        this.props.actionGenerated("callEnded", call);
      })
      .catch((error) => {
        this.setState({
          showCallScreen: false,
          showIncomingScreen: false,
          showOutgoingScreen: false,
          showIframeScreen: false,
          callIProgress: undefined,
        });

        this.props.actionGenerated("callEnded", error);
      });
  };
  setFullSCreen=(e)=>{
    const el = document.getElementById("cp-call-screen-container");
    this.setState({ onMax: el.style.transform})
    el.style.transform = "translate(0px, 0px)"
    this.setState({isFull: true, myWidth:window.innerWidth, myHeight:window.innerHeight})
  }
  
  setWindowedSCreen=(e)=>{
    const el = document.getElementById("cp-call-screen-container");
    el.style.transform = this.state.onMax;
    this.setState({isFull: false, myWidth:350, myHeight:350})
  }
  render() {
    let translate = getLanguage(this.props.lan)
    let {incomingcall, Calling} = translate;
    let callScreen = null,
      incomingCallScreen,
      outgoingCallScreen;
    if (this.state.showIncomingScreen && this.props.comeFrom === 'notify') {
      // window.open(
      //   "https://sys.aimedis.io",
      //   "_blank",
      //   "toolbar=0,location=0,menubar=0"
      // );

      if (!this.state.callIProgress.sender.getAvatar()) {
        const uid = this.state.callIProgress.sender.getUid();
        const char = this.state.callIProgress.sender
          .getName()
          .charAt(0)
          .toUpperCase();

        this.state.callIProgress.sender.setAvatar(
          SvgAvatar.getAvatar(uid, char)
        );
      }

      incomingCallScreen = (
        <div className="ccl-call-ong-max-wrap audio-video-call"> 
        <React.Fragment>
          {/* <div className="ccl-call-ong-max-header">
            <h6 className="ccl-call-ong-max-name">
              {this.state.callIProgress.sender.name}
            </h6>
          </div>
          <div className="ccl-call-ong-max-thumb-wrap">
            <div className="ccl-call-ong-max-thumb">
              <Avatar
                cornerRadius="50%"
                image={this.state.callIProgress.sender.avatar}
              />
            </div>
          </div>
          <div className="ccl-call-ong-max-cta-wrap">
            <div
              className="ccl-call-ong-max-ctablock"
              onClick={()=>{this.acceptCall('notify')}}
            >
              <div className="ccl-call-ong-max-cta-link callaccept" />
            </div>
            <div
              className="ccl-call-ong-max-ctablock"
              onClick={() => this.rejectCall(CometChat.CALL_STATUS.REJECTED)}
            >
              <div className="ccl-call-ong-max-cta-link callend" />
            </div>
          </div> */}
          <Grid className="inCallUpr">
            <Grid>
               <h4>{incomingcall}</h4>
            </Grid>
            <Grid className="inCallPic">
              <img
                src={this.state.callIProgress.sender.avatar}
                alt=""
                title=""
              />
              {/* <img src={require('assets/images/incomingCall.png')} alt="" title="" /> */}
            </Grid>
            <Grid>
              <label>{this.state.callIProgress.sender.name}</label>
            </Grid>
            <Grid className="inCallAdd">
              <a onClick={()=>{this.acceptCall('notify')}}>
                <img
                  src={require("assets//images/rcvCall.png")}
                  alt=""
                  title=""
                />
              </a>
              <a
                onClick={() => this.rejectCall(CometChat.CALL_STATUS.REJECTED)}
              >
                <img
                  src={require("assets//images/closeCall.png")}
                  alt=""
                  title=""
                />
              </a>
            </Grid>
          </Grid>
        </React.Fragment>
        </div>
      );
    }

    if (this.state.showOutgoingScreen) {
      
      if (
        this.props.type === "user" &&
        !this.state.callIProgress.receiver.getAvatar()
      ) {
        const uid = this.state.callIProgress.receiver.getUid();
        const char = this.state.callIProgress.receiver
          .getName()
          .charAt(0)
          .toUpperCase();

        this.state.callIProgress.receiver.setAvatar(
          SvgAvatar.getAvatar(uid, char)
        );
      } else if (
        this.props.type === "group" &&
        !this.state.callIProgress.receiver.getIcon()
      ) {
        const guid = this.state.callIProgress.receiver.getGuid();
        const char = this.state.callIProgress.receiver
          .getName()
          .charAt(0)
          .toUpperCase();

        this.state.callIProgress.receiver.setIcon(
          SvgAvatar.getAvatar(guid, char)
        );
      }

      let avatar;
      if (this.props.type === "user") {
        avatar = (
          <Avatar
            cornerRadius="50%"
            image={this.state.callIProgress.receiver.avatar}
          />
        );
      } else if (this.props.type === "group") {
        avatar = (
          <Avatar
            cornerRadius="50%"
            image={this.state.callIProgress.receiver.icon}
          />
        );
      }

      outgoingCallScreen = (
        <div className="ccl-call-ong-max-wrap audio-video-call" id="autgoingCall"> 
        <React.Fragment>
          <div className="ccl-call-ong-max-header">
              <span className="ccl-call-ong-max-dur">{Calling}</span>
           
            <h6 className="ccl-call-ong-max-name">
              {this.state.callIProgress.receiver.name}
            </h6>
          </div>
          <div className="ccl-call-ong-max-thumb-wrap">
            <div className="ccl-call-ong-max-thumb">{avatar}</div>
          </div>
          <div className="ccl-call-ong-max-cta-wrap">
            <div
              className="ccl-call-ong-max-ctablock"
              onClick={() => this.rejectCall(CometChat.CALL_STATUS.CANCELLED)}
            >
              <div className="ccl-call-ong-max-cta-link callend" />
            </div>
          </div>
        </React.Fragment>
        </div>
      );
    }

    if (this.state.showCallScreen) {
      callScreen = (
        <div className={this.state.showIframeScreen && !this.state.isFull ? "ifIframeButn": ""}>
            {this.state.showIframeScreen && <span> {!this.state.isFull ? 
              <FullscreenIcon className={this.state.showIframeScreen && !this.state.isFull ? "mnMxBtn1": "mnMxBtn2"} onClick={(e)=>{this.setFullSCreen(e)}}/>
              : <FullscreenExitIcon className={this.state.showIframeScreen && !this.state.isFull ? "mnMxBtn1": "mnMxBtn2"} onClick={(e)=>{this.setWindowedSCreen(e)}} />}
              </span>}
          <Draggable
              defaultPosition={{ x: 0, y: 0 }}
              onDrag={() =>{}}
              cancel={".react-resizable-handle"}
          >
            <ResizableBox width={this.state.myWidth} height={this.state.myHeight}
              minConstraints={[300, 300]} maxConstraints={[window.innerWidth-50, window.innerHeight-100]}
              resizeHandles={['ne' ]}
              className={this.state.showIframeScreen && !this.state.isFull ? "ifIframethan" : ""}
              id={this.props.comeFrom ==='notify' && "cp-call-screen-container"}>
              {this.state.showIframeScreen && !this.state.isFull ? 
              <FullscreenIcon className="mnMxBtn" onClick={(e)=>{this.setFullSCreen(e)}}/>
              : <FullscreenExitIcon className="mnMxBtn" onClick={(e)=>{this.setWindowedSCreen(e)}} />}
            </ResizableBox>
          </Draggable>
          {incomingCallScreen}
          {outgoingCallScreen}
        </div>
      );
    }
    
    return callScreen;
  }
}

export default CallScreen;
