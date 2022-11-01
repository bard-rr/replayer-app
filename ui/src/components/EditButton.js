import { blue, common } from "@mui/material/colors";
import BardButton from "./BardButton";

const EditButton = ({ handleClick, sx }) => {
  return (
    <BardButton
      onClick={(e) => handleClick(e)}
      isEditButton={true}
      sx={{
        // position: "absolute",
        // top: "30px",
        // right: "30px",
        "&:hover": { backgroundColor: blue[900] },
        height: "36px",
        width: "10px",
        zIndex: 1,
        color: common["white"],
        backgroundColor: "#5E81AC",
        ...sx,
      }}
    />
  );
};

export default EditButton;
