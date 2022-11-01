import TextField from "@mui/material/TextField";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DateInputs = ({ setFilterData, index, filterData }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setendDate] = useState(null);

  const handleChange = (newValue, isStartDate) => {
    let innerEndDate;
    let innerStartDate;
    console.log("new value", typeof newValue);
    if (isStartDate) {
      innerStartDate = newValue.format("YYYY-MM-DD");
      setStartDate(newValue);
      innerEndDate = endDate && endDate.format("YYYY-MM-DD");
    } else {
      innerStartDate = startDate && startDate.format("YYYY-MM-DD");
      innerEndDate = newValue.format("YYYY-MM-DD");
      setendDate(newValue);
    }
    const newfilterData = filterData.map((innerData, innerIndex) => {
      if (index !== innerIndex) {
        return innerData;
      }

      let newFilter = { ...innerData };
      newFilter.startDate = innerStartDate;
      newFilter.endDate = innerEndDate;
      return newFilter;
    });
    setFilterData(newfilterData);
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          value={filterData[index].startDate}
          onChange={(newValue) => handleChange(newValue, true)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="End Date"
          value={filterData[index].endDate}
          onChange={(newValue) => handleChange(newValue, false)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
};

export default DateInputs;
