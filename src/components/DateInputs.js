import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DateInputs = ({ setFilterData }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setendDate] = useState(null);

  useEffect(() => {
    // TODO (10-22-2022)
    // Need to get the right data into the startDate and endDate state
    const filterData = { startDate, endDate };
    console.log(filterData);
    // setFilterData(filterData);
  }, [startDate, endDate, setFilterData]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => {
            console.log(newValue);
            setStartDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => {
            setendDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
};

export default DateInputs;
