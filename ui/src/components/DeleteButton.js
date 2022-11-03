import BardButton from "./BardButton";

const DeleteButton = ({ handleClick, sx }) => {
  return (
    <BardButton
      isDeleteButton={true}
      onClick={(e) => handleClick(e)}
      sx={{
        "&:hover": {
          backgroundColor: "#c4000f",
          color: "#FFFFFF",
        },
        height: "36px",
        width: "10px",
        zIndex: 1,
        color: "#ff4639",
        ...sx,
      }}
    />
  );
};

export default DeleteButton;
