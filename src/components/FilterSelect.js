import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";

const FilterSelect = ({ selectedFilter, setSelectedFilter }) => {
  const handleChange = (e) => {
    console.log("event", e.target.value);
    setSelectedFilter(e.target.value);
  };

  return (
    <TextField
      sx={{ ml: "60px", width: "150px" }}
      value={selectedFilter}
      label="Filter Type"
      select
      onChange={handleChange}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={"date"}>Date</MenuItem>
      <MenuItem value={"length"}>Length</MenuItem>
    </TextField>
  );
};

export default FilterSelect;
