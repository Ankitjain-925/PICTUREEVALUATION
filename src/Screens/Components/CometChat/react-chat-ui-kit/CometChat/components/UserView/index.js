import React, { useState, useEffect } from "react";
import "./style.scss";
import sitedata from "sitedata";
import BadgeCount from "../BadgeCount";
import ReactTooltip from "react-tooltip";
import Avatar from "../Avatar";
import StatusIndicator from "../StatusIndicator";
import { SvgAvatar } from "../../util/svgavatar";
import axios from "axios";

function Userview(props) {
  const [_image, setImage] = React.useState(null);
  useEffect(() => {
    let user = props.user;
    if (user.avatar) {
      const uid = user.uid;
      var char = user.avatar;
      char = char.split(".com/")[1];
      axios
        .get(sitedata.data.path + "/aws/sign_s3?find=" + char)
        .then((response) => {
          if (response.data.hassuccessed) {
            setImage(response.data.data);
          }
        });
    }
    else{
      const uid = user.uid;
      const char = user.name.charAt(0).toUpperCase();
      setImage(SvgAvatar.getAvatar(uid, char));
    } 
  }, [props.user]);
  return ((
    // props.Userlist && props.Userlist.includes(props.user.uid) ?
    <div className="contact-listitem" >
      <div className="contact-thumbnail-wrap">
        <Avatar
          image={_image}
          cornerRadius="50%"
          borderColor="#CCC"
          borderWidth="1px"
          name={props.user?.name}
        />
        <StatusIndicator
          status={props.user.status}
          cornerRadius="50%"
          borderColor="rgb(238, 238, 238)"
          borderWidth="1px"
        />
      </div>
      <div className="contact-listitem-dtls">
        <div className="contact-listitem-name" data-tip data-for={props?.user?.name}>{props?.user?.name?.includes('undefined') ? props?.user?.uid :props?.user?.name}</div>
        <ReactTooltip className="timeIconClas" id={props?.user?.name} place="top" effect="solid" backgroundColor="#ffffff">
            {props.user.name.includes('undefined') ? props?.user?.uid :props?.user?.name}
        </ReactTooltip>
        {props &&
          props.UnreadCount &&
          Object.entries(props.UnreadCount).map(([key, value]) =>
            key === props.user.uid ? <BadgeCount count={value} /> : ""
          )}
      </div>
    </div> /*: <div></div>*/ /*: <div></div>*/ /*: <div></div>*/ /*: <div></div>*/
    // : <div></div>
  ) /*: <div></div>*/);
}

export default Userview;
