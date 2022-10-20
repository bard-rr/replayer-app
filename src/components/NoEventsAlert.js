import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoEventsAlert = () => {
  const navigate = useNavigate();

  return (
    <Alert
      severity="info"
      sx={{
        ml: "280px",
        mr: "30px",
        mt: "15px",
        backgroundColor: "#D8DEE9",
        "& .MuiAlert-icon": {
          color: "#3B4252",
        },
      }}
      action={
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate("/sessions")}
          sx={{
            color: "#3B4252",
            borderColor: "#3B4252",
            "&:hover": {
              borderColor: "#3B4252",
            },
          }}
        >
          Return to sessions
        </Button>
      }
    >
      This session has no events to replay.
    </Alert>
  );
};

export default NoEventsAlert;
