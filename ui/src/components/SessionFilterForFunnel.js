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
        borderTop: "1px solid #A3A2AF",
        mt: "10px",
        mr: "60px",
        ml: "60px",
        width: "100%",
      }}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        sx={{ mt: "10px", mb: "10px" }}
      >
        <Typography sx={{ fontSize: "18px", mb: "5px" }}>
          Session Filters
        </Typography>
        <FilterForm
          filterData={filterData}
          setFilterData={setFilterData}
          filterOptions={filterOptions}
          labelColor={"white"}
        />
      </Stack>
    </Box>
  );
};

export default SessionFilterForFunnel;
