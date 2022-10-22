import { useState } from "react";
import TimeDurationInput from "./TimeDurationInput";

const LengthInputs = () => {
  const [startHours, setStartHours] = useState("00");
  const [startMinutes, setStartMinutes] = useState("00");
  const [startSeconds, setStartSeconds] = useState("00");
  const [endHours, setEndHours] = useState("00");
  const [endMinutes, setEndMinutes] = useState("00");
  const [endSeconds, setEndSeconds] = useState("00");

  return (
    <>
      <TimeDurationInput
        label="Min Length"
        hours={startHours}
        setHours={setStartHours}
        minutes={startMinutes}
        setMinutes={setStartMinutes}
        seconds={startSeconds}
        setSeconds={setStartSeconds}
      />
      <TimeDurationInput
        label="Max Length"
        hours={endHours}
        setHours={setEndHours}
        minutes={endMinutes}
        setMinutes={setEndMinutes}
        seconds={endSeconds}
        setSeconds={setEndSeconds}
      />

      {/* <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          height: "56px",
          border: 1,
          borderRadius: "4px",
          borderColor: "#A3A2AF",
        }}
      >
        <TextField
          variant="standard"
          onChange={(e) => handleChange(e, setHours, 0, 23)}
          value={hours}
          size="small"
          inputProps={{ style: { textAlign: "center", padding: "8.5px 5px" } }}
          sx={{ width: "40px", px: "5px", mx: "0px" }}
        />
        :
        <TextField
          variant="standard"
          onChange={(e) => handleChange(e, setMinutes, 0, 59)}
          value={minutes}
          size="small"
          inputProps={{ style: { textAlign: "center", padding: "8.5px 5px" } }}
          sx={{ width: "40px", px: "5px", mx: "0px" }}
        />
        :
        <TextField
          variant="standard"
          onChange={(e) => handleChange(e, setSeconds, 0, 59)}
          value={seconds}
          size="small"
          inputProps={{ style: { textAlign: "center", padding: "8.5px 5px" } }}
          sx={{ width: "40px", px: "5px", mx: "0px" }}
        />
      </Stack> */}
    </>
  );
};

export default LengthInputs;
