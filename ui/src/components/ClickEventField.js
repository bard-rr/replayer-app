import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getFunnelOptionsFor } from "../utils/urlUtils";

const ClickEventField = ({ index, funnelData, setFunnelData }) => {
  let [options, setOptions] = useState([]);
  useEffect(() => {
    let getOptions = async () => {
      let newOptions = await getFunnelOptionsFor("click");
      setOptions(newOptions);
    };
    getOptions();
  }, []);

  const handleChange = (e, newValue) => {
    const newFunnelData = funnelData.map((innerData, innerIndex) => {
      if (index !== innerIndex) {
        return innerData;
      }
      let newFunnel = { ...innerData };
      newFunnel.textContent = newValue;
      return newFunnel;
    });
    setFunnelData(newFunnelData);
  };

  return (
    <Autocomplete
      isOptionEqualToValue={(option, value) => option.id === value.id}
      options={options}
      sx={{
        ml: "60px",
        width: "525px",
        "& .MuiInputLabel-root": { color: "#8A8692" },
        "& .MuiOutlinedInput-root": {
          "& > fieldset": { borderColor: "#A3A2AF" },
        },
      }}
      value={funnelData[index].textContent || ""}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField variant="outlined" label="Clicked Text" {...params} />
      )}
    />
  );
};

export default ClickEventField;
