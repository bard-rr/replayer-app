import { useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import getDates from "../utils/dateFilter";

const FunnelTimeFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState("last 7");
  const handleChange = (e) => {
    console.log(getDates(e.target.value));

    setSelectedFilter(e.target.value);
  };

  return (
    <TextField
      select
      value={selectedFilter}
      label="Date Range"
      onChange={handleChange}
      sx={{
        position: "absolute",
        top: "30px",
        right: "30px",
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
