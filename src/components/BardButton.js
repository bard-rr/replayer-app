import { Button } from "@mui/material";

const BardButton = ({ text, onClick, sx }) => {
  return (
    <Button
      onClick={onClick}
      type="submit"
      variant="outlined"
      sx={{ height: "56px", ...sx }}
    >
      {text}
    </Button>
  );
};

export default BardButton;
