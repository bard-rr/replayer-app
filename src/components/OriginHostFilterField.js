import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getFilterOptionsFor } from "../utils/urlUtils";

const OriginHostFilterField = ({ index, filterData, setFilterData }) => {
  let [options, setOptions] = useState([]);
  useEffect(() => {
    let getOptions = async () => {
      let newOptions = await getFilterOptionsFor("originHost");
      setOptions(newOptions);
    };
    getOptions();
  }, []);
  const handleChange = (e, newValue) => {
    const newfilterData = filterData.map((innerData, innerIndex) => {
      if (index !== innerIndex) {
        return innerData;
      }
      let newFilter = { ...innerData };
      newFilter.textContent = newValue;
      return newFilter;
    });
    setFilterData(newfilterData);
  };

  return (
    <>
      <Autocomplete
        disablePortal
        options={options}
        sx={{
          //ml: "60px",
          width: "525px",
          "& .MuiInputLabel-root": { color: "#8A8692" },
          "& .MuiOutlinedInput-root": {
            "& > fieldset": { borderColor: "#A3A2AF" },
          },
        }}
        value={filterData[index].textContent || ""}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField variant="outlined" {...params} label="Origin Host" />
        )}
      />
    </>
  );
};

export default OriginHostFilterField;
