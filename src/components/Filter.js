import { Autocomplete, Button, TextField } from "@mui/material";
import { useState } from "react";
import {
  DEFAULT_FILTER,
  DEFAULT_PAGE,
  DEFAULT_SORT_STATE,
  FILTER_OPTIONS,
} from "../utils/const";

const Filter = ({ setPage, setFilter, setSortState }) => {
  const [tempFilter, setTempFilter] = useState()

  const handleFilter = async (event) => {
    event.preventDefault();
    setFilter(tempFilter)
    setPage(DEFAULT_PAGE)
    setSortState(DEFAULT_SORT_STATE)
  };
  
  const handleFilterSelection = (event, newFilter) => {
    event.preventDefault();
    if (isValidOption(newFilter)) {
      setTempFilter(newFilter);
    }
  };

  const isValidOption = (newValue) => {
    return FILTER_OPTIONS.includes(newValue);
  };
  return (
    <div className="filter">
      <form name="filterForm" onSubmit={handleFilter}>
        <Autocomplete
          id="filter-dropdown"
          name="dateFilter"
          options={FILTER_OPTIONS}
          defaultValue={DEFAULT_FILTER}
          renderInput={(params) => <TextField {...params} label="Filter By:" />}
          sx={{
            ml: "280px",
            mt: "30px",
            mr: "30px",
            width: "500px",
            height: "75px",
            display: "inline-flex",
          }}
          onChange={handleFilterSelection}
        />
        <Button type="submit" variant="outlined">
          Filter
        </Button>
      </form>
    </div>
  );
};

export default Filter;
