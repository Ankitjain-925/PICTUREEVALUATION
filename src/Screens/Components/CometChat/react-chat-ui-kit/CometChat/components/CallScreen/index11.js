import React from "react";
import "./style.scss";
import "assets/css/style.css"
import { CometChat } from "@cometchat-pro/chat";
import Draggable from "react-draggable";
import { CometChatManager } from "../../util/controller";
import { Resizable, ResizableBox } from 'react-resizable';
import "react-resizable/css/styles.css";
import {
  translationAR,
  translationSW,
  translationSP,
  translationRS,
  translationEN,
  translationNL,
  translationDE,
  translationCH,
  translationPT,
  translationFR
} from "translations/index"
import { CallScreenManager } from "./controller";
import * as enums from "../../util/enums.js";

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
  setFullSCreen=()=>{
    const el = document.getElementById("cp-call-screen-container");
    el.style.transform = "translate(0px, 0px)"
    this.setState({isFull: true, myWidth:window.innerWidth, myHeight:window.innerHeight})
  }

  setWindowedSCreen=()=>{
    const el = document.getElementById("cp-call-screen-container");
    el.style.transform = "translate(0px, 0px)"
    this.setState({isFull: false, myWidth:400, myHeight:400})
  }
 
  render() {
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
            {this.props.lan === "en" && (
              <h4>{translationEN.text.incomingcall}</h4>
            )}
            {this.props.lan === "de" && (
              <h4>{translationDE.text.incomingcall}</h4>
            )}
            {this.props.lan === "ch" && (
               <h4>{translationCH.text.incomingcall}</h4>
            )}
            {this.props.lan === "nl" && (
              <h4>{translationNL.text.incomingcall}</h4>
            )}
            {this.props.lan === "sp" && (
               <h4>{translationSP.text.incomingcall}</h4>
            )}
            {this.props.lan === "pt" && (
               <h4>{translationPT.text.incomingcall}</h4>
            )}
            {this.props.lan === "rs" && (
               <h4>{translationRS.text.incomingcall}</h4>
            )}
            {this.props.lan === "sw" && (
               <h4>{translationSW.text.incomingcall}</h4>
            )}
            {this.props.lan === "fr" && (
               <h4>{translationFR.text.incomingcall}</h4>
            )}
            {this.props.lan === "ar" && (
               <h4>{translationAR.text.incomingcall}</h4>
            )}
              
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
          {this.props.lan === "en" && (
              <span className="ccl-call-ong-max-dur">{translationEN.text.Calling}</span>
            )}
            {this.props.lan === "de" && (
             <span className="ccl-call-ong-max-dur">{translationDE.text.Calling}</span>
            )}
            {this.props.lan === "ch" && (
              <span className="ccl-call-ong-max-dur">{translationCH.text.Calling}</span>
            )}
            {this.props.lan === "nl" && (
             <span className="ccl-call-ong-max-dur">{translationNL.text.Calling}</span>
            )}
            {this.props.lan === "sp" && (
              <span className="ccl-call-ong-max-dur">{translationSP.text.Calling}</span>
            )}
            {this.props.lan === "pt" && (
              <span className="ccl-call-ong-max-dur">{translationPT.text.Calling}</span>
            )}
            {this.props.lan === "rs" && (
              <span className="ccl-call-ong-max-dur">{translationRS.text.Calling}</span>
            )}
            {this.props.lan === "sw" && (
               <span className="ccl-call-ong-max-dur">{translationSW.text.Calling}</span>
            )}
             {this.props.lan === "fr" && (
               <span className="ccl-call-ong-max-dur">{translationFR.text.Calling}</span>
            )}
             {this.props.lan === "ar" && (
               <span className="ccl-call-ong-max-dur">{translationAR.text.Calling}</span>
            )}
           
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
        <div>
          {/* {this.state.showIframeScreen && <div>{!this.state.isFull? 
                <span onClick={()=>{this.setFullSCreen()}}>Full Screen</span>
                : <span onClick={()=>{this.setWindowedSCreen()}}>Small Screen</span>}</div>} */}
            <Draggable
                defaultPosition={{ x: 0, y: 0 }}
                onDrag={() =>{}}
                cancel={".react-resizable-handle"}
            >
                <ResizableBox width={this.state.myWidth} height={this.state.myHeight}
                  minConstraints={[300, 300]} maxConstraints={[window.innerWidth-50, window.innerHeight-50]}
                  resizeHandles={['ne' ]}
                  className={this.state.showIframeScreen && !this.state.isFull ? "ifIframethan" : ""}
                  id={this.props.comeFrom ==='notify' && "cp-call-screen-container"}>
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
