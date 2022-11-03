import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import logo from "../assets/bard-logo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1, pl: "0px" }}>
      <AppBar position="static" sx={{ bgcolor: "#34384C" }}>
        <Toolbar varient="dense">
          <Box
            component="img"
            onClick={handleClick}
            sx={{
              height: 35,
              ml: "0px",
              mr: "15px",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            alt="BARD logo"
            src={logo}
          />
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
