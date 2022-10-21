import { Drawer } from "@mui/material";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
import logo from "../assets/bardlogo.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  // const navigate = useNavigate();
  const drawerWidth = 240;
  const sxProps = {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
    },
  };

  //this naviagtes users to a '/sessions' url with a query param for filtering by
  //today / yesterday / etc.
  return (
    <Box>
      <Drawer varient="permanent" open={true} hideBackdrop={true} sx={sxProps}>
        <img alt="bard" src={logo} height="100px" width="100px"/>
        <Divider />
        {/* <List>
          <ListItem
            key={"Sessions"}
            disablePadding
            onClick={() => navigate("/sessions")}
          >
            <ListItemButton>
              <ListItemText primary={"Sessions"} />
            </ListItemButton>
          </ListItem>

          <ListItem
            key={"Today"}
            disablePadding
            onClick={() => navigate("/sessions?filter=today")}
          >
            <ListItemButton>
              <ListItemText primary={"Today"} />
            </ListItemButton>
          </ListItem>

          <ListItem
            key={"Yesterday"}
            disablePadding
            onClick={() => navigate("/sessions?filter=yesterday")}
          >
            <ListItemButton>
              <ListItemText primary={"Yesterday"} />
            </ListItemButton>
          </ListItem>

          <ListItem
            key={"This Week"}
            disablePadding
            onClick={() => navigate("/sessions?filter=week")}
          >
            <ListItemButton>
              <ListItemText primary={"This Week"} />
            </ListItemButton>
          </ListItem>
        </List> */}
        <Divider />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
