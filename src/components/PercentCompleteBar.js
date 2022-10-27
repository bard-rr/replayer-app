import { useEffect, useState } from "react";
import { Box, LinearProgress, Stack } from "@mui/material";

const PercentCompleteBar = ({ numComplete, numIncomplete }) => {
  const [percentComplete, setPercentComplete] = useState(0);

  useEffect(() => {
    setPercentComplete(100 * (numComplete / (numComplete + numIncomplete)));
  }, [numComplete, numIncomplete]);

  return (
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
