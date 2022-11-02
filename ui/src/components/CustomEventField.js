import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getFunnelOptionsFor } from "../utils/urlUtils";

const CustomEventField = (props) => {
  const { index, funnelData, setFunnelData, textMissing, setTextMissing } =
    props;
  let [options, setOptions] = useState([]);

  useEffect(() => {
    let getOptions = async () => {
      let newOptions = await getFunnelOptionsFor("custom");
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
      newFunnel.customEventType = newValue || "";
      delete newFunnel.textContent;
      return newFunnel;
    });
    setFunnelData(newFunnelData);
    setTextMissing(false);
  };

  const selectionMissing = () => {
    return textMissing && funnelData[index].customEventType === "";
  };

  return (
    <Autocomplete
      isOptionEqualToValue={(option, value) => option.id === value.id}
      options={options}
      sx={{
        ml: "60px",
        width: "300px",
        "& .MuiInputLabel-root": { color: "#8A8692" },
        "& .MuiOutlinedInput-root": {
          "& > fieldset": { borderColor: "#A3A2AF" },
        },
      }}
      value={funnelData[index].customEventType || ""}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          required
          variant="outlined"
          label="Custom Event Name"
          error={selectionMissing()}
          helperText={selectionMissing() && "Event selection required"}
          {...params}
        />
      )}
    />
  );
};

export default CustomEventField;
