import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";

const FilterSelect = ({ selectedFilter, setSelectedFilter }) => {
  const handleChange = (e) => setSelectedFilter(e.target.value);

  return (
    <TextField
      variant="outlined"
      sx={{
        ml: "60px",
        width: "150px",
        "& .MuiInputLabel-root": { color: "#8A8692" },
        "& .MuiOutlinedInput-root": {
          "& > fieldset": { borderColor: "#A3A2AF" },
        },
      }}
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
