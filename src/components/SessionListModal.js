import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { List, ListItem } from "@mui/material";
import PlayerModal from "./PlayerModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  outline: "none",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

const SessionListModal = ({ open, setOpen, sessionIds, title }) => {
  const [openPlayerModal, setOpenPlayerModal] = useState(false);
  const handleClose = () => setOpen(false);
  const [sessionToView, setSessionToView] = useState("");

  const handleClick = (sessionId) => {
    setOpenPlayerModal(true);
    setSessionToView(sessionId);
  };

  return (
    <Box sx={{ position: "absolute" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-list"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-list" component="div" sx={{ mt: 2 }}>
            <List
              sx={{
                backgroundColor: "#D8DEE9",
                borderRadius: "4px",
                px: "12px",
                py: "4px",
              }}
            >
              {sessionIds.map((id) => {
                return (
                  <ListItem
                    key={id}
                    onClick={() => handleClick(id)}
                    sx={{
                      py: "10px",
                      my: "8px",
                      backgroundColor: "white",
                      borderRadius: "4px",
                      "&:hover": {
                        backgroundColor: "#ECEFF4",
                        cursor: "pointer",
                      },
                    }}
                  >
                    {id}
                  </ListItem>
                );
              })}
            </List>
          </Typography>
        </Box>
      </Modal>
      <PlayerModal
        open={openPlayerModal}
        setOpen={setOpenPlayerModal}
        sessionId={sessionToView}
      />
    </Box>
  );
};

export default SessionListModal;
