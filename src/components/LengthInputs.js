import { useState, useEffect } from "react";
import { HRS_TO_MS, MIN_TO_MS, SEC_TO_MS } from "../utils/const";
import TimeDurationInput from "./TimeDurationInput";

const LengthInputs = ({ setFilterData }) => {
  const [startHours, setStartHours] = useState("00");
  const [startMinutes, setStartMinutes] = useState("00");
  const [startSeconds, setStartSeconds] = useState("00");
  const [endHours, setEndHours] = useState("00");
  const [endMinutes, setEndMinutes] = useState("00");
  const [endSeconds, setEndSeconds] = useState("00");

  useEffect(() => {
    const minLength = toMilliseconds(startHours, startMinutes, startSeconds);
    const maxLength = toMilliseconds(endHours, endMinutes, endSeconds);
    const filterData = { minLength, maxLength };
    console.log(filterData);
    setFilterData(filterData);
  }, [
    startHours,
    startMinutes,
    startSeconds,
    endHours,
    endMinutes,
    endSeconds,
    setFilterData,
  ]);

  const toMilliseconds = (hrs, mins, secs) => {
    return hrs * HRS_TO_MS + mins * MIN_TO_MS + secs * SEC_TO_MS;
  };

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
    </>
  );
};

export default LengthInputs;
