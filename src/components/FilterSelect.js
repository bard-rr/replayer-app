import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const FilterSelect = ({ filterType, setFilterType }) => {
  const handleChange = (e) => {
    console.log("event", e.target.value);
    setFilterType(e.target.value);
  };

  return (
    <FormControl
      sx={{
        ml: "60px",
        mt: "30px",
        mr: "30px",
        width: "500px",
        height: "75px",
        // display: "inline-flex",
      }}>
      <InputLabel id="filterSelectLabel">Filter Type</InputLabel>
      <Select
        labelId="filterSelectLabel"
        id="filterSelect"
        value={filterType}
        label="Filter"
        onChange={handleChange}>
        <MenuItem value={"date"}>Date</MenuItem>
        <MenuItem value={"length"}>Length</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
