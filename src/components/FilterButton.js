import { Button } from "@mui/material";

const FilterButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      type="submit"
      variant="outlined"
      sx={{ height: "56px" }}
    >
      Filter
    </Button>
  );
};

export default FilterButton;
