import { Autocomplete, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { getFilterUrl } from "../utils/sessionFilter";

const options = ["Today", "Yesterday", "Last Week", "All Sessions"];
const defaultOption = options[0];
const Filter = ({ setSessions }) => {
  let [filter, setFilter] = useState(defaultOption);
  const handleFilter = async (event) => {
    event.preventDefault();
    if (isValidOption(filter)) {
      let url = getFilterUrl("date", filter);
      let response = await axios.get(url);
      setSessions(response.data);
    } else {
      //TODO: handle invalid option
    }
  };
  const handleChange = (event, newFilter) => {
    event.preventDefault();
    if (!newFilter) {
      newFilter = defaultOption;
    }
    if (isValidOption(newFilter)) {
      setFilter(newFilter);
    }
  };

  const isValidOption = (newValue) => {
    return options.includes(newValue);
  };
  return (
    <div className="filter">
      <form>
        <Autocomplete
          id="filter-dropdown"
          options={options}
          defaultValue={options[0]}
          renderInput={(params) => <TextField {...params} label="Filter By:" />}
          sx={{
            ml: "280px",
            mt: "30px",
            mr: "30px",
            width: "500px",
            height: "75px",
            display: "inline-flex",
          }}
          onChange={handleChange}
        />
        <Button variant="outlined" onClick={handleFilter}>
          Filter
        </Button>
      </form>
    </div>
  );
};

export default Filter;
