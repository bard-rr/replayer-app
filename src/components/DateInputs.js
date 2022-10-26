import TextField from "@mui/material/TextField";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DateInputs = ({ setFilterData, index, filterData }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setendDate] = useState(null);

  // useEffect(() => {
  //   const filterData = {
  //     startDate: startDate && startDate.format("YYYY-MM-DD"),
  //     endDate: endDate && endDate.format("YYYY-MM-DD"),
  //   };
  //   setFilterData(filterData);
  // }, [startDate, endDate, setFilterData]);

  const handleChange = (newValue, isStartDate) => {
    let innerEndDate;
    let innerStartDate;

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
          value={startDate}
          onChange={(newValue) => handleChange(newValue, true)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => handleChange(newValue, false)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
};

export default DateInputs;
