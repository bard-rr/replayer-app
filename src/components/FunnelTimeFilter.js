import { TextField, MenuItem } from "@mui/material";

const FunnelTimeFilter = ({ selectedFilter, onChange }) => {
  return (
    <TextField
      select
      value={selectedFilter}
      label="Date Range"
      onChange={onChange}
      sx={{
        position: "absolute",
        top: "30px",
        right: "174px",
        zIndex: 1,
        width: "150px",
      }}
    >
      <MenuItem value={"today"}>Today</MenuItem>
      <MenuItem value={"yesterday"}>Yesterday</MenuItem>
      <MenuItem value={"last 7"}>Last 7 Days</MenuItem>
      <MenuItem value={"last 30"}>Last 30 Days</MenuItem>
    </TextField>
  );
};

export default FunnelTimeFilter;
