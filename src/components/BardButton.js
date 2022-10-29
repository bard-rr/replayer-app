import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { pink } from "@mui/material/colors";

const BardButton = ({ text, onClick, sx, isBackButton, isDeleteButton }) => {
  return (
    <Button
      onClick={onClick}
      type="submit"
      variant={isDeleteButton ? "contained" : "outlined"}
      sx={{ height: "56px", ...sx }}
    >
      {isBackButton ? <ChevronLeftIcon /> : null}
      {isDeleteButton ? <DeleteIcon /> : null}
      {text}
    </Button>
  );
};

export default BardButton;
