import { Box } from "@mui/material";

const CustomLabel = ({ text, sx }) => {
  const styleObj = {
    color: "#8a8692",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: "400",
    position: "absolute",
    mt: "-57px",
    ml: "8px",
    backgroundColor: "#eceff4",
    py: "0px",
    px: "5px",
    ...sx,
  };

  return <Box sx={styleObj}>{text}</Box>;
};

export default CustomLabel;
