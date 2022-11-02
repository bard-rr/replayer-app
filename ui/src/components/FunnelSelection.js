import { TextField, MenuItem } from "@mui/material";
import { DEFAULT_FUNNEL } from "../utils/const";

const FunnelSelection = (props) => {
  const {
    data,
    index,
    funnelData,
    setFunnelData,
    eventTypeMissing,
    setEventTypeMissing,
  } = props;

  const handleChange = (e) => {
    const newFunnelData = funnelData.map((innerData, innerIndex) => {
      if (innerIndex !== index) {
        return innerData;
      }
      let newFunnel = {};
      newFunnel.eventType = e.target.value;

      switch (newFunnel.eventType) {
        case "click":
          newFunnel["textContent"] = "";
          break;
        case "custom":
          newFunnel["customEventType"] = "";
          break;
        default:
          newFunnel = DEFAULT_FUNNEL;
          break;
      }

      return newFunnel;
    });
    setFunnelData(newFunnelData);
    setEventTypeMissing(false);
  };

  const selectionMissing = () => eventTypeMissing && data.eventType === "";

  return (
    <TextField
      required
      variant="outlined"
      error={selectionMissing()}
      helperText={selectionMissing() && "Event type required"}
      sx={{
        // ml: "60px",
        width: "150px",
        "& .MuiInputLabel-root": { color: "#8A8692" },
        "& .MuiOutlinedInput-root": {
          "& > fieldset": { borderColor: "#A3A2AF" },
        },
      }}
      label="Event Type"
      value={data.eventType}
      onChange={handleChange}
      select
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={"click"}>Click</MenuItem>
      <MenuItem value={"custom"}>Custom</MenuItem>
    </TextField>
  );
};

export default FunnelSelection;
