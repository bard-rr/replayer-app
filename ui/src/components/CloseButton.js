import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = ({ onClick, sx }) => {
  return (
    <IconButton
      sx={{ position: "absolute", right: "15px", top: "15px", ...sx }}
      onClick={onClick}
    >
      <CloseIcon />
    </IconButton>
  );
};

export default CloseButton;
