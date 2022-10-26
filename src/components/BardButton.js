import { Button } from "@mui/material";

const BardButton = ({ text, onClick }) => {
  return (
    <Button
      onClick={onClick}
      type="submit"
      variant="outlined"
      sx={{ height: "56px" }}>
      {text}
    </Button>
  );
};

export default BardButton;
