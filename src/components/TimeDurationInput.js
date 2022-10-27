import { Stack, TextField } from "@mui/material";

const TimeDurationInput = (props) => {
  const {
    hours,
    setHours,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
    changeFilter,
    isStart,
  } = props;
  const { label } = props;
  const inRange = (num, min, max) => {
    return Number(num) >= min && Number(num) <= max;
  };

  const handleChange = (e, setter, min, max) => {
    const newValue = e.target.value.replace(/^0+/, "");
    if (/^[0-9]{0,2}$/.test(newValue)) {
      if (inRange(newValue, min, max)) {
        setter(newValue.padStart(2, "0"));
        let payload = {
          hours:
            setter === setHours
              ? newValue.padStart(2, "0")
              : hours.padStart(2, "0"),
          minutes:
            setter === setMinutes
              ? newValue.padStart(2, "0")
              : minutes.padStart(2, "0"),
          seconds:
            setter === setSeconds
              ? newValue.padStart(2, "0")
              : seconds.padStart(2, "0"),
        };
        changeFilter(isStart, payload);
      }
    }
  };

  return (
    <Stack
      direction="row"
      spacing={0}
      alignItems="center"
      sx={{
        height: "56px",
        border: 1,
        borderRadius: "4px",
        borderColor: "#A3A2AF",
        position: "relative",
      }}
      label="hello"
    >
      <div className={"custom-label"}>{label}</div>
      <TextField
        variant="standard"
        onChange={(e) => handleChange(e, setHours, 0, 23)}
        value={hours}
        size="small"
        margin="none"
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
    </Stack>
  );
};

export default TimeDurationInput;
