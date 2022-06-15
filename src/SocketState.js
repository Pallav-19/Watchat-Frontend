/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import SocketContext from "./SocketContext";
const socket = io("http://localhost:5000");

function SocketState(props) {
  const [stream, setStream] = useState(null);
  const [userStream, setUserStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });
    socket.on("me", (id) => {
      setMe(id);
    });
    socket.on("calluser", ({ signal, from, name: callerName }) => {
      setCall({ isRecieved: true, from, name: callerName, signal });
    });
  }, []);
  const answerCall = () => {
    console.log("answered")
    setCallAccepted(true);
    const peer = new Peer({ initiator: true, tricle: true, stream: stream });
    peer.on("signal", (data) => {
      console.log("signal")
      socket.emit("answercall", { signal: data, to: call.from });
    });
    peer.on("connect", () => {
      console.log("connected");
    });
    peer.on("error", (err) => console.log(err));
    peer.on("stream", (currentStream) => {
      console.log("answer stream")
      setUserStream(currentStream);
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };
  const callUser = async (id) => {
    console.log(id);
    const peer = new Peer({ initiator: true, tricle: false, stream });
    peer.on("connect", () => {
      console.log("connected");
    });
    peer.on("error", (err) => console.log(err));

    peer.on("signal", (data) => {
      console.log("data");
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });
    peer.on("stream", (currentStream) => {
      console.log("currentStream");
      userVideo.current.srcObject = currentStream;
      setUserStream(currentStream);
    });
    socket.on("callaccepted", (signal) => {
      console.log("callaccepted")
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };
  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        userStream,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        call,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
}

export default SocketState;
