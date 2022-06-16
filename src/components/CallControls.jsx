/* eslint-disable no-unused-vars */
import React from "react";
import "../styles.css";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { Button } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicIcon from "@mui/icons-material/Mic";
import { Tooltip } from "@mui/material";
import SocketContext from "../SocketContext";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";
function CallControls() {
  const context = React.useContext(SocketContext);
  const { leaveCall, callEnded, stream, setStream, strm } = context;
  const [callState, setCallState] = React.useState(true);
  const [callTooltipState, setCallTooltipState] = React.useState("End Call");
  const [vidTooltipState, setVidTooltipState] =
    React.useState("Turn Off Camera");
  const [micTooltipState, setMicTooltipState] = React.useState("Mute");

  const [cam, setCam] = React.useState(true);
  const [mic, setMic] = React.useState(true);

  if (callEnded) {
    setCallState(false);
    setCallTooltipState("You are not on a call");
  }

  const camToggle = () => {
    let videoTrack = strm.getTracks().find((track) => track.kind === "video");
    if (videoTrack.enabled) {
      videoTrack.enabled = false;
      setCam(false);
    //   setStream(null);
      setVidTooltipState("Turn on camera");
    } else {
      videoTrack.enabled = true;
      setCam(true);
      setVidTooltipState("Turn off camera");
    //   navigator.mediaDevices
    //     .getUserMedia({ video: true, audio: true })
    //     .then((currentStream) => {
    //       setStream(currentStream);
    //     });
    }
  };
  const micToggle = () => {
    let audioTrack = stream.getTracks().find((track) => track.kind === "audio");
    if (audioTrack.enabled) {
      audioTrack.enabled = false;
      setMic(false);
      setMicTooltipState("Unmute");
    } else {
      audioTrack.enabled = true;
      setMic(true);
      setMicTooltipState("Mute");
    }
  };

  return (
    <div className="callcontrol">
      <Tooltip title={vidTooltipState}>
        <Button
          onClick={() => {
            camToggle();
          }}
          className={cam ? "callcontrolchild" : "callcontrolchildclicked"}
          variant="contained"
        >
          {cam ? <VideocamIcon /> : <VideocamOffIcon />}
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

      <Tooltip title={micTooltipState}>
        <Button
          className={mic ? "callcontrolchild" : "callcontrolchildclicked"}
          variant="contained"
          onClick={() => {
            micToggle();
          }}
        >
          {mic ? <MicIcon /> : <MicOffIcon />}
        </Button>
      </Tooltip>
    </div>
  );
}

export default CallControls;
