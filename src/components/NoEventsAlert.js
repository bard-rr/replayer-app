import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoEventsAlert = () => {
  const navigate = useNavigate();

  return (
    <Alert
      severity="info"
      sx={{
        ml: "60px",
        mr: "60px",
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
          //TODO: can we preserve the user's filtered, paginated & sorted view of sessions
          //from here instead of taking them back to everything?
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
