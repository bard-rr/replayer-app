import { useState } from "react";
import { DEFAULT_TIME_STRING } from "../utils/const";
import {
  msToHours,
  msToMinutes,
  msToSeconds,
  toMilliseconds,
} from "../utils/formatLength";
import TimeDurationInput from "./TimeDurationInput";

const LengthInputs = ({ setFilterData, filterData, index, labelColor }) => {
  const [startHours, setStartHours] = useState(
    msToHours(filterData[index].minLength) || DEFAULT_TIME_STRING
  );
  const [startMinutes, setStartMinutes] = useState(
    msToMinutes(filterData[index].minLength) || DEFAULT_TIME_STRING
  );
  const [startSeconds, setStartSeconds] = useState(
    msToSeconds(filterData[index].minLength) || DEFAULT_TIME_STRING
  );
  const [endHours, setEndHours] = useState(
    msToHours(filterData[index].maxLength) || DEFAULT_TIME_STRING
  );
  const [endMinutes, setEndMinutes] = useState(
    msToMinutes(filterData[index].maxLength) || DEFAULT_TIME_STRING
  );
  const [endSeconds, setEndSeconds] = useState(
    msToSeconds(filterData[index].maxLength) || DEFAULT_TIME_STRING
  );

  //need the updated state that's changed in the TimeDurationInput component
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
        labelColor={labelColor}
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
        labelColor={labelColor}
      />
    </>
  );
};

export default LengthInputs;
