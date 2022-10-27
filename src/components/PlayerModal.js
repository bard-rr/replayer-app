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
  const [eventData, setEventData] = useState([]);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getSessionEvents = async () => {
      if (!open) return;
      const data = await getEventData(sessionId);
      setEventData(data);
    };
    getSessionEvents();
  }, [sessionId, open]);

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
          <Player eventData={eventData} />
        </Box>
      </Modal>
    </div>
  );
};

export default PlayerModal;
