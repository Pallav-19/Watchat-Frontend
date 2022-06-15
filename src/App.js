/* eslint-disable no-unused-vars */
import React from "react";
import VideoPlayer from "./components/VideoPlayer";
import MakeCall from "./components/MakeCall";
import { makeStyles } from "@mui/styles";
import SocketState from "./SocketState";
import "./styles.css";
import CopyToClipBoard from "./components/CopyToClipboard";
import CallControls from "./components/CallControls";
import Notifications from "./components/Notifications";
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#243665 !important",
    fontFamily: '"JetBrains Mono", monopace !important',
    color: "white !important",
    borderRadius: "0.3rem",
    boxShadow: " 1px 2px 5px rgba(0, 0, 0, 0.227) !important",
    margin: "2.25rem 2rem ",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90vw !important",
    border: "2px solid rgba(0,0,0,0.1)",

    [theme?.breakpoints?.down("xs")]: {
      width: "90%",
    },
  },

  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  span: {
    color: "#8bd8bd !important",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <>
      <SocketState>
        <div className={classes.wrapper}>
          <VideoPlayer />
          <div className="controls">
            <CopyToClipBoard />
            <CallControls />
            <MakeCall />
          </div>
        </div>
        <Notifications />
      </SocketState>
    </>
  );
}

export default App;
