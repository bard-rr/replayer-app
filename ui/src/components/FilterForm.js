import { Stack } from "@mui/material";
import LengthInputs from "./LengthInputs";
import { Box } from "@mui/system";
import FilterSelection from "./FilterSelection";
import AddOrRemoveButton from "./AddOrRemoveButton";
import AppNameFilterField from "./AppNameFilterField";
import YesNoFilterField from "./YesNoFilterField";
import { DEFAULT_FUNNEL_FILTER } from "../utils/const";
import DateInputs from "./DateInputs";

const FilterForm = ({
  filterData,
  setFilterData,
  filterOptions,
  labelColor,
}) => {
  const handleAddClick = (e) => {
    e.preventDefault();
    let newFilterData = [...filterData].concat(DEFAULT_FUNNEL_FILTER);
    setFilterData(newFilterData);
  };

  const handleRemoveClick = (e, i) => {
    e.preventDefault();
    let newFilterData = filterData
      .slice(0, i)
      .concat(filterData.slice(i + 1, filterData.length));
    setFilterData(newFilterData);
  };

  return (
    <>
      {filterData.map((data, index) => {
        switch (data.filterType) {
          case "length":
            return (
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={4}
                key={index}
              >
                <FilterSelection
                  filterOptions={filterOptions}
                  index={index}
                  setFilterData={setFilterData}
                  filterData={filterData}
                />
                <LengthInputs
                  setFilterData={setFilterData}
                  index={index}
                  filterData={filterData}
                  labelColor={labelColor}
                />
                <AddOrRemoveButton
                  handleAddClick={handleAddClick}
                  handleRemoveClick={handleRemoveClick}
                  index={index}
                  dataLength={filterData.length}
                  optionsLength={filterOptions.length}
                />
              </Stack>
            );
          case "appName":
            return (
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={4}
                key={index}
              >
                <FilterSelection
                  filterOptions={filterOptions}
                  index={index}
                  setFilterData={setFilterData}
                  filterData={filterData}
                />
                <AppNameFilterField
                  setFilterData={setFilterData}
                  index={index}
                  filterData={filterData}
                />
                <AddOrRemoveButton
                  handleAddClick={handleAddClick}
                  handleRemoveClick={handleRemoveClick}
                  index={index}
                  dataLength={filterData.length}
                  optionsLength={filterOptions.length}
                />
              </Stack>
            );
          case "date":
            return (
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={4}
                key={index}
              >
                <FilterSelection
                  filterOptions={filterOptions}
                  index={index}
                  setFilterData={setFilterData}
                  filterData={filterData}
                />
                <DateInputs
                  setFilterData={setFilterData}
                  index={index}
                  filterData={filterData}
                />
                <AddOrRemoveButton
                  handleAddClick={handleAddClick}
                  handleRemoveClick={handleRemoveClick}
                  index={index}
                  dataLength={filterData.length}
                  optionsLength={filterOptions.length}
                />
              </Stack>
            );
          case "Has Errors?":
            return (
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={4}
                key={index}
              >
                <FilterSelection
                  filterOptions={filterOptions}
                  index={index}
                  setFilterData={setFilterData}
                  filterData={filterData}
                />
                <YesNoFilterField
                  setFilterData={setFilterData}
                  index={index}
                  filterData={filterData}
                />
                <AddOrRemoveButton
                  handleAddClick={handleAddClick}
                  handleRemoveClick={handleRemoveClick}
                  index={index}
                  dataLength={filterData.length}
                  optionsLength={filterOptions.length}
                />
              </Stack>
            );
          default:
            return (
              <Box key={index}>
                <FilterSelection
                  filterOptions={filterOptions}
                  index={index}
                  setFilterData={setFilterData}
                  filterData={filterData}
                />
              </Box>
            );
        }
      })}
    </>
  );
};

export default FilterForm;
