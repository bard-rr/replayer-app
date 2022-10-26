// import Filter from "./Filter";
import FilterForm from "./FilterForm";
import FilterButton from "./FilterButton";
import DateInputs from "./DateInputs";
import LengthInputs from "./LengthInputs";
import { Stack } from "@mui/material";
import { useState } from "react";

const SessionFilter = ({ setFilter, setFilterType, setPage }) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filterData, setFilterData] = useState({});

  const selectFilterType = () => {
    switch (selectedFilter) {
      case "date":
        return <DateInputs setFilterData={setFilterData} />;
      case "length":
        return <LengthInputs setFilterData={setFilterData} />;
      default:
        return null;
    }
  };

  const handleClickFilter = () => {
    setFilterType(selectedFilter);
    setFilter(filterData);
    setPage(0);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: "30px" }}>
      <FilterForm
        setSelectedFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
      />
      {selectFilterType()}
      {selectedFilter !== "" && (
        <FilterButton text={"Filter"} onClick={handleClickFilter} />
      )}
    </Stack>
  );
};

export default SessionFilter;
