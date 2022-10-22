// import Filter from "./Filter";
import FilterSelect from "./FilterSelect";
import FilterButton from "./FilterButton";
import DateInputs from "./DateInputs";
import LengthInputs from "./LengthInputs";
import { Stack } from "@mui/material";
import { useState } from "react";

const FilterComponents = ({
  filter,
  setFilter,
  setSessions,
  setPage,
  rowsPerPage,
  setSortState,
  filterType,
  setFilterType,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filterData, setFilterData] = useState({});

  const selectFilterType = () => {
    switch (selectedFilter) {
      case "date":
        // TODO (10-22-2022)
        // Need to mimic logic found in LengthInputs in DateInputs
        // DateInputs should set `filterData` to { startDate, endDate }
        return <DateInputs setFilterData={setFilterData} />;
      case "length":
        return <LengthInputs setFilterData={setFilterData} />;
      default:
        return null;
    }
  };

  // TODO (10-22-2022)
  // filterData will have the object we need to send our request
  // will either be { minLength, maxLength } or { startDate, endDate }
  // This function needs to set some state in place of the `filterType`
  // state passed in
  const handleClickFilter = () => {
    console.log("filterData:", filterData);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: "30px" }}>
      <FilterSelect
        setSelectedFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
      />
      {selectFilterType()}
      {selectedFilter !== "" && <FilterButton onClick={handleClickFilter} />}
    </Stack>
  );
};

export default FilterComponents;
