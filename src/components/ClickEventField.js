import { TextField } from "@mui/material";

const ClickEventField = ({ index, funnelData, setFunnelData }) => {
  const handleChange = (e) => {
    const newFunnelData = funnelData.map((innerData, innerIndex) => {
      if (index !== innerIndex) {
        return innerData;
      }
      let newFunnel = { ...innerData };
      newFunnel.textContent = e.target.value;
      return newFunnel;
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
      value={funnelData[index].textContent || ""}
      label="Clicked Text"
      onChange={handleChange}
    />
  );
};

export default ClickEventField;
