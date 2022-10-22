import { TextField } from "@mui/material";
import { useState } from "react";

const LengthInputs = () => {
  const [value, setValue] = useState("00");

  const inRange = (num, min, max) => {
    return Number(num) >= min && Number(num) <= max;
  };

  const handleChange = (e) => {
    // length of two
    // range of 00 - 59
    debugger;
    const newValue = e.target.value.replace(/^0+/, "");
    console.log(newValue);
    if (/^[0-9]{0,2}$/.test(newValue)) {
      if (inRange(newValue, 0, 59)) {
        setValue(newValue.padStart(2, "0"));
      }
    }
  };

  return (
    <>
      <TextField onChange={handleChange} value={value} label="minimum" />
    </>
  );
};

export default LengthInputs;
