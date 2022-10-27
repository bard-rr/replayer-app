import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { getEventData } from "../utils/urlUtils";
import Player from "./Player";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  borderRadius: "4px",
  outline: "none",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const PlayerModal = ({ sessionId, open, setOpen }) => {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {sessionId}
          </Typography>
          <Player sessionId={sessionId} />
        </Box>
      </Modal>
    </div>
  );
};

export default PlayerModal;
