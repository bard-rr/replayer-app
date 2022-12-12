import FilterForm from "./FilterForm";
import BardButton from "./BardButton";
import { Stack } from "@mui/material";
import { useState } from "react";
import { ALL_FILTER_OPTIONS } from "../utils/const";

const SessionFilter = ({ filterData, setFilterData, setPage }) => {
  //deep clone of the filterData. tempFilterData holds temporary changes to the
  //filter data. we set it to be the final filter data when we click the filter
  //button, sending an http request for filtered sessions
  const [tempFilterData, setTempFilterData] = useState(
    JSON.parse(JSON.stringify(filterData))
  );

  const handleClickFilter = () => {
    setFilterData(tempFilterData);
    setPage(0);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="flex-end"
      sx={{ mt: "30px" }}
    >
      <Stack direction="column" spacing={2}>
        <FilterForm
          filterData={tempFilterData}
          setFilterData={setTempFilterData}
          filterOptions={ALL_FILTER_OPTIONS}
        />
      </Stack>
      {/* only display the filter button if all filters have all fields filled out */}
      {tempFilterData.every((filterObj) => {
        let fieldValues = Object.values(filterObj);
        if (fieldValues.length === 0) {
          return false;
        } else {
          return fieldValues.every((ele) => ele);
        }
      }) ? (
        <BardButton text={"Filter"} onClick={handleClickFilter} />
      ) : null}
    </Stack>
  );
};

export default SessionFilter;
