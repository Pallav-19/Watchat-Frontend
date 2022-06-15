/* eslint-disable no-unused-vars */
import React from "react";
import SocketContext from "../SocketContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment } from "@mui/icons-material";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import "../styles.css";
function CopyToClipBoard() {
  const context = React.useContext(SocketContext);

  const [open, setOpen] = React.useState(false);

  const { me } = context;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <CopyToClipboard
        text={me}
        onCopy={() => {
          setOpen(true);
        }}
      >
        <Tooltip title="Copy Your Watch ID" placement="left">
          <Button variant="contained" className="copy">
            <Assignment></Assignment>
          </Button>
        </Tooltip>
      </CopyToClipboard>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={`Watch ID Copied (${me})`}
        action={action}
      />
    </div>
  );
}

export default CopyToClipBoard;
