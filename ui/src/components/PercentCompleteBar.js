import { useEffect, useState } from "react";
import { Box, LinearProgress, Stack } from "@mui/material";

const PercentCompleteBar = ({ numComplete, totalSessions }) => {
  const [percentComplete, setPercentComplete] = useState(0);

  useEffect(() => {
    const percent = 100 * (numComplete / totalSessions);
    setPercentComplete(percent || 0);
  }, [numComplete, totalSessions]);

  return (
    <Stack
      direction="row"
      sx={{ width: "auto", position: "relative", ml: "30px" }}
    >
      <Box sx={{ display: "block", width: "100%" }}>
        <LinearProgress
          variant="determinate"
          value={percentComplete}
          sx={{
            height: "20px",
            borderRadius: "4px",
            backgroundColor: "rgba(169, 200, 255, 1)",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "rgba(115, 152, 255, 1)",
            },
          }}
        />
      </Box>
      <Box
        sx={{
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
  );
};

export default PercentCompleteBar;
