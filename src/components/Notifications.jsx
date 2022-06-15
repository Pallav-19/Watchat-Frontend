/* eslint-disable no-unused-vars */
import React from "react";
import SocketContext from "../SocketContext";
import CallIcon from "@mui/icons-material/Call";
import { IconButton } from "@mui/material";
function Notifications() {
  const context = React.useContext(SocketContext);

  const ringtone = new Audio("../assets/sounds/one_plus.mp3");
  const [play, setPlay] = React.useState(false);
  // if (context.call.isRecieved && !context.callAccepted) {
  //   setPlay(true);
  // }
  // if (play) {
  //   ringtone.play();
  // }

  return (
    <>
      {context?.call.isRecieved && !context.callAccepted && (
        <div className="notification">
          <p className="calling">{context.call.name}Pallav is calling you!</p>
          <IconButton onClick={context.answerCall} className="callaccept">
            <CallIcon />
          </IconButton>
        </div>
      )}
    </>
  );
}

export default Notifications;
