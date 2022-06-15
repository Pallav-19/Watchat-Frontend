/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Grid, Paper } from "@mui/material";
import SocketContext from "../SocketContext";
import "../styles.css";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
function VideoPlayer() {
  const context = useContext(SocketContext);
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    userStream,
  } = context;
  return (
    <Grid>
      <Paper className="videopanel" elevation={3}>
        <div className="uservideo">
          <p className="callname">{call.name}pp</p>
         
            <video
              className="uservid"
              ref={userVideo}
              playsInline
              autoPlay
            ></video>
{/* 
            <Avatar
              className="useravatar"
              sx={{ bgcolor: deepOrange[500], height: 50, width: 50 }}
            >
              {call.name ? (
                `${call.name?.split(" ")[0][0]}${call.name?.split(" ")[1][0]}`
              ) : (
                <PersonIcon />
              )}
            </Avatar> */}
         

          <div className="myvideo">
            {stream ? (
              <video ref={myVideo} playsInline mute autoPlay></video>
            ) : (
              <Avatar className="myavatar" sx={{ bgcolor: deepPurple[500] }}>
                {name ? (
                  `${name?.split(" ")[0][0]}${name?.split(" ")[1][0]}`
                ) : (
                  <PersonIcon />
                )}
              </Avatar>
            )}
            <p className="myname">{name}(you)</p>
          </div>
        </div>
      </Paper>
    </Grid>
  );
}

export default VideoPlayer;
