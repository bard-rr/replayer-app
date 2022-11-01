import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import logo from "../assets/bardlogo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1, pl: "0px" }}>
      <AppBar position="static" sx={{ bgcolor: "#3B4252" }}>
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
            }}
          >
            BARD
          </Typography>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            color="white"
          />
          <Button
            variant="text"
            sx={{ color: "white", ml: "15px" }}
            onClick={() => navigate("/sessions")}
          >
            Sessions
          </Button>
          <Button
            variant="text"
            sx={{ color: "white" }}
            onClick={() => navigate("/funnels")}
          >
            Funnels
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Sidebar;
