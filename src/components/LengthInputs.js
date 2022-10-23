import { useState, useEffect } from "react";
import { DEFAULT_TIME_STRING } from "../utils/const";
import { toMilliseconds } from "../utils/formatLength";
import TimeDurationInput from "./TimeDurationInput";

const LengthInputs = ({ setFilterData }) => {
  const [startHours, setStartHours] = useState(DEFAULT_TIME_STRING);
  const [startMinutes, setStartMinutes] = useState(DEFAULT_TIME_STRING);
  const [startSeconds, setStartSeconds] = useState(DEFAULT_TIME_STRING);
  const [endHours, setEndHours] = useState(DEFAULT_TIME_STRING);
  const [endMinutes, setEndMinutes] = useState(DEFAULT_TIME_STRING);
  const [endSeconds, setEndSeconds] = useState(DEFAULT_TIME_STRING);

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
