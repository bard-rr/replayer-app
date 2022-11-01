import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Stack } from "@mui/material";

const AddOrRemoveButton = ({
  handleAddClick,
  handleRemoveClick,
  index,
  dataLength,
  optionsLength,
}) => {
  const removeButton = (
    <RemoveCircleOutlineIcon
      onClick={(e) => handleRemoveClick(e, index)}
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
    />
  );

  const addButton = (
    <AddCircleOutlineIcon
      onClick={handleAddClick}
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
    />
  );

  const bothButtons = (
    <Stack direction="column">
      {removeButton}
      {addButton}
    </Stack>
  );

  const determineButtons = () => {
    if (dataLength === 1) {
      return addButton;
    } else if (index === dataLength - 1 && dataLength !== optionsLength) {
      return bothButtons;
    } else {
      return removeButton;
    }
  };

  return <>{determineButtons()}</>;
};

export default AddOrRemoveButton;
