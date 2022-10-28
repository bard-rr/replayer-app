import { MenuItem, TextField } from "@mui/material";
import { DEFAULT_FUNNEL_FILTER } from "../utils/const";
import { capitalizeString } from "../utils/misc";

const FilterSelection = ({
  filterOptions,
  index,
  filterData,
  setFilterData,
}) => {
  let selectedFilters = filterData.map((filterObj) => filterObj.filterType);
  const handleChange = (e) => {
    const newFilterData = filterData.map((innerData, innerIndex) => {
      if (innerIndex !== index) {
        return innerData;
      } else {
        //deep copy of the default filter
        let newFilter = JSON.parse(JSON.stringify(DEFAULT_FUNNEL_FILTER));
        newFilter.filterType = e.target.value;
        switch (newFilter.filterType) {
          case "length":
            newFilter["minLength"] = "";
            newFilter["maxLength"] = "";
            break;
          case "originHost":
            newFilter["textContent"] = "";
            break;
          case "date":
            newFilter["startDate"] = "";
            newFilter["endDate"] = "";
            break;
          default:
            newFilter = DEFAULT_FUNNEL_FILTER;
        }
        return newFilter;
      }
    });
    setFilterData(newFilterData);
  };

  return (
    <TextField
      variant="outlined"
      sx={{
        ml: "0px",
        width: "150px",
        "& .MuiInputLabel-root": { color: "#8A8692" },
        "& .MuiOutlinedInput-root": {
          "& > fieldset": { borderColor: "#A3A2AF" },
        },
      }}
      label="Event Type"
      value={filterData[index].filterType}
      onChange={handleChange}
      select
      defaultValue=""
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {filterOptions
        //filter filter types to only allow a filter type to be selected once.
        .filter(
          (filterName) =>
            !selectedFilters.includes(filterName) ||
            filterData[index].filterType === filterName
        )
        .map((filterName) => {
          return (
            <MenuItem value={filterName} key={filterName}>
              {capitalizeString(filterName)}
            </MenuItem>
          );
        })}
    </TextField>
  );
};

export default FilterSelection;
