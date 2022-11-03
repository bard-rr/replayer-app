import BardButton from "./BardButton";

const EditButton = ({ handleClick, sx }) => {
  return (
    <BardButton
      onClick={(e) => handleClick(e)}
      isEditButton={true}
      sx={{
        "&:hover": { backgroundColor: "#386acb", color: "#FFFFFF" },
        height: "36px",
        width: "10px",
        zIndex: 1,
        color: "#7398FF",
        ...sx,
      }}
    />
  );
};

export default EditButton;
