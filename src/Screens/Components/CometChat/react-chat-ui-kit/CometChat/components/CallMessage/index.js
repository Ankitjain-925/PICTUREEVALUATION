import React from "react";
import "./style.scss";

import { CometChat } from "@cometchat-pro/chat";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "../../../../../../actions";
import {
    getLanguage
  } from "translations/index"

const callmessage = (props) => {
    
    const getMessage = () => {
        let translate = getLanguage(props.stateLanguageType)
        let { had_miss_call_from, had_rejected_call, had_joined_call_with, had_initiated_call_with, ended_call_with, cancelled_call_with } = translate

        switch (props.message.action) {
            case CometChat.CALL_STATUS.UNANSWERED:
                return <p className="chat-txt-msg">{props.message.receiver.name + had_miss_call_from + props.message.sender.name}</p>
            case CometChat.CALL_STATUS.REJECTED:
                return <p className="chat-txt-msg">{props.message.sender.name + had_rejected_call + props.message.receiver.name} </p>
            case CometChat.CALL_STATUS.ONGOING:
                return <p className="chat-txt-msg">{props.message.sender.name + had_joined_call_with + props.message.receiver.name}</p>
            case CometChat.CALL_STATUS.INITIATED:
                return <p className="chat-txt-msg">{props.message.sender.name + had_initiated_call_with + props.message.receiver.name}</p>
            case CometChat.CALL_STATUS.ENDED:
                return <p className="chat-txt-msg">{props.message.sender.name + ended_call_with + props.message.receiver.name}</p>
            case CometChat.CALL_STATUS.CANCELLED:
                return <p className="chat-txt-msg">{props.message.sender.name + cancelled_call_with + props.message.receiver.name}</p>
            default:
                break;
        }
    }

    return (
    <div className="cc1-chat-win-action-msg-wrap">{getMessage()}</div>
    )
}

const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    return {
        stateLanguageType
    }
};
export default withRouter(connect(mapStateToProps, { LanguageFetchReducer })(callmessage));
