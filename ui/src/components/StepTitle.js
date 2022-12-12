import { Stack, ListItemText, Avatar } from "@mui/material";

const StepTitle = ({ event, stepNum }) => {
  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <Avatar
        sx={{
          border: "2px solid lightgrey",
          color: "black",
          backgroundColor: "white",
          fontSize: "1rem",
          width: "20px",
          height: "20px",
          mr: "9px",
          mt: "4px",
        }}
      >
        {stepNum}
      </Avatar>
      <ListItemText
        primary={`${event.eventType} on "${
          event.textContent || event.customEventType
        }"`}
        sx={{ verticalAlign: "middle" }}
      />
    </Stack>
  );
};

export default StepTitle;
