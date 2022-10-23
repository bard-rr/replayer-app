// import Filter from "./Filter";
import FilterSelect from "./FilterSelect";
import FilterButton from "./FilterButton";
import DateInputs from "./DateInputs";
import LengthInputs from "./LengthInputs";
import { Stack } from "@mui/material";
import { useState } from "react";

const FilterComponents = ({ setFilter, setFilterType }) => {
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
