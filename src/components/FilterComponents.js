import Filter from "./Filter";
import FilterSelect from "./FilterSelect";
import FilterButton from "./FilterButton";
import DateInputs from "./DateInputs";
import LengthInputs from "./LengthInputs";

const FilterComponents = ({
  filter,
  setFilter,
  setSessions,
  setPage,
  rowsPerPage,
  setSortState,
  filterType,
  setFilterType,
}) => {
  return (
    <>
      <FilterSelect setFilterType={setFilterType} filterType={filterType} />
      {/* <Filter
        setSessions={setSessions}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        filter={filter}
        setFilter={setFilter}
        setSortState={setSortState}
      /> */}
      {(filterType = "date" ? <DateInputs /> : null)}
      <FilterButton />
    </>
  );
};

export default FilterComponents;
