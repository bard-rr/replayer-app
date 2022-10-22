import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "../assets/bardlogo.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1, pl: "0px" }}>
      <AppBar position="static" sx={{ bgcolor: "black" }}>
        <Toolbar varient="dense">
          <Box
            component="img"
            onClick={handleClick}
            sx={{
              height: 50,
              width: 50,
              ml: "36px",
              mr: "10px",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            alt="BARD logo"
            src={logo}
          />
          <Typography
            variant="h6"
            onClick={handleClick}
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                cursor: "pointer",
              },
            }}>
            BARD
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Sidebar;
