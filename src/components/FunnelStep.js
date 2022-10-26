import { useEffect, useState } from "react";
import { Box, LinearProgress, Stack, Divider } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const FunnelStep = ({ event, stepNum, results }) => {
  const [percentComplete, setPercentComplete] = useState(0);
  useEffect(() => {
    const { numberCompleted, numberNotCompleted } = results;
    setPercentComplete(
      100 * (numberCompleted / (numberCompleted + numberNotCompleted))
    );
  }, [results]);

  return (
    <ListItem sx={{ pl: "8px" }}>
      <Stack direction="column" sx={{ width: "100%" }}>
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
        <Stack
          direction="row"
          sx={{ width: "auto", position: "relative", ml: "30px" }}
        >
          <Box sx={{ display: "block", width: "100%" }}>
            <LinearProgress
              variant="determinate"
              value={percentComplete}
              sx={{ height: "20px", borderRadius: "4px" }}
            />
          </Box>
          <Box
            sx={{
              // ml: "93%",
              display: "flex",
              justifyContent: "right",
              position: "absolute",
              right: "10px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {Math.round(percentComplete)}%
          </Box>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            width: "auto",
            mt: "3px",
            ml: "30px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" alignItems="center">
            <CheckCircleOutlineIcon sx={{ mr: "5px" }} color="success" />
            {results.numberCompleted} completed step
          </Stack>
          <Stack direction="row" alignItems="center">
            <CancelOutlinedIcon sx={{ mr: "5px" }} color="error" />
            <Box>{results.numberNotCompleted} dropped</Box>
          </Stack>
        </Stack>
        <Divider sx={{ mb: "15px", mt: "10px" }} />
      </Stack>
    </ListItem>
  );
};

export default FunnelStep;
