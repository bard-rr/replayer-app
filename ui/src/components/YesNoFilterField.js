import { MenuItem, TextField } from "@mui/material";

const YesNoFilterField = ({ index, filterData, setFilterData }) => {
  const handleChange = (e) => {
    const newfilterData = filterData.map((innerData, innerIndex) => {
      if (index !== innerIndex) {
        return innerData;
      }
      let newFilter = { ...innerData };
      newFilter.yesOrNo = e.target.value;
      return newFilter;
    });
    setFilterData(newfilterData);
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
      label="Yes or No?"
      value={filterData[index].yesOrNo || ""}
      onChange={handleChange}
      select
      defaultValue=""
    >
      <MenuItem value="yes">Yes</MenuItem>
      <MenuItem value="no">No</MenuItem>
    </TextField>
  );
};

export default YesNoFilterField;
