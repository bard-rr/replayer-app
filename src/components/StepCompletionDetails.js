import { useState } from "react";
import { Stack, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SessionListModal from "./SessionListModal";

const StepCompletionDetails = ({ results, event, stepNum }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [sessionIds, setSessionIds] = useState([]);

  const makeDisplayModal = (ids, completed) => {
    return () => {
      setModalTitle(getModalTitle(ids.length, completed));
      setSessionIds(ids);
      setOpenModal(true);
    };
  };

  const getModalTitle = (count, completed) => {
    const status = completed ? "Completed" : "Dropped";
    const step = `${event.eventType} on "${
      event.textContent || event.customEventType
    }"`;
    return `${status} step ${stepNum} (${step})`;
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        width: "auto",
        mt: "3px",
        ml: "30px",
        display: "flex",
        justifyContent: "space-between",
      }}>
      <Stack
        direction="row"
        alignItems="center"
        onClick={makeDisplayModal(results.sessionsCompleted, true)}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}>
        <CheckCircleOutlineIcon sx={{ mr: "5px" }} color="success" />
        {results.numberCompleted} completed step
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        onClick={makeDisplayModal(results.sessionsNotCompleted, false)}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}>
        <CancelOutlinedIcon sx={{ mr: "5px" }} color="error" />
        <Box>{results.numberNotCompleted} dropped</Box>
      </Stack>
      <SessionListModal
        open={openModal}
        setOpen={setOpenModal}
        sessionIds={sessionIds}
        title={modalTitle}
      />
    </Stack>
  );
};

export default StepCompletionDetails;
