import { Box, Stack, Typography } from "@mui/material";
import { msToTime } from "../utils/formatLength";

const FunnelFilterDisplay = ({ filters }) => {
  const formatFilterText = (filter) => {
    switch (filter.filterType) {
      case "originHost":
        return `Origin Host: ${filter.textContent}`;
      case "length":
        const min = msToTime(filter.minLength);
        const max = msToTime(filter.maxLength);
        return `Length: ${min} - ${max}`;
      case "Has Errors?":
        return `Errors: ${filter.yesOrNo}`;
      default:
        return "";
    }
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box sx={{ fontStyle: "italic" }}>Session Filters:</Box>
      {filters.map((filter) => {
        return (
          <Box
            key={filter.filterType}
            sx={{
              py: "3px",
              px: "6px",
              borderRadius: "14px",
              backgroundColor: "#ECEFF4",
              border: "1px solid #D8DEE9",
            }}
          >
            <Typography
              sx={{ fontStyle: "italic", fontSize: "14px", color: "#5e6779" }}
            >
              {formatFilterText(filter)}
            </Typography>
          </Box>
        );
      })}
    </Stack>
  );
};

export default FunnelFilterDisplay;
