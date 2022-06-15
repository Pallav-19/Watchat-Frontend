/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Grid, TextField } from "@mui/material";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";

import "../styles.css";
import SocketContext from "../SocketContext";
import Tooltip from "@mui/material/Tooltip";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "15rem",
  bgcolor: "#222831",
  border: "1px solid #222831",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function MakeCall() {
  const context = React.useContext(SocketContext);
  const { callAccepted, callEnded, callUser } = context;
  const [idToCall, setIdToCall] = React.useState(" ");
  const [disableState, setDisableState] = React.useState();
  const [toolTip, setToolTip] = React.useState("Call Someone");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // if (callAccepted && !callEnded) {
  //   setDisableState(true);
  //   setToolTip("You are already on a call!");
  // }
  return (
    <div>
      <Tooltip title={toolTip} placement="right">
        <Button
          disabled={disableState}
          variant="contained"
          onClick={handleOpen}
        >
          <AddIcCallIcon />
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form noValidate autoComplete="off">
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  className="watchid"
                  fullWidth
                  label="Paste any Watch ID "
                  InputLabelProps={{ className: "watchid" }}
                  onChange={(e) => {
                    setIdToCall(e.target.value);
                  }}
                ></TextField>
                <Button
                  type="button"
                  variant="contained"
                  sx={{ marginTop: 1 }}
                  className="call"
                  onClick={()=>{
                    callUser(idToCall)
                    console.log(idToCall)
                  }}
                >
                  <PhoneEnabledIcon />
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
