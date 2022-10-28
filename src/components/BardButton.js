import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Button } from "@mui/material";

const BardButton = ({ text, onClick, sx, isBackButton }) => {
  return (
    <Button
      onClick={onClick}
      type="submit"
      variant="outlined"
      sx={{ height: "56px", ...sx }}
    >
      {isBackButton ? <ChevronLeftIcon /> : null}
      {text}
    </Button>
  );
};

export default BardButton;
