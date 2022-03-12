import React from 'react';
import TooltipTrigger from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import { CometChat } from "@cometchat-pro/chat";
import "./style.scss";
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
  translationFR,
  translationTR
} from "translations/index"

const actionHandler = (props) => {
  props.actionGenerated(props.action, props.message);
  document.body.click();
}
const DeleteMessage = (messageId, props) => {
  CometChat.deleteMessage(messageId).then(
    message => {
        // // console.log("Message deleted", message);
        props.actionGenerated("messageDeleted", [ message ])
    },
    error => {
        // console.log("Message delete failed with error:", error);
    }
  );
}

const Tooltip = ({ tooltip, children, ...props }) => (
  <TooltipTrigger
    {...props}
    tooltip={({
      getTooltipProps,
      getArrowProps,
      tooltipRef,
      arrowRef,
      placement
    }) => (
      <div {...getTooltipProps({ ref: tooltipRef, className: 'tooltip-container' })}>
        <div
          {...getArrowProps({
            ref: arrowRef,
            'data-placement': placement,
          })}
        />
        <ul className="cc1-chat-win-tooltip">
          {/* <li className="reply" 
          onClick={() => actionHandler(props)}>
            <span></span>{(props.message.replyCount) ? "Reply to thread" : "Reply in thread"}
          </li>
          <li className="edit"><span></span>Edit message</li> */}
         
           {props.lan === "en" && (
               <li className="delete"  onClick={() =>  DeleteMessage(props.message.id, props)}>
               {translationEN.text.DeleteMessages}
             </li>
            )}
            {props.lan === "de" && (
               <li className="delete"  onClick={() =>  DeleteMessage(props.message.id, props)}>
               {translationDE.text.DeleteMessages}
             </li>
            )}
            {props.lan === "ch" && (
               <li className="delete"  onClick={() =>  DeleteMessage(props.message.id, props)}>
                  {translationCH.text.DeleteMessages}
                </li>
            )}
            {props.lan === "nl" && (
               <li className="delete"  onClick={() =>  DeleteMessage(props.message.id, props)}>
                  {translationNL.text.DeleteMessages}
                </li>
            )}
            {props.lan === "sp" && (
              <li className="delete"  onClick={() =>  DeleteMessage(props.message.id, props)}>
                {translationSP.text.DeleteMessages}
              </li>
            )}
            {props.lan === "pt" && (
               <li className="delete"  onClick={() =>  DeleteMessage(props.message.id, props)}>
               {translationPT.text.DeleteMessages}
             </li>
            )}
            {props.lan === "rs" && (
              <li className="delete"  onClick={() =>  DeleteMessage(props.message.id, props)}>
              {translationRS.text.DeleteMessages}
            </li>
            )}
            {props.lan === "sw" && (
               <li className="delete"  onClick={() =>  DeleteMessage(props.message.id, props)}>
               {translationSW.text.DeleteMessages}
             </li>
            )}
             {props.lan === "fr" && (
              <li className="delete"  onClick={() =>  DeleteMessage(props.message.id, props)}>
                {translationFR.text.DeleteMessages}
              </li>
            )}
             {props.lan === "ar" && (
                <li className="delete"  onClick={() =>  DeleteMessage(props.message.id, props)}>
                  {translationAR.text.DeleteMessages} 
                </li>
            )}
             {props.lan === "tr" && (
                <li className="delete"  onClick={() =>  DeleteMessage(props.message.id, props)}>
                  {translationTR.text.DeleteMessages} 
                </li>
            )}
        
        </ul>
      </div>
    )}>
    {({ getTriggerProps, triggerRef }) => (
      <span {...getTriggerProps({ ref: triggerRef, className: 'trigger' })}>{children}</span>
    )}
  </TooltipTrigger>
);

export default Tooltip;