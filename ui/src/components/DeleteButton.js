import { common, red } from "@mui/material/colors";
import BardButton from "./BardButton";

const DeleteButton = ({ handleClick, sx }) => {
  return (
    <BardButton
      isDeleteButton={true}
      onClick={(e) => handleClick(e)}
      sx={{
        // position: "absolute",
        // top: "30px",
        // right: "30px",
        "&:hover": { backgroundColor: red[900] },
        height: "36px",
        width: "10px",
        zIndex: 1,
        color: common["white"],
        backgroundColor: "#BF616A",
        ...sx,
      }}
    />
  );
};

export default DeleteButton;
