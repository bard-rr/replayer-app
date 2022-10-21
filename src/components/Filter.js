import { Autocomplete, Button, TextField } from "@mui/material";
import {
  DEFAULT_FILTER,
  DEFAULT_PAGE,
  DEFAULT_SORT_STATE,
  FILTER_OPTIONS,
} from "../utils/const";
import { getNewSessions } from "../utils/urlUtils";

const Filter = ({ setSessions, setPage, rowsPerPage, filter, setFilter }) => {
  const handleFilter = async (event) => {
    event.preventDefault();
    if (isValidOption(filter)) {
      let newSessions = await getNewSessions(
        DEFAULT_PAGE,
        rowsPerPage,
        "date",
        filter,
        DEFAULT_SORT_STATE
      );
      setSessions(newSessions);
      setPage(DEFAULT_PAGE);
    } else {
      //TODO: handle invalid option
    }
  };
  const handleFilterSelection = (event, newFilter) => {
    event.preventDefault();
    if (!newFilter) {
      newFilter = DEFAULT_FILTER;
    }
    if (isValidOption(newFilter)) {
      setFilter(newFilter);
    }
  };

  const isValidOption = (newValue) => {
    return FILTER_OPTIONS.includes(newValue);
  };
  return (
    <div className="filter">
      <form>
        <Autocomplete
          id="filter-dropdown"
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
        <Button variant="outlined" onClick={handleFilter}>
          Filter
        </Button>
      </form>
    </div>
  );
};

export default Filter;
