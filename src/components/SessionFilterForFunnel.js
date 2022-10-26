// import Filter from "./Filter";
import FilterForm from "./FilterForm";
import { Box, Stack, Typography } from "@mui/material";
import { ALL_FILTER_OPTIONS } from "../utils/const";

const SessionFilterForFunnel = ({ filterData, setFilterData }) => {
  const filterOptions = ALL_FILTER_OPTIONS.filter(
    (option) => option !== "date"
  );
  return (
    <Box
      sx={{
        border: "1px solid black",
        mt: "10px",
        mr: "60px",
        ml: "60px",
        width: "85%",
      }}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        sx={{ mt: "10px", mb: "10px" }}>
        <Typography
          variant="h9"
          sx={{
            ml: "10px",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            "&:hover": {
              cursor: "pointer",
            },
          }}>
          Session Filters
        </Typography>
        <FilterForm
          filterData={filterData}
          setFilterData={setFilterData}
          filterOptions={filterOptions}
        />
      </Stack>
    </Box>
  );
};

export default SessionFilterForFunnel;
