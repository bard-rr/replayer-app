import { useState } from "react";
import { DEFAULT_TIME_STRING } from "../utils/const";
import { toMilliseconds } from "../utils/formatLength";
import TimeDurationInput from "./TimeDurationInput";

const LengthInputs = ({ setFilterData, filterData, index }) => {
  const [startHours, setStartHours] = useState(DEFAULT_TIME_STRING);
  const [startMinutes, setStartMinutes] = useState(DEFAULT_TIME_STRING);
  const [startSeconds, setStartSeconds] = useState(DEFAULT_TIME_STRING);
  const [endHours, setEndHours] = useState(DEFAULT_TIME_STRING);
  const [endMinutes, setEndMinutes] = useState(DEFAULT_TIME_STRING);
  const [endSeconds, setEndSeconds] = useState(DEFAULT_TIME_STRING);

  //gross, but I can't think of a better way to do it: need the updated state that's
  //changed in the TimeDurationInput component
  const changeFilter = (isStartChange, payload) => {
    let minLength;
    let maxLength;
    if (isStartChange) {
      minLength = toMilliseconds(
        payload.hours,
        payload.minutes,
        payload.seconds
      );
      maxLength = toMilliseconds(endHours, endMinutes, endSeconds);
    } else {
      minLength = toMilliseconds(startHours, startMinutes, startSeconds);
      maxLength = toMilliseconds(
        payload.hours,
        payload.minutes,
        payload.seconds
      );
    }
    let newFilterData = filterData.map((data, innerIndex) => {
      if (innerIndex !== index) {
        return data;
      } else {
        let newFilter = { ...data };
        newFilter.minLength = minLength;
        newFilter.maxLength = maxLength;
        return newFilter;
      }
    });
    setFilterData(newFilterData);
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
        changeFilter={changeFilter}
        isStart={true}
      />
      <TimeDurationInput
        label="Max Length"
        hours={endHours}
        setHours={setEndHours}
        minutes={endMinutes}
        setMinutes={setEndMinutes}
        seconds={endSeconds}
        setSeconds={setEndSeconds}
        changeFilter={changeFilter}
        isStart={false}
      />
    </>
  );
};

export default LengthInputs;
