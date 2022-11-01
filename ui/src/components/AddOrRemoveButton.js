import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const AddOrRemoveButton = ({
  handleAddClick,
  handleRemoveClick,
  index,
  dataLength,
  optionsLength,
}) => {
  return (
    <>
      {index === dataLength - 1 && dataLength !== optionsLength ? (
        <AddCircleOutlineIcon
          onClick={handleAddClick}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        />
      ) : (
        <RemoveCircleOutlineIcon
          onClick={(e) => handleRemoveClick(e, index)}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        />
      )}
    </>
  );
};

export default AddOrRemoveButton;