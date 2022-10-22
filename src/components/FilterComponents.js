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

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: "30px" }}>
      <FilterSelect
        setSelectedFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
      />
      {/* <Filter
        setSessions={setSessions}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        filter={filter}
        setFilter={setFilter}
        setSortState={setSortState}
      /> */}
      {console.log("filterType:", selectedFilter)}
      {selectedFilter === "date" ? <DateInputs /> : null}
      {selectedFilter === "length" ? <LengthInputs /> : null}
      {selectedFilter !== "" ? <FilterButton /> : null}
    </Stack>
  );
};

export default FilterComponents;
