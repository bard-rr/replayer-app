// import Filter from "./Filter";
import FilterForm from "./FilterForm";
import BardButton from "./BardButton";
import { Stack } from "@mui/material";
import { useState } from "react";
import { DEFAULT_FUNNEL_FILTER, ALL_FILTER_OPTIONS } from "../utils/const";

const SessionFilter = ({ setFilter, setFilterType, setPage }) => {
  // const [selectedFilter, setSelectedFilter] = useState("")
  const [filterData, setFilterData] = useState([DEFAULT_FUNNEL_FILTER]);

  // const selectFilterType = () => {
  //   switch (selectedFilter) {
  //     case "date":
  //       return <DateInputs setFilterData={setFilterData} />;
  //     case "length":
  //       return <LengthInputs setFilterData={setFilterData} />;
  //     default:
  //       return null;
  //   }
  // };

  const handleClickFilter = () => {
    setFilter(filterData);
    setPage(0);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="flex-end"
      sx={{ mt: "30px" }}>
      <Stack direction="column" spacing={2}>
        <FilterForm
          filterData={filterData}
          setFilterData={setFilterData}
          filterOptions={ALL_FILTER_OPTIONS}
        />
      </Stack>
      {/* {selectFilterType()} */}
      {filterData[0].filterType ? (
        <BardButton text={"Filter"} onClick={handleClickFilter} />
      ) : null}
    </Stack>
  );
};

export default SessionFilter;
