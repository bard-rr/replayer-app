import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";

const BardButton = ({
  text,
  onClick,
  sx,
  isBackButton,
  isDeleteButton,
  isEditButton,
}) => {
  return (
    <Button
      onClick={onClick}
      color="primary"
      variant={isDeleteButton ? "delete" : "outlined"}
      sx={{ height: "56px", ...sx }}
    >
      {isBackButton ? <ChevronLeftIcon /> : null}
      {isDeleteButton ? <DeleteIcon /> : null}
      {isEditButton ? <EditIcon /> : null}
      {text}
    </Button>
  );
};

export default BardButton;
