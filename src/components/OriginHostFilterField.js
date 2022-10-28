import { TextField } from "@mui/material";

const OriginHostFilterField = ({ index, filterData, setFilterData }) => {
  const handleChange = (e) => {
    const newfilterData = filterData.map((innerData, innerIndex) => {
      if (index !== innerIndex) {
        return innerData;
      }
      let newFilter = { ...innerData };
      newFilter.textContent = e.target.value;
      return newFilter;
    });
    setFilterData(newfilterData);
  };

  return (
    <TextField
      variant="outlined"
      sx={{
        ml: "60px",
        width: "auto",
        "& .MuiInputLabel-root": { color: "#8A8692" },
        "& .MuiOutlinedInput-root": {
          "& > fieldset": { borderColor: "#A3A2AF" },
        },
      }}
      value={filterData[index].textContent || ""}
      label="Origin Host"
      onChange={handleChange}
    />
  );
};

export default OriginHostFilterField;
