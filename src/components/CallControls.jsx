/* eslint-disable no-unused-vars */
import React from "react";
import "../styles.css";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { Button } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicIcon from "@mui/icons-material/Mic";
import { Tooltip } from "@mui/material";
import SocketContext from "../SocketContext";
function CallControls() {
  const context = React.useContext(SocketContext);
  const { leaveCall, callEnded,stream } = context;
  const [callState, setCallState] = React.useState(true);
  const [callTooltipState, setCallTooltipState] = React.useState("End Call");
  if (callEnded) {
    setCallState(false);
    setCallTooltipState("You are not on a call");
  }
  
  return (
    <div className="callcontrol">
      <Tooltip title={callTooltipState}>
        <Button className="callcontrolchild" variant="contained">
          <VideocamIcon></VideocamIcon>
        </Button>
      </Tooltip>
      <Tooltip title="End Call">
        <Button
          disabled={callState}
          onClick={leaveCall}
          className="callend "
          variant="contained"
        >
          <CallEndIcon></CallEndIcon>
        </Button>
      </Tooltip>
      <Tooltip title="Mute">
        <Button className="callcontrolchild" variant="contained">
          <MicIcon></MicIcon>
        </Button>
      </Tooltip>
    </div>
  );
}

export default CallControls;
