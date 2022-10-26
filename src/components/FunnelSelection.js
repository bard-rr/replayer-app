import { TextField, MenuItem } from "@mui/material";

const FunnelSelection = ({ data, index, funnelData, setFunnelData }) => {
  const handleChange = (e) => {
    const newFunnelData = funnelData.map((innerData, innerIndex) => {
      if (innerIndex !== index) {
        return innerData;
      }
      innerData.eventType = e.target.value;

      switch (innerData.eventType) {
        case "click":
          innerData["textContent"] = "";
          break;
        default:
          innerData = { eventType: "" };
          break;
      }

      return innerData;
    });
    setFunnelData(newFunnelData);
  };

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
      label="Event Type"
      value={data.eventType}
      onChange={handleChange}
      select>
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={"click"}>Click</MenuItem>
    </TextField>
  );
};

export default FunnelSelection;
