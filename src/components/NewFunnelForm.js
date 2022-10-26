import FilterComponents from "./FilterComponents";
import FunnelComponents from "./FunnelComponents";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { DEFAULT_FUNNEL } from "../utils/const";

const NewFunnelForm = () => {
  const [funnelData, setFunnelData] = useState([DEFAULT_FUNNEL]);

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={0}
      sx={{ ml: "60px", mt: "30px" }}
    >
      <Typography
        variant="h6"
        sx={{
          mr: 2,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        Create New Funnel
      </Typography>

      <FilterComponents />
      <FunnelComponents funnelData={funnelData} setFunnelData={setFunnelData} />
    </Stack>
  );
};

export default NewFunnelForm;
