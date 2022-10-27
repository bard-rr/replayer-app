import { Box, Stack, ListItemText } from "@mui/material";

const StepTitle = ({ event, stepNum }) => {
  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <Box
        sx={{
          borderRadius: "50%",
          border: "2px solid lightgrey",
          width: "18px",
          height: "18px",
          textAlign: "center",
          mr: "9px",
          mt: "4px",
        }}
      >
        {stepNum}
      </Box>
      <ListItemText
        primary={`${event.eventType} on "${event.textContent}"`}
        sx={{ verticalAlign: "middle" }}
      />
    </Stack>
  );
};

export default StepTitle;
